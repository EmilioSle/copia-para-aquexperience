import React from 'react';
import { AuthContext, useAuthState } from './hooks/useAuth';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';

function App() {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <HomePage />
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Aquaxperience</h3>
                <p className="text-gray-300 mb-4">
                  Tu plataforma de confianza para experiencias acuáticas únicas y seguras.
                </p>
                <div className="flex space-x-4">
                  {/* Social media icons would go here */}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Experiencias</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/surf" className="hover:text-white">Surf</a></li>
                  <li><a href="/diving" className="hover:text-white">Buceo</a></li>
                  <li><a href="/kayak" className="hover:text-white">Kayak</a></li>
                  <li><a href="/sailing" className="hover:text-white">Vela</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/about" className="hover:text-white">Sobre Nosotros</a></li>
                  <li><a href="/careers" className="hover:text-white">Carreras</a></li>
                  <li><a href="/press" className="hover:text-white">Prensa</a></li>
                  <li><a href="/blog" className="hover:text-white">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Soporte</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/help" className="hover:text-white">Centro de Ayuda</a></li>
                  <li><a href="/safety" className="hover:text-white">Seguridad</a></li>
                  <li><a href="/terms" className="hover:text-white">Términos</a></li>
                  <li><a href="/privacy" className="hover:text-white">Privacidad</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Aquaxperience. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </AuthContext.Provider>
  );
}

export default App;