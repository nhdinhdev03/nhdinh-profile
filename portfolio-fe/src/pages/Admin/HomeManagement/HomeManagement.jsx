import React, { useState, useEffect, useCallback } from "react";

import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import heroSubHeadingApi from "api/admin/home/HeroSubHeadingApi";
import heroApi from "api/admin/home/HeroApi";
import { useNotificationContext } from "components/Notification";
import { ErrorFormatter, ValidationUtils, useDebounce } from "utils/validation";
import { DeleteConfirmationModal } from "components/UI/ConfirmationModal";

const HomeManagement = () => {
  // Notification system
  const notification = useNotificationContext();

  // State for current hero being edited
  const [heroSection, setHeroSection] = useState({
    heroId: "",
    locale: "vi",
    preHeading: "",
    heading: "",
    introHtml: "",
    createdAt: null,
    updatedAt: null,
  });

  // State for hero list management
  const [heroes, setHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);

  // State for hero sub-headings
  const [subHeadings, setSubHeadings] = useState([]);
  const [newSubHeading, setNewSubHeading] = useState("");
  const [editingSubHeading, setEditingSubHeading] = useState(null);

  // UI states
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isEditingHero, setIsEditingHero] = useState(false);

  // Filter states
  const [showDeleted, setShowDeleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("active"); // "active", "defleted", "all"
  const [lastNotificationId, setLastNotificationId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Stats for tabs
  const [tabStats, setTabStats] = useState({
    active: 0,
    deleted: 0,
    total: 0,
  });

  // Debounce search term
  const { debouncedFunction: updateSearch } = useDebounce((term) => {
    setDebouncedSearchTerm(term);
  }, 300);

  // Utility to show controlled notification
  const showControlledNotification = useCallback(
    (message, type = "info", duration = 4000) => {
      // Always dismiss existing notifications first
      notification.dismissAll();

      // Small delay to ensure previous notifications are dismissed
      setTimeout(() => {
        notification[type](message, duration, { position: "top-right" });
      }, 100);
    },
    [notification]
  );

  // Update debounced search term when search term changes
  useEffect(() => {
    updateSearch(searchTerm);
  }, [searchTerm, updateSearch]);

  // Computed filtered heroes (only search, no isDeleted filter since it's handled by backend)
  const filteredHeroes = React.useMemo(() => {
    if (!heroes) return [];

    return heroes.filter((hero) => {
      // Filter by search term only
      if (debouncedSearchTerm.trim()) {
        const searchLower = debouncedSearchTerm.toLowerCase();
        return (
          hero.heading?.toLowerCase().includes(searchLower) ||
          hero.preHeading?.toLowerCase().includes(searchLower) ||
          hero.locale?.toLowerCase().includes(searchLower) ||
          hero.introHtml?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [heroes, debouncedSearchTerm]);

  // Statistics
  const stats = React.useMemo(() => {
    const total = heroes.length;
    const active = heroes.filter((h) => !h.isDeleted).length;
    const deleted = total - active;
    const locales = [...new Set(heroes.map((h) => h.locale))].length;

    return { total, active, deleted, locales };
  }, [heroes]);

  // Check if selected hero is hidden by current filter
  const isSelectedHeroHidden = React.useMemo(() => {
    if (!selectedHero) return false;
    return !filteredHeroes.some((hero) => hero.heroId === selectedHero.heroId);
  }, [selectedHero, filteredHeroes]);

  // Validation functions
  const validateHeroSection = () => {
    const errors = ValidationUtils.validateHeroFields(heroSection);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSubHeading = (text) => {
    const errors = ValidationUtils.validateSubHeading(text, subHeadings);

    if (errors.length > 0) {
      notification.warning(errors[0], 3000);
      return false;
    }
    return true;
  };

  // Fetch hero sub-headings
  const fetchSubHeadings = useCallback(async (heroId) => {
    if (!heroId) return;

    try {
      const response = await heroSubHeadingApi.getByHeroId(heroId);
      console.log("SubHeadings Response:", response);

      if (response.data) {
        // Sort by sortOrder
        const sortedSubHeadings = response.data.sort(
          (a, b) => a.sortOrder - b.sortOrder
        );
        setSubHeadings(sortedSubHeadings);
      }
    } catch (err) {
      console.error("SubHeadings Error:", err);
    }
  }, []);

  // Create new sub-heading
  const createSubHeading = async () => {
    if (!newSubHeading.trim() || !selectedHero) {
      notification.warning("Vui lòng nhập nội dung sub-heading", 3000);
      return;
    }

    if (!validateSubHeading(newSubHeading)) return;

    try {
      setSaving(true);
      const payload = {
        heroId: selectedHero.heroId,
        text: newSubHeading.trim(),
        sortOrder: subHeadings.length + 1,
      };

      await heroSubHeadingApi.create(payload);
      setNewSubHeading("");
      await fetchSubHeadings(selectedHero.heroId);

      // Show success notification
      notification.success(
        `Sub-heading "${newSubHeading.trim()}" đã được thêm thành công!`,
        3000,
        { position: "top-right" }
      );
    } catch (err) {
      console.error("Create SubHeading Error:", err);
      const errorMessage = ErrorFormatter.formatApiError(err);
      setError(errorMessage);
      notification.error(`Lỗi thêm sub-heading: ${errorMessage}`, 5000, {
        position: "top-right",
      });
    } finally {
      setSaving(false);
    }
  };

  // Update sub-heading
  const updateSubHeading = async (subId, newText) => {
    if (!validateSubHeading(newText)) return;

    try {
      await heroSubHeadingApi.update(subId, { text: newText.trim() });
      await fetchSubHeadings(selectedHero.heroId);
      setEditingSubHeading(null);

      // Show success notification
      notification.success(`Sub-heading đã được cập nhật thành công!`, 3000, {
        position: "top-right",
      });
    } catch (err) {
      console.error("Update SubHeading Error:", err);
      const errorMessage = ErrorFormatter.formatApiError(err);
      setError(errorMessage);
      notification.error(`Lỗi cập nhật sub-heading: ${errorMessage}`, 5000, {
        position: "top-right",
      });
    }
  };

  // Delete sub-heading
  const deleteSubHeading = async (subId) => {
    try {
      // Get the sub-heading text before deleting for notification
      const subHeading = subHeadings.find((sub) => sub.subId === subId);

      await heroSubHeadingApi.delete(subId);
      await fetchSubHeadings(selectedHero.heroId);

      // Show success notification
      notification.success(
        `Sub-heading "${subHeading?.text || "N/A"}" đã được xóa thành công!`,
        3000,
        { position: "top-right" }
      );
    } catch (err) {
      console.error("Delete SubHeading Error:", err);
      const errorMessage = "Không thể xóa sub-heading";
      setError(errorMessage);
      notification.error(
        `Lỗi xóa sub-heading: ${err.message || errorMessage}`,
        5000,
        { position: "top-right" }
      );
    }
  };

  // Update sort order
  const updateSortOrder = async (subId, newSortOrder) => {
    try {
      await heroSubHeadingApi.updateSortOrder(subId, newSortOrder);
      await fetchSubHeadings(selectedHero.heroId);

      // Show subtle info notification for sort order changes
      notification.info(`Thứ tự sub-heading đã được cập nhật`, 2000, {
        position: "top-right",
      });
    } catch (err) {
      console.error("Update Sort Order Error:", err);
      const errorMessage = "Không thể cập nhật thứ tự";
      setError(errorMessage);
      notification.error(`Lỗi sắp xếp: ${err.message || errorMessage}`, 4000, {
        position: "top-right",
      });
    }
  };

  // Load tab statistics
  const loadTabStats = useCallback(async () => {
    try {
      const [activeRes, deletedRes, allRes] = await Promise.all([
        heroApi.getAllActive(),
        heroApi.getAllDeleted(),
        heroApi.getAllIncludeDeleted(),
      ]);

      setTabStats({
        active: activeRes.data?.length || 0,
        deleted: deletedRes.data?.length || 0,
        total: allRes.data?.length || 0,
      });
    } catch (err) {
      console.error("Error loading tab stats:", err);
    }
  }, []);

  const fetchHeroData = useCallback(
    async (showSuccessNotification = false) => {
      try {
        setLoading(true);
        setError(null);

        let response;
        // Fetch different data based on view mode
        switch (viewMode) {
          case "active":
            response = await heroApi.getAllActive();
            break;
          case "deleted":
            response = await heroApi.getAllDeleted();
            break;
          case "all":
            response = await heroApi.getAllIncludeDeleted();
            break;
          default:
            response = await heroApi.getAllActive();
        }

        if (response.data && response.data.length > 0) {
          setHeroes(response.data);
          setHeroData(response.data);

          // Show success notification if requested (manual refresh)
          if (showSuccessNotification) {
            showControlledNotification(
              `Đã tải ${response.data.length} Heroes thành công!`,
              "success",
              3000
            );
            // Also refresh tab stats
            loadTabStats();
          }

          // Không tự động load hero để edit nữa - chỉ load danh sách
          // Người dùng sẽ phải click "Edit" để chỉnh sửa hero
        } else {
          setHeroes([]);
          setHeroData([]);
        }
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message || "Failed to fetch hero data");
        notification.error(
          "Không thể tải dữ liệu: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    },
    [viewMode, notification, showControlledNotification, loadTabStats]
  );

  // Create new hero
  const createHero = async () => {
    // Validate form before submitting
    if (!validateHeroSection()) {
      notification.error("Vui lòng kiểm tra lại thông tin đã nhập", 4000);
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Kiểm tra xem locale đã tồn tại chưa (frontend check)
      const existingHero = heroes.find(
        (hero) => hero.locale === heroSection.locale.trim()
      );
      if (existingHero) {
        const errorMsg = `Locale "${heroSection.locale}" đã tồn tại. Vui lòng chọn locale khác hoặc chỉnh sửa Hero hiện có.`;
        setError(errorMsg);
        notification.warning(errorMsg, 5000, { position: "top-right" });
        setSaving(false);
        return;
      }

      // Kiểm tra thêm bằng API (backend check)
      const localeExists = await heroApi.checkLocaleExists(
        heroSection.locale.trim()
      );
      if (localeExists) {
        const errorMsg = `Locale "${heroSection.locale}" đã tồn tại trong database. Vui lòng chọn locale khác.`;
        setError(errorMsg);
        notification.warning(errorMsg, 5000, { position: "top-right" });
        setSaving(false);
        return;
      }

      const dataToSave = {
        locale: heroSection.locale.trim(),
        preHeading: heroSection.preHeading.trim(),
        heading: heroSection.heading.trim(),
        introHtml: heroSection.introHtml.trim(),
      };

      const response = await heroApi.create(dataToSave);
      console.log("Created hero:", response);

      // Refresh data
      await fetchHeroData();
      await loadTabStats();

      // Select the newly created hero
      const newHero = response.data;
      if (newHero) {
        setSelectedHero(newHero);
        setHeroSection({
          heroId: newHero.heroId,
          locale: newHero.locale,
          preHeading: newHero.preHeading || "",
          heading: newHero.heading || "",
          introHtml: newHero.introHtml || "",
          createdAt: newHero.createdAt,
          updatedAt: newHero.updatedAt,
        });

        // Load sub-headings for the new hero (should be empty initially)
        fetchSubHeadings(newHero.heroId);

        // Show success notification
        notification.success(
          `Hero "${newHero.heading}" đã được tạo thành công!`,
          4000,
          { position: "top-right" }
        );
        console.log(
          "✅ Hero created successfully! You can now add sub-headings."
        );
      }
    } catch (err) {
      console.error("Create Error:", err);
      let errorMessage = "Không thể tạo Hero mới";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        if (
          err.message.includes("UNIQUE KEY constraint") ||
          err.message.includes("duplicate key")
        ) {
          errorMessage = `Locale "${heroSection.locale}" đã tồn tại. Vui lòng chọn locale khác.`;
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      notification.error(`Lỗi tạo Hero: ${errorMessage}`, 6000, {
        position: "top-right",
      });
    } finally {
      setSaving(false);
    }
  };

  // Update existing hero
  const updateHero = async () => {
    // Validate form before submitting
    if (!validateHeroSection()) {
      notification.error("Vui lòng kiểm tra lại thông tin đã nhập", 4000);
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Kiểm tra nếu locale thay đổi và đã tồn tại
      const currentHero = heroes.find(
        (hero) => hero.heroId === heroSection.heroId
      );
      if (currentHero && currentHero.locale !== heroSection.locale.trim()) {
        // Locale đã thay đổi, kiểm tra xem locale mới đã tồn tại chưa
        const existingHero = heroes.find(
          (hero) =>
            hero.locale === heroSection.locale.trim() &&
            hero.heroId !== heroSection.heroId
        );
        if (existingHero) {
          const errorMsg = `Không thể đổi sang locale "${heroSection.locale}" vì đã tồn tại Hero khác với locale này. Vui lòng chọn locale khác.`;
          setError(errorMsg);
          notification.warning(errorMsg, 6000, { position: "top-right" });
          setSaving(false);
          return;
        }

        // Kiểm tra thêm bằng API (backend check)
        const localeExists = await heroApi.checkLocaleExists(
          heroSection.locale.trim()
        );
        if (localeExists) {
          const errorMsg = `Locale "${heroSection.locale}" đã tồn tại trong database. Không thể cập nhật.`;
          setError(errorMsg);
          notification.warning(errorMsg, 6000, { position: "top-right" });
          setSaving(false);
          return;
        }
      }

      const dataToSave = {
        locale: heroSection.locale,
        preHeading: heroSection.preHeading,
        heading: heroSection.heading,
        introHtml: heroSection.introHtml,
      };

      const response = await heroApi.update(heroSection.heroId, dataToSave);
      console.log("Updated hero:", response);

      // Refresh data
      await fetchHeroData();
      await loadTabStats();

      // Show success notification
      notification.success(
        `Hero "${heroSection.heading}" đã được cập nhật thành công!`,
        4000,
        { position: "top-right" }
      );
    } catch (err) {
      console.error("Update Error:", err);
      let errorMessage = "Không thể cập nhật Hero";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        if (
          err.message.includes("UNIQUE KEY constraint") ||
          err.message.includes("duplicate key")
        ) {
          errorMessage = `Locale "${heroSection.locale}" đã tồn tại. Không thể cập nhật.`;
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      notification.error(`Lỗi cập nhật Hero: ${errorMessage}`, 6000, {
        position: "top-right",
      });
    } finally {
      setSaving(false);
    }
  };

  // Delete hero
  const deleteHero = async (heroId) => {
    try {
      setLoading(true);
      setError(null);

      await heroApi.delete(heroId);
      console.log("Deleted hero:", heroId);

      // Refresh data
      await fetchHeroData();
      await loadTabStats();

      // If deleted hero was selected, clear selection
      if (selectedHero?.heroId === heroId) {
        setSelectedHero(null);
        resetHeroForm();
      }

      setShowDeleteConfirm(null);

      // Show success notification
      const deletedHero = heroes.find((hero) => hero.heroId === heroId);
      notification.success(
        `Hero "${deletedHero?.heading || "N/A"}" đã được xóa thành công!`,
        4000,
        { position: "top-right" }
      );
    } catch (err) {
      console.error("Delete Error:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Không thể xóa Hero";
      setError(errorMessage);
      notification.error(`Lỗi xóa Hero: ${errorMessage}`, 6000, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  // Restore hero
  const restoreHero = async (heroId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await heroApi.restore(heroId);
      console.log("Restored hero:", response);

      // Refresh data
      await fetchHeroData();
      await loadTabStats();

      // Show success notification
      const restoredHero = heroes.find((hero) => hero.heroId === heroId);
      notification.success(
        `Hero "${
          restoredHero?.heading || "N/A"
        }" đã được khôi phục thành công!`,
        4000,
        { position: "top-right" }
      );
    } catch (err) {
      console.error("Restore Error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Không thể khôi phục Hero";
      setError(errorMessage);
      notification.error(`Lỗi khôi phục Hero: ${errorMessage}`, 6000, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  // Select hero for editing
  const selectHero = useCallback(
    (hero) => {
      setSelectedHero(hero);
      setIsEditingHero(true);
      setHeroSection({
        heroId: hero.heroId,
        locale: hero.locale,
        preHeading: hero.preHeading || "",
        heading: hero.heading || "",
        introHtml: hero.introHtml || "",
        createdAt: hero.createdAt,
        updatedAt: hero.updatedAt,
      });

      // Load sub-headings for this hero
      fetchSubHeadings(hero.heroId);
    },
    [fetchSubHeadings]
  );

  // Reset form for new hero
  const resetHeroForm = () => {
    // Tìm locale khả dụng
    const availableLocales = ["vi", "en", "fr", "de"];
    const usedLocales = heroes.map((hero) => hero.locale);
    const availableLocale = availableLocales.find(
      (locale) => !usedLocales.includes(locale)
    );

    setHeroSection({
      heroId: "",
      locale: availableLocale || "vi", // Fallback to 'vi' if all are used
      preHeading: "",
      heading: "",
      introHtml: "",
      createdAt: null,
      updatedAt: null,
    });
    setSelectedHero(null);
    setIsEditingHero(false);
    setSubHeadings([]); // Clear sub-headings
    setNewSubHeading(""); // Clear new sub-heading input
    setEditingSubHeading(null); // Clear editing state
  };

  // Handle save (create or update)
  const handleSave = () => {
    if (heroSection.heroId) {
      updateHero();
    } else {
      createHero();
    }
  };

  // Get button text for save action
  const getSaveButtonText = () => {
    if (saving) return "Đang lưu...";
    if (heroSection.heroId) return "Cập nhật";
    return "Tạo mới";
  };

  // Render sub-headings preview
  const renderSubHeadingsPreview = () => {
    if (heroSection.heroId && subHeadings.length > 0) {
      return (
        <div className="mb-4 space-y-1">
          {subHeadings.map((sub, index) => (
            <div key={sub.subId} className="text-lg font-medium opacity-95">
              {sub.text}
              {index < subHeadings.length - 1 && (
                <span className="text-cyan-300"> /</span>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (heroSection.heroId) {
      return (
        <div className="mb-4 text-sm opacity-75 italic">
          Chưa có sub-headings. Thêm sub-headings để hiển thị.
        </div>
      );
    }

    return (
      <div className="mb-4 text-sm opacity-75 italic">
        Lưu Hero để thêm sub-headings
      </div>
    );
  };

  // Fetch data on mount and when view mode changes
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;
        switch (viewMode) {
          case "active":
            response = await heroApi.getAllActive();
            break;
          case "deleted":
            response = await heroApi.getAllDeleted();
            break;
          case "all":
            response = await heroApi.getAllIncludeDeleted();
            break;
          default:
            response = await heroApi.getAllActive();
        }

        if (response.data && response.data.length > 0) {
          setHeroes(response.data);
          setHeroData(response.data);

          // Không tự động load hero để edit nữa - chỉ load danh sách
          // Người dùng sẽ phải click "Edit" để chỉnh sửa hero
        } else {
          setHeroes([]);
          setHeroData([]);
        }
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message || "Failed to fetch hero data");
        notification.error(
          "Không thể tải dữ liệu: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
    loadTabStats(); // Also update tab stats
  }, [viewMode, notification, loadTabStats]);

  // Auto-select appropriate hero when filters change
  useEffect(() => {
    // Skip if no heroes loaded yet or during transitions
    if (!heroes || heroes.length === 0 || isTransitioning) return;

    // If we have a selected hero, check if it's visible in current filtered results
    if (selectedHero) {
      const isSelectedHeroVisible = filteredHeroes.some(
        (hero) => hero.heroId === selectedHero.heroId
      );

      if (!isSelectedHeroVisible) {
        // Không auto-select hero nữa - chỉ hiển thị thông báo nếu cần
        const hasActiveSearch = debouncedSearchTerm.trim().length > 0;
        const notificationKey = `${selectedHero.heroId}-${viewMode}`;

        if (hasActiveSearch && lastNotificationId !== notificationKey) {
          const heroStatus = selectedHero.isDeleted ? "đã xóa" : "hoạt động";
          const currentView =
            viewMode === "active"
              ? "Heroes hoạt động"
              : viewMode === "deleted"
              ? "Thùng rác"
              : "view hiện tại";

          showControlledNotification(
            `Hero "${selectedHero.heading}" (${heroStatus}) không hiển thị trong ${currentView}. Bạn vẫn có thể chỉnh sửa hoặc chuyển tab để xem lại.`
          );

          setLastNotificationId(notificationKey);
        }
      }
    }
  }, [
    filteredHeroes,
    selectedHero,
    heroes,
    selectHero,
    notification,
    viewMode,
    lastNotificationId,
    showControlledNotification,
    isTransitioning,
    debouncedSearchTerm,
  ]);

  // Reset notification tracking when user actively changes view or search
  useEffect(() => {
    setLastNotificationId(null);

    // Set transitioning state to prevent notification spam
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // 500ms cooldown after view/search changes

    return () => clearTimeout(timeout);
  }, [viewMode, searchTerm]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl/Cmd + D: Toggle deleted heroes
      if ((event.ctrlKey || event.metaKey) && event.key === "d") {
        event.preventDefault();
        setViewMode((prev) => (prev === "deleted" ? "active" : "deleted"));
      }

      // Ctrl/Cmd + A: Show all heroes
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "a" &&
        !event.shiftKey
      ) {
        event.preventDefault();
        setViewMode("all");
      }

      // Number keys for quick view switching
      if (event.key === "1" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setViewMode("active");
      }
      if (event.key === "2" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setViewMode("deleted");
      }
      if (event.key === "3" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setViewMode("all");
      }

      // Ctrl/Cmd + F: Focus search
      if ((event.ctrlKey || event.metaKey) && event.key === "f") {
        event.preventDefault();
        const searchInput = document.getElementById("hero-search");
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Escape: Clear search
      if (event.key === "Escape" && searchTerm) {
        setSearchTerm("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchTerm]);

  const handlePreview = () => {
    window.open("/", "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý Trang chủ
          </h1>
          <p className="text-gray-500">
            Quản lý nội dung và layout của trang chủ
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchHeroData(true)}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 disabled:opacity-50"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            {loading ? "Đang tải..." : "Làm mới"}
          </button>
          <button
            onClick={handlePreview}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <EyeIcon className="h-4 w-4 mr-2" />
            Xem trước
          </button>
          <button
            onClick={() => {
              resetHeroForm();
              setIsEditingHero(true); // Hiển thị form để tạo hero mới
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Tạo Hero mới
          </button>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setViewMode("active")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                viewMode === "active"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Heroes Hoạt động
              <span className="ml-2 bg-gray-100 text-gray-900 hidden sm:inline-block py-0.5 px-2.5 rounded-full text-xs font-medium">
                {tabStats.active}
              </span>
            </button>
            <button
              onClick={() => setViewMode("deleted")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                viewMode === "deleted"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Thùng rác
              <span className="ml-2 bg-red-100 text-red-900 hidden sm:inline-block py-0.5 px-2.5 rounded-full text-xs font-medium">
                {tabStats.deleted}
              </span>
            </button>
            <button
              onClick={() => setViewMode("all")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                viewMode === "all"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Tất cả
              <span className="ml-2 bg-blue-100 text-blue-900 hidden sm:inline-block py-0.5 px-2.5 rounded-full text-xs font-medium">
                {tabStats.total}
              </span>
            </button>
          </nav>
        </div>

        {/* Search and filters for current view */}
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  id="hero-search"
                  type="text"
                  placeholder={`Tìm kiếm trong ${
                    viewMode === "active"
                      ? "heroes hoạt động"
                      : viewMode === "deleted"
                      ? "thùng rác"
                      : "tất cả heroes"
                  }... (Ctrl+F)`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* View-specific actions */}
              {viewMode === "deleted" && stats.deleted > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      // TODO: Implement bulk restore
                      notification.info(
                        "Tính năng khôi phục hàng loạt sẽ được thêm sau",
                        3000
                      );
                    }}
                    className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 font-medium"
                  >
                    Khôi phục tất cả
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implement permanent delete
                      notification.warning(
                        "Tính năng xóa vĩnh viễn sẽ được thêm sau",
                        3000
                      );
                    }}
                    className="text-xs px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 font-medium"
                  >
                    Xóa vĩnh viễn tất cả
                  </button>
                </div>
              )}

              <div className="text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <span>
                    {filteredHeroes.length}
                    {viewMode === "active"
                      ? " hoạt động"
                      : viewMode === "deleted"
                      ? " đã xóa"
                      : " heroes"}
                  </span>
                  {viewMode === "all" && (
                    <>
                      <span className="text-green-600">
                        ({stats.active} hoạt động)
                      </span>
                      <span className="text-red-600">
                        ({stats.deleted} đã xóa)
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        style={{ display: "none" }}
      >
        {/* Legacy filter controls - hidden but kept for backward compatibility */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="hero-search"
                type="text"
                placeholder="Tìm kiếm theo heading, locale, nội dung... (Ctrl+F)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                id="show-deleted"
                type="checkbox"
                checked={showDeleted}
                onChange={(e) => setShowDeleted(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="show-deleted"
                className="ml-2 text-sm text-gray-700"
              >
                Hiển thị đã xóa (Ctrl+D)
              </label>
            </div>

            {/* Quick Actions */}
            {heroes.length > 0 && (
              <div className="flex items-center space-x-2 border-l pl-4">
                <button
                  onClick={() => setShowDeleted(false)}
                  disabled={!showDeleted}
                  className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Chỉ hoạt động
                </button>
                <button
                  onClick={() => setShowDeleted(true)}
                  disabled={showDeleted || stats.deleted === 0}
                  className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Chỉ đã xóa ({stats.deleted})
                </button>
              </div>
            )}

            <div className="text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>
                  {filteredHeroes.length} / {heroes.length} heroes
                </span>
                <span className="text-green-600">{stats.active} hoạt động</span>
                {stats.deleted > 0 && (
                  <span className="text-red-600">{stats.deleted} đã xóa</span>
                )}
                <span className="text-blue-600">{stats.locales} ngôn ngữ</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Hero Section Editor - Only show when editing a hero */}
      {viewMode === "active" && isEditingHero && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="preHeading"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tiền tố (Pre-heading)
                  </label>
                  <input
                    id="preHeading"
                    type="text"
                    value={heroSection.preHeading}
                    onChange={(e) =>
                      setHeroSection({
                        ...heroSection,
                        preHeading: e.target.value,
                      })
                    }
                    placeholder="Ví dụ: Xin chào, tôi là"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="heading"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tiêu đề chính (Heading)
                  </label>
                  <input
                    id="heading"
                    type="text"
                    value={heroSection.heading}
                    onChange={(e) =>
                      setHeroSection({
                        ...heroSection,
                        heading: e.target.value,
                      })
                    }
                    placeholder="Ví dụ: Nhdinh"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="introHtml"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mô tả (HTML)
                  </label>
                  <textarea
                    id="introHtml"
                    rows={4}
                    value={heroSection.introHtml.replace(/<[^>]*>/g, "")} // Remove HTML tags for editing
                    onChange={(e) =>
                      setHeroSection({
                        ...heroSection,
                        introHtml: `<p>${e.target.value}</p>`,
                      })
                    }
                    placeholder="Lập trình viên full-stack với đam mê phát triển phần mềm hiện đại"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nội dung sẽ được bọc trong thẻ &lt;p&gt;
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="locale"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ngôn ngữ (Locale)
                    {(() => {
                      // Kiểm tra conflict locale
                      const isConflict = heroes.some(
                        (hero) =>
                          hero.locale === heroSection.locale &&
                          hero.heroId !== heroSection.heroId
                      );

                      if (isConflict) {
                        return (
                          <span className="text-xs text-red-600 ml-2">
                            (Locale này đã được sử dụng bởi Hero khác!)
                          </span>
                        );
                      }

                      return null;
                    })()}
                  </label>
                  <select
                    id="locale"
                    value={heroSection.locale}
                    onChange={(e) =>
                      setHeroSection({ ...heroSection, locale: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option
                      value="vi"
                      disabled={heroes.some(
                        (hero) =>
                          hero.locale === "vi" &&
                          hero.heroId !== heroSection.heroId
                      )}
                    >
                      Tiếng Việt (vi){" "}
                      {heroes.some(
                        (hero) =>
                          hero.locale === "vi" &&
                          hero.heroId !== heroSection.heroId
                      )
                        ? "(Đã sử dụng)"
                        : ""}
                    </option>
                    <option
                      value="en"
                      disabled={heroes.some(
                        (hero) =>
                          hero.locale === "en" &&
                          hero.heroId !== heroSection.heroId
                      )}
                    >
                      English (en){" "}
                      {heroes.some(
                        (hero) =>
                          hero.locale === "en" &&
                          hero.heroId !== heroSection.heroId
                      )
                        ? "(Đã sử dụng)"
                        : ""}
                    </option>
                    <option
                      value="fr"
                      disabled={heroes.some(
                        (hero) =>
                          hero.locale === "fr" &&
                          hero.heroId !== heroSection.heroId
                      )}
                    >
                      Français (fr){" "}
                      {heroes.some(
                        (hero) =>
                          hero.locale === "fr" &&
                          hero.heroId !== heroSection.heroId
                      )
                        ? "(Đã sử dụng)"
                        : ""}
                    </option>
                    <option
                      value="de"
                      disabled={heroes.some(
                        (hero) =>
                          hero.locale === "de" &&
                          hero.heroId !== heroSection.heroId
                      )}
                    >
                      Deutsch (de){" "}
                      {heroes.some(
                        (hero) =>
                          hero.locale === "de" &&
                          hero.heroId !== heroSection.heroId
                      )
                        ? "(Đã sử dụng)"
                        : ""}
                    </option>
                  </select>
                </div>

                {/* Sub-headings Management - Chỉ hiển thị khi edit hero */}
                {isEditingHero && heroSection.heroId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub-headings ({subHeadings.length})
                  </label>
                  <div className="space-y-2">
                    {subHeadings.map((sub, index) => (
                      <div
                        key={sub.subId}
                        className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md"
                      >
                        <span className="text-xs text-gray-400 w-6">
                          {sub.sortOrder}
                        </span>
                        {editingSubHeading === sub.subId ? (
                          <input
                            type="text"
                            defaultValue={sub.text}
                            onBlur={(e) =>
                              updateSubHeading(sub.subId, e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateSubHeading(sub.subId, e.target.value);
                              }
                            }}
                            className="flex-1 text-sm border-none outline-none bg-white"
                            autoFocus
                          />
                        ) : (
                          <button
                            className="flex-1 text-sm text-left cursor-pointer hover:bg-gray-50 p-1 rounded"
                            onClick={() => setEditingSubHeading(sub.subId)}
                          >
                            {sub.text}
                          </button>
                        )}
                        <div className="flex items-center space-x-1">
                          {index > 0 && (
                            <button
                              onClick={() =>
                                updateSortOrder(sub.subId, sub.sortOrder - 1)
                              }
                              className="text-gray-400 hover:text-gray-600 text-xs"
                              title="Di chuyển lên"
                            >
                              ↑
                            </button>
                          )}
                          {index < subHeadings.length - 1 && (
                            <button
                              onClick={() =>
                                updateSortOrder(sub.subId, sub.sortOrder + 1)
                              }
                              className="text-gray-400 hover:text-gray-600 text-xs"
                              title="Di chuyển xuống"
                            >
                              ↓
                            </button>
                          )}
                          <button
                            onClick={() => deleteSubHeading(sub.subId)}
                            className="text-red-400 hover:text-red-600 text-xs"
                            title="Xóa"
                          >
                            <TrashIcon className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add new sub-heading */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newSubHeading}
                        onChange={(e) => setNewSubHeading(e.target.value)}
                        placeholder={
                          heroSection.heroId
                            ? "Thêm sub-heading mới..."
                            : "Lưu Hero trước để thêm sub-headings"
                        }
                        disabled={!heroSection.heroId}
                        className="flex-1 text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && heroSection.heroId) {
                            createSubHeading();
                          }
                        }}
                      />
                      <button
                        onClick={createSubHeading}
                        disabled={
                          !newSubHeading.trim() || saving || !heroSection.heroId
                        }
                        className="px-2 py-1 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        title={
                          !heroSection.heroId
                            ? "Lưu Hero trước để thêm sub-headings"
                            : "Thêm sub-heading"
                        }
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Thông báo khi chưa có Hero */}
                    {!heroSection.heroId && (
                      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-2">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-amber-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-amber-700">
                              <strong>Nhập thông tin Hero và lưu trước</strong>
                            </p>
                            <p className="text-xs text-amber-600 mt-1">
                              Sau khi lưu Hero thành công, bạn có thể thêm các
                              sub-headings như "Full-Stack Developer", "React
                              Developer", v.v.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Xem trước
                </h3>
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
                  {heroSection.preHeading && (
                    <p className="text-sm opacity-90 mb-2">
                      {heroSection.preHeading}
                    </p>
                  )}
                  <h1 className="text-2xl font-bold mb-3">
                    {heroSection.heading}
                  </h1>

                  {/* Sub-headings preview */}
                  {renderSubHeadingsPreview()}

                  <div
                    className="text-sm opacity-90"
                    dangerouslySetInnerHTML={{ __html: heroSection.introHtml }}
                  />
                </div>
                {heroSection.createdAt && (
                  <div className="mt-4 text-xs text-gray-500">
                    <p>
                      Tạo:{" "}
                      {new Date(heroSection.createdAt).toLocaleString("vi-VN")}
                    </p>
                    {heroSection.updatedAt && (
                      <p>
                        Cập nhật:{" "}
                        {new Date(heroSection.updatedAt).toLocaleString(
                          "vi-VN"
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsEditingHero(false);
                  setSelectedHero(null);
                  resetHeroForm();
                }}
                disabled={loading || saving}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={() => fetchHeroData(true)}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                {loading ? "Đang tải..." : "Làm mới"}
              </button>
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {getSaveButtonText()}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Heroes Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {viewMode === "deleted"
                ? "🗑️ Thùng rác"
                : viewMode === "active"
                ? "📋 Heroes hoạt động"
                : "📁 Tất cả Heroes"}
              ({filteredHeroes.length}
              {heroes.length !== filteredHeroes.length
                ? ` / ${heroes.length}`
                : ""}
              )
            </h2>
            <div className="flex items-center space-x-2">
              {viewMode === "active" && selectedHero && (
                <span className="text-sm text-gray-500">
                  Đang chỉnh sửa: <strong>{selectedHero.heading}</strong>
                  {isSelectedHeroHidden && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      Đã ẩn
                    </span>
                  )}
                  {isSelectedHeroHidden && (
                    <button
                      onClick={() => {
                        if (selectedHero.isDeleted) {
                          setViewMode("deleted");
                        }
                        setSearchTerm("");
                      }}
                      className="ml-2 text-xs text-indigo-600 hover:text-indigo-900 underline"
                    >
                      Hiển thị
                    </button>
                  )}
                </span>
              )}

              {viewMode === "deleted" && (
                <div className="text-sm text-gray-500">
                  <span className="text-red-600">🗑️ Chế độ xem thùng rác</span>
                  <span className="mx-2">•</span>
                  <span>Chỉ xem và khôi phục</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          {filteredHeroes.length === 0 ? (
            <div className="text-center py-12">
              {heroes.length === 0 ? (
                // No heroes at all
                <>
                  <div className="text-gray-400 mb-4">
                    <PlusIcon className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Chưa có Hero nào
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Tạo Hero đầu tiên để bắt đầu
                  </p>
                
                </>
              ) : viewMode === "deleted" ? (
                // No deleted heroes
                <>
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="h-12 w-12 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Thùng rác trống
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm
                      ? `Không tìm thấy hero đã xóa nào cho "${searchTerm}"`
                      : "Không có hero nào đã bị xóa"}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Xóa tìm kiếm
                    </button>
                  )}
                </>
              ) : viewMode === "active" ? (
                // No active heroes
                <>
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="h-12 w-12 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không tìm thấy hero hoạt động
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm
                      ? `Không có kết quả cho "${searchTerm}"`
                      : stats.deleted > 0
                      ? `Tất cả ${stats.total} heroes đã bị xóa`
                      : "Tạo hero mới để bắt đầu"}
                  </p>
                  <div className="flex justify-center space-x-3">
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Xóa tìm kiếm
                      </button>
                    )}
                    {stats.deleted > 0 && (
                      <button
                        onClick={() => setViewMode("deleted")}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Xem thùng rác ({stats.deleted})
                      </button>
                    )}
                    <button
                      onClick={() => {
                        resetHeroForm();
                        setIsEditingHero(true); // Hiển thị form để tạo hero mới
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Tạo Hero mới
                    </button>
                  </div>
                </>
              ) : (
                // No results in "all" view (search didn't match)
                <>
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="h-12 w-12 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không tìm thấy Hero nào
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm
                      ? `Không có kết quả cho "${searchTerm}"`
                      : "Thay đổi bộ lọc để xem thêm"}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Xóa tìm kiếm
                    </button>
                  )}
                </>
              )}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hero
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngôn ngữ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {viewMode === "deleted" ? "Ngày xóa" : "Cập nhật cuối"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {viewMode === "deleted" ? "Khôi phục" : "Thao tác"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHeroes.map((hero) => (
                  <tr
                    key={hero.heroId}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      selectedHero?.heroId === hero.heroId
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : ""
                    }`}
                    onClick={() => selectHero(hero)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {hero.preHeading} <strong>{hero.heading}</strong>
                          </div>
                          <div
                            className="text-sm text-gray-500 max-w-xs truncate"
                            dangerouslySetInnerHTML={{ __html: hero.introHtml }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {hero.locale.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {viewMode === "deleted" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          🗑️ Đã xóa
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            hero.isDeleted
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {hero.isDeleted ? "Đã xóa" : "Hoạt động"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {viewMode === "deleted" ? (
                        <div className="flex flex-col">
                          <span>
                            {hero.updatedAt
                              ? new Date(hero.updatedAt).toLocaleDateString(
                                  "vi-VN"
                                )
                              : new Date(hero.createdAt).toLocaleDateString(
                                  "vi-VN"
                                )}
                          </span>
                          <span className="text-xs text-gray-400">
                            {hero.updatedAt
                              ? new Date(hero.updatedAt).toLocaleTimeString(
                                  "vi-VN",
                                  { hour: "2-digit", minute: "2-digit" }
                                )
                              : new Date(hero.createdAt).toLocaleTimeString(
                                  "vi-VN",
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                          </span>
                        </div>
                      ) : (
                        <>
                          {hero.updatedAt
                            ? new Date(hero.updatedAt).toLocaleDateString(
                                "vi-VN"
                              )
                            : new Date(hero.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {viewMode === "deleted" ? (
                        // Simple restore-only interface for deleted view
                        <div className="flex items-center justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              restoreHero(hero.heroId);
                            }}
                            className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 font-medium transition-colors"
                            title="Khôi phục hero này"
                          >
                            <ArrowPathIcon className="h-4 w-4 mr-1" />
                            Khôi phục
                          </button>
                        </div>
                      ) : (
                        // Normal action buttons for active/all views
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              selectHero(hero);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Chỉnh sửa"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>

                          {/* Actions based on view mode and hero status */}
                          {viewMode === "deleted" || hero.isDeleted ? (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  restoreHero(hero.heroId);
                                }}
                                className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                                title="Khôi phục"
                              >
                                <ArrowPathIcon className="h-4 w-4" />
                                {viewMode === "deleted" && (
                                  <span className="text-xs hidden sm:inline">
                                    Khôi phục
                                  </span>
                                )}
                              </button>
                              {viewMode === "deleted" && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // TODO: Implement permanent delete
                                    notification.warning(
                                      "Tính năng xóa vĩnh viễn sẽ được thêm sau",
                                      3000
                                    );
                                  }}
                                  className="text-red-800 hover:text-red-900 flex items-center space-x-1"
                                  title="Xóa vĩnh viễn"
                                >
                                  <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                  <span className="text-xs hidden sm:inline">
                                    Xóa vĩnh viễn
                                  </span>
                                </button>
                              )}
                            </>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowDeleteConfirm(hero);
                              }}
                              className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                              title="Xóa mềm"
                            >
                              <TrashIcon className="h-4 w-4" />
                              {viewMode === "active" && (
                                <span className="text-xs hidden sm:inline">
                                  Xóa
                                </span>
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => {
          if (showDeleteConfirm) {
            deleteHero(showDeleteConfirm.heroId);
          }
        }}
        itemName={showDeleteConfirm?.heading || ""}
        itemType="Hero"
        loading={saving}
        canRestore={true}
        additionalInfo={
          showDeleteConfirm && (
            <div className="text-left">
              <p>
                <strong>Locale:</strong> {showDeleteConfirm.locale}
              </p>
              <p>
                <strong>Pre-heading:</strong> {showDeleteConfirm.preHeading}
              </p>
              {subHeadings.length > 0 && (
                <p className="text-orange-600 font-medium mt-1">
                  ⚠️ Có {subHeadings.length} sub-heading(s) sẽ bị ảnh hưởng
                </p>
              )}
            </div>
          )
        }
      />
    </div>
  );
};

export default HomeManagement;
