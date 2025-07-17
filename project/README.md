# Aquaxperience - Marketplace de Deportes Acuáticos

## 🌊 Descripción

Aquaxperience es una plataforma web completa que conecta a entusiastas de los deportes acuáticos con instructores certificados y proveedores de equipos. Diseñada con estándares de usabilidad ISO 9241 y calidad de software ISO/IEC 25010.

## 🚀 Características Principales

### 👥 Roles de Usuario
- **Cliente**: Reserva experiencias y alquila equipos
- **Instructor**: Ofrece clases y experiencias certificadas
- **Proveedor**: Alquila equipos acuáticos
- **Administrador**: Gestiona la plataforma y validaciones
- **Soporte**: Asiste a usuarios y resuelve incidencias

### 🧩 Funcionalidades Core
- ✅ Sistema de autenticación completo (registro, login, recuperación)
- 🔍 Búsqueda avanzada con filtros inteligentes
- 📅 Sistema de reservas en tiempo real
- ⭐ Sistema de valoraciones y reseñas
- 🔔 Notificaciones automáticas
- 📱 Diseño responsive y accesible
- 🌙 Modo oscuro (próximamente)

### 🎨 Diseño y UX
- Inspirado en Apple.com con atención al detalle
- Navegación intuitiva con mega-menús
- Micro-interacciones y animaciones suaves
- Accesibilidad ARIA completa
- Contraste optimizado para legibilidad

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **Lucide React** para iconografía

### Backend (Próximo)
- **Supabase** como base de datos
- **TypeORM** para gestión de datos
- **Google Cloud** para hosting

## 📋 Métricas de Usabilidad Objetivo

| Proceso | Tiempo Objetivo | Tasa de Éxito |
|---------|----------------|---------------|
| Registro | ≤ 2 minutos | ≥ 90% |
| Login | ≤ 1 minuto | ≤ 2% errores |
| Reserva | ≤ 2 minutos | ≥ 90% |
| Valoración | - | ≥ 70% participación |

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base (Button, Input, Modal)
│   ├── layout/         # Componentes de layout (Header, Footer)
│   └── features/       # Componentes específicos por funcionalidad
├── hooks/              # Custom hooks (useAuth, useBooking)
├── types/              # Definiciones TypeScript
├── pages/              # Páginas principales
├── utils/              # Utilidades y helpers
└── styles/             # Estilos globales
```

## 🚦 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Linting
npm run lint
```

## 📱 Componentes Principales

### Componentes UI Base
- `Button`: Botón con variantes y estados de carga
- `Input`: Campo de entrada con validación visual
- `Modal`: Modal accesible con gestión de foco

### Componentes de Layout
- `Header`: Navegación principal con mega-menú
- `SearchBar`: Barra de búsqueda omnipresente
- `UserMenu`: Menú de usuario contextual

### Componentes de Funcionalidad
- `LoginForm`: Formulario de inicio de sesión
- `RegisterForm`: Formulario de registro multi-rol
- `ExperienceCard`: Tarjeta de experiencia
- `BookingForm`: Formulario de reserva

## 🔐 Autenticación y Seguridad

- Validación en tiempo real de formularios
- Gestión segura de tokens
- Recuperación de contraseña
- Verificación de email
- Protección CSRF

## ♿ Accesibilidad

- Navegación por teclado completa
- Lectores de pantalla compatibles
- Contraste WCAG AA
- Etiquetas ARIA apropiadas
- Gestión de foco en modales

## 📊 Próximas Funcionalidades

- [ ] Integración con Supabase
- [ ] Sistema de pagos con Stripe
- [ ] Chat en tiempo real
- [ ] Aplicación móvil
- [ ] Modo oscuro
- [ ] Notificaciones push
- [ ] Geolocalización
- [ ] Calendario de disponibilidad

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: info@aquaxperience.com
- **Website**: https://aquaxperience.com
- **GitHub**: https://github.com/aquaxperience

---

*Desarrollado con ❤️ para la comunidad de deportes acuáticos*