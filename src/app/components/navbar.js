'use client';

import { useState } from 'react';
import { useTema } from '../context/ThemeContext';

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { tema, alternarTema } = useTema();

  const claro = tema === 'light';

  return (
    <header style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>

      <nav style={{
        padding: '18px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: claro ? 'rgba(255,255,255,0.97)' : 'rgba(10,10,10,0.97)',
        backdropFilter: 'blur(10px)',
        borderBottom: claro ? '1px solid #ddd' : '1px solid #2a2a2a',
        transition: 'all 0.3s',
      }}>

        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#c9a84c', letterSpacing: '3px' }}>
          BARBEARIA TH
        </span>

        <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}
          className="desktop-menu">
          <li><a href="#quemsomos" style={{ color: claro ? '#333' : '#ccc', textDecoration: 'none', fontSize: '13px', letterSpacing: '2px' }}>QUEM SOMOS</a></li>
          <li><a href="#servicos" style={{ color: claro ? '#333' : '#ccc', textDecoration: 'none', fontSize: '13px', letterSpacing: '2px' }}>SERVICOS</a></li>
          <li><a href="#contato" style={{ color: claro ? '#333' : '#ccc', textDecoration: 'none', fontSize: '13px', letterSpacing: '2px' }}>CONTATO</a></li>
        </ul>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} className="desktop-menu">
          <button
            onClick={alternarTema}
            style={{
              background: 'none',
              border: '1px solid #c9a84c',
              color: '#c9a84c',
              padding: '8px 14px',
              cursor: 'pointer',
              fontSize: '16px',
              borderRadius: '2px',
            }}
          >
            {claro ? '🌙' : '☀️'}
          </button>
          <a
            href="https://wa.me/5521986129519"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#c9a84c',
              color: '#0a0a0a',
              padding: '10px 24px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              borderRadius: '2px',
            }}
          >
            AGENDAR
          </a>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuAberto(!menuAberto)}
          style={{
            background: 'none',
            border: '1px solid #c9a84c',
            color: '#c9a84c',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '18px',
            borderRadius: '2px',
          }}
        >
          {menuAberto ? 'X' : '='}
        </button>

      </nav>

      {menuAberto && (
        <div style={{
          backgroundColor: claro ? '#f9f9f9' : '#0f0f0f',
          borderBottom: claro ? '1px solid #ddd' : '1px solid #2a2a2a',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          <a href="#quemsomos" onClick={() => setMenuAberto(false)} style={{ color: claro ? '#333' : '#ccc', textDecoration: 'none', fontSize: '14px', letterSpacing: '2px' }}>QUEM SOMOS</a>
          <a href="#servicos" onClick={() => setMenuAberto(false)} style={{ color: claro ? '#333' : '#ccc', textDecoration: 'none', fontSize: '14px', letterSpacing: '2px' }}>SERVICOS</a>
          <a href="#contato" onClick={() => setMenuAberto(false)} style={{ color: claro ? '#333' : '#ccc', textDecoration: 'none', fontSize: '14px', letterSpacing: '2px' }}>CONTATO</a>
          <button
            onClick={() => { alternarTema(); setMenuAberto(false); }}
            style={{
              background: 'none',
              border: '1px solid #c9a84c',
              color: '#c9a84c',
              padding: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              letterSpacing: '2px',
              borderRadius: '2px',
            }}
          >
            {claro ? '🌙 MODO ESCURO' : '☀️ MODO CLARO'}
          </button>
          <a
            href="https://wa.me/5521986129519"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#c9a84c',
              color: '#0a0a0a',
              padding: '14px 24px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              borderRadius: '2px',
              textAlign: 'center',
            }}
          >
            AGENDAR VIA WHATSAPP
          </a>
        </div>
      )}

      <style>{`
        .desktop-menu { display: flex !important; }
        .mobile-menu-btn { display: none !important; }

        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>

    </header>
  );
}