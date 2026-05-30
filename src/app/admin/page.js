'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function Admin() {
  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [aba, setAba] = useState('agendamentos');
  const [novaData, setNovaData] = useState('');
  const [novaHora, setNovaHora] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setLogado(true);
        buscarDados();
      }
    });
  }, []);

  async function login() {
    setErroLogin('');
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
      setErroLogin('Email ou senha incorretos.');
    } else {
      setLogado(true);
      buscarDados();
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setLogado(false);
  }

  async function buscarDados() {
    setCarregando(true);

    const { data: ag } = await supabase
      .from('agendamentos')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: hr } = await supabase
      .from('horarios')
      .select('*')
      .order('data', { ascending: true })
      .order('hora', { ascending: true });

    setAgendamentos(ag || []);
    setHorarios(hr || []);
    setCarregando(false);
  }

  async function adicionarHorario() {
    if (!novaData || !novaHora) return;
    await supabase.from('horarios').insert([{
      data: novaData,
      hora: novaHora + ':00',
      disponivel: true,
    }]);
    setNovaData('');
    setNovaHora('');
    buscarDados();
  }

  async function deletarHorario(id) {
    await supabase.from('horarios').delete().eq('id', id);
    buscarDados();
  }

  function getHorario(horario_id) {
    const h = horarios.find(h => h.id === horario_id);
    if (!h) return '-';
    return `${formatarData(h.data)} ${formatarHora(h.hora)}`;
  }

  function formatarData(data) {
    if (!data) return '';
    const d = new Date(data + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
  }

  function formatarHora(hora) {
    return hora?.slice(0, 5) || '';
  }

  function formatarDataHora(dt) {
    if (!dt) return '';
    return new Date(dt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  const estilo = {
    page: { minHeight: '100vh', backgroundColor: '#0a0a0a', padding: '40px 24px', color: '#fff' },
    card: { backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '32px', maxWidth: '420px', margin: '100px auto' },
    input: { width: '100%', backgroundColor: '#111', border: '1px solid #333', color: '#fff', padding: '14px 16px', fontSize: '14px', borderRadius: '2px', marginBottom: '16px', outline: 'none' },
    btn: { backgroundColor: '#c9a84c', color: '#0a0a0a', border: 'none', padding: '14px', fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', borderRadius: '2px', cursor: 'pointer', width: '100%' },
    btnPerigo: { backgroundColor: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '6px 14px', fontSize: '12px', borderRadius: '2px', cursor: 'pointer' },
    aba: (ativo) => ({ backgroundColor: ativo ? '#c9a84c' : 'transparent', color: ativo ? '#0a0a0a' : '#aaa', border: '1px solid ' + (ativo ? '#c9a84c' : '#333'), padding: '10px 24px', fontSize: '13px', fontWeight: 'bold', letterSpacing: '1px', borderRadius: '2px', cursor: 'pointer' }),
    tabela: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
    th: { color: '#c9a84c', fontSize: '11px', letterSpacing: '2px', padding: '12px 16px', borderBottom: '1px solid #2a2a2a', textAlign: 'left' },
    td: { padding: '14px 16px', borderBottom: '1px solid #1a1a1a', color: '#ddd', verticalAlign: 'middle' },
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

        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <button style={estilo.aba(aba === 'agendamentos')} onClick={() => setAba('agendamentos')}>AGENDAMENTOS</button>
          <button style={estilo.aba(aba === 'horarios')} onClick={() => setAba('horarios')}>HORARIOS</button>
        </div>

        {aba === 'agendamentos' && (
          <div style={{ backgroundColor: '#111', border: '1px solid #2a2a2a', borderRadius: '4px', overflow: 'auto' }}>
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
                    <th style={estilo.th}>CRIADO EM</th>
                  </tr>
                </thead>
                <tbody>
                  {agendamentos.map((ag) => (
                    <tr key={ag.id}>
                      <td style={estilo.td}>{ag.cliente_nome}</td>
                      <td style={estilo.td}>
                        <a href={'https://wa.me/55' + ag.cliente_whatsapp.replace(/\D/g, '')} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none' }}>
                          {ag.cliente_whatsapp}
                        </a>
                      </td>
                      <td style={estilo.td}>{ag.servico}</td>
                      <td style={estilo.td}>{getHorario(ag.horario_id)}</td>
                      <td style={estilo.td}>{formatarDataHora(ag.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {aba === 'horarios' && (
          <>
            <div style={{ backgroundColor: '#111', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '24px', marginBottom: '24px' }}>
              <p style={{ color: '#c9a84c', letterSpacing: '2px', fontSize: '12px', marginBottom: '20px' }}>ADICIONAR HORARIO</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ color: '#666', fontSize: '12px', marginBottom: '8px' }}>DATA</p>
                  <input type="date" style={{ ...estilo.input, marginBottom: 0, width: 'auto' }} value={novaData} onChange={e => setNovaData(e.target.value)} />
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '12px', marginBottom: '8px' }}>HORA</p>
                  <input type="time" style={{ ...estilo.input, marginBottom: 0, width: 'auto' }} value={novaHora} onChange={e => setNovaHora(e.target.value)} />
                </div>
                <button onClick={adicionarHorario} style={{ ...estilo.btn, width: 'auto', padding: '14px 32px' }}>ADICIONAR</button>
              </div>
            </div>

            <div style={{ backgroundColor: '#111', border: '1px solid #2a2a2a', borderRadius: '4px', overflow: 'auto' }}>
              {horarios.length === 0 ? (
                <p style={{ color: '#666', padding: '32px', fontSize: '14px' }}>Nenhum horario cadastrado.</p>
              ) : (
                <table style={estilo.tabela}>
                  <thead>
                    <tr>
                      <th style={estilo.th}>DATA</th>
                      <th style={estilo.th}>HORA</th>
                      <th style={estilo.th}>STATUS</th>
                      <th style={estilo.th}>ACAO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {horarios.map((h) => (
                      <tr key={h.id}>
                        <td style={estilo.td}>{formatarData(h.data)}</td>
                        <td style={estilo.td}>{formatarHora(h.hora)}</td>
                        <td style={estilo.td}>
                          <span style={{ color: h.disponivel ? '#25D366' : '#ff6b6b', fontSize: '12px', fontWeight: 'bold' }}>
                            {h.disponivel ? 'DISPONIVEL' : 'OCUPADO'}
                          </span>
                        </td>
                        <td style={estilo.td}>
                          <button style={estilo.btnPerigo} onClick={() => deletarHorario(h.id)}>DELETAR</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}