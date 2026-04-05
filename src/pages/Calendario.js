import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const DIAS_SEMANA = ['D','S','T','Q','Q','S','S'];

const CORES_FORMATO = {
  'Carrossel': '#D4537E',
  'Reels': '#7F77DD',
  'Stories': '#1D9E75',
  'Post estático': '#BA7517',
  'Live': '#E24B4A'
};

export default function Calendario() {
  const hoje = new Date();
  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());
  const [posts, setPosts] = useState({});
  const [diaSel, setDiaSel] = useState(null);
  const [adicionando, setAdicionando] = useState(false);
  const [novoPost, setNovoPost] = useState({ formato: 'Carrossel', headline: '' });

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  function adicionarPost() {
    if (!novoPost.headline || !diaSel) return;
    const key = `${ano}-${mes}-${diaSel}`;
    setPosts(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), novoPost]
    }));
    setNovoPost({ formato: 'Carrossel', headline: '' });
    setAdicionando(false);
  }

  function mesAnterior() {
    if (mes === 0) { setMes(11); setAno(ano - 1); }
    else setMes(mes - 1);
    setDiaSel(null);
  }

  function proximoMes() {
    if (mes === 11) { setMes(0); setAno(ano + 1); }
    else setMes(mes + 1);
    setDiaSel(null);
  }

  const postsDodia = diaSel ? (posts[`${ano}-${mes}-${diaSel}`] || []) : [];

  return (
    <div>
      <Header titulo="Calendário" subtitulo={`${MESES[mes]} ${ano}`} />
      <div className="page">

        {/* Navegação de mês */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <button onClick={mesAnterior} style={{ background: 'none', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', fontSize: '14px' }}>←</button>
          <span style={{ fontWeight: '700', fontSize: '14px' }}>{MESES[mes]} {ano}</span>
          <button onClick={proximoMes} style={{ background: 'none', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', fontSize: '14px' }}>→</button>
        </div>

        {/* Calendário */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px', marginBottom: '12px' }}>
          {DIAS_SEMANA.map((d, i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: '10px', color: '#888', fontWeight: '600', padding: '4px 0' }}>{d}</div>
          ))}

          {Array(primeiroDia).fill(null).map((_, i) => <div key={`e-${i}`} />)}

          {Array(diasNoMes).fill(null).map((_, i) => {
            const dia = i + 1;
            const key = `${ano}-${mes}-${dia}`;
            const postsNoDia = posts[key] || [];
            const isHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();
            const isSel = dia === diaSel;

            return (
              <div
                key={dia}
                onClick={() => setDiaSel(dia)}
                style={{
                  border: `0.5px solid ${isSel ? '#D4537E' : isHoje ? '#1D9E75' : 'rgba(0,0,0,0.08)'}`,
                  borderRadius: '6px', padding: '4px 2px', textAlign: 'center',
                  background: isSel ? '#FBEAF0' : isHoje ? '#E1F5EE' : 'white',
                  cursor: 'pointer', minHeight: '36px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'
                }}
              >
                <div style={{
                  fontSize: '10px', fontWeight: isSel || isHoje ? '700' : '400',
                  color: isSel ? '#D4537E' : isHoje ? '#1D9E75' : '#1a1a1a',
                  marginBottom: '2px'
                }}>{dia}</div>
                {postsNoDia.slice(0, 2).map((p, pi) => (
                  <div key={pi} style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: CORES_FORMATO[p.formato] || '#888',
                    margin: '1px 0'
                  }} />
                ))}
              </div>
            );
          })}
        </div>

        {/* Legenda */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          {Object.entries(CORES_FORMATO).map(([fmt, cor]) => (
            <div key={fmt} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cor }} />
              <span style={{ fontSize: '10px', color: '#888' }}>{fmt}</span>
            </div>
          ))}
        </div>

        {/* Posts do dia selecionado */}
        {diaSel && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700' }}>
                {diaSel} de {MESES[mes]}
              </div>
              <button
                onClick={() => setAdicionando(true)}
                style={{ background: '#FBEAF0', border: '0.5px solid #F4C0D1', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', color: '#D4537E', cursor: 'pointer' }}
              >
                + Post
              </button>
            </div>

            {adicionando && (
              <div style={{ border: '0.5px solid #D4537E', borderRadius: '8px', padding: '12px', background: '#FBEAF0', marginBottom: '8px' }}>
                <div className="form-group">
                  <label>Formato</label>
                  <select value={novoPost.formato} onChange={e => setNovoPost({...novoPost, formato: e.target.value})}>
                    {Object.keys(CORES_FORMATO).map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Tema / headline</label>
                  <input placeholder="Sobre o que é o post?" value={novoPost.headline} onChange={e => setNovoPost({...novoPost, headline: e.target.value})} />
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => setAdicionando(false)} className="btn btn-outline btn-sm">Cancelar</button>
                  <button onClick={adicionarPost} className="btn btn-rose btn-sm">Adicionar</button>
                </div>
              </div>
            )}

            {postsDodia.length === 0 && !adicionando && (
              <p style={{ fontSize: '12px', color: '#888' }}>Nenhum post planejado para este dia.</p>
            )}

            {postsDodia.map((p, i) => (
              <div key={i} style={{
                border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px',
                padding: '10px 12px', marginBottom: '6px', background: 'white',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: CORES_FORMATO[p.formato] || '#888', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600' }}>{p.headline}</div>
                  <div style={{ fontSize: '10px', color: '#888' }}>{p.formato}</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
      <BottomNav />
    </div>
  );
}
