import type { IncomeEntry } from './incomeTypes';

export const parseCSV = (csvText: string): Partial<IncomeEntry>[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const rows = lines.slice(1);
  
  return rows.map((line, index) => {
    const values = line.split(',').map(v => v.trim());
    const row: Partial<IncomeEntry> = {};
    
    headers.forEach((header, i) => {
      const value = values[i] || '';
      
      switch (header) {
        case 'date':
          row.date = value;
          break;
        case 'source':
          row.source = ['AdSense', 'Stripe', 'Gumroad', 'Affiliate', 'Other'].includes(value) 
            ? value as any : 'Other';
          break;
        case 'category':
          row.category = ['Product', 'Ads', 'Services', 'Donations', 'Other'].includes(value)
            ? value as any : 'Other';
          break;
        case 'amount':
          const amount = parseFloat(value);
          if (!isNaN(amount) && amount > 0) {
            row.amount = amount;
          }
          break;
        case 'note':
          row.note = value;
          break;
      }
    });
    
    if (row.date && row.amount && row.source && row.category) {
      row.id = `import-${Date.now()}-${index}`;
      return row as IncomeEntry;
    }
    
    return null;
  }).filter(Boolean) as IncomeEntry[];
};

export const exportCSV = (entries: IncomeEntry[]): string => {
  const headers = ['date', 'source', 'category', 'amount', 'note'];
  const csvContent = [
    headers.join(','),
    ...entries.map(entry => [
      entry.date,
      entry.source,
      entry.category,
      entry.amount.toString(),
      entry.note || ''
    ].join(','))
  ].join('\n');
  
  return csvContent;
};

export const downloadCSV = (entries: IncomeEntry[], filename = 'income-export.csv') => {
  const csvContent = exportCSV(entries);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};