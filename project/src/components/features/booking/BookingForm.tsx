import React, { useState } from 'react';
import { Calendar, Clock, Users, CreditCard, AlertCircle } from 'lucide-react';
import { Experience, Equipment, FormValidation } from '../../../types';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

interface BookingFormProps {
  item: Experience | Equipment;
  type: 'experience' | 'equipment';
  onSubmit: (bookingData: BookingData) => Promise<void>;
  onCancel: () => void;
}

interface BookingData {
  date: string;
  startTime: string;
  endTime?: string;
  participants: number;
  specialRequests?: string;
  paymentMethod: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  item,
  type,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<BookingData>({
    date: '',
    startTime: '',
    endTime: '',
    participants: 1,
    specialRequests: '',
    paymentMethod: 'card',
  });
  
  const [validation, setValidation] = useState<FormValidation>({
    isValid: true,
    errors: {},
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const isExperience = type === 'experience';
  const experience = isExperience ? item as Experience : null;
  const equipment = !isExperience ? item as Equipment : null;

  const validateForm = (): FormValidation => {
    const errors: Record<string, string> = {};

    if (!formData.date) {
      errors.date = 'Selecciona una fecha';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.date = 'La fecha no puede ser anterior a hoy';
      }
    }

    if (!formData.startTime) {
      errors.startTime = 'Selecciona una hora de inicio';
    }

    if (!isExperience && !formData.endTime) {
      errors.endTime = 'Selecciona una hora de fin para el alquiler';
    }

    if (formData.participants < 1) {
      errors.participants = 'Debe haber al menos 1 participante';
    } else if (experience && formData.participants > experience.maxParticipants) {
      errors.participants = `Máximo ${experience.maxParticipants} participantes`;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const calculatePrice = (): number => {
    if (isExperience && experience) {
      return experience.price * formData.participants;
    } else if (equipment) {
      if (formData.startTime && formData.endTime) {
        const start = new Date(`2000-01-01T${formData.startTime}`);
        const end = new Date(`2000-01-01T${formData.endTime}`);
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        
        if (hours >= 8) {
          // Full day rate
          return equipment.pricePerDay;
        } else {
          // Hourly rate
          return equipment.pricePerHour * Math.ceil(hours);
        }
      }
      return equipment.pricePerHour;
    }
    return 0;
  };

  const handleInputChange = (field: keyof BookingData, value: string | number) => {
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
      await onSubmit(formData);
    } catch (error) {
      setValidation({
        isValid: false,
        errors: {
          submit: error instanceof Error ? error.message : 'Error al procesar la reserva',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = calculatePrice();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Item Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-4">
          <img
            src={item.images[0] || 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg'}
            alt={isExperience ? experience!.title : equipment!.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {isExperience ? experience!.title : equipment!.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {isExperience ? experience!.description : equipment!.description}
            </p>
            {isExperience && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{Math.floor(experience!.duration / 60)}h {experience!.duration % 60}min</span>
                <Users className="h-4 w-4 ml-4 mr-1" />
                <span>Máx. {experience!.maxParticipants} personas</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Selection */}
        <div>
          <Input
            type="date"
            label="Fecha"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            error={validation.errors.date}
            leftIcon={<Calendar className="h-5 w-5" />}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="time"
            label="Hora de inicio"
            value={formData.startTime}
            onChange={(e) => handleInputChange('startTime', e.target.value)}
            error={validation.errors.startTime}
            leftIcon={<Clock className="h-5 w-5" />}
            required
          />

          {!isExperience && (
            <Input
              type="time"
              label="Hora de fin"
              value={formData.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
              error={validation.errors.endTime}
              leftIcon={<Clock className="h-5 w-5" />}
              required
            />
          )}
        </div>

        {/* Participants */}
        <div>
          <Input
            type="number"
            label={isExperience ? "Número de participantes" : "Cantidad"}
            value={formData.participants.toString()}
            onChange={(e) => handleInputChange('participants', parseInt(e.target.value) || 1)}
            error={validation.errors.participants}
            leftIcon={<Users className="h-5 w-5" />}
            min="1"
            max={isExperience ? experience!.maxParticipants : undefined}
            required
          />
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Solicitudes especiales (opcional)
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Menciona cualquier requerimiento especial, alergias, o preferencias..."
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Método de pago
          </label>
          <div className="space-y-2">
            {[
              { value: 'card', label: 'Tarjeta de crédito/débito', icon: CreditCard },
              { value: 'paypal', label: 'PayPal', icon: CreditCard },
              { value: 'transfer', label: 'Transferencia bancaria', icon: CreditCard },
            ].map((method) => (
              <label
                key={method.value}
                className={`
                  flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200
                  ${formData.paymentMethod === method.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={formData.paymentMethod === method.value}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="sr-only"
                />
                <method.icon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="font-medium">{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Resumen del precio</h4>
          <div className="space-y-2 text-sm">
            {isExperience ? (
              <div className="flex justify-between">
                <span>€{experience!.price} x {formData.participants} persona{formData.participants !== 1 ? 's' : ''}</span>
                <span>€{totalPrice}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span>Precio base</span>
                  <span>€{equipment!.pricePerHour}/hora</span>
                </div>
                {formData.startTime && formData.endTime && (
                  <div className="flex justify-between">
                    <span>Duración estimada</span>
                    <span>
                      {Math.ceil((new Date(`2000-01-01T${formData.endTime}`).getTime() - 
                        new Date(`2000-01-01T${formData.startTime}`).getTime()) / (1000 * 60 * 60))} horas
                    </span>
                  </div>
                )}
              </>
            )}
            <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
              <span>Total</span>
              <span>€{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Terms Notice */}
        <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Política de cancelación</p>
            <p>
              Cancelación gratuita hasta 24 horas antes. 
              Consulta nuestros{' '}
              <a href="/terms" className="underline">términos y condiciones</a>.
            </p>
          </div>
        </div>

        {validation.errors.submit && (
          <div 
            className="p-3 bg-red-50 border border-red-200 rounded-lg"
            role="alert"
          >
            <p className="text-sm text-red-600">{validation.errors.submit}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading || totalPrice === 0}
            className="flex-1"
          >
            Confirmar Reserva - €{totalPrice}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;