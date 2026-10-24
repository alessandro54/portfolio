export const getLocalizedValue = (
  field: Record<string, string> | null | undefined,
  locale: string,
) => field?.[locale] || field?.en || '';
