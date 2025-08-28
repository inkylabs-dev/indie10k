export const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const subtractDays = (date: Date, days: number): Date => {
  return addDays(date, -days);
};

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatDateISO = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const isToday = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return d.toDateString() === today.toDateString();
};

export const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

export const getLast30Days = (): { from: string; to: string } => {
  const to = new Date();
  const from = addDays(to, -30);
  return {
    from: formatDateISO(from),
    to: formatDateISO(to)
  };
};

export const getDateRangePresets = () => {
  const now = new Date();
  const today = formatDateISO(now);
  
  return {
    '7D': {
      from: formatDateISO(addDays(now, -7)),
      to: today
    },
    '30D': {
      from: formatDateISO(addDays(now, -30)),
      to: today
    },
    'MTD': {
      from: formatDateISO(startOfMonth(now)),
      to: today
    },
    'YTD': {
      from: formatDateISO(new Date(now.getFullYear(), 0, 1)),
      to: today
    }
  };
};

// New helpers for analytics components
export const getDatePresets = () => {
  const now = new Date();
  const presets: { value: '7D'|'30D'|'90D'|'MTD'|'YTD'; label: string; from: Date; to: Date }[] = [
    { value: '7D', label: 'Last 7 days', from: addDays(now, -7), to: now },
    { value: '30D', label: 'Last 30 days', from: addDays(now, -30), to: now },
    { value: '90D', label: 'Last 90 days', from: addDays(now, -90), to: now },
    { value: 'MTD', label: 'Month to date', from: startOfMonth(now), to: now },
    { value: 'YTD', label: 'Year to date', from: new Date(now.getFullYear(), 0, 1), to: now },
  ];
  return presets;
};

export const getDaysInRange = (from: Date, to: Date): Date[] => {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  const days: Date[] = [];
  for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
    days.push(new Date(d));
  }
  return days;
};

// ISO week e.g., 2025-W32
export const getWeekISO = (date: Date): string => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Thursday in current week decides the year.
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d as any) - (yearStart as any)) / 86400000 + 1) / 7);
  const week = String(weekNo).padStart(2, '0');
  return `${d.getUTCFullYear()}-W${week}`;
};
