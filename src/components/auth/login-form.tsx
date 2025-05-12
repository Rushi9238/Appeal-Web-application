'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/redux/hook';
import { loginStart, loginSuccess, loginFailure  } from '@/redux/slices/authSlice';

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type LoginResponse = {
  user: User;
  token: string;
};

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: 'admin@example.com',
    password: 'password123',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsLoading(true);
  dispatch(loginStart());

  try {
    // Simulate login API call
    const response: LoginResponse = await new Promise<LoginResponse>((resolve) =>
      setTimeout(() =>
        resolve({
          token: 'fake-jwt-token',
          user: {
            id: '1',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin',
          },
        }),
        1000
      )
    );

    dispatch(loginSuccess(response));

    // Set cookie for middleware authentication
    Cookies.set('token', response.token, {
      expires: formData.rememberMe ? 30 : 1, // 30 days or 1 day
      path: '/',
    });

    router.push('/app/appealTable');
  } catch (error) {
    console.error('Login failed:', error); // Log the error
    dispatch(loginFailure('Login failed'));
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p>}
        </div>
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            style={{ marginRight: '8px' }}
          />
          <label>Remember me</label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
        <p>Demo credentials:</p>
        <p>Email: admin@example.com | Password: password123</p>
      </div>
    </div>
  );
}