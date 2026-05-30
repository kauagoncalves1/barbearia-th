'use client';

import { useTema } from './context/ThemeContext';
import Navbar from './components/navbar';
import Hero from './components/hero';
import QuemSomos from './components/quemsomos';
import Servicos from './components/servicos';
import Contato from './components/contato';
import Footer from './components/footer';

export default function Home() {
  const { tema } = useTema();
  const claro = tema === 'light';

  return (
    <main style={{
      backgroundColor: claro ? '#f5f5f5' : '#0a0a0a',
      color: claro ? '#111' : '#fff',
      transition: 'all 0.3s',
    }}>
      <Navbar />
      <Hero tema={tema} />
      <QuemSomos tema={tema} />
      <Servicos tema={tema} />
      <Contato tema={tema} />
      <Footer tema={tema} />
    </main>
  );
}