import React, { createContext, useState, useEffect, useContext } from 'react';
import * as auth from '../services/auth';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../interfaces/user/user.interface';
import { RequestSignIn } from '../interfaces/user/login/request.signIn.interface';
import { RequestSignUp } from '../interfaces/user/registration/request.signUp.interface';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signUp(request: RequestSignUp): Promise<string | void>;
  signIn(request: RequestSignIn): Promise<string | void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }

      setLoading(false);
    }

    loadStorageData();
  });

  async function signUp(request: RequestSignUp) {
    const response = await auth.signUp(request);
    if (response.data.succeeded)
      return response.data.message;
  }

  async function signIn(request: RequestSignIn) {
    const response = await auth.signIn(request);
    console.log(response);
    if (response.data.failed) {
      return response.data.message;
    }

    setUser(response.data.data.user);

    api.defaults.headers.Authorization = `Baerer ${response.data.data.token}`;

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.data.user));
    await AsyncStorage.setItem('@RNAuth:token', response.data.data.token);
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };