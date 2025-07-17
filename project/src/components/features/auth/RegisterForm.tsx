import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { FormValidation, UserRole } from '../../../types';

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, redirectTo = '/' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'client' as UserRole,
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validation, setValidation] = useState<FormValidation>({
    isValid: true,
    errors: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const validateForm = (): FormValidation => {
    const errors: Record<string, string> = {};

    // First name validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'El nombre es requerido';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'El nombre debe tener al menos 2 caracteres';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      errors.lastName = 'El apellido es requerido';
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'El apellido debe tener al menos 2 caracteres';
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ingresa un email válido';
    }

    // Phone validation (optional but if provided, must be valid)
    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      errors.phone = 'Ingresa un número de teléfono válido';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Terms acceptance validation
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleInputChange = (field: string, value: string | boolean) => {
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
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        role: formData.role,
        phone: formData.phone || undefined,
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = redirectTo;
      }
    } catch (error) {
      setValidation({
        isValid: false,
        errors: {
          submit: error instanceof Error ? error.message : 'Error al crear la cuenta',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Tipo de cuenta
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: 'client', label: 'Cliente', description: 'Reservar experiencias y equipos' },
            { value: 'instructor', label: 'Instructor', description: 'Ofrecer clases y experiencias' },
            { value: 'provider', label: 'Proveedor', description: 'Alquilar equipos acuáticos' },
          ].map((option) => (
            <label
              key={option.value}
              className={`
                relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all duration-200
                ${formData.role === option.value 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <input
                type="radio"
                name="role"
                value={option.value}
                checked={formData.role === option.value}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="sr-only"
              />
              <span className="font-medium text-gray-900">{option.label}</span>
              <span className="text-sm text-gray-500 mt-1">{option.description}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          label="Nombre"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          error={validation.errors.firstName}
          leftIcon={<User className="h-5 w-5" />}
          required
          autoComplete="given-name"
        />

        <Input
          type="text"
          label="Apellido"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          error={validation.errors.lastName}
          leftIcon={<User className="h-5 w-5" />}
          required
          autoComplete="family-name"
        />
      </div>

      <Input
        type="email"
        label="Email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        error={validation.errors.email}
        leftIcon={<Mail className="h-5 w-5" />}
        required
        autoComplete="email"
      />

      <Input
        type="tel"
        label="Teléfono (opcional)"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        error={validation.errors.phone}
        leftIcon={<Phone className="h-5 w-5" />}
        autoComplete="tel"
        helperText="Incluye código de país (ej: +34 123 456 789)"
      />

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
        autoComplete="new-password"
        helperText="Mínimo 8 caracteres, incluye mayúscula, minúscula y número"
      />

      <Input
        type={showConfirmPassword ? 'text' : 'password'}
        label="Confirmar contraseña"
        value={formData.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
        error={validation.errors.confirmPassword}
        leftIcon={<Lock className="h-5 w-5" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-400 hover:text-gray-600"
            aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        }
        required
        autoComplete="new-password"
      />

      {/* Terms and Conditions */}
      <div>
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            required
          />
          <span className="ml-2 text-sm text-gray-600">
            Acepto los{' '}
            <a href="/terms" className="text-blue-600 hover:text-blue-500">
              términos y condiciones
            </a>{' '}
            y la{' '}
            <a href="/privacy" className="text-blue-600 hover:text-blue-500">
              política de privacidad
            </a>
          </span>
        </label>
        {validation.errors.acceptTerms && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {validation.errors.acceptTerms}
          </p>
        )}
      </div>

      {validation.errors.submit && (
        <div 
          className="p-3 bg-red-50 border border-red-200 rounded-lg"
          role="alert"
        >
          <p className="text-sm text-red-600">{validation.errors.submit}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        loading={isLoading}
        disabled={isLoading}
      >
        Crear Cuenta
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;