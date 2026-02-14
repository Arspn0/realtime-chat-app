import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { CustomInput } from '../../../components/ui/CustomInput';
import { CustomButton } from '../../../components/ui/CustomButton';
import { useAuthStore } from '../../../store/authStore';

export const LoginScreen = () => {
  const { colors } = useAppTheme();
  const login = useAuthStore((state) => state.login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Validasi sederhana dulu
    if (!email || !password) {
      Alert.alert('Error', 'Email dan Password wajib diisi');
      return;
    }

    setLoading(true);
    
    // Simulasi API Call
    setTimeout(() => {
      setLoading(false);
      // Simpan data user dummy ke store
      login({
        id: '1',
        name: 'User Demo',
        email: email,
      });
    }, 1500);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome Back!</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>Sign in to continue</Text>

        <CustomInput 
          label="Email Address" 
          placeholder="user@example.com" 
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomInput 
          label="Password" 
          placeholder="Enter your password" 
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <CustomButton 
          title="Login" 
          onPress={handleLogin} 
          loading={loading} 
        />
        
        <CustomButton 
          title="Sign in with Google" 
          onPress={() => Alert.alert('Coming Soon', 'Google Auth di tahap berikutnya')} 
          variant="secondary"
        />

        <View style={styles.footer}>
          <Text style={{ color: colors.text }}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  content: { width: '100%', maxWidth: 400, alignSelf: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, opacity: 0.7, marginBottom: 32 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
});