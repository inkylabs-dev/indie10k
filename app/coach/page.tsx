'use client';

import { useEffect, useMemo, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Send, User2, Plus, MessageSquare } from 'lucide-react';
import { useLocalStorage } from '@/lib/useLocalStorage';

type Conversation = {
  id: string;
  title: string;
  createdAt: string;
  messages: UIMessage[];
};

export default function CoachPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const initialMessages = useMemo(
    () => [
      {
        id: 'welcome',
        role: 'assistant' as const,
        content: [
          { type: 'text', text: "Hey! I'm your Indie10k Coach 🤖." },
          { type: 'text', text: 'Ask me anything about getting your first users, growing revenue, or which mission to do next.' },
        ],
      },
    ],
    []
  );

  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/coach' }), []);

  const defaultConversations = useMemo<Conversation[]>(
    () => [
      {
        id: `c-${Date.now()}`,
        title: 'New Chat',
        createdAt: new Date().toISOString(),
        messages: initialMessages,
      },
    ],
    [initialMessages]
  );

  const [conversations, setConversations] = useLocalStorage<Conversation[]>(
    'coach-conversations',
    defaultConversations
  );

  const [activeId, setActiveId] = useState<string>(() => conversations[0]?.id ?? `c-${Date.now()}`);

  const activeConversation = conversations.find((c) => c.id === activeId) || conversations[0];
  const activeMessages = activeConversation?.messages ?? initialMessages;

  const { id, messages, setMessages, sendMessage, status, error, stop, regenerate } = useChat<UIMessage>({
    id: activeId,
    messages: activeMessages,
    transport,
  });

  useEffect(() => {
    // Persist active messages to local storage conversation list
    const updated = conversations.map((c) => (c.id === activeId ? { ...c, messages } : c));
    setConversations(updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, activeId]);

  const [input, setInput] = useState('');

  const handleSubmit = async (e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    const text = input.trim();
    if (!text || status !== 'ready') return;

    // Set title on first user message
    if (conversations.some((c) => c.id === activeId && c.title === 'New Chat')) {
      const updated = conversations.map((c) =>
        c.id === activeId && c.title === 'New Chat' ? { ...c, title: text.slice(0, 60) } : c
      );
      setConversations(updated);
    }

    await sendMessage(text);
    setInput('');
  };

  const newChat = () => {
    const newId = `c-${Date.now()}`;
    const conv: Conversation = {
      id: newId,
      title: 'New Chat',
      createdAt: new Date().toISOString(),
      messages: initialMessages,
    };
    setConversations([conv, ...conversations]);
    setActiveId(newId);
    setMessages(initialMessages);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-6 md:ml-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-12">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Bot className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle className="text-2xl">Coach</CardTitle>
                      <CardDescription>
                        Real-time guidance on growth, marketing, and product strategy
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Secondary Sidebar: conversations */}
            <div className="md:col-span-3">
              <Card className="h-[70vh] flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">Conversations</CardTitle>
                    </div>
                    <Button size="sm" variant="outline" onClick={newChat}>
                      <Plus className="h-4 w-4 mr-1" /> New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-2">
                    <div className="space-y-1">
                      {conversations.map((c) => (
                        <Button
                          key={c.id}
                          variant={c.id === activeId ? 'secondary' : 'ghost'}
                          className="w-full justify-start"
                          onClick={() => {
                            setActiveId(c.id);
                            setMessages(c.messages);
                          }}
                        >
                          <span className="truncate">
                            {c.title || 'Untitled'}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Chat area */}
            <div className="md:col-span-9">
              <Card className="h-[70vh] flex flex-col">
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {messages.map((m) => (
                        <div key={m.id} className="flex items-start gap-3">
                          {m.role === 'assistant' ? (
                            <Avatar className="h-8 w-8 shrink-0">
                              <AvatarFallback>🤖</AvatarFallback>
                            </Avatar>
                          ) : (
                            <Avatar className="h-8 w-8 shrink-0">
                              <AvatarFallback>
                                <User2 className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}

                          <div
                            className={
                              m.role === 'assistant'
                                ? 'bg-blue-50 text-blue-950 dark:bg-blue-950/40 dark:text-blue-50 rounded-lg px-3 py-2 max-w-[85%]'
                                : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded-lg px-3 py-2 max-w-[85%]'
                            }
                          >
                            <div className="text-sm whitespace-pre-line">
                              {'content' in m && Array.isArray(m.content)
                                ? m.content
                                    .filter((p: any) => p?.type === 'text')
                                    .map((p: any, i: number) => <span key={i}>{p.text}</span>)
                                : null}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
                      <Input
                        placeholder="Type your question…"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={status !== 'ready'}
                      />
                      <Button type="submit" disabled={!input.trim() || status !== 'ready'}>
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    </form>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
