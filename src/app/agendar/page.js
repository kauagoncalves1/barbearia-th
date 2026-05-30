'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { gerarHorariosDisponiveis, formatarDataExibicao, formatarHora, agruparPorData } from '../utils';

const servicos = [
  { nome: 'Corte Classico', preco: 'R$ 30' },
  { nome: 'Corte + Barba', preco: 'R$ 50' },
  { nome: 'Barba Completa', preco: 'R$ 30' },
  { nome: 'Degrade', preco: 'R$ 25' },
  { nome: 'Platinado', preco: 'R$ 30' },
];

export default function Agendar() {
  const [grupos, setGrupos] = useState({});
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horaSelecionada, setHoraSelecionada] = useState(null);
  const [servico, setServico] = useState(null);
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => { buscarDados(); }, []);

  async function buscarDados() {
    setCarregando(true);
    const { data: grade } = await supabase.from('grade_horarios').select('*').eq('ativo', true);
    const { data: agendamentos } = await supabase.from('agendamentos').select('data, hora');
    const { data: bloqueios } = await supabase.from('bloqueios').select('data');
    const disponiveis = gerarHorariosDisponiveis(grade || [], agendamentos || [], bloqueios || []);
    setGrupos(agruparPorData(disponiveis));
    setCarregando(false);
  }

  async function confirmarAgendamento() {
    if (!dataSelecionada || !horaSelecionada || !servico || !nome || !whatsapp) return;
    const { error } = await supabase.from('agendamentos').insert([{
      data: dataSelecionada,
      hora: horaSelecionada,
      cliente_nome: nome,
      cliente_whatsapp: whatsapp,
      servico: servico.nome + ' - ' + servico.preco,
    }]);
    if (!error) setSucesso(true);
  }

  function classificarHora(hora) {
    const h = parseInt(hora.split(':')[0]);
    if (h < 12) return 'manha';
    if (h < 18) return 'tarde';
    return 'noite';
  }

  function getDatasComDia() {
    return Object.keys(grupos).map(data => {
      const d = new Date(data + 'T00:00:00');
      const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
      return { data, diaSemana: dias[d.getDay()], diaMes: d.getDate(), mes: d.toLocaleDateString('pt-BR', { month: 'short' }) };
    });
  }

  const datas = getDatasComDia();
  const horariosData = dataSelecionada ? grupos[dataSelecionada] || [] : [];
  const manha = horariosData.filter(h => classificarHora(h.hora) === 'manha');
  const tarde = horariosData.filter(h => classificarHora(h.hora) === 'tarde');
  const noite = horariosData.filter(h => classificarHora(h.hora) === 'noite');

  const s = {
    page: { minHeight: '100vh', backgroundColor: '#0a0a0a', padding: '100px 0 60px', color: '#fff' },
    container: { maxWidth: '680px', margin: '0 auto', padding: '0 20px' },
    titulo: { textAlign: 'center', marginBottom: '40px' },
    card: { backgroundColor: '#111', border: '1px solid #222', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' },
    cardHeader: { padding: '16px 24px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', gap: '12px' },
    cardBody: { padding: '24px' },
    numero: { backgroundColor: '#c9a84c', color: '#0a0a0a', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold', flexShrink: 0 },
    numeroInativo: { backgroundColor: '#222', color: '#555', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold', flexShrink: 0 },
    diaBtn: (ativo) => ({
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
      backgroundColor: ativo ? '#c9a84c' : '#1a1a1a',
      color: ativo ? '#0a0a0a' : '#aaa',
      border: ativo ? '1px solid #c9a84c' : '1px solid #2a2a2a',
      padding: '10px 14px', borderRadius: '6px', cursor: 'pointer', minWidth: '52px',
    }),
    horaBtn: (ativo) => ({
      backgroundColor: ativo ? '#c9a84c' : '#1a1a1a',
      color: ativo ? '#0a0a0a' : '#fff',
      border: ativo ? '1px solid #c9a84c' : '1px solid #2a2a2a',
      padding: '10px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold',
    }),
    servicoBtn: (ativo) => ({
      backgroundColor: ativo ? '#1a1200' : '#1a1a1a',
      border: ativo ? '1px solid #c9a84c' : '1px solid #2a2a2a',
      borderRadius: '6px', padding: '16px', cursor: 'pointer',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: '10px',
    }),
    input: { width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', color: '#fff', padding: '14px 16px', fontSize: '14px', borderRadius: '6px', marginBottom: '12px', outline: 'none' },
    btnFinal: { backgroundColor: '#c9a84c', color: '#0a0a0a', border: 'none', padding: '16px', fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', borderRadius: '6px', cursor: 'pointer', width: '100%', marginTop: '8px' },
    label: { color: '#c9a84c', fontSize: '11px', letterSpacing: '2px', marginBottom: '14px', display: 'block' },
    periodo: { color: '#666', fontSize: '12px', letterSpacing: '1px', marginBottom: '10px', marginTop: '16px' },
  };

  if (sucesso) {
    return (
      <div style={s.page}>
        <div style={{ ...s.container, textAlign: 'center', paddingTop: '40px' }}>
          <div style={{ fontSize: '56px', marginBottom: '24px' }}>✅</div>
          <h2 style={{ color: '#c9a84c', fontSize: '24px', marginBottom: '16px', letterSpacing: '2px' }}>AGENDAMENTO CONFIRMADO!</h2>
          <p style={{ color: '#aaa', fontSize: '15px', lineHeight: '1.8', marginBottom: '8px' }}>
            <strong style={{ color: '#fff' }}>{nome}</strong>, seu agendamento foi realizado!
          </p>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '40px' }}>
            {servico.nome} — {formatarDataExibicao(dataSelecionada)} às {formatarHora(horaSelecionada)}
          </p>
          <a href="/" style={{ ...s.btnFinal, display: 'inline-block', textDecoration: 'none', padding: '16px 48px', width: 'auto' }}>
            VOLTAR AO INICIO
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.container}>

        <div style={s.titulo}>
          <p style={{ color: '#c9a84c', letterSpacing: '6px', fontSize: '12px', marginBottom: '12px' }}>BARBEARIA TH</p>
          <h1 style={{ fontSize: 'clamp(26px, 6vw, 40px)', fontWeight: '900', letterSpacing: '3px' }}>AGENDAR HORARIO</h1>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#c9a84c', margin: '16px auto 0' }} />
        </div>

        {/* Card 1 — Servico */}
        <div style={s.card}>
          <div style={s.cardHeader}>
            <div style={servico ? s.numero : s.numeroInativo}>1</div>
            <span style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', color: servico ? '#fff' : '#555' }}>ESCOLHA O SERVICO</span>
            {servico && <span style={{ marginLeft: 'auto', color: '#c9a84c', fontSize: '13px' }}>{servico.nome}</span>}
          </div>
          <div style={s.cardBody}>
            {servicos.map((sv, i) => (
              <button key={i} style={s.servicoBtn(servico?.nome === sv.nome)} onClick={() => setServico(sv)}>
                <span style={{ color: servico?.nome === sv.nome ? '#c9a84c' : '#ddd', fontSize: '14px', fontWeight: 'bold' }}>{sv.nome}</span>
                <span style={{ color: '#c9a84c', fontSize: '16px', fontWeight: 'bold' }}>{sv.preco}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Card 2 — Data */}
        <div style={s.card}>
          <div style={s.cardHeader}>
            <div style={dataSelecionada ? s.numero : s.numeroInativo}>2</div>
            <span style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', color: dataSelecionada ? '#fff' : '#555' }}>ESCOLHA O DIA</span>
            {dataSelecionada && <span style={{ marginLeft: 'auto', color: '#c9a84c', fontSize: '13px' }}>{formatarDataExibicao(dataSelecionada).split(',')[0]}</span>}
          </div>
          <div style={s.cardBody}>
            {carregando ? (
              <p style={{ color: '#555', fontSize: '14px' }}>Carregando...</p>
            ) : datas.length === 0 ? (
              <p style={{ color: '#555', fontSize: '14px' }}>Nenhum horario disponivel no momento.</p>
            ) : (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                {datas.map(({ data, diaSemana, diaMes, mes }) => (
                  <button key={data} style={s.diaBtn(dataSelecionada === data)} onClick={() => { setDataSelecionada(data); setHoraSelecionada(null); }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px' }}>{diaSemana.toUpperCase()}</span>
                    <span style={{ fontSize: '20px', fontWeight: '900' }}>{diaMes}</span>
                    <span style={{ fontSize: '10px' }}>{mes}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card 3 — Hora */}
        <div style={s.card}>
          <div style={s.cardHeader}>
            <div style={horaSelecionada ? s.numero : s.numeroInativo}>3</div>
            <span style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', color: horaSelecionada ? '#fff' : '#555' }}>ESCOLHA O HORARIO</span>
            {horaSelecionada && <span style={{ marginLeft: 'auto', color: '#c9a84c', fontSize: '13px' }}>{formatarHora(horaSelecionada)}</span>}
          </div>
          <div style={s.cardBody}>
            {!dataSelecionada ? (
              <p style={{ color: '#555', fontSize: '14px' }}>Selecione um dia primeiro.</p>
            ) : (
              <>
                {manha.length > 0 && (
                  <>
                    <p style={s.periodo}>☀️ MANHA</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                      {manha.map((h, i) => <button key={i} style={s.horaBtn(horaSelecionada === h.hora)} onClick={() => setHoraSelecionada(h.hora)}>{formatarHora(h.hora)}</button>)}
                    </div>
                  </>
                )}
                {tarde.length > 0 && (
                  <>
                    <p style={s.periodo}>🌤️ TARDE</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                      {tarde.map((h, i) => <button key={i} style={s.horaBtn(horaSelecionada === h.hora)} onClick={() => setHoraSelecionada(h.hora)}>{formatarHora(h.hora)}</button>)}
                    </div>
                  </>
                )}
                {noite.length > 0 && (
                  <>
                    <p style={s.periodo}>🌙 NOITE</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {noite.map((h, i) => <button key={i} style={s.horaBtn(horaSelecionada === h.hora)} onClick={() => setHoraSelecionada(h.hora)}>{formatarHora(h.hora)}</button>)}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Card 4 — Dados */}
        <div style={s.card}>
          <div style={s.cardHeader}>
            <div style={(nome && whatsapp) ? s.numero : s.numeroInativo}>4</div>
            <span style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', color: (nome && whatsapp) ? '#fff' : '#555' }}>SEUS DADOS</span>
          </div>
          <div style={s.cardBody}>
            <input style={s.input} placeholder="Seu nome completo" value={nome} onChange={e => setNome(e.target.value)} />
            <input style={s.input} placeholder="WhatsApp (ex: 21999999999)" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          </div>
        </div>

        {/* Resumo e confirmar */}
        {servico && dataSelecionada && horaSelecionada && nome && whatsapp && (
          <div style={{ ...s.card, border: '1px solid #c9a84c' }}>
            <div style={s.cardBody}>
              <p style={s.label}>RESUMO DO AGENDAMENTO</p>
              {[
                { l: 'Servico', v: servico.nome },
                { l: 'Preco', v: servico.preco },
                { l: 'Data', v: formatarDataExibicao(dataSelecionada) },
                { l: 'Hora', v: formatarHora(horaSelecionada) },
                { l: 'Nome', v: nome },
                { l: 'WhatsApp', v: whatsapp },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1a1a1a' }}>
                  <span style={{ color: '#666', fontSize: '13px' }}>{item.l}</span>
                  <span style={{ color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>{item.v}</span>
                </div>
              ))}
              <button style={s.btnFinal} onClick={confirmarAgendamento}>CONFIRMAR AGENDAMENTO</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}