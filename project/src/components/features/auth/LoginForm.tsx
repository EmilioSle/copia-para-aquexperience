import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { FormValidation } from '../../../types';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, redirectTo = '/' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState<FormValidation>({
    isValid: true,
    errors: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const validateForm = (): FormValidation => {
    const errors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ingresa un email válido';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (validation.errors[field]) {
      setValidation(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: '' },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newValidation = validateForm();
    setValidation(newValidation);

    if (!newValidation.isValid) {
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = redirectTo;
      }
    } catch (error) {
      setValidation({
        isValid: false,
        errors: {
          submit: error instanceof Error ? error.message : 'Error al iniciar sesión',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={validation.errors.email}
          leftIcon={<Mail className="h-5 w-5" />}
          required
          autoComplete="email"
          aria-describedby="email-error"
        />
      </div>

      <div>
        <Input
          type={showPassword ? 'text' : 'password'}
          label="Contraseña"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={validation.errors.password}
          leftIcon={<Lock className="h-5 w-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
          required
          autoComplete="current-password"
          aria-describedby="password-error"
        />
      </div>

      {validation.errors.submit && (
        <div 
          className="p-3 bg-red-50 border border-red-200 rounded-lg"
          role="alert"
        >
          <p className="text-sm text-red-600">{validation.errors.submit}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-600">Recordarme</span>
        </label>

        <a
          href="/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button
        type="submit"
        className="w-full"
        loading={isLoading}
        disabled={isLoading}
      >
        Iniciar Sesión
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
            Regístrate aquí
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;