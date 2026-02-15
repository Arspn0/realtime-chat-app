export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status: string;
}

export const MOCK_CONTACTS: Contact[] = [
  { id: 'u1', name: 'Andi Saputra', status: 'Sibuk coding', avatar: 'https://i.pravatar.cc/150?u=u1' },
  { id: 'u2', name: 'Budi Darmawan', status: 'Available', avatar: 'https://i.pravatar.cc/150?u=u2' },
  { id: 'u3', name: 'Citra Kirana', status: 'Di Gym', avatar: 'https://i.pravatar.cc/150?u=u3' },
  { id: 'u4', name: 'Dewi Lestari', status: 'Meeting', avatar: 'https://i.pravatar.cc/150?u=u4' },
  { id: 'u5', name: 'Eko Patrio', status: 'Tidur', avatar: 'https://i.pravatar.cc/150?u=u5' },
];