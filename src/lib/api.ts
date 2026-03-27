const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Helper function for API calls
const apiCall = async <T,>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API Error');
  }

  return response.json();
};

// Users API
export const usersAPI = {
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  login: (data: { email: string; password: string }) =>
    apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAll: () => apiCall('/users'),
  getById: (id: string) => apiCall(`/users/${id}`),
  update: (id: string, data: Record<string, any>) =>
    apiCall(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/users/${id}`, {
      method: 'DELETE',
    }),
};

// Appointments API
export const appointmentsAPI = {
  create: (data: {
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    appointmentDate: string;
    appointmentTime: string;
    description?: string;
  }) =>
    apiCall('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAll: () => apiCall('/appointments'),
  getById: (id: string) => apiCall(`/appointments/${id}`),
  update: (
    id: string,
    data: {
      status?: string;
      notes?: string;
      appointmentDate?: string;
      appointmentTime?: string;
    }
  ) =>
    apiCall(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/appointments/${id}`, {
      method: 'DELETE',
    }),
};

// Contacts API
export const contactsAPI = {
  create: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) =>
    apiCall('/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAll: () => apiCall('/contacts'),
  getById: (id: string) => apiCall(`/contacts/${id}`),
  update: (id: string, data: { status?: string; reply?: string }) =>
    apiCall(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/contacts/${id}`, {
      method: 'DELETE',
    }),
};

// Blog API
export const blogsAPI = {
  create: (data: {
    title: string;
    content: string;
    excerpt?: string;
    image?: string;
    author?: string;
    category?: string;
    tags?: string[];
    published?: boolean;
  }) =>
    apiCall('/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAll: () => apiCall('/blogs'),
  getAllAdmin: () => apiCall('/blogs/admin/all'),
  getBySlug: (slug: string) => apiCall(`/blogs/${slug}`),
  update: (
    id: string,
    data: {
      title?: string;
      content?: string;
      excerpt?: string;
      image?: string;
      category?: string;
      tags?: string[];
      published?: boolean;
    }
  ) =>
    apiCall(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/blogs/${id}`, {
      method: 'DELETE',
    }),
};
