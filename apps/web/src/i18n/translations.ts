export const translations = {
  en: {
    // Navigation
    nav_services: 'Areas of work',
    nav_work: 'Projects',
    nav_experience: 'Experience',
    nav_contact: 'Contact',
    nav_hire: "Let's talk →",
    language_label: 'Language',
    theme_label: 'Theme',
    theme_system: 'System',
    theme_dark: 'Dark',
    theme_light: 'Light',

    // Hero
    hero_scroll: 'Scroll',
    hero_see_work: 'See the projects',

    // Section headings
    what_i_do_label: 'Areas of work',
    what_i_do_title: 'Backend, product',
    what_i_do_soft: '& applied AI',
    why_me_label: 'How I work',
    why_me_title: 'From technical design',
    why_me_soft: 'to production',
    projects_label: 'Selected work',
    projects_title: 'Projects',
    projects_soft: '& open source',
    career_label: 'Experience',
    career_title: 'Where I have worked',
    career_present: 'Present',

    // Projects
    project_oss_label: 'OSS',
    project_view_pr: 'View pull request',

    // Contact
    contact_heading_pre: 'Have a project?',
    contact_heading_em: "Let's talk.",
    contact_body: "Tell me what you're building, what's slowing it down, or where an extra set of hands would help. I'll reply by email.",
    contact_email_label: 'Email me',
    contact_github: 'GitHub',
    contact_linkedin: 'LinkedIn',
    contact_resume: 'Resume PDF',

    // Metadata and footer
    meta_title: 'Alessandro Chumpitaz | Full Stack Engineer in Lima',
    meta_description: 'Full Stack Engineer in Lima, Peru. I build Python and TypeScript services, modernize Rails and Django apps, and take features through production.',
    footer_role: 'Full Stack Engineer · Lima, Peru',
  },
  es: {
    // Navegación
    nav_services: 'Áreas de trabajo',
    nav_work: 'Proyectos',
    nav_experience: 'Experiencia',
    nav_contact: 'Contacto',
    nav_hire: 'Hablemos →',
    language_label: 'Idioma',
    theme_label: 'Tema',
    theme_system: 'Sistema',
    theme_dark: 'Oscuro',
    theme_light: 'Claro',

    // Presentación
    hero_scroll: 'Desliza',
    hero_see_work: 'Ver proyectos',

    // Títulos de secciones
    what_i_do_label: 'Áreas de trabajo',
    what_i_do_title: 'Backend y producto',
    what_i_do_soft: 'con IA aplicada',
    why_me_label: 'Cómo trabajo',
    why_me_title: 'Del diseño técnico',
    why_me_soft: 'a producción',
    projects_label: 'Trabajo seleccionado',
    projects_title: 'Proyectos',
    projects_soft: 'y código abierto',
    career_label: 'Trayectoria',
    career_title: 'Experiencia',
    career_present: 'Actualidad',

    // Proyectos
    project_oss_label: 'OSS',
    project_view_pr: 'Ver pull request',

    // Contacto
    contact_heading_pre: '¿Tienes un proyecto?',
    contact_heading_em: 'Hablemos.',
    contact_body: 'Cuéntame qué estás construyendo, qué te está frenando o en qué parte necesitas apoyo. Te responderé por correo.',
    contact_email_label: 'Escríbeme',
    contact_github: 'GitHub',
    contact_linkedin: 'LinkedIn',
    contact_resume: 'Currículum PDF',

    // Metadatos y pie de página
    meta_title: 'Alessandro Chumpitaz | Ingeniero Full Stack en Lima',
    meta_description: 'Ingeniero Full Stack en Lima, Perú. Desarrollo servicios con Python y TypeScript, modernizo aplicaciones en Rails y Django y llevo funcionalidades a producción.',
    footer_role: 'Ingeniero Full Stack · Lima, Perú',
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function useTranslations(locale: string) {
  const lang = (locale in translations ? locale : 'en') as Locale;
  return (key: TranslationKey): string => translations[lang][key];
}
