'use client';

const servicos = [
  { nome: 'Corte Classico', descricao: 'Corte tradicional com acabamento perfeito e estilo atemporal.', preco: 'R$ 30' },
  { nome: 'Corte + Barba', descricao: 'Combinacao completa para um visual impecavel do inicio ao fim.', preco: 'R$ 50' },
  { nome: 'Barba Completa', descricao: 'Modelagem, hidratacao e acabamento profissional na barba.', preco: 'R$ 30' },
  { nome: 'Degrade', descricao: 'Transicao perfeita com maquina, tesoura e muito estilo.', preco: 'R$ 25' },
  { nome: 'Platinado', descricao: 'Coloracao profissional para um visual unico e moderno.', preco: 'R$ 30' },
];

export default function Servicos({ tema }) {
  const claro = tema === 'light';

  return (
    <section id="servicos" style={{ padding: '100px 40px', backgroundColor: claro ? '#f5f5f5' : '#0f0f0f', transition: 'all 0.3s' }}>

      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <p style={{ color: '#c9a84c', letterSpacing: '6px', fontSize: '13px', marginBottom: '16px' }}>
          O QUE OFERECEMOS
        </p>
        <h2 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase', color: claro ? '#111' : '#fff' }}>
          Nossos Servicos
        </h2>
        <div style={{ width: '60px', height: '2px', backgroundColor: '#c9a84c', margin: '24px auto 0' }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {servicos.map((servico, index) => (
          <div key={index} style={{
            backgroundColor: claro ? '#fff' : '#1a1a1a',
            border: claro ? '1px solid #ddd' : '1px solid #2a2a2a',
            padding: '40px 32px',
            borderRadius: '4px',
            transition: 'all 0.3s',
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', color: claro ? '#111' : '#fff' }}>
              {servico.nome}
            </h3>
            <p style={{ color: claro ? '#666' : '#888', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
              {servico.descricao}
            </p>
            <span style={{ color: '#c9a84c', fontSize: '22px', fontWeight: 'bold' }}>
              {servico.preco}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}