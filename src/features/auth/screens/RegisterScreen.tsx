import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { CustomInput } from '../../../components/ui/CustomInput';
import { CustomButton } from '../../../components/ui/CustomButton';

export const RegisterScreen = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    // 1. Validasi Input
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Semua kolom harus diisi!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password dan Konfirmasi Password tidak sama.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password minimal 6 karakter.');
      return;
    }

    // 2. Simulasi Proses Register
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Sukses', 'Akun berhasil dibuat! Silakan login.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    }, 1500);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>Join us today!</Text>

        <CustomInput 
          label="Full Name" 
          placeholder="John Doe" 
          value={name}
          onChangeText={setName}
        />

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
          placeholder="Create a password" 
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <CustomInput 
          label="Confirm Password" 
          placeholder="Repeat password" 
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <CustomButton 
          title="Sign Up" 
          onPress={handleRegister} 
          loading={loading} 
        />

        <View style={styles.footer}>
          <Text style={{ color: colors.text }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  scrollContent: { padding: 20, paddingBottom: 50 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, opacity: 0.7, marginBottom: 32 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
});