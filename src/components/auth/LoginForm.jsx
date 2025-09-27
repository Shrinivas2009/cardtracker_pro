import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Icon from '../AppIcon';

const LoginForm = ({ onToggleMode }) => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await signIn(formData.email, formData.password);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mx-auto mb-4">
          <Icon name="CreditCard" size={32} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">Sign in to your CardTracker Pro account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          placeholder="Enter your password"
          required
        />

        {errors.submit && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-3">
            <p className="text-error text-sm">{errors.submit}</p>
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          fullWidth
          iconName="LogIn"
          iconPosition="left"
        >
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;