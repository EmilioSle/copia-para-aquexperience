// Core types for Aquaxperience platform

export type UserRole = 'client' | 'instructor' | 'provider' | 'admin' | 'support';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends User {
  role: 'client';
  preferences?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Instructor extends User {
  role: 'instructor';
  certifications: Certification[];
  specialties: string[];
  experience: number; // years
  rating: number;
  totalReviews: number;
  hourlyRate: number;
  bio: string;
  isApproved: boolean;
  documents: Document[];
}

export interface Provider extends User {
  role: 'provider';
  companyName: string;
  businessLicense: string;
  equipment: Equipment[];
  rating: number;
  totalReviews: number;
  isApproved: boolean;
  documents: Document[];
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: Date;
  expiryDate?: Date;
  documentUrl: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'certification' | 'license' | 'insurance' | 'other';
  url: string;
  uploadedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  description: string;
  images: string[];
  pricePerHour: number;
  pricePerDay: number;
  condition: 'excellent' | 'good' | 'fair';
  specifications: Record<string, string>;
  availability: AvailabilitySlot[];
  providerId: string;
}

export type EquipmentCategory = 
  | 'surfboard' 
  | 'kayak' 
  | 'paddleboard' 
  | 'wetsuit' 
  | 'snorkel' 
  | 'diving' 
  | 'sailing' 
  | 'fishing';

export interface Experience {
  id: string;
  title: string;
  description: string;
  category: ExperienceCategory;
  images: string[];
  duration: number; // minutes
  maxParticipants: number;
  price: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  includes: string[];
  requirements: string[];
  location: Location;
  instructorId: string;
  availability: AvailabilitySlot[];
  rating: number;
  totalReviews: number;
}

export type ExperienceCategory = 
  | 'surfing' 
  | 'diving' 
  | 'snorkeling' 
  | 'kayaking' 
  | 'paddleboarding' 
  | 'sailing' 
  | 'fishing' 
  | 'windsurfing';

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description?: string;
}

export interface AvailabilitySlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  price?: number; // override default price
}

export interface Booking {
  id: string;
  type: 'experience' | 'equipment';
  clientId: string;
  experienceId?: string;
  equipmentId?: string;
  date: Date;
  startTime: string;
  endTime: string;
  participants: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'cancelled' 
  | 'completed' 
  | 'no-show';

export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'refunded' 
  | 'failed';

export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  targetId: string; // instructor or provider ID
  targetType: 'instructor' | 'provider' | 'experience' | 'equipment';
  rating: number; // 1-5
  comment: string;
  images?: string[];
  createdAt: Date;
  response?: {
    comment: string;
    createdAt: Date;
  };
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}

export type NotificationType = 
  | 'booking_confirmed' 
  | 'booking_cancelled' 
  | 'booking_reminder' 
  | 'payment_received' 
  | 'review_received' 
  | 'document_approved' 
  | 'document_rejected' 
  | 'system_announcement';

export interface SearchFilters {
  category?: string;
  location?: string;
  date?: Date;
  priceRange?: {
    min: number;
    max: number;
  };
  difficulty?: string;
  rating?: number;
  duration?: {
    min: number;
    max: number;
  };
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}