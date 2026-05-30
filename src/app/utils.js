export function gerarHorariosDisponiveis(grade, agendamentos, bloqueios, diasParaFrente = 14) {
  const resultado = [];
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  for (let i = 1; i <= diasParaFrente; i++) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + i);
    const diaSemana = data.getDay();
    const dataStr = data.toISOString().split('T')[0];

    // Verifica se o dia está bloqueado
    const bloqueado = bloqueios.some(b => b.data === dataStr);
    if (bloqueado) continue;

    // Busca grade para esse dia da semana
    const gradesDia = grade.filter(g => g.dia_semana === diaSemana && g.ativo);
    if (gradesDia.length === 0) continue;

    for (const g of gradesDia) {
      const [hiH, hiM] = g.hora_inicio.split(':').map(Number);
      const [hfH, hfM] = g.hora_fim.split(':').map(Number);
      const inicio = hiH * 60 + hiM;
      const fim = hfH * 60 + hfM;
      const intervalo = g.intervalo_minutos;

      for (let minutos = inicio; minutos < fim; minutos += intervalo) {
        const hora = `${String(Math.floor(minutos / 60)).padStart(2, '0')}:${String(minutos % 60).padStart(2, '0')}:00`;
        const jaAgendado = agendamentos.some(a => a.data === dataStr && a.hora.slice(0, 5) === hora.slice(0, 5));
        if (!jaAgendado) {
          resultado.push({ data: dataStr, hora });
        }
      }
    }
  }

  return resultado;
}

export function formatarDataExibicao(dataStr) {
  const d = new Date(dataStr + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
}

export function formatarDataCurta(dataStr) {
  const d = new Date(dataStr + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
}

export function formatarHora(hora) {
  return hora?.slice(0, 5) || '';
}

export function agruparPorData(horarios) {
  const grupos = {};
  for (const h of horarios) {
    if (!grupos[h.data]) grupos[h.data] = [];
    grupos[h.data].push(h);
  }
  return grupos;
}