export const translations = {
  en: {
    // Nav
    nav_services: 'Services',
    nav_work: 'Work',
    nav_experience: 'Experience',
    nav_contact: 'Contact',
    nav_hire: 'Hire me →',

    // Hero
    hero_scroll: 'Scroll',
    hero_see_work: 'See my work',

    // Section headers
    what_i_do_label: 'What I do',
    what_i_do_title: 'Services',
    what_i_do_soft: '& Expertise',

    why_me_label: 'Why work with me',
    why_me_title: 'What you',
    why_me_soft: 'can expect',

    projects_label: 'Selected projects',
    projects_title: 'Recent',
    projects_soft: 'work',

    career_label: 'Career',
    career_title: 'Experience',
    career_present: 'Present',

    // Contact
    contact_heading_pre: 'Ready to build',
    contact_heading_em: 'great?',
    contact_body: 'Whether you need a senior engineer to lead a project, a technical partner for a product build, or an expert for a specific challenge — let\'s talk.',
    contact_email_label: 'Email me directly',
    contact_github: 'GitHub',
    contact_linkedin: 'LinkedIn',
    contact_resume: 'Resume PDF',

    // Meta
    meta_title: 'Alessandro Chumpitaz — Senior Software Engineer',
    meta_description: 'Senior Software Engineer specialising in system architecture, performance engineering and technical leadership. Available for freelance and consulting.',

    // Footer
    footer_role: 'Senior Software Engineer · Available now',
  },
  es: {
    // Nav
    nav_services: 'Servicios',
    nav_work: 'Trabajo',
    nav_experience: 'Experiencia',
    nav_contact: 'Contacto',
    nav_hire: 'Contáctame →',

    // Hero
    hero_scroll: 'Desplazar',
    hero_see_work: 'Ver mi trabajo',

    // Section headers
    what_i_do_label: 'Lo que hago',
    what_i_do_title: 'Servicios',
    what_i_do_soft: '& Expertise',

    why_me_label: 'Por qué trabajar conmigo',
    why_me_title: 'Qué puedes',
    why_me_soft: 'esperar',

    projects_label: 'Proyectos seleccionados',
    projects_title: 'Trabajo',
    projects_soft: 'reciente',

    career_label: 'Carrera',
    career_title: 'Experiencia',
    career_present: 'Presente',

    // Contact
    contact_heading_pre: 'Listo para construir',
    contact_heading_em: '¿algo grande?',
    contact_body: 'Ya sea que necesites un ingeniero senior para liderar un proyecto, un socio técnico para un producto, o un experto para un desafío específico — hablemos.',
    contact_email_label: 'Escríbeme directamente',
    contact_github: 'GitHub',
    contact_linkedin: 'LinkedIn',
    contact_resume: 'Currículum PDF',

    // Meta
    meta_title: 'Alessandro Chumpitaz — Ingeniero de Software Senior',
    meta_description: 'Ingeniero de Software Senior especializado en arquitectura de sistemas, ingeniería de rendimiento y liderazgo técnico. Disponible para freelance y consultoría.',

    // Footer
    footer_role: 'Ingeniero de Software Senior · Disponible ahora',
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function useTranslations(locale: string) {
  const lang = (locale in translations ? locale : 'en') as Locale;
  return (key: TranslationKey): string => translations[lang][key];
}
