import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg'; // Import QR Generator
import { Image } from 'react-native'; // Native Image

import { useAppTheme } from '../../../hooks/useAppTheme';
import { useAuthStore } from '../../../store/authStore';

export const ProfileScreen = () => {
  const { colors, setMode, mode } = useAppTheme();
  const { user, logout } = useAuthStore();
  const navigation = useNavigation<any>();
  const isNeo = mode === 'neobrutalism';
  
  const [showQR, setShowQR] = useState(false); // State untuk Modal QR

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* 1. Header Profile */}
      <View style={[
        styles.headerCard, 
        { 
          backgroundColor: colors.card,
          borderColor: colors.text,
          borderBottomWidth: isNeo ? 2 : 1 
        }
      ]}>
        <View style={styles.avatarSection}>
          <View>
            {user?.avatar ? (
               <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: colors.secondary }]}>
                 <Text style={{ fontSize: 32 }}>{user?.name?.charAt(0)}</Text>
              </View>
            )}
            
            {/* Mood Bubble */}
            <View style={[styles.moodBubble, { backgroundColor: colors.background, borderColor: colors.text }]}>
               <Text style={{ fontSize: 14 }}>{user?.mood || '👋'}</Text>
            </View>
          </View>
          
          <View style={styles.infoSection}>
            <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
            <Text style={[styles.username, { color: colors.primary }]}>{user?.username || '@username'}</Text>
            <Text style={[styles.status, { color: colors.text }]}>{user?.status || 'No status set'}</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={[styles.smallBtn, { borderColor: colors.text, backgroundColor: colors.secondary }]}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={{ color: colors.text }}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.smallBtn, { borderColor: colors.text, backgroundColor: colors.secondary }]}
            onPress={() => setShowQR(true)}
          >
            <Text style={{ color: colors.text }}>Show QR ID</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Theme Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
        
        {/* Tombol Tema (Sama seperti sebelumnya, disederhanakan) */}
        {['minimalist', 'retro', 'neobrutalism'].map((themeName) => (
           <TouchableOpacity 
             key={themeName}
             style={[
               styles.menuItem, 
               { 
                 backgroundColor: colors.card, 
                 borderColor: colors.text,
                 borderWidth: isNeo ? 2 : 1,
                 marginBottom: 8
               }
             ]}
             onPress={() => setMode(themeName as any)}
           >
             <Text style={{ color: colors.text, textTransform: 'capitalize' }}>
               {themeName} Theme {mode === themeName && '✓'}
             </Text>
           </TouchableOpacity>
        ))}
      </View>

      {/* 3. Logout */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={[styles.logoutBtn, { borderColor: colors.text, borderWidth: isNeo ? 2 : 1 }]}
          onPress={logout}
        >
          <Text style={{ color: '#D32F2F', fontWeight: 'bold' }}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Modal QR Code */}
      <Modal visible={showQR} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.qrCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.qrTitle, { color: colors.text }]}>My ID Code</Text>
            <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
               {/* Generate QR dari User ID */}
               <QRCode value={user?.id || 'unknown'} size={200} />
            </View>
            <Text style={{ marginTop: 10, color: colors.text, fontWeight: 'bold' }}>{user?.username}</Text>
            <Button title="Close" onPress={() => setShowQR(false)} />
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerCard: { padding: 20, marginBottom: 20 },
  avatarSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  avatarPlaceholder: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center' },
  moodBubble: { 
    position: 'absolute', right: -5, top: 0, 
    width: 26, height: 26, borderRadius: 13, 
    justifyContent: 'center', alignItems: 'center', borderWidth: 1 
  },
  infoSection: { marginLeft: 15, flex: 1 },
  name: { fontSize: 20, fontWeight: 'bold' },
  username: { fontSize: 14, marginBottom: 4 },
  status: { fontSize: 14, opacity: 0.7, fontStyle: 'italic' },
  actionRow: { flexDirection: 'row', gap: 10 },
  smallBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, borderWidth: 1 },
  section: { padding: 20, paddingTop: 0 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  menuItem: { padding: 15, borderRadius: 8 },
  logoutBtn: { padding: 15, borderRadius: 8, alignItems: 'center', backgroundColor: '#FFEBEE' },
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  qrCard: { width: 300, padding: 20, borderRadius: 16, alignItems: 'center' },
  qrTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 }
});