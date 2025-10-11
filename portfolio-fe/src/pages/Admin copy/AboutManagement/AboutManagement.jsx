import React, { useState } from 'react';
import { 
  UserIcon, 
  BriefcaseIcon, 
  StarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { AdminCard, Button, Input, Textarea, PageHeader } from '../../../components/Admin';

const AboutManagement = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Nguyễn Hoàng Dinh',
    title: 'Full Stack Developer',
    bio: 'Tôi là một lập trình viên full-stack với 3+ năm kinh nghiệm...',
    email: 'nhdinh.dev@gmail.com',
    phone: '+84 123 456 789',
    location: 'Hà Nội, Việt Nam'
  });

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: 'Tech Company A',
      position: 'Senior Developer',
      startDate: '2022-01',
      endDate: '2024-12',
      description: 'Phát triển ứng dụng web và mobile...',
      current: true
    },
    {
      id: 2,
      company: 'Startup B',
      position: 'Full Stack Developer',
      startDate: '2021-06',
      endDate: '2022-01',
      description: 'Xây dựng hệ thống e-commerce...',
      current: false
    }
  ]);

  const [skills] = useState([
    { id: 1, name: 'React', level: 90 },
    { id: 2, name: 'Node.js', level: 85 },
    { id: 3, name: 'Java', level: 80 },
    { id: 4, name: 'MySQL', level: 75 }
  ]);

  const [editingPersonal, setEditingPersonal] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false
  });
  const [showAddExperience, setShowAddExperience] = useState(false);

  const handleSavePersonal = () => {
    setEditingPersonal(false);
    // Call API to save personal info
  };

  const handleAddExperience = () => {
    const experience = {
      id: Date.now(),
      ...newExperience
    };
    setExperiences([...experiences, experience]);
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    });
    setShowAddExperience(false);
  };

  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Giới thiệu"
        subtitle="Cập nhật thông tin cá nhân và kinh nghiệm"
        icon={UserIcon}
      />

      {/* Personal Information */}
      <AdminCard
        title="Thông tin cá nhân"
        icon={UserIcon}
        actions={
          <Button
            variant={editingPersonal ? "success" : "secondary"}
            size="sm"
            icon={editingPersonal ? CheckIcon : PencilIcon}
            onClick={editingPersonal ? handleSavePersonal : () => setEditingPersonal(true)}
          >
            {editingPersonal ? 'Lưu' : 'Chỉnh sửa'}
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Họ và tên"
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
              disabled={!editingPersonal}
            />
          </div>
          <div>
            <Input
              label="Chức danh"
              value={personalInfo.title}
              onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
              disabled={!editingPersonal}
            />
          </div>
          <div>
            <Input
              label="Email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
              disabled={!editingPersonal}
            />
          </div>
          <div>
            <Input
              label="Số điện thoại"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
              disabled={!editingPersonal}
            />
          </div>
          <div>
            <Input
              label="Địa chỉ"
              value={personalInfo.location}
              onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
              disabled={!editingPersonal}
            />
          </div>
          <div className="md:col-span-2">
            <Textarea
              label="Giới thiệu bản thân"
              value={personalInfo.bio}
              onChange={(e) => setPersonalInfo({...personalInfo, bio: e.target.value})}
              disabled={!editingPersonal}
              rows={4}
            />
          </div>
        </div>
      </AdminCard>

      {/* Work Experience */}
      <AdminCard
        title="Kinh nghiệm làm việc"
        icon={BriefcaseIcon}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={PlusIcon}
            onClick={() => setShowAddExperience(true)}
          >
            Thêm kinh nghiệm
          </Button>
        }
      >
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                  <p className="text-indigo-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Hiện tại' : exp.endDate}
                    {exp.current && <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Hiện tại</span>}
                  </p>
                  <p className="text-gray-700 mt-2">{exp.description}</p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  icon={TrashIcon}
                  onClick={() => handleDeleteExperience(exp.id)}
                >
                  Xóa
                </Button>
              </div>
            </div>
          ))}

          {showAddExperience && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Thêm kinh nghiệm mới</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Công ty"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                />
                <Input
                  label="Vị trí"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                />
                <Input
                  label="Ngày bắt đầu"
                  type="month"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                />
                <Input
                  label="Ngày kết thúc"
                  type="month"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                  disabled={newExperience.current}
                />
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newExperience.current}
                      onChange={(e) => setNewExperience({...newExperience, current: e.target.checked})}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Đang làm việc hiện tại</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <Textarea
                    label="Mô tả công việc"
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddExperience(false)}
                  icon={XMarkIcon}
                >
                  Hủy
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddExperience}
                  icon={CheckIcon}
                >
                  Thêm
                </Button>
              </div>
            </div>
          )}
        </div>
      </AdminCard>

      {/* Skills */}
      <AdminCard
        title="Kỹ năng"
        icon={StarIcon}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                <span className="text-sm text-gray-500">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
};

export default AboutManagement;
