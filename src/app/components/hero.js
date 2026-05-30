export default function Hero({ tema }) {
  const claro = tema === 'light';

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '120px 24px 120px',
      background: claro
        ? 'linear-gradient(to bottom, #f5f5f5 0%, #e8e8e8 100%)'
        : 'linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 100%)',
      transition: 'all 0.3s',
    }}>

      <div style={{ width: '60px', height: '2px', backgroundColor: '#c9a84c', marginBottom: '24px' }} />

      <p style={{ color: '#c9a84c', letterSpacing: '6px', fontSize: '13px', marginBottom: '20px' }}>
        DESDE 2016
      </p>

      <h1 style={{
        fontSize: 'clamp(36px, 12vw, 96px)',
        fontWeight: '900',
        letterSpacing: '4px',
        lineHeight: 1.1,
        marginBottom: '24px',
        textTransform: 'uppercase',
        wordBreak: 'break-word',
        color: claro ? '#111' : '#fff',
      }}>
        Barbearia<br />
        <span style={{ color: '#c9a84c' }}>TH</span>
      </h1>

      <p style={{
        color: claro ? '#555' : '#999',
        fontSize: 'clamp(15px, 4vw, 18px)',
        maxWidth: '480px',
        lineHeight: 1.7,
        marginBottom: '48px',
        letterSpacing: '1px',
      }}>
        Arte, estilo e precisao em cada corte. Sua melhor versao comeca aqui.
      </p>

      <div style={{
        display: 'flex',
        gap: '16px',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '320px',
      }}>
        <a href="https://wa.me/5521986129519" target="_blank" rel="noopener noreferrer" style={{
          backgroundColor: '#c9a84c',
          color: '#0a0a0a',
          padding: '16px 40px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '14px',
          letterSpacing: '2px',
          borderRadius: '2px',
          textAlign: 'center',
        }}>
          AGENDAR AGORA
        </a>
        <a href="#servicos" style={{
          border: claro ? '1px solid #999' : '1px solid #444',
          color: claro ? '#333' : '#fff',
          padding: '16px 40px',
          textDecoration: 'none',
          fontSize: '14px',
          letterSpacing: '2px',
          borderRadius: '2px',
          textAlign: 'center',
        }}>
          VER SERVICOS
        </a>
      </div>

    </section>
  );
}