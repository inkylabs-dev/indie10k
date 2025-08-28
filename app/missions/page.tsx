'use client';

import { useState } from 'react';
import { sampleMissions } from '@/lib/sampleMissions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Target, Plus, CheckCircle2, Clock, DollarSign, Trash2 } from 'lucide-react';

export default function MissionsPage() {
  const [missions, setMissions] = useState(sampleMissions);
  const [newMissionTitle, setNewMissionTitle] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addMission = () => {
    if (newMissionTitle.trim()) {
      const newMission = {
        id: `mission-${Date.now()}`,
        title: newMissionTitle.trim(),
        status: 'backlog' as const,
        type: 'other' as const,
        priority: 'medium' as const,
        expectedImpact: { visitsPerMonth: 0, revenueUsdPerMonth: 0 },
        createdAt: new Date().toISOString(),
        tags: [],
        subtasks: [],
        notes: ''
      };
      setMissions(prev => [...prev, newMission]);
      setNewMissionTitle('');
    }
  };

  const deleteMission = (id: string) => {
    setMissions(prev => prev.filter(m => m.id !== id));
  };

  const markComplete = (id: string) => {
    setMissions(prev => prev.map(m => 
      m.id === id ? { ...m, status: 'done' as const } : m
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'today': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-6 md:ml-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Page Header */}
            <div className="md:col-span-12">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Target className="h-6 w-6 text-blue-600" />
                      <div>
                        <CardTitle className="text-2xl">Missions</CardTitle>
                        <CardDescription>Plan, track, and complete missions tied to growth and revenue</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {missions.length} Total
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Add Mission Card */}
            <div className="md:col-span-12">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Plus className="h-5 w-5 text-green-600" />
                    Create New Mission
                  </CardTitle>
                  <CardDescription>Add a new mission to track your progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Input
                      value={newMissionTitle}
                      onChange={(e) => setNewMissionTitle(e.target.value)}
                      placeholder="Enter mission title..."
                      onKeyDown={(e) => e.key === 'Enter' && addMission()}
                      className="flex-1"
                    />
                    <Button onClick={addMission} disabled={!newMissionTitle.trim()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Mission
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Missions Grid */}
            {missions.length === 0 ? (
              <div className="md:col-span-12">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Target className="h-16 w-16 text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No missions yet</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Create your first mission to start tracking your progress toward your goals
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              missions.map((mission) => (
                <div key={mission.id} className="md:col-span-6 lg:col-span-4">
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base leading-tight mb-2">
                            {mission.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={getStatusColor(mission.status)}>
                              {mission.status.replace('_', ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(mission.priority)}>
                              {mission.priority}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {mission.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mission.notes && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {mission.notes}
                        </p>
                      )}

                      {mission.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {mission.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {mission.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{mission.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {mission.subtasks.length > 0 && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {mission.subtasks.filter(t => t.done).length} / {mission.subtasks.length} tasks
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ 
                                width: `${(mission.subtasks.filter(t => t.done).length / mission.subtasks.length) * 100}%` 
                              }} 
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <DollarSign className="h-3 w-3" />
                          ${mission.expectedImpact.revenueUsdPerMonth}/mo
                        </div>
                        <div className="flex items-center gap-2">
                          {mission.status !== 'done' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markComplete(mission.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Complete
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteMission(mission.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}