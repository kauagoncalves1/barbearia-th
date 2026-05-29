'use client';

const servicos = [
  { nome: 'Corte Clássico', descricao: 'Corte tradicional com acabamento perfeito e estilo atemporal.', preco: 'R$ 45' },
  { nome: 'Corte + Barba', descricao: 'Combinação completa para um visual impecável do início ao fim.', preco: 'R$ 75' },
  { nome: 'Barba Completa', descricao: 'Modelagem, hidratação e acabamento profissional na barba.', preco: 'R$ 40' },
  { nome: 'Degradê', descricao: 'Transição perfeita com máquina, tesoura e muito estilo.', preco: 'R$ 50' },
  { nome: 'Hidratação', descricao: 'Tratamento profundo para cabelo e barba com produtos premium.', preco: 'R$ 35' },
  { nome: 'Pacote VIP', descricao: 'Corte, barba, hidratação e sobrancelha. Experiência completa.', preco: 'R$ 120' },
];

export default function Servicos() {
  return (
    <section id="servicos" style={{ padding: '100px 40px', backgroundColor: '#0f0f0f' }}>

      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <p style={{ color: '#c9a84c', letterSpacing: '6px', fontSize: '13px', marginBottom: '16px' }}>
          O QUE OFERECEMOS
        </p>
        <h2 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase' }}>
          Nossos Serviços
        </h2>
        <div style={{ width: '60px', height: '2px', backgroundColor: '#c9a84c', margin: '24px auto 0' }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {servicos.map((servico, index) => (
          <div key={index} style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            padding: '40px 32px',
            borderRadius: '4px',
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px' }}>
              {servico.nome}
            </h3>
            <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
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