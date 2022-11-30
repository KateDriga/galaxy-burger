const MS_PER_DAY = 1000 * 60 * 60 * 24;

const dateDiffDays = (date1: Date, date2: Date): number => {
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
};

export const formatOrderDate = (date: Date): string => {
  const diff: number = dateDiffDays(date, new Date());
  const day: string =
    diff > 1
      ? `${diff} ${diff > 4 ? 'дней' : 'дня'} назад`
      : diff === 1
      ? 'Вчера'
      : 'Сегодня';
  return `${day}, ${date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

export const formatOrderNumber = (orderNumber: number): string =>
  orderNumber.toString().padStart(6, '0');
