'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { formatarDataCurta, formatarHora } from '../utils';

export default function Admin() {
  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const [bloqueios, setBloqueios] = useState([]);
  const [grade, setGrade] = useState([]);
  const [aba, setAba] = useState('agendamentos');
  const [novoBloqueiData, setNovoBloqueioData] = useState('');
  const [novoBloqueioMotivo, setNovoBloqueioMotivo] = useState('');
  const [carregando, setCarregando] = useState(false);

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { setLogado(true); buscarDados(); }
    });
  }, []);

  async function login() {
    setErroLogin('');
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) { setErroLogin('Email ou senha incorretos.'); }
    else { setLogado(true); buscarDados(); }
  }

  async function logout() {
    await supabase.auth.signOut();
    setLogado(false);
  }

  async function buscarDados() {
    setCarregando(true);
    const { data: ag } = await supabase.from('agendamentos').select('*').order('data').order('hora');
    const { data: bl } = await supabase.from('bloqueios').select('*').order('data');
    const { data: gr } = await supabase.from('grade_horarios').select('*').order('dia_semana');
    setAgendamentos(ag || []);
    setBloqueios(bl || []);
    setGrade(gr || []);
    setCarregando(false);
  }

  async function adicionarBloqueio() {
    if (!novoBloqueiData) return;
    await supabase.from('bloqueios').insert([{ data: novoBloqueiData, motivo: novoBloqueioMotivo }]);
    setNovoBloqueioData('');
    setNovoBloqueioMotivo('');
    buscarDados();
  }

  async function deletarBloqueio(id) {
    await supabase.from('bloqueios').delete().eq('id', id);
    buscarDados();
  }

  async function deletarAgendamento(id) {
    if (!confirm('Cancelar este agendamento?')) return;
    await supabase.from('agendamentos').delete().eq('id', id);
    buscarDados();
  }

  async function toggleGrade(id, ativo) {
    await supabase.from('grade_horarios').update({ ativo: !ativo }).eq('id', id);
    buscarDados();
  }

  const s = {
    page: { minHeight: '100vh', backgroundColor: '#0a0a0a', padding: '24px 16px', color: '#fff' },
    loginCard: { backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '32px 24px', maxWidth: '380px', margin: '80px auto' },
    input: { width: '100%', backgroundColor: '#111', border: '1px solid #2a2a2a', color: '#fff', padding: '14px 16px', fontSize: '14px', borderRadius: '6px', marginBottom: '12px', outline: 'none', boxSizing: 'border-box' },
    btn: { backgroundColor: '#c9a84c', color: '#0a0a0a', border: 'none', padding: '14px', fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', borderRadius: '6px', cursor: 'pointer', width: '100%' },
    btnPerigo: { backgroundColor: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '6px 14px', fontSize: '12px', borderRadius: '4px', cursor: 'pointer' },
    btnVerde: { backgroundColor: 'transparent', color: '#25D366', border: '1px solid #25D366', padding: '6px 14px', fontSize: '12px', borderRadius: '4px', cursor: 'pointer' },
    aba: (ativo) => ({ backgroundColor: ativo ? '#c9a84c' : '#1a1a1a', color: ativo ? '#0a0a0a' : '#aaa', border: '1px solid ' + (ativo ? '#c9a84c' : '#2a2a2a'), padding: '10px 16px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', borderRadius: '6px', cursor: 'pointer' }),
    card: { backgroundColor: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px', marginBottom: '12px' },
    tag: (cor) => ({ display: 'inline-block', backgroundColor: cor + '22', color: cor, border: '1px solid ' + cor + '44', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px' }),
  };

  if (!logado) {
    return (
      <div style={s.page}>
        <div style={s.loginCard}>
          <p style={{ color: '#c9a84c', letterSpacing: '4px', fontSize: '11px', marginBottom: '8px' }}>BARBEARIA TH</p>
          <h1 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '28px', letterSpacing: '2px' }}>PAINEL ADMIN</h1>
          <input style={s.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input style={s.input} type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} />
          {erroLogin && <p style={{ color: '#ff6b6b', fontSize: '13px', marginBottom: '12px' }}>{erroLogin}</p>}
          <button style={s.btn} onClick={login}>ENTRAR</button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <p style={{ color: '#c9a84c', letterSpacing: '4px', fontSize: '11px' }}>BARBEARIA TH</p>
            <h1 style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '2px' }}>PAINEL ADMIN</h1>
          </div>
          <button onClick={logout} style={{ ...s.btnPerigo, borderColor: '#333', color: '#666' }}>SAIR</button>
        </div>

        {/* Abas */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button style={s.aba(aba === 'agendamentos')} onClick={() => setAba('agendamentos')}>AGENDAMENTOS ({agendamentos.length})</button>
          <button style={s.aba(aba === 'bloqueios')} onClick={() => setAba('bloqueios')}>BLOQUEIOS</button>
          <button style={s.aba(aba === 'grade')} onClick={() => setAba('grade')}>GRADE</button>
        </div>

        {/* Agendamentos — cards */}
        {aba === 'agendamentos' && (
          <>
            {carregando ? (
              <p style={{ color: '#555', fontSize: '14px' }}>Carregando...</p>
            ) : agendamentos.length === 0 ? (
              <div style={{ ...s.card, textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#555', fontSize: '14px' }}>Nenhum agendamento ainda.</p>
              </div>
            ) : agendamentos.map(ag => (
              <div key={ag.id} style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>{ag.cliente_nome}</p>
                    <a href={'https://wa.me/55' + ag.cliente_whatsapp.replace(/\D/g, '')} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: '13px', textDecoration: 'none' }}>
                      📱 {ag.cliente_whatsapp}
                    </a>
                  </div>
                  <button style={s.btnPerigo} onClick={() => deletarAgendamento(ag.id)}>CANCELAR</button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={s.tag('#c9a84c')}>{ag.servico.split(' - ')[0]}</span>
                  <span style={s.tag('#7c7cf7')}>{formatarDataCurta(ag.data)}</span>
                  <span style={s.tag('#aaa')}>{formatarHora(ag.hora)}</span>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Bloqueios */}
        {aba === 'bloqueios' && (
          <>
            <div style={{ ...s.card, marginBottom: '16px' }}>
              <p style={{ color: '#c9a84c', letterSpacing: '2px', fontSize: '11px', marginBottom: '16px' }}>BLOQUEAR DIA</p>
              <input type="date" style={{ ...s.input, marginBottom: '10px' }} value={novoBloqueiData} onChange={e => setNovoBloqueioData(e.target.value)} />
              <input type="text" placeholder="Motivo (opcional)" style={{ ...s.input, marginBottom: '12px' }} value={novoBloqueioMotivo} onChange={e => setNovoBloqueioMotivo(e.target.value)} />
              <button onClick={adicionarBloqueio} style={{ ...s.btn, padding: '12px' }}>BLOQUEAR DIA</button>
            </div>
            {bloqueios.length === 0 ? (
              <div style={{ ...s.card, textAlign: 'center', padding: '32px' }}>
                <p style={{ color: '#555', fontSize: '14px' }}>Nenhum dia bloqueado.</p>
              </div>
            ) : bloqueios.map(b => (
              <div key={b.id} style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '14px' }}>{formatarDataCurta(b.data)}</p>
                    {b.motivo && <p style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>{b.motivo}</p>}
                  </div>
                  <button style={s.btnPerigo} onClick={() => deletarBloqueio(b.id)}>REMOVER</button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Grade */}
        {aba === 'grade' && (
          <>
            <p style={{ color: '#555', fontSize: '12px', marginBottom: '16px' }}>Ative ou desative dias da semana na grade de horarios.</p>
            {grade.map(g => (
              <div key={g.id} style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>{diasSemana[g.dia_semana]}</p>
                    <p style={{ color: '#666', fontSize: '13px' }}>{formatarHora(g.hora_inicio)} — {formatarHora(g.hora_fim)} · a cada {g.intervalo_minutos}min</p>
                  </div>
                  <button style={g.ativo ? s.btnPerigo : s.btnVerde} onClick={() => toggleGrade(g.id, g.ativo)}>
                    {g.ativo ? 'DESATIVAR' : 'ATIVAR'}
                  </button>
                </div>
                {g.ativo && <div style={{ marginTop: '10px' }}><span style={s.tag('#25D366')}>ATIVO</span></div>}
                {!g.ativo && <div style={{ marginTop: '10px' }}><span style={s.tag('#ff6b6b')}>INATIVO</span></div>}
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
}