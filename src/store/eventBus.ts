// src/store/eventBus.ts
import { create } from 'zustand';

interface EventBus {
  // Objeto que guarda una lista de listeners para cada evento
  events: Record<string, ((data: any) => void)[]>;
  // Método para suscribirse a un evento
  subscribe: (eventName: string, callback: (data: any) => void) => () => void;
  // Método para publicar un evento
  publish: (eventName: string, data: any) => void;
}

export const useEventBus = create<EventBus>((set, get) => ({
  events: {},
  subscribe: (eventName, callback) => {
    const current = get().events[eventName] || [];
    set((state) => ({
      events: {
        ...state.events,
        [eventName]: [...current, callback],
      },
    }));
    // Return an unsubscribe function:
    return () =>
      set((state) => ({
        events: {
          ...state.events,
          [eventName]: state.events[eventName].filter((cb) => cb !== callback),
        },
      }));
  },
  publish: (eventName, data) => {
    const subs = get().events[eventName] || [];
    subs.forEach((callback) => callback(data));
  },
}));
