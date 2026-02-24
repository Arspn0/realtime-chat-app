import { create } from 'zustand';
import { Contact } from '../features/chat/data/mockContacts';

export interface Group {
  id: string;
  name: string;
  description: string;
  members: Contact[]; // Siapa saja anggotanya
  admins: string[];   // ID user yang jadi admin
  avatar?: string;
}

interface GroupState {
  groups: Group[];
  createGroup: (name: string, members: Contact[]) => void;
  deleteGroup: (id: string) => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  // Data awal dummy
  groups: [
    // {
    //   id: 'g1',
    //   name: 'Tim Developer',
    //   description: 'Diskusi project React Native',
    //   members: [],
    //   admins: ['me'],
    //   avatar: 'https://ui-avatars.com/api/?name=Tim+Dev&background=random',
    // }
  ],

  createGroup: (name, members) => set((state) => ({
    groups: [
      ...state.groups,
      {
        id: Date.now().toString(), // ID unik sederhana
        name,
        description: 'Grup baru',
        members,
        admins: ['me'], // Pembuat otomatis jadi admin
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`
      }
    ]
  })),

  deleteGroup: (id) => set((state) => ({
    groups: state.groups.filter((g) => g.id !== id)
  })),
}));