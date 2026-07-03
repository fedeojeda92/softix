export type Lang = "ES" | "EN";

export const translations: Record<Lang, Record<string, string>> = {
  ES: {
    // Navbar
    "nav.home": "Home",
    "nav.nosotros": "Nosotros",
    "nav.servicios": "Servicios",
    "nav.planes": "Planes",
    "nav.soporte": "Soporte",
    "nav.contacto": "Contacto",

    // Hero
    "hero.slide1":
      "Software y webs completas para servicios inmobiliarios, con tours virtuales 360° implementados, automatizaciones y soporte permanente. Una sola agencia, para todo.",
    "hero.slide2":
      "Potenciado por inteligencia artificial: gestión y automatización de última generación.",
    "hero.slide3":
      "Equipamiento profesional de fotografía, video y drone para cada propiedad.",
    "hero.slide4": "Fotografía HDR, video, drone, tour virtual 360°.",
    "hero.cta": "Conocer el sistema",

    // Tour 360
    "tour.badge": "Tour Virtual",
    "tour.title": "Explorá el espacio como si estuvieras ahí",
    "tour.description":
      "Esta es exactamente la tecnología que se integra en la web de cada cliente: recorridos inmersivos, sin plugins, desde cualquier dispositivo.",
    "tour.hint": "Arrastrá para mirar alrededor",

    // Sobre nosotros
    "about.badge": "Sobre nosotros",
    "about.p1":
      "Soy Federico Ojeda, formado en la UTN y de manera autodidacta como desarrollador de software, trabajando hace más de 4 años con empresas y realtors (agentes inmobiliarios) estadounidenses de manera remota.",
    "about.p2":
      "Junto con Sergio Alvarenga, fotógrafo y filmmaker profesional, decidimos crear Softix. Utilizando las últimas herramientas en tecnología, multimedia e inteligencia artificial, desarrollamos un sistema integral para inmobiliarias y agentes: contenido, presencia digital y gestión, todo en un mismo lugar.",
    "about.skill1": "Desarrollo de software",
    "about.skill2": "Fotografía y filmmaking profesional",
    "about.skill3": "Inteligencia artificial",

    // Servicios
    "services.badge": "Servicios",
    "services.title": "Un sistema, no una lista de servicios sueltos",
    "services.s1.title": "Sitio web a medida",
    "services.s1.desc":
      "Desarrollo de tu sitio con optimización para buscadores (SEO), soporte y actualización permanente, disponible en varios idiomas.",
    "services.s2.title": "Automatización y CRM",
    "services.s2.desc":
      "Gestión de leads y automatizaciones a medida del sector inmobiliario, integradas a tu flujo de trabajo diario.",
    "services.s3.title": "Contenido multimedia integral",
    "services.s3.desc":
      "Fotografía e iluminación profesional, imágenes interactivas en 360°, video con drone en 4K, edición e implementación lista para web y redes.",
    "services.s4.title": "Marketing digital inmobiliario",
    "services.s4.desc":
      "Gestión de Google Ads y Meta Ads, con estrategia especializada en el sector inmobiliario.",
    "services.s5.title": "Styling previo a la sesión",
    "services.s5.desc":
      "Preparación y acondicionamiento de la propiedad antes de la sesión, para que cada imagen luzca en su mejor versión.",
    "services.s5.badge": "Complementario",

    // Planes
    "plans.badge": "Inversión",
    "plans.title": "Planes",
    "plans.from": "Desde",
    "plans.consultar": "Consultar",
    "plans.mostChosen": "Más elegido",
    "plans.request": "Solicitar información",
    "plans.p1.name": "Esencial",
    "plans.p1.f1": "Sitio web a medida",
    "plans.p1.f2": "Hosting incluido",
    "plans.p1.f3": "Optimización SEO",
    "plans.p1.f4": "Soporte y actualización permanente",
    "plans.p1.f5": "Disponible en varios idiomas",
    "plans.p2.name": "Profesional",
    "plans.p2.f1": "Todo lo del plan Esencial",
    "plans.p2.f2": "Tour virtual 360°",
    "plans.p2.f3": "Automatización y CRM básico",
    "plans.p2.f4": "Soporte prioritario",
    "plans.p2.f5": "Gestión de contenido mensual",
    "plans.p3.name": "Elite",
    "plans.p3.f1": "Todo lo del plan Profesional",
    "plans.p3.f2": "Producción multimedia mensual",
    "plans.p3.f3": "Fotografía, video y drone",
    "plans.p3.f4": "Marketing digital gestionado",
    "plans.p3.f5": "Estilo y acondicionamiento de propiedad",

    // Cobertura
    "coverage.badge": "Cobertura",
    "coverage.title": "Zonas de cobertura",

    // Contacto
    "contact.badge": "Contacto",
    "contact.title": "Hablemos de tu proyecto",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.phone": "Teléfono (opcional)",
    "contact.propertyType": "Tipo de propiedad (opcional)",
    "contact.message": "Mensaje",
    "contact.sending": "Enviando...",
    "contact.send": "Enviar mensaje",
    "contact.emailLabel": "Email",
    "contact.whatsappLabel": "WhatsApp",
    "contact.hoursLabel": "Horario de atención",
    "contact.hours": "Lun a Vie — 9 a 18 hs",
    "contact.error.name": "Ingresá tu nombre",
    "contact.error.email": "Ingresá tu email",
    "contact.error.emailInvalid": "Email inválido",
    "contact.error.message": "Ingresá tu mensaje",
    "contact.prop.casa": "Casa",
    "contact.prop.departamento": "Departamento",
    "contact.prop.ph": "PH",
    "contact.prop.terreno": "Terreno",
    "contact.prop.local": "Local comercial",
    "contact.prop.oficina": "Oficina",
    "contact.prop.otro": "Otro",

    // Footer
    "footer.desc":
      "Software, contenido y gestión integral para inmobiliarias y agentes.",
    "footer.nav": "Navegación",
    "footer.follow": "Seguinos",
    "footer.rights": "Todos los derechos reservados.",
  },
  EN: {
    // Navbar
    "nav.home": "Home",
    "nav.nosotros": "About us",
    "nav.servicios": "Services",
    "nav.planes": "Plans",
    "nav.soporte": "Support",
    "nav.contacto": "Contact",

    // Hero
    "hero.slide1":
      "Complete software and websites for real estate services, with 360° virtual tours, automations, and ongoing support. One agency, for everything.",
    "hero.slide2":
      "Powered by artificial intelligence: cutting-edge management and automation.",
    "hero.slide3":
      "Professional photography, video, and drone equipment for every property.",
    "hero.slide4": "HDR photography, video, drone, 360° virtual tour.",
    "hero.cta": "Explore the system",

    // Tour 360
    "tour.badge": "Virtual Tour",
    "tour.title": "Explore the space as if you were there",
    "tour.description":
      "This is exactly the technology integrated into each client's website: immersive tours, no plugins, from any device.",
    "tour.hint": "Drag to look around",

    // Sobre nosotros
    "about.badge": "About us",
    "about.p1":
      "I'm Federico Ojeda, trained at UTN and self-taught as a software developer, working for over 4 years with US-based companies and realtors remotely.",
    "about.p2":
      "Together with Sergio Alvarenga, a professional photographer and filmmaker, we decided to create Softix. Using the latest tools in technology, multimedia, and artificial intelligence, we developed a comprehensive system for real estate agencies and agents: content, digital presence, and management, all in one place.",
    "about.skill1": "Software development",
    "about.skill2": "Professional photography & filmmaking",
    "about.skill3": "Artificial intelligence",

    // Servicios
    "services.badge": "Services",
    "services.title": "A system, not a list of loose services",
    "services.s1.title": "Custom website",
    "services.s1.desc":
      "Development of your site with search engine optimization (SEO), ongoing support and updates, available in multiple languages.",
    "services.s2.title": "Automation & CRM",
    "services.s2.desc":
      "Lead management and custom automations for the real estate sector, integrated into your daily workflow.",
    "services.s3.title": "Comprehensive multimedia content",
    "services.s3.desc":
      "Professional photography and lighting, interactive 360° images, 4K drone video, editing and implementation ready for web and social media.",
    "services.s4.title": "Real estate digital marketing",
    "services.s4.desc":
      "Google Ads and Meta Ads management, with specialized strategy in the real estate sector.",
    "services.s5.title": "Pre-session styling",
    "services.s5.desc":
      "Property preparation and conditioning before the session, so every image looks its best.",
    "services.s5.badge": "Complementary",

    // Planes
    "plans.badge": "Investment",
    "plans.title": "Plans",
    "plans.from": "From",
    "plans.consultar": "Inquire",
    "plans.mostChosen": "Most chosen",
    "plans.request": "Request information",
    "plans.p1.name": "Essential",
    "plans.p1.f1": "Custom website",
    "plans.p1.f2": "Hosting included",
    "plans.p1.f3": "SEO optimization",
    "plans.p1.f4": "Ongoing support & updates",
    "plans.p1.f5": "Available in multiple languages",
    "plans.p2.name": "Professional",
    "plans.p2.f1": "Everything in the Essential plan",
    "plans.p2.f2": "360° virtual tour",
    "plans.p2.f3": "Basic automation & CRM",
    "plans.p2.f4": "Priority support",
    "plans.p2.f5": "Monthly content management",
    "plans.p3.name": "Elite",
    "plans.p3.f1": "Everything in the Professional plan",
    "plans.p3.f2": "Monthly multimedia production",
    "plans.p3.f3": "Photography, video & drone",
    "plans.p3.f4": "Managed digital marketing",
    "plans.p3.f5": "Property styling & conditioning",

    // Cobertura
    "coverage.badge": "Coverage",
    "coverage.title": "Coverage areas",

    // Contacto
    "contact.badge": "Contact",
    "contact.title": "Let's talk about your project",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.phone": "Phone (optional)",
    "contact.propertyType": "Property type (optional)",
    "contact.message": "Message",
    "contact.sending": "Sending...",
    "contact.send": "Send message",
    "contact.emailLabel": "Email",
    "contact.whatsappLabel": "WhatsApp",
    "contact.hoursLabel": "Business hours",
    "contact.hours": "Mon to Fri — 9am to 6pm",
    "contact.error.name": "Please enter your name",
    "contact.error.email": "Please enter your email",
    "contact.error.emailInvalid": "Invalid email",
    "contact.error.message": "Please enter your message",
    "contact.prop.casa": "House",
    "contact.prop.departamento": "Apartment",
    "contact.prop.ph": "PH",
    "contact.prop.terreno": "Land",
    "contact.prop.local": "Commercial space",
    "contact.prop.oficina": "Office",
    "contact.prop.otro": "Other",

    // Footer
    "footer.desc":
      "Software, content, and comprehensive management for real estate agencies and agents.",
    "footer.nav": "Navigation",
    "footer.follow": "Follow us",
    "footer.rights": "All rights reserved.",
  },
};
