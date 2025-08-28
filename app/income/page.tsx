'use client';

import { useState, useMemo, useCallback } from 'react';
import { Upload } from 'lucide-react';
import type { IncomeEntry, IncomeFilters, IncomeKPIs, SortField, SortDirection } from '@/lib/incomeTypes';
import { sampleIncome } from '@/lib/sampleIncome';
import { startOfMonth, endOfMonth, addDays, getDaysInMonth, getLast30Days } from '@/lib/date';
import { parseCSV, downloadCSV } from '@/lib/csv';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { AppLayout } from '@/components/layout/AppLayout';

// Components
import IncomeHeader from '@/components/income/IncomeHeader';
import FiltersBar from '@/components/income/FiltersBar';
import IncomeCharts from '@/components/income/IncomeCharts';
import IncomeTable from '@/components/income/IncomeTable';
import IncomeModal from '@/components/income/IncomeModal';
import ConfirmDialog from '@/components/income/ConfirmDialog';
import Toast from '@/components/income/Toast';
import InsightsPanel from '@/components/income/InsightsPanel';

export default function IncomePage() {
  // State
  const [entries, setEntries] = useState<IncomeEntry[]>(sampleIncome);
  const [filters, setFilters] = useLocalStorage<IncomeFilters>('income-filters', {
    sources: [],
    categories: [],
    search: ''
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [pageSize, setPageSize] = useLocalStorage('income-page-size', 20);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<IncomeEntry | undefined>();
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  
  // Dialog states
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; id?: string; }>({
    isOpen: false
  });
  
  // Toast state
  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    isVisible: false,
    message: '',
    type: 'info'
  });

  // Import state
  const [importData, setImportData] = useState<{
    file?: File;
    parsedEntries: IncomeEntry[];
    isUploading: boolean;
  }>({
    parsedEntries: [],
    isUploading: false
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ isVisible: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  // Filter entries
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      // Date range
      if (filters.from && entry.date < filters.from) return false;
      if (filters.to && entry.date > filters.to) return false;
      
      // Sources
      if (filters.sources.length > 0 && !filters.sources.includes(entry.source)) return false;
      
      // Categories
      if (filters.categories.length > 0 && !filters.categories.includes(entry.category)) return false;
      
      // Search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesNote = entry.note?.toLowerCase().includes(searchLower);
        const matchesSource = entry.source.toLowerCase().includes(searchLower);
        if (!matchesNote && !matchesSource) return false;
      }
      
      // Amount range
      if (filters.minAmount !== undefined && entry.amount < filters.minAmount) return false;
      if (filters.maxAmount !== undefined && entry.amount > filters.maxAmount) return false;
      
      return true;
    });
  }, [entries, filters]);

  // Sort entries
  const sortedEntries = useMemo(() => {
    return [...filteredEntries].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          comparison = a.date.localeCompare(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'source':
          comparison = a.source.localeCompare(b.source);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredEntries, sortField, sortDirection]);

  // Calculate KPIs
  const kpis = useMemo((): IncomeKPIs => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const last30DaysRange = getLast30Days();
    const daysInMonth = getDaysInMonth(now);
    const dayOfMonth = now.getDate();

    // MTD
    const mtdEntries = filteredEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= monthStart && entryDate <= monthEnd;
    });
    const mtd = mtdEntries.reduce((sum, entry) => sum + entry.amount, 0);

    // Last 30 days
    const last30DaysEntries = filteredEntries.filter(entry => {
      return entry.date >= last30DaysRange.from && entry.date <= last30DaysRange.to;
    });
    const last30Days = last30DaysEntries.reduce((sum, entry) => sum + entry.amount, 0);

    // All time
    const allTime = filteredEntries.reduce((sum, entry) => sum + entry.amount, 0);

    // Average daily (last 30 days)
    const avgDaily = last30Days / 30;

    // Run rate (projected month total)
    const runRate = dayOfMonth > 0 ? (mtd / dayOfMonth) * daysInMonth : 0;

    // Goal progress
    const goalTarget = 1000; // This could be made configurable
    const goalProgress = {
      current: mtd,
      target: goalTarget,
      percentage: goalTarget > 0 ? (mtd / goalTarget) * 100 : 0
    };

    return {
      mtd,
      last30Days,
      allTime,
      avgDaily,
      runRate,
      goalProgress
    };
  }, [filteredEntries]);

  // Generate unique ID
  const generateId = () => `income-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // CRUD operations
  const handleAddIncome = () => {
    setEditingEntry(undefined);
    setIsModalOpen(true);
  };

  const handleEditIncome = (entry: IncomeEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleSaveIncome = (entryData: Omit<IncomeEntry, 'id'>) => {
    if (editingEntry) {
      // Update existing
      setEntries(prev => prev.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entryData, id: editingEntry.id }
          : entry
      ));
      showToast('Income entry updated successfully', 'success');
    } else {
      // Create new
      const newEntry: IncomeEntry = {
        ...entryData,
        id: generateId()
      };
      setEntries(prev => [...prev, newEntry]);
      showToast('Income entry added successfully', 'success');
    }
  };

  const handleDeleteIncome = (id: string) => {
    setDeleteDialog({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteDialog.id) {
      setEntries(prev => prev.filter(entry => entry.id !== deleteDialog.id));
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== deleteDialog.id));
      showToast('Income entry deleted', 'success');
    }
    setDeleteDialog({ isOpen: false });
  };

  const handleDuplicate = (entry: IncomeEntry) => {
    const newEntry: IncomeEntry = {
      ...entry,
      id: generateId(),
      date: new Date().toISOString().split('T')[0], // Today
      recurring: undefined // Remove recurring flag from duplicate
    };
    setEntries(prev => [...prev, newEntry]);
    showToast('Income entry duplicated', 'success');
  };

  const handleGenerateRecurring = (entry: IncomeEntry) => {
    if (!entry.recurring) return;
    
    const nextDate = new Date(entry.recurring.nextDateISO);
    const newEntry: IncomeEntry = {
      ...entry,
      id: generateId(),
      date: entry.recurring.nextDateISO,
      recurring: {
        ...entry.recurring,
        nextDateISO: entry.recurring.frequency === 'Weekly' 
          ? addDays(nextDate, 7).toISOString().split('T')[0]
          : addDays(nextDate, 30).toISOString().split('T')[0] // Approximate monthly
      }
    };

    // Update original entry's next date
    setEntries(prev => prev.map(e => 
      e.id === entry.id 
        ? { ...e, recurring: newEntry.recurring }
        : e
    ).concat([newEntry]));
    
    showToast('Recurring entry generated', 'success');
  };

  // Sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // CSV Export/Import
  const handleExport = () => {
    downloadCSV(sortedEntries, `income-export-${new Date().toISOString().split('T')[0]}.csv`);
    showToast('Income data exported successfully', 'success');
  };

  const handleImport = () => {
    setIsImportModalOpen(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportData(prev => ({ ...prev, file, isUploading: true }));

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const parsedEntries = parseCSV(csvText).map(entry => ({
          ...entry,
          id: generateId()
        })) as IncomeEntry[];
        
        setImportData({
          file,
          parsedEntries,
          isUploading: false
        });
      } catch (error) {
        showToast('Error parsing CSV file', 'error');
        setImportData({ parsedEntries: [], isUploading: false });
      }
    };
    reader.readAsText(file);
  };

  const confirmImport = () => {
    setEntries(prev => [...prev, ...importData.parsedEntries]);
    showToast(`Imported ${importData.parsedEntries.length} income entries`, 'success');
    setImportData({ parsedEntries: [], isUploading: false });
    setIsImportModalOpen(false);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header with KPIs */}
        <IncomeHeader
          kpis={kpis}
          onAddIncome={handleAddIncome}
          onExport={handleExport}
          onImport={handleImport}
        />

        {/* Filters */}
        <FiltersBar
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Charts and Table */}
          <div className="lg:col-span-3 space-y-6">
            <IncomeCharts 
              entries={sortedEntries}
              dateRange={filters.from && filters.to ? { from: filters.from, to: filters.to } : undefined}
            />
            
            <IncomeTable
              entries={sortedEntries}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onEdit={handleEditIncome}
              onDelete={handleDeleteIncome}
              onDuplicate={handleDuplicate}
              onGenerateRecurring={handleGenerateRecurring}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </div>

          {/* Insights Sidebar */}
          <div className="lg:col-span-1">
            <InsightsPanel 
              entries={filteredEntries}
              goalTarget={kpis.goalProgress.target}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <IncomeModal
        isOpen={isModalOpen}
        entry={editingEntry}
        onSave={handleSaveIncome}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsImportModalOpen(false)} />
          <div className="relative bg-white dark:bg-zinc-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Import Income Data
            </h3>
            
            {!importData.parsedEntries.length ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    Upload a CSV file with columns: date, source, category, amount, note
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    disabled={importData.isUploading}
                    className="block w-full text-sm text-zinc-500 dark:text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400"
                  />
                </div>
                {importData.isUploading && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                    Processing file...
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Found {importData.parsedEntries.length} valid entries. Preview:
                </p>
                <div className="max-h-48 overflow-y-auto border border-zinc-200 dark:border-zinc-700 rounded">
                  <table className="w-full text-xs">
                    <thead className="bg-zinc-50 dark:bg-zinc-700">
                      <tr>
                        <th className="px-2 py-1 text-left">Date</th>
                        <th className="px-2 py-1 text-left">Source</th>
                        <th className="px-2 py-1 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importData.parsedEntries.slice(0, 10).map((entry, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-800' : 'bg-zinc-50 dark:bg-zinc-750'}>
                          <td className="px-2 py-1">{entry.date}</td>
                          <td className="px-2 py-1">{entry.source}</td>
                          <td className="px-2 py-1">${entry.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmImport}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Import {importData.parsedEntries.length} Entries
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Income Entry"
        message="Are you sure you want to delete this income entry? This action cannot be undone."
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false })}
        variant="danger"
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </AppLayout>
  );
}