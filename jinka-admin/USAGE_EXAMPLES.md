# API Service Usage Examples

This guide shows how to use the API services in your React components.

## 🔐 Authentication Example

### Login Component
```javascript
import { authService } from '../services/auth';
import { message } from 'antd';

const handleLogin = async (values) => {
    try {
        const response = await authService.login(values.email, values.password);
        if (response.success) {
            message.success('Login successful!');
            navigate('/');
        }
    } catch (error) {
        message.error('Login failed. Please check your credentials.');
    }
};
```

### Protected Route Check
```javascript
import { authService } from '../services/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return children;
};
```

---

## 📊 Departments Example

### Fetch Departments
```javascript
import { useState, useEffect } from 'react';
import { departmentService } from '../services/departments';
import { message } from 'antd';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const response = await departmentService.getAll();
            if (response.success) {
                setDepartments(response.data);
            }
        } catch (error) {
            message.error('Failed to load departments');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Your JSX here
    );
};
```

### Create Department
```javascript
const handleCreate = async (values) => {
    try {
        const response = await departmentService.create(values);
        if (response.success) {
            message.success('Department created successfully!');
            fetchDepartments(); // Refresh list
            setIsModalOpen(false);
        }
    } catch (error) {
        message.error('Failed to create department');
    }
};
```

### Update Department
```javascript
const handleUpdate = async (id, values) => {
    try {
        const response = await departmentService.update(id, values);
        if (response.success) {
            message.success('Department updated successfully!');
            fetchDepartments(); // Refresh list
        }
    } catch (error) {
        message.error('Failed to update department');
    }
};
```

### Delete Department
```javascript
const handleDelete = async (id) => {
    try {
        const response = await departmentService.delete(id);
        if (response.success) {
            message.success('Department deleted successfully!');
            fetchDepartments(); // Refresh list
        }
    } catch (error) {
        message.error('Failed to delete department');
    }
};
```

---

## 🏗️ Projects Example

### Fetch Projects with Loading State
```javascript
import { useState, useEffect } from 'react';
import { projectService } from '../services/projects';
import { Spin, message } from 'antd';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await projectService.getAll();
            if (response.success) {
                setProjects(response.data);
            }
        } catch (error) {
            message.error('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spin size="large" />;
    }

    return (
        // Your JSX here
    );
};
```

### Update Project Progress
```javascript
const handleUpdateProgress = async (projectId, progress, status) => {
    try {
        const response = await projectService.updateProgress(projectId, progress, status);
        if (response.success) {
            message.success('Project progress updated!');
            fetchProjects(); // Refresh list
        }
    } catch (error) {
        message.error('Failed to update progress');
    }
};
```

---

## 📈 Reports Example

### Fetch Department Performance (System-Calculated)
```javascript
import { useState, useEffect } from 'react';
import { reportService } from '../services/reports';

const ReportList = () => {
    const [departmentData, setDepartmentData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDepartmentPerformance();
    }, []);

    const fetchDepartmentPerformance = async () => {
        setLoading(true);
        try {
            const response = await reportService.getDepartmentPerformance();
            if (response.success) {
                // Data is auto-calculated by backend
                setDepartmentData(response.data);
            }
        } catch (error) {
            message.error('Failed to load department performance');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Display performance data
    );
};
```

### Fetch Statistics with Period Filter
```javascript
const [period, setPeriod] = useState('month');
const [statistics, setStatistics] = useState(null);

const fetchStatistics = async (selectedPeriod) => {
    try {
        const response = await reportService.getStatistics(selectedPeriod);
        if (response.success) {
            setStatistics(response.data);
        }
    } catch (error) {
        message.error('Failed to load statistics');
    }
};

// Call when period changes
useEffect(() => {
    fetchStatistics(period);
}, [period]);
```

---

## 📄 File Upload Example

### Upload Document
```javascript
import api from '../services/api';

const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'Finance');
    formData.append('description', 'Budget report');

    try {
        const response = await api.post('/documents', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        if (response.success) {
            message.success('File uploaded successfully!');
        }
    } catch (error) {
        message.error('File upload failed');
    }
};
```

### Download Document
```javascript
const handleDownload = async (documentId, filename) => {
    try {
        const response = await api.get(`/documents/${documentId}/download`, {
            responseType: 'blob',
        });
        
        // Create download link
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        message.success('Download started');
    } catch (error) {
        message.error('Download failed');
    }
};
```

---

## 🔄 Pagination Example

### Fetch with Pagination
```javascript
const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
});

const fetchData = async (page = 1, pageSize = 10) => {
    try {
        const response = await departmentService.getAll({
            page,
            pageSize,
        });
        
        if (response.success) {
            setDepartments(response.data);
            setPagination({
                current: page,
                pageSize,
                total: response.total,
            });
        }
    } catch (error) {
        message.error('Failed to load data');
    }
};

// Handle page change
const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
};
```

---

## 🔍 Search & Filter Example

### Search Functionality
```javascript
const [searchTerm, setSearchTerm] = useState('');

const handleSearch = async (value) => {
    setSearchTerm(value);
    try {
        const response = await departmentService.getAll({
            search: value,
        });
        
        if (response.success) {
            setDepartments(response.data);
        }
    } catch (error) {
        message.error('Search failed');
    }
};
```

### Filter Functionality
```javascript
const [filters, setFilters] = useState({});

const handleFilter = async (filterValues) => {
    setFilters(filterValues);
    try {
        const response = await departmentService.getAll({
            filter: JSON.stringify(filterValues),
        });
        
        if (response.success) {
            setDepartments(response.data);
        }
    } catch (error) {
        message.error('Filter failed');
    }
};
```

---

## ⚠️ Error Handling Example

### Comprehensive Error Handling
```javascript
const handleApiCall = async () => {
    try {
        setLoading(true);
        const response = await departmentService.getAll();
        
        if (response.success) {
            setData(response.data);
        } else {
            // Handle API-level errors
            message.error(response.error?.message || 'Operation failed');
        }
    } catch (error) {
        // Handle network/server errors
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;
            const errorMessage = error.response.data?.error?.message;
            
            switch (status) {
                case 400:
                    message.error(errorMessage || 'Invalid request');
                    break;
                case 401:
                    message.error('Please login again');
                    // Redirect handled by interceptor
                    break;
                case 403:
                    message.error('You don\'t have permission');
                    break;
                case 404:
                    message.error('Resource not found');
                    break;
                case 500:
                    message.error('Server error. Please try again later');
                    break;
                default:
                    message.error(errorMessage || 'An error occurred');
            }
        } else if (error.request) {
            // Request made but no response
            message.error('Network error. Please check your connection');
        } else {
            // Something else happened
            message.error('An unexpected error occurred');
        }
    } finally {
        setLoading(false);
    }
};
```

---

## 🎣 Custom Hook Example

### useApi Hook
```javascript
// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import { message } from 'antd';

export const useApi = (apiFunction) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await apiFunction(...args);
            if (response.success) {
                setData(response.data);
                return response;
            } else {
                throw new Error(response.error?.message || 'Operation failed');
            }
        } catch (err) {
            setError(err);
            message.error(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunction]);

    return { data, loading, error, execute };
};

// Usage in component
import { useApi } from '../hooks/useApi';
import { departmentService } from '../services/departments';

const MyComponent = () => {
    const { data, loading, execute } = useApi(departmentService.getAll);

    useEffect(() => {
        execute();
    }, [execute]);

    if (loading) return <Spin />;
    
    return <div>{/* Render data */}</div>;
};
```

---

## 💡 Best Practices

1. **Always handle loading states**
   ```javascript
   const [loading, setLoading] = useState(false);
   ```

2. **Always handle errors**
   ```javascript
   try { ... } catch (error) { message.error(...) }
   ```

3. **Show user feedback**
   ```javascript
   message.success('Operation successful!');
   message.error('Operation failed');
   ```

4. **Refresh data after mutations**
   ```javascript
   await departmentService.create(data);
   fetchDepartments(); // Refresh list
   ```

5. **Use environment variables**
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL;
   ```

6. **Clean up on unmount**
   ```javascript
   useEffect(() => {
       let cancelled = false;
       
       const fetchData = async () => {
           const response = await api.get(...);
           if (!cancelled) setData(response.data);
       };
       
       fetchData();
       return () => { cancelled = true; };
   }, []);
   ```
