'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState('dark');

  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo) setTema(temaSalvo);
  }, []);

  const alternarTema = () => {
    const novoTema = tema === 'dark' ? 'light' : 'dark';
    setTema(novoTema);
    localStorage.setItem('tema', novoTema);
  };

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  return useContext(ThemeContext);
}