import React from 'react';
import { Search, Star, Users, Award, Waves, Anchor, Fish, Wind } from 'lucide-react';
import Button from '../components/ui/Button';
import SearchBar from '../components/features/search/SearchBar';
import ExperienceCard from '../components/features/experiences/ExperienceCard';
import { Experience } from '../types';

const HomePage: React.FC = () => {
  // Mock data for featured experiences
  const featuredExperiences: Experience[] = [
    {
      id: '1',
      title: 'Clase de Surf para Principiantes',
      description: 'Aprende los fundamentos del surf con instructores certificados en las mejores playas.',
      category: 'surfing',
      images: ['https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg'],
      duration: 120,
      maxParticipants: 6,
      price: 45,
      difficulty: 'beginner',
      includes: ['Tabla de surf', 'Traje de neopreno', 'Instructor certificado'],
      requirements: ['Saber nadar', 'Edad mínima 12 años'],
      location: {
        id: '1',
        name: 'Playa de la Concha',
        address: 'San Sebastián, España',
        coordinates: { lat: 43.3183, lng: -1.9812 },
      },
      instructorId: '1',
      availability: [],
      rating: 4.8,
      totalReviews: 127,
    },
    {
      id: '2',
      title: 'Buceo en Arrecife de Coral',
      description: 'Explora la vida marina en uno de los arrecifes más hermosos del Mediterráneo.',
      category: 'diving',
      images: ['https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg'],
      duration: 180,
      maxParticipants: 4,
      price: 85,
      difficulty: 'intermediate',
      includes: ['Equipo completo de buceo', 'Guía submarino', 'Certificado PADI'],
      requirements: ['Certificación Open Water', 'Experiencia mínima 10 inmersiones'],
      location: {
        id: '2',
        name: 'Reserva Marina de Cabo de Gata',
        address: 'Almería, España',
        coordinates: { lat: 36.7213, lng: -2.1545 },
      },
      instructorId: '2',
      availability: [],
      rating: 4.9,
      totalReviews: 89,
    },
    {
      id: '3',
      title: 'Excursión en Kayak al Atardecer',
      description: 'Navega por aguas cristalinas mientras disfrutas de un espectacular atardecer.',
      category: 'kayaking',
      images: ['https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg'],
      duration: 150,
      maxParticipants: 8,
      price: 35,
      difficulty: 'beginner',
      includes: ['Kayak individual', 'Chaleco salvavidas', 'Guía experto'],
      requirements: ['Saber nadar básico'],
      location: {
        id: '3',
        name: 'Bahía de Santander',
        address: 'Santander, España',
        coordinates: { lat: 43.4623, lng: -3.8099 },
      },
      instructorId: '3',
      availability: [],
      rating: 4.7,
      totalReviews: 156,
    },
  ];

  const categories = [
    { icon: Waves, name: 'Surf', count: '120+ experiencias', color: 'bg-blue-500' },
    { icon: Anchor, name: 'Buceo', count: '85+ experiencias', color: 'bg-teal-500' },
    { icon: Fish, name: 'Pesca', count: '45+ experiencias', color: 'bg-green-500' },
    { icon: Wind, name: 'Vela', count: '60+ experiencias', color: 'bg-purple-500' },
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Clientes satisfechos' },
    { icon: Star, value: '4.9', label: 'Calificación promedio' },
    { icon: Award, value: '500+', label: 'Instructores certificados' },
    { icon: Waves, value: '1,200+', label: 'Experiencias disponibles' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-teal-600">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg)',
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Descubre el
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Mundo Acuático
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Conecta con instructores certificados y vive experiencias únicas en deportes acuáticos
          </p>
          
          {/* Hero Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Explorar Experiencias
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Convertirse en Instructor
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explora por Categoría
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desde surf hasta buceo, encuentra la experiencia acuática perfecta para ti
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group cursor-pointer bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experiencias Destacadas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Las experiencias mejor valoradas por nuestra comunidad
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onBook={(id) => console.log('Book experience:', id)}
                onFavorite={(id) => console.log('Favorite experience:', id)}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg">
              Ver Todas las Experiencias
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo Funciona?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Reservar tu próxima aventura acuática es más fácil que nunca
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Busca y Descubre',
                description: 'Explora cientos de experiencias acuáticas y encuentra la perfecta para ti.',
                icon: Search,
              },
              {
                step: '2',
                title: 'Reserva Fácilmente',
                description: 'Selecciona fecha, hora y número de participantes. Pago seguro garantizado.',
                icon: Users,
              },
              {
                step: '3',
                title: 'Vive la Experiencia',
                description: 'Disfruta de tu aventura con instructores certificados y equipos de calidad.',
                icon: Star,
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para tu Próxima Aventura?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de aventureros que ya han descubierto el mundo acuático con nosotros
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Comenzar Ahora
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Descargar App
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;