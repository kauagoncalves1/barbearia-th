'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const servicos = [
  'Corte Classico',
  'Corte + Barba',
  'Barba Completa',
  'Degrade',
  'Platinado',
];

export default function Agendar() {
  const [horarios, setHorarios] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [servico, setServico] = useState('');
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarHorarios();
  }, []);

  async function buscarHorarios() {
    setCarregando(true);
    const { data } = await supabase
      .from('horarios')
      .select('*')
      .eq('disponivel', true)
      .order('data', { ascending: true })
      .order('hora', { ascending: true });
    setHorarios(data || []);
    setCarregando(false);
  }

  async function confirmarAgendamento() {
    if (!selecionado || !servico || !nome || !whatsapp) return;

    const { error } = await supabase
      .from('agendamentos')
      .insert([{
        horario_id: selecionado.id,
        cliente_nome: nome,
        cliente_whatsapp: whatsapp,
        servico: servico,
        created_at: new Date().toISOString(),
      }]);

    if (!error) {
      await supabase
        .from('horarios')
        .update({ disponivel: false })
        .eq('id', selecionado.id);

      setSucesso(true);
    }
  }

  function formatarData(data) {
    const d = new Date(data + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
  }

  function formatarHora(hora) {
    return hora.slice(0, 5);
  }

  const estilo = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      padding: '120px 24px 80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    titulo: {
      textAlign: 'center',
      marginBottom: '48px',
    },
    card: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderRadius: '4px',
      padding: '32px',
      width: '100%',
      maxWidth: '600px',
    },
    label: {
      color: '#c9a84c',
      fontSize: '13px',
      letterSpacing: '2px',
      marginBottom: '16px',
      display: 'block',
    },
    horarioBtn: (ativo) => ({
      backgroundColor: ativo ? '#c9a84c' : '#222',
      color: ativo ? '#0a0a0a' : '#fff',
      border: ativo ? '1px solid #c9a84c' : '1px solid #333',
      padding: '12px 16px',
      borderRadius: '2px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: ativo ? 'bold' : 'normal',
      transition: 'all 0.2s',
    }),
    input: {
      width: '100%',
      backgroundColor: '#111',
      border: '1px solid #333',
      color: '#fff',
      padding: '14px 16px',
      fontSize: '14px',
      borderRadius: '2px',
      marginBottom: '16px',
      outline: 'none',
    },
    select: {
      width: '100%',
      backgroundColor: '#111',
      border: '1px solid #333',
      color: '#fff',
      padding: '14px 16px',
      fontSize: '14px',
      borderRadius: '2px',
      marginBottom: '24px',
      outline: 'none',
    },
    btnPrimario: {
      backgroundColor: '#c9a84c',
      color: '#0a0a0a',
      border: 'none',
      padding: '16px 40px',
      fontSize: '14px',
      fontWeight: 'bold',
      letterSpacing: '2px',
      borderRadius: '2px',
      cursor: 'pointer',
      width: '100%',
      marginTop: '8px',
    },
    btnSecundario: {
      backgroundColor: 'transparent',
      color: '#aaa',
      border: '1px solid #333',
      padding: '12px 24px',
      fontSize: '13px',
      letterSpacing: '1px',
      borderRadius: '2px',
      cursor: 'pointer',
      marginBottom: '24px',
    },
  };

  if (sucesso) {
    return (
      <div style={estilo.container}>
        <div style={{ ...estilo.card, textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>✅</div>
          <h2 style={{ color: '#c9a84c', fontSize: '24px', marginBottom: '16px', letterSpacing: '2px' }}>
            AGENDAMENTO CONFIRMADO!
          </h2>
          <p style={{ color: '#aaa', fontSize: '15px', lineHeight: '1.8', marginBottom: '8px' }}>
            <strong style={{ color: '#fff' }}>{nome}</strong>, seu agendamento foi realizado com sucesso!
          </p>
          <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.8', marginBottom: '32px' }}>
            {servico} — {formatarData(selecionado.data)} as {formatarHora(selecionado.hora)}
          </p>
          <a href="/" style={{ ...estilo.btnPrimario, display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
            VOLTAR AO INICIO
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={estilo.container}>
      <div style={estilo.titulo}>
        <p style={{ color: '#c9a84c', letterSpacing: '6px', fontSize: '13px', marginBottom: '16px' }}>
          BARBEARIA TH
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: '900', letterSpacing: '4px', color: '#fff' }}>
          AGENDAR HORARIO
        </h1>
        <div style={{ width: '60px', height: '2px', backgroundColor: '#c9a84c', margin: '24px auto 0' }} />
      </div>

      <div style={estilo.card}>

        {/* Etapa 1 — escolher horario */}
        {etapa === 1 && (
          <>
            <span style={estilo.label}>ESCOLHA O HORARIO</span>
            {carregando ? (
              <p style={{ color: '#666', fontSize: '14px' }}>Carregando horarios...</p>
            ) : horarios.length === 0 ? (
              <p style={{ color: '#666', fontSize: '14px' }}>Nenhum horario disponivel no momento.</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                {horarios.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setSelecionado(h)}
                    style={estilo.horarioBtn(selecionado?.id === h.id)}
                  >
                    {formatarData(h.data)}<br />
                    <strong>{formatarHora(h.hora)}</strong>
                  </button>
                ))}
              </div>
            )}
            <button
              style={{ ...estilo.btnPrimario, opacity: selecionado ? 1 : 0.5 }}
              onClick={() => selecionado && setEtapa(2)}
            >
              CONTINUAR
            </button>
          </>
        )}

        {/* Etapa 2 — dados do cliente */}
        {etapa === 2 && (
          <>
            <button style={estilo.btnSecundario} onClick={() => setEtapa(1)}>
              ← Voltar
            </button>
            <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '24px' }}>
              Horario selecionado: <strong style={{ color: '#c9a84c' }}>{formatarData(selecionado.data)} as {formatarHora(selecionado.hora)}</strong>
            </p>
            <span style={estilo.label}>ESCOLHA O SERVICO</span>
            <select
              style={estilo.select}
              value={servico}
              onChange={(e) => setServico(e.target.value)}
            >
              <option value="">Selecione...</option>
              {servicos.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <span style={estilo.label}>SEUS DADOS</span>
            <input
              style={estilo.input}
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              style={estilo.input}
              placeholder="WhatsApp (ex: 21999999999)"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <button
              style={{ ...estilo.btnPrimario, opacity: (servico && nome && whatsapp) ? 1 : 0.5 }}
              onClick={() => (servico && nome && whatsapp) && setEtapa(3)}
            >
              REVISAR AGENDAMENTO
            </button>
          </>
        )}

        {/* Etapa 3 — confirmacao */}
        {etapa === 3 && (
          <>
            <button style={estilo.btnSecundario} onClick={() => setEtapa(2)}>
              ← Voltar
            </button>
            <span style={estilo.label}>CONFIRMAR AGENDAMENTO</span>
            {[
              { label: 'Horario', valor: `${formatarData(selecionado.data)} as ${formatarHora(selecionado.hora)}` },
              { label: 'Servico', valor: servico },
              { label: 'Nome', valor: nome },
              { label: 'WhatsApp', valor: whatsapp },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #222' }}>
                <span style={{ color: '#666', fontSize: '13px' }}>{item.label}</span>
                <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>{item.valor}</span>
              </div>
            ))}
            <button style={estilo.btnPrimario} onClick={confirmarAgendamento}>
              CONFIRMAR
            </button>
          </>
        )}

      </div>
    </div>
  );
}