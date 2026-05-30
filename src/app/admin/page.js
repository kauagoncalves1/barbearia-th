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
    await supabase.from('agendamentos').delete().eq('id', id);
    buscarDados();
  }

  async function toggleGrade(id, ativo) {
    await supabase.from('grade_horarios').update({ ativo: !ativo }).eq('id', id);
    buscarDados();
  }

  function formatarDataHora(dt) {
    if (!dt) return '';
    return new Date(dt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  const estilo = {
    page: { minHeight: '100vh', backgroundColor: '#0a0a0a', padding: '40px 24px', color: '#fff' },
    card: { backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '32px', maxWidth: '420px', margin: '100px auto' },
    input: { width: '100%', backgroundColor: '#111', border: '1px solid #333', color: '#fff', padding: '14px 16px', fontSize: '14px', borderRadius: '2px', marginBottom: '16px', outline: 'none' },
    btn: { backgroundColor: '#c9a84c', color: '#0a0a0a', border: 'none', padding: '14px', fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', borderRadius: '2px', cursor: 'pointer', width: '100%' },
    btnPerigo: { backgroundColor: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '6px 14px', fontSize: '12px', borderRadius: '2px', cursor: 'pointer' },
    btnVerde: { backgroundColor: 'transparent', color: '#25D366', border: '1px solid #25D366', padding: '6px 14px', fontSize: '12px', borderRadius: '2px', cursor: 'pointer' },
    aba: (ativo) => ({ backgroundColor: ativo ? '#c9a84c' : 'transparent', color: ativo ? '#0a0a0a' : '#aaa', border: '1px solid ' + (ativo ? '#c9a84c' : '#333'), padding: '10px 20px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', borderRadius: '2px', cursor: 'pointer' }),
    tabela: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
    th: { color: '#c9a84c', fontSize: '11px', letterSpacing: '2px', padding: '12px 16px', borderBottom: '1px solid #2a2a2a', textAlign: 'left' },
    td: { padding: '14px 16px', borderBottom: '1px solid #1a1a1a', color: '#ddd', verticalAlign: 'middle' },
    secao: { backgroundColor: '#111', border: '1px solid #2a2a2a', borderRadius: '4px', overflow: 'auto', marginBottom: '24px' },
  };

  if (!logado) {
    return (
      <div style={estilo.page}>
        <div style={estilo.card}>
          <p style={{ color: '#c9a84c', letterSpacing: '4px', fontSize: '12px', marginBottom: '8px' }}>BARBEARIA TH</p>
          <h1 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '32px', letterSpacing: '2px' }}>PAINEL ADMIN</h1>
          <input style={estilo.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input style={estilo.input} type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} />
          {erroLogin && <p style={{ color: '#ff6b6b', fontSize: '13px', marginBottom: '16px' }}>{erroLogin}</p>}
          <button style={estilo.btn} onClick={login}>ENTRAR</button>
        </div>
      </div>
    );
  }

  return (
    <div style={estilo.page}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <p style={{ color: '#c9a84c', letterSpacing: '4px', fontSize: '12px' }}>BARBEARIA TH</p>
            <h1 style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '2px' }}>PAINEL ADMIN</h1>
          </div>
          <button onClick={logout} style={{ ...estilo.btnPerigo, borderColor: '#555', color: '#aaa' }}>SAIR</button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button style={estilo.aba(aba === 'agendamentos')} onClick={() => setAba('agendamentos')}>AGENDAMENTOS ({agendamentos.length})</button>
          <button style={estilo.aba(aba === 'bloqueios')} onClick={() => setAba('bloqueios')}>BLOQUEIOS</button>
          <button style={estilo.aba(aba === 'grade')} onClick={() => setAba('grade')}>GRADE DE HORARIOS</button>
        </div>

        {/* Agendamentos */}
        {aba === 'agendamentos' && (
          <div style={estilo.secao}>
            {carregando ? (
              <p style={{ color: '#666', padding: '32px', fontSize: '14px' }}>Carregando...</p>
            ) : agendamentos.length === 0 ? (
              <p style={{ color: '#666', padding: '32px', fontSize: '14px' }}>Nenhum agendamento ainda.</p>
            ) : (
              <table style={estilo.tabela}>
                <thead>
                  <tr>
                    <th style={estilo.th}>CLIENTE</th>
                    <th style={estilo.th}>WHATSAPP</th>
                    <th style={estilo.th}>SERVICO</th>
                    <th style={estilo.th}>DATA / HORA</th>
                    <th style={estilo.th}>ACAO</th>
                  </tr>
                </thead>
                <tbody>
                  {agendamentos.map(ag => (
                    <tr key={ag.id}>
                      <td style={estilo.td}>{ag.cliente_nome}</td>
                      <td style={estilo.td}>
                        <a href={'https://wa.me/55' + ag.cliente_whatsapp.replace(/\D/g, '')} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none' }}>
                          {ag.cliente_whatsapp}
                        </a>
                      </td>
                      <td style={estilo.td}>{ag.servico.split(' - ')[0]}</td>
                      <td style={estilo.td}>{formatarDataCurta(ag.data)} {formatarHora(ag.hora)}</td>
                      <td style={estilo.td}>
                        <button style={estilo.btnPerigo} onClick={() => deletarAgendamento(ag.id)}>CANCELAR</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Bloqueios */}
        {aba === 'bloqueios' && (
          <>
            <div style={{ ...estilo.secao, padding: '24px' }}>
              <p style={{ color: '#c9a84c', letterSpacing: '2px', fontSize: '12px', marginBottom: '20px' }}>BLOQUEAR DIA (folga, feriado, etc)</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ color: '#666', fontSize: '12px', marginBottom: '8px' }}>DATA</p>
                  <input type="date" style={{ ...estilo.input, marginBottom: 0, width: 'auto' }} value={novoBloqueiData} onChange={e => setNovoBloqueioData(e.target.value)} />
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '12px', marginBottom: '8px' }}>MOTIVO (opcional)</p>
                  <input type="text" placeholder="Ex: Folga" style={{ ...estilo.input, marginBottom: 0, width: 'auto' }} value={novoBloqueioMotivo} onChange={e => setNovoBloqueioMotivo(e.target.value)} />
                </div>
                <button onClick={adicionarBloqueio} style={{ ...estilo.btn, width: 'auto', padding: '14px 32px' }}>BLOQUEAR</button>
              </div>
            </div>
            <div style={estilo.secao}>
              {bloqueios.length === 0 ? (
                <p style={{ color: '#666', padding: '24px', fontSize: '14px' }}>Nenhum dia bloqueado.</p>
              ) : (
                <table style={estilo.tabela}>
                  <thead>
                    <tr>
                      <th style={estilo.th}>DATA</th>
                      <th style={estilo.th}>MOTIVO</th>
                      <th style={estilo.th}>ACAO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bloqueios.map(b => (
                      <tr key={b.id}>
                        <td style={estilo.td}>{formatarDataCurta(b.data)}</td>
                        <td style={estilo.td}>{b.motivo || '-'}</td>
                        <td style={estilo.td}><button style={estilo.btnPerigo} onClick={() => deletarBloqueio(b.id)}>REMOVER</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Grade */}
        {aba === 'grade' && (
          <div style={estilo.secao}>
            <table style={estilo.tabela}>
              <thead>
                <tr>
                  <th style={estilo.th}>DIA</th>
                  <th style={estilo.th}>INICIO</th>
                  <th style={estilo.th}>FIM</th>
                  <th style={estilo.th}>INTERVALO</th>
                  <th style={estilo.th}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {grade.map(g => (
                  <tr key={g.id}>
                    <td style={estilo.td}>{diasSemana[g.dia_semana]}</td>
                    <td style={estilo.td}>{formatarHora(g.hora_inicio)}</td>
                    <td style={estilo.td}>{formatarHora(g.hora_fim)}</td>
                    <td style={estilo.td}>{g.intervalo_minutos} min</td>
                    <td style={estilo.td}>
                      <button
                        style={g.ativo ? estilo.btnPerigo : estilo.btnVerde}
                        onClick={() => toggleGrade(g.id, g.ativo)}
                      >
                        {g.ativo ? 'DESATIVAR' : 'ATIVAR'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}