export default function QuemSomos({ tema }) {
  const claro = tema === 'light';

  return (
    <section id="quemsomos" style={{ padding: '100px 40px', backgroundColor: claro ? '#fff' : '#111', transition: 'all 0.3s' }}>

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        gap: '80px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>

        <div style={{
          flex: '1',
          minWidth: '280px',
          borderLeft: '3px solid #c9a84c',
          paddingLeft: '40px',
        }}>
          <p style={{ color: '#c9a84c', letterSpacing: '6px', fontSize: '13px', marginBottom: '16px' }}>
            DESDE 2016
          </p>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '900',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '32px',
            lineHeight: '1.2',
            color: claro ? '#111' : '#fff',
          }}>
            Quem<br />Somos
          </h2>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#c9a84c', marginBottom: '32px' }} />
          <p style={{ color: claro ? '#555' : '#aaa', fontSize: '16px', lineHeight: '1.9', marginBottom: '24px' }}>
            A Barbearia TH nasceu em 2016 das maos do Thiago com um objetivo simples: oferecer muito mais do que um corte de cabelo. Desde o primeiro dia, a ideia nunca foi ser mais uma barbearia de bairro.
          </p>
          <p style={{ color: claro ? '#555' : '#aaa', fontSize: '16px', lineHeight: '1.9', marginBottom: '40px' }}>
            Aqui, cada cliente e atendido com atencao, tecnica e cuidado com os detalhes. Um ambiente acolhedor, profissionais dedicados e um resultado que fala por si so.
          </p>

          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '36px', fontWeight: '900', color: '#c9a84c' }}>+8</p>
              <p style={{ color: claro ? '#888' : '#666', fontSize: '13px', letterSpacing: '2px' }}>ANOS DE EXPERIENCIA</p>
            </div>
            <div>
              <p style={{ fontSize: '36px', fontWeight: '900', color: '#c9a84c' }}>100%</p>
              <p style={{ color: claro ? '#888' : '#666', fontSize: '13px', letterSpacing: '2px' }}>DEDICACAO</p>
            </div>
          </div>
        </div>

        <div style={{
          flex: '1',
          minWidth: '280px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {[
            { titulo: 'Tecnica', descricao: 'Cortes precisos executados com anos de pratica e atualizacao constante.' },
            { titulo: 'Ambiente', descricao: 'Um espaco pensado para voce se sentir bem do momento que entra ate a hora de ir embora.' },
            { titulo: 'Atendimento', descricao: 'Cada cliente e unico. Ouvimos o que voce quer e entregamos o melhor resultado possivel.' },
          ].map((item, index) => (
            <div key={index} style={{
              backgroundColor: claro ? '#f5f5f5' : '#1a1a1a',
              border: claro ? '1px solid #ddd' : '1px solid #2a2a2a',
              borderRadius: '4px',
              padding: '32px',
              transition: 'all 0.3s',
            }}>
              <h3 style={{ color: '#c9a84c', fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '12px' }}>
                {item.titulo}
              </h3>
              <p style={{ color: claro ? '#555' : '#888', fontSize: '14px', lineHeight: '1.7' }}>
                {item.descricao}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}