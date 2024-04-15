/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 **/


import { AuthProvider, useFlow, useSession } from '@descope/react-native-sdk';
import React, { useCallback } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { MyApp } from './src/myapp';

export default function App() {

  //const { logOut } = useDescope();

  // const handleLogout = useCallback(() => {
  //   logOut()
  // }, [logOut])


  return (
    <AuthProvider
      projectId='P2f0pWMfaRDURQTKJS5i9e8VoR1t'
    >
      <MyApp />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

