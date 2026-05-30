export default function Footer({ tema }) {
  const claro = tema === 'light';

  return (
    <footer style={{
      backgroundColor: claro ? '#eee' : '#050505',
      borderTop: claro ? '1px solid #ddd' : '1px solid #1f1f1f',
      padding: '48px 40px',
      textAlign: 'center',
      transition: 'all 0.3s',
    }}>

      <span style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#c9a84c',
        letterSpacing: '4px',
      }}>
        BARBEARIA TH
      </span>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '32px',
        margin: '32px 0',
        flexWrap: 'wrap',
      }}>
        <a href="#quemsomos" style={{ color: claro ? '#888' : '#555', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>QUEM SOMOS</a>
        <a href="#servicos" style={{ color: claro ? '#888' : '#555', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>SERVICOS</a>
        <a href="#contato" style={{ color: claro ? '#888' : '#555', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>CONTATO</a>
        <a href="https://wa.me/5521986129519" target="_blank" rel="noopener noreferrer" style={{ color: claro ? '#888' : '#555', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>WHATSAPP</a>
      </div>

      <p style={{ color: claro ? '#aaa' : '#333', fontSize: '12px', letterSpacing: '1px' }}>
        © {new Date().getFullYear()} Barbearia TH. Todos os direitos reservados.
      </p>

    </footer>
  );
}