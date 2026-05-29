export default function Contato() {
  const horarios = [
    { dia: 'Segunda-feira', hora: 'Fechado' },
    { dia: 'Terca-feira', hora: '09:00 - 13:00' },
    { dia: 'Quarta-feira', hora: '09:00 - 15:00' },
    { dia: 'Quinta-feira', hora: '09:00 - 18:00' },
    { dia: 'Sexta-feira', hora: '08:00 - 22:00' },
    { dia: 'Sabado', hora: '08:00 - 22:00' },
    { dia: 'Domingo', hora: '07:00 - 12:00' },
  ];

  return (
    <section id="contato" style={{ padding: '100px 24px', backgroundColor: '#0a0a0a' }}>

      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <p style={{ color: '#c9a84c', letterSpacing: '6px', fontSize: '13px', marginBottom: '16px' }}>
          FALE CONOSCO
        </p>
        <h2 style={{ fontSize: 'clamp(32px, 8vw, 42px)', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase' }}>
          Contato
        </h2>
        <div style={{ width: '60px', height: '2px', backgroundColor: '#c9a84c', margin: '24px auto 0' }} />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '48px',
        flexWrap: 'wrap',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>

        {/* Horarios */}
        <div style={{ flex: '1', minWidth: '280px', maxWidth: '400px' }}>
          <h3 style={{ color: '#c9a84c', letterSpacing: '3px', fontSize: '14px', marginBottom: '32px' }}>
            HORARIOS
          </h3>
          {horarios.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: '1px solid #1f1f1f',
            }}>
              <span style={{ color: '#aaa', fontSize: '14px' }}>{item.dia}</span>
              <span style={{
                fontSize: '14px',
                color: item.hora === 'Fechado' ? '#555' : '#fff',
                fontWeight: item.hora === 'Fechado' ? 'normal' : 'bold',
              }}>
                {item.hora}
              </span>
            </div>
          ))}
        </div>

        {/* Endereco e contato */}
        <div style={{ flex: '1', minWidth: '280px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          <div>
            <h3 style={{ color: '#c9a84c', letterSpacing: '3px', fontSize: '14px', marginBottom: '16px' }}>
              ENDERECO
            </h3>
            <p style={{ color: '#aaa', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
              Estrada da Batalha, 50<br />
              Campo Grande, Rio de Janeiro<br />
              CEP 23017-426
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Estrada+da+Batalha+50+Campo+Grande+Rio+de+Janeiro"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                border: '1px solid #c9a84c',
                color: '#c9a84c',
                padding: '12px 28px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                borderRadius: '2px',
              }}
            >
              VER NO MAPA
            </a>
          </div>

          <div>
            <h3 style={{ color: '#c9a84c', letterSpacing: '3px', fontSize: '14px', marginBottom: '16px' }}>
              AGENDAMENTO
            </h3>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
              Agende seu horario diretamente pelo WhatsApp. Rapido e sem complicacao.
            </p>
            <a
              href="https://wa.me/5521986129519"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#25D366',
                color: '#fff',
                padding: '16px 40px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '14px',
                letterSpacing: '2px',
                borderRadius: '2px',
              }}
            >
              AGENDAR VIA WHATSAPP
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}