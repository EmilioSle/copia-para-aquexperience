import React from 'react';
import { Star, Clock, Users, MapPin, Heart } from 'lucide-react';
import { Experience } from '../../../types';
import Button from '../../ui/Button';

interface ExperienceCardProps {
  experience: Experience;
  onBook?: (experienceId: string) => void;
  onFavorite?: (experienceId: string) => void;
  isFavorited?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  onBook,
  onFavorite,
  isFavorited = false,
}) => {
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return difficulty;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={experience.images[0] || 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg'}
          alt={experience.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => onFavorite?.(experience.id)}
          className={`
            absolute top-3 right-3 p-2 rounded-full transition-colors duration-200
            ${isFavorited 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
            }
          `}
          aria-label={isFavorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${getDifficultyColor(experience.difficulty)}
          `}>
            {getDifficultyLabel(experience.difficulty)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {experience.title}
          </h3>
          <div className="flex items-center ml-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              {experience.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {experience.description}
        </p>

        {/* Details */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDuration(experience.duration)}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>Máx. {experience.maxParticipants}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate max-w-20">{experience.location.name}</span>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              €{experience.price}
            </span>
            <span className="text-gray-500 text-sm ml-1">por persona</span>
          </div>
          
          <Button
            size="sm"
            onClick={() => onBook?.(experience.id)}
            className="px-4"
          >
            Reservar
          </Button>
        </div>

        {/* Reviews */}
        <div className="mt-2 text-xs text-gray-500">
          {experience.totalReviews} reseña{experience.totalReviews !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;