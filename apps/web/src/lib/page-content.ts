import { useTranslations } from '@i18n/translations';
import { getLocalizedValue } from '@lib/localized';
import { sanityClient } from '@lib/sanity';

type Block = { children?: { text?: string }[] };

export async function getPageContent(locale: string) {
  const ui = useTranslations(locale);
  const [hero, ticker, servicesDoc, whyDoc, projectsDoc, rawJobs, contact, seo] = await Promise.all(
    [
      sanityClient.fetch(
        `*[_type == "hero"][0]{ badge, headline, subheadline, description, ctaLabel, secondaryCtaLabel, stats[]{ value, suffix, label } }`,
      ),
      sanityClient.fetch(`*[_type == "ticker"][0]{ items[]{ label } }`),
      sanityClient.fetch(
        `*[_id == "singleton-whatIDo"][0]{ services[]{ _key, icon, title, text } }`,
      ),
      sanityClient.fetch(
        `*[_id == "singleton-whyMe"][0]{ featureHeadlinePre, featureHeadlineEmphasis, featureHeadlinePost, featureParagraph1, featureParagraph2, cards[]{ _key, n, title, text } }`,
      ),
      sanityClient.fetch(
        `*[_id == "singleton-selectedProjects"][0]{ items[]{ _key, num, kind, title, outcome, tags, liveUrl, repos[]{ label, url } } }`,
      ),
      sanityClient.fetch(
        `*[_type == "experience"] | order(order asc) { company, role, startDate, endDate, description, descriptionEs, techStack }`,
      ),
      sanityClient.fetch(
        `*[_id == "singleton-contact"][0]{ email, github, linkedin, "resume": resumes[locale == $locale] | order(date desc)[0]{ "url": file.asset->url }, "resumeFallback": resumes[locale == "en"] | order(date desc)[0]{ "url": file.asset->url } }`,
        { locale },
      ),
      sanityClient.fetch(
        `*[_id == "singleton-seo"][0]{ metaTitle, metaDescription, siteName, siteUrl, ogImage, twitterHandle, twitterCardType, themeColorDark, themeColorLight, appleTouchIcon, appleStatusBarStyle, appleMobileWebAppTitle, robotsDirective, author, keywords }`,
      ),
    ],
  );
  const localized = (field: Record<string, string> | null | undefined) =>
    getLocalizedValue(field, locale);
  const blocksToText = (blocks?: Block[]) =>
    (blocks ?? [])
      .flatMap((block) => block.children ?? [])
      .map((span) => span.text ?? '')
      .join('');

  return {
    ui,
    hero: {
      ...hero,
      badge: localized(hero?.badge),
      headline: localized(hero?.headline),
      subheadline: localized(hero?.subheadline),
      description: localized(hero?.description),
      ctaLabel: localized(hero?.ctaLabel),
      secondaryCtaLabel: localized(hero?.secondaryCtaLabel) || ui('hero_see_work'),
      stats: (hero?.stats ?? []).map(
        (stat: { value: number; suffix?: string; label: Record<string, string> }) => ({
          ...stat,
          label: localized(stat.label),
        }),
      ),
    },
    ticker: (ticker?.items ?? []).map((item: { label: Record<string, string> }) =>
      localized(item.label),
    ),
    services: (servicesDoc?.services ?? []).map(
      (service: { icon: string; title: Record<string, string>; text: Record<string, string> }) => ({
        icon: service.icon,
        title: localized(service.title),
        text: localized(service.text),
      }),
    ),
    why: {
      ...whyDoc,
      featureHeadlinePre: localized(whyDoc?.featureHeadlinePre),
      featureHeadlineEmphasis: localized(whyDoc?.featureHeadlineEmphasis),
      featureHeadlinePost: localized(whyDoc?.featureHeadlinePost),
      featureParagraph1: localized(whyDoc?.featureParagraph1),
      featureParagraph2: localized(whyDoc?.featureParagraph2),
      cards: (whyDoc?.cards ?? []).map(
        (card: { n: string; title: Record<string, string>; text: Record<string, string> }) => ({
          n: card.n,
          title: localized(card.title),
          text: localized(card.text),
        }),
      ),
    },
    projects: (projectsDoc?.items ?? []).map(
      (project: {
        num: string;
        kind?: string;
        title: Record<string, string>;
        outcome: Record<string, string>;
        tags?: string[];
        liveUrl?: string;
        repos?: { label: string; url: string }[];
      }) => ({
        ...project,
        locale,
        kind: project.kind || 'project',
        title: localized(project.title),
        outcome: localized(project.outcome),
        tags: project.tags ?? [],
        repos: project.repos ?? [],
      }),
    ),
    jobs: (rawJobs ?? []).map(
      (job: {
        company: string;
        role: string;
        startDate: string;
        endDate?: string;
        description?: Block[];
        descriptionEs?: Block[];
        techStack?: string[];
      }) => ({
        date: `${job.startDate?.slice(0, 4) ?? ''} — ${job.endDate?.slice(0, 4) ?? ui('career_present')}`,
        company: job.company,
        role: job.role,
        desc: blocksToText(
          locale === 'es' ? (job.descriptionEs ?? job.description) : job.description,
        ),
        techStack: job.techStack ?? [],
      }),
    ),
    contact: {
      email: contact?.email || 'alessandro.chumpitazp@gmail.com',
      github: contact?.github || 'https://github.com/alessandro54',
      linkedin: contact?.linkedin || 'https://www.linkedin.com/in/alessandrochumpitaz/',
      resumeUrl: contact?.resume?.url || contact?.resumeFallback?.url,
    },
    seo,
  };
}
