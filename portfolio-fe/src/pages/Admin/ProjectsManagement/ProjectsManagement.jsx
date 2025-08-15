import React, { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  FolderIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Nền tảng thương mại điện tử hiện đại với React và Node.js',
      image: '/images/project1.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'published',
      featured: true,
      githubUrl: 'https://github.com/example/project1',
      liveUrl: 'https://project1.example.com',
      createdAt: '2025-08-10',
      updatedAt: '2025-08-15'
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'Website portfolio cá nhân với thiết kế responsive',
      image: '/images/project2.jpg',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      status: 'published',
      featured: false,
      githubUrl: 'https://github.com/example/project2',
      liveUrl: 'https://project2.example.com',
      createdAt: '2025-08-05',
      updatedAt: '2025-08-12'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Ứng dụng quản lý công việc với tính năng real-time',
      image: '/images/project3.jpg',
      technologies: ['Vue.js', 'Socket.io', 'Express.js', 'PostgreSQL'],
      status: 'draft',
      featured: false,
      githubUrl: 'https://github.com/example/project3',
      liveUrl: '',
      createdAt: '2025-08-01',
      updatedAt: '2025-08-08'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    status: 'draft'
  });

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData(project);
    setShowForm(true);
  };

  const handleDelete = (projectId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { ...formData, id: editingProject.id, updatedAt: new Date().toISOString().split('T')[0] }
          : p
      ));
    } else {
      // Add new project
      const newProject = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setProjects([...projects, newProject]);
    }
    setShowForm(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      featured: false,
      status: 'draft'
    });
  };

  const toggleFeatured = (projectId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, featured: !p.featured } : p
    ));
  };

  const handleTechChange = (tech) => {
    if (formData.technologies.includes(tech)) {
      setFormData({
        ...formData,
        technologies: formData.technologies.filter(t => t !== tech)
      });
    } else {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, tech]
      });
    }
  };

  const availableTechs = ['React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'Tailwind CSS', 'Bootstrap', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Spring Boot'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Dự án</h1>
          <p className="text-gray-500">Quản lý portfolio và các dự án cá nhân</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Thêm dự án
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <FolderIcon className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              <p className="text-sm text-gray-500">Tổng dự án</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <EyeIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{projects.filter(p => p.status === 'published').length}</p>
              <p className="text-sm text-gray-500">Đã xuất bản</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <PencilIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{projects.filter(p => p.status === 'draft').length}</p>
              <p className="text-sm text-gray-500">Bản nháp</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold">★</span>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{projects.filter(p => p.featured).length}</p>
              <p className="text-sm text-gray-500">Nổi bật</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative">
              <img
                src={project.image || 'https://via.placeholder.com/400x200'}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              {project.featured && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    ★ Nổi bật
                  </span>
                </div>
              )}
              <div className="absolute top-2 left-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  project.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleFeatured(project.id)}
                    className={`text-sm ${project.featured ? 'text-purple-600' : 'text-gray-400'}`}
                  >
                    ★
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  {project.updatedAt}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {editingProject ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên dự án</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Công nghệ sử dụng</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTechs.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => handleTechChange(tech)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          formData.technologies.includes(tech)
                            ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                            : 'bg-gray-100 text-gray-800 border-gray-300'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Live URL</label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Dự án nổi bật</span>
                  </label>
                  
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="draft">Bản nháp</option>
                    <option value="published">Xuất bản</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {editingProject ? 'Cập nhật' : 'Tạo dự án'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManagement;
