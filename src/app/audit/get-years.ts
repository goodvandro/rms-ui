export const getYears = (): { value: string; label: string }[] => {
  const startYear = 2021;
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => {
      const year = startYear + index;
      return {
        value: String(year).slice(-3).padStart(3, '0'), // Pega os últimos 3 dígitos e mantém o zero à esquerda
        label: String(year),
      };
    }
  );
  return years;
};
