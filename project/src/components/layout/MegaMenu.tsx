import React from 'react';
import { Waves, Anchor, Fish, Wind } from 'lucide-react';

interface MegaMenuProps {
  category: string;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ category }) => {
  const menuData = {
    experiencias: {
      title: 'Experiencias Acuáticas',
      sections: [
        {
          title: 'Deportes de Tabla',
          icon: Waves,
          items: [
            { name: 'Surf', href: '/experiences/surf' },
            { name: 'Paddleboard', href: '/experiences/paddleboard' },
            { name: 'Windsurf', href: '/experiences/windsurf' },
            { name: 'Kitesurf', href: '/experiences/kitesurf' },
          ],
        },
        {
          title: 'Buceo y Snorkel',
          icon: Anchor,
          items: [
            { name: 'Buceo Recreativo', href: '/experiences/diving' },
            { name: 'Snorkel', href: '/experiences/snorkel' },
            { name: 'Buceo Nocturno', href: '/experiences/night-diving' },
            { name: 'Buceo en Pecios', href: '/experiences/wreck-diving' },
          ],
        },
        {
          title: 'Navegación',
          icon: Wind,
          items: [
            { name: 'Vela', href: '/experiences/sailing' },
            { name: 'Kayak', href: '/experiences/kayak' },
            { name: 'Catamarán', href: '/experiences/catamaran' },
            { name: 'Jet Ski', href: '/experiences/jetski' },
          ],
        },
        {
          title: 'Pesca',
          icon: Fish,
          items: [
            { name: 'Pesca Deportiva', href: '/experiences/sport-fishing' },
            { name: 'Pesca en Alta Mar', href: '/experiences/deep-sea-fishing' },
            { name: 'Pesca desde Costa', href: '/experiences/shore-fishing' },
          ],
        },
      ],
    },
    equipos: {
      title: 'Alquiler de Equipos',
      sections: [
        {
          title: 'Tablas y Equipos de Surf',
          icon: Waves,
          items: [
            { name: 'Tablas de Surf', href: '/equipment/surfboards' },
            { name: 'Trajes de Neopreno', href: '/equipment/wetsuits' },
            { name: 'Tablas de Paddle', href: '/equipment/paddleboards' },
            { name: 'Accesorios de Surf', href: '/equipment/surf-accessories' },
          ],
        },
        {
          title: 'Equipo de Buceo',
          icon: Anchor,
          items: [
            { name: 'Equipos Completos', href: '/equipment/diving-sets' },
            { name: 'Máscaras y Snorkels', href: '/equipment/masks-snorkels' },
            { name: 'Aletas', href: '/equipment/fins' },
            { name: 'Reguladores', href: '/equipment/regulators' },
          ],
        },
        {
          title: 'Embarcaciones',
          icon: Wind,
          items: [
            { name: 'Kayaks', href: '/equipment/kayaks' },
            { name: 'Veleros', href: '/equipment/sailboats' },
            { name: 'Motos Acuáticas', href: '/equipment/jetskis' },
            { name: 'Botes Inflables', href: '/equipment/inflatables' },
          ],
        },
      ],
    },
  };

  const currentMenu = menuData[category as keyof typeof menuData];

  if (!currentMenu) return null;

  return (
    <div className="absolute top-full left-0 w-screen max-w-4xl bg-white shadow-lg border border-gray-200 rounded-lg mt-1 z-50">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {currentMenu.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentMenu.sections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center mb-3">
                <section.icon className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">{section.title}</h4>
              </div>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Featured Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                ¿Nuevo en deportes acuáticos?
              </h4>
              <p className="text-sm text-gray-600">
                Descubre nuestras experiencias para principiantes
              </p>
            </div>
            <a
              href="/beginners"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Ver más →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;