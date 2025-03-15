// src/store/modalStore.ts
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  content: string;
  openModal: (content: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: '',
  openModal: (content: string) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: '' }),
}));
