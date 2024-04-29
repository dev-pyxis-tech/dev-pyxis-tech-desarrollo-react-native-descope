/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 **/


import { AuthProvider } from '@descope/react-native-sdk';
import React from 'react';
import { MyApp } from './src/myapp';

export default function App() {
  return (
    <AuthProvider
      projectId='P2fHstztcG2djwHobwhVDudiHSgN'
    >
      <MyApp />
    </AuthProvider>
  );
}


