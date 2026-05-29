export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#050505',
      borderTop: '1px solid #1f1f1f',
      padding: '48px 40px',
      textAlign: 'center',
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
        <a href="#servicos" style={{ color: '#555', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>SERVIÇOS</a>
        <a href="#contato" style={{ color: '#555', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>CONTATO</a>
        <a href="https://wa.me/5521986129519" target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px' }}>WHATSAPP</a>
      </div>

      <p style={{ color: '#333', fontSize: '12px', letterSpacing: '1px' }}>
        © {new Date().getFullYear()} Barbearia TH. Todos os direitos reservados.
      </p>

    </footer>
  );
}