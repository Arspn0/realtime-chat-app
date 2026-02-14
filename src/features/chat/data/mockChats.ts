export interface Message {
  id: string;
  text: string;
  senderId: string; // 'me' atau ID teman
  timestamp: string;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  avatar?: string; // URL gambar (opsional)
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[]; // Array pesan dummy
}

export const MOCK_CHATS: ChatRoom[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    lastMessage: 'Siap, project aman bro?',
    lastMessageTime: '10:30',
    unreadCount: 2,
    isOnline: true,
    messages: [
      { id: 'm1', text: 'Halo bro', senderId: 'me', timestamp: '10:00', isRead: true },
      { id: 'm2', text: 'Gimana kabar aplikasi?', senderId: '1', timestamp: '10:05', isRead: true },
      { id: 'm3', text: 'Siap, project aman bro?', senderId: '1', timestamp: '10:30', isRead: false },
    ]
  },
  {
    id: '2',
    name: 'Siti Aminah',
    lastMessage: 'Oke, makasih ya.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 'm1', text: 'File sudah dikirim ya', senderId: 'me', timestamp: '09:00', isRead: true },
      { id: 'm2', text: 'Oke, makasih ya.', senderId: '2', timestamp: '09:10', isRead: true },
    ]
  },
  {
    id: '3',
    name: 'Team Dev React',
    lastMessage: 'Meeting jam 3 sore.',
    lastMessageTime: '08:00',
    unreadCount: 5,
    isOnline: false,
    messages: []
  },
];