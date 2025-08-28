'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { IncomeEntry, IncomeSource, IncomeCategory } from '@/lib/incomeTypes';
import { formatDateISO } from '@/lib/date';

interface IncomeModalProps {
  isOpen: boolean;
  entry?: IncomeEntry;
  onSave: (entry: Omit<IncomeEntry, 'id'>) => void;
  onClose: () => void;
}

const sources: IncomeSource[] = ['AdSense', 'Stripe', 'Gumroad', 'Affiliate', 'Other'];
const categories: IncomeCategory[] = ['Product', 'Ads', 'Services', 'Donations', 'Other'];

export default function IncomeModal({ isOpen, entry, onSave, onClose }: IncomeModalProps) {
  const [formData, setFormData] = useState({
    date: formatDateISO(new Date()),
    source: 'Stripe' as IncomeSource,
    category: 'Product' as IncomeCategory,
    amount: '',
    note: ''
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        date: entry.date,
        source: entry.source,
        category: entry.category,
        amount: entry.amount.toString(),
        note: entry.note || ''
      });
    } else {
      setFormData({
        date: formatDateISO(new Date()),
        source: 'Stripe',
        category: 'Product',
        amount: '',
        note: ''
      });
    }
  }, [entry, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) return;

    onSave({
      date: formData.date,
      source: formData.source,
      category: formData.category,
      amount,
      note: formData.note || undefined
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {entry ? 'Edit Income Entry' : 'Add Income Entry'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Select
              value={formData.source}
              onValueChange={(value: IncomeSource) => setFormData(prev => ({ ...prev, source: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                {sources.map(source => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value: IncomeCategory) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
              placeholder="Add a description or reference..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {entry ? 'Update Entry' : 'Add Entry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}