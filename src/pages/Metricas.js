import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { gerarTexto } from '../gemini';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function Metricas() {
  const { user, cerebro } = useApp();
  const [posts, setPosts] = useState([]);
  const [adicionando, setAdicionando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analisando, setAnalisando] = useState(false);
  const [analise, setAnalise] = useState('');
  const [novo, setNovo] = useState({
    data: new Date().toISOString().split('T')[0],
    formato: 'Carrossel',
    headline: '',
    curtidas: '', comentarios: '', salvamentos: '',
    compartilhamentos: '', alcance: '', seguidores: '',
    observacao: ''
  });

  useEffect(() => {
    if (user) carregarPosts();
  }, [user]);

  async function carregarPosts() {
    try {
      const q = query(collection(db, 'usuarios', user.uid, 'metricas'), orderBy('data', 'desc'));
      const snap = await getDocs(q);
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
    setLoading(false);
  }

  async function registrar() {
    if (!novo.headline) return;
    try {
      await addDoc(collection(db, 'usuarios', user.uid, 'metricas'), novo);
      setNovo({
        data: new Date().toISOString().split('T')[0],
        formato: 'Carrossel', headline: '',
        curtidas: '', comentarios: '', salvamentos: '',
        compartilhamentos: '', alcance: '', seguidores: '',
        observacao: ''
      });
      setAdicionando(false);
      carregarPosts();
    } catch (e) { console.error(e); }
  }

  async function analisar() {
    if (!posts.length) return;
    setAnalisando(true);
    try {
      const resumo = posts.slice(0, 10).map(p =>
        `${p.formato}: "${p.headline}" | ♥${p.curtidas} ★${p.salvamentos} 👁${p.alcance} | Obs: ${p.observacao || 'nenhuma'}`
      ).join('\n');

      const prompt = `Analise a performance dos posts abaixo e dê 3 insights objetivos sobre o que está funcionando e o que ajustar:

${resumo}

Retorne texto simples, direto, sem formatação markdown. Máximo 3 parágrafos curtos.`;

      const resp = await gerarTexto(prompt, cerebro);
      setAnalise(resp);
    } catch (e) { console.error(e); }
    setAnalisando(false);
  }

  const totais = posts.reduce((acc, p) => ({
    curtidas: acc.curtidas + (parseInt(p.curtidas) || 0),
    salvamentos: acc.salvamentos + (parseInt(p.salvamentos) || 0),
    seguidores: acc.seguidores + (parseInt(p.seguidores) || 0)
  }), { curtidas: 0, salvamentos: 0, seguidores: 0 });

  return (
    <div>
      <Header
        titulo="Métricas"
        direita={
          <button onClick={() => setAdicionando(true)} style={{
            background: '#FBEAF0', border: '0.5px solid #F4C0D1',
            borderRadius: '8px', padding: '4px 10px', fontSize: '11px',
            color: '#D4537E', cursor: 'pointer', fontWeight: '600'
          }}>
            + Registrar
          </button>
        }
      />
      <div className="page">

        {/* Cards de resumo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          {[
            { label: 'Posts', valor: posts.length },
            { label: 'Curtidas', valor: totais.curtidas },
            { label: 'Salvamentos', valor: totais.salvamentos },
            { label: 'Seg. novos', valor: totais.seguidores }
          ].map(item => (
            <div key={item.label} style={{ background: '#f8f6f3', borderRadius: '8px', padding: '10px 12px' }}>
              <div style={{ fontSize: '10px', color: '#888', marginBottom: '3px' }}>{item.label}</div>
              <div style={{ fontSize: '22px', fontWeight: '700' }}>{item.valor.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* Formulário de registro */}
        {adicionando && (
          <div style={{
            border: '0.5px solid #D4537E', borderRadius: '10px',
            padding: '14px', background: '#FBEAF0', marginBottom: '14px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#D4537E', marginBottom: '10px' }}>
              Registrar post
            </div>
            <div className="form-group">
              <label>Formato</label>
              <select value={novo.formato} onChange={e => setNovo({...novo, formato: e.target.value})}>
                {['Carrossel', 'Reels', 'Stories', 'Post estático'].map(f => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Headline do post</label>
              <input placeholder="Qual era o tema?" value={novo.headline} onChange={e => setNovo({...novo, headline: e.target.value})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '8px' }}>
              {['curtidas', 'comentarios', 'salvamentos'].map(k => (
                <div key={k}>
                  <label style={{ fontSize: '8px', fontWeight: '700', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>
                    {k}
                  </label>
                  <input type="number" placeholder="0" value={novo[k]} onChange={e => setNovo({...novo, [k]: e.target.value})} />
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
              {[['alcance', 'alcance'], ['seguidores', 'seg. novos']].map(([k, l]) => (
                <div key={k}>
                  <label style={{ fontSize: '8px', fontWeight: '700', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>
                    {l}
                  </label>
                  <input type="number" placeholder="0" value={novo[k]} onChange={e => setNovo({...novo, [k]: e.target.value})} />
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>Sua observação</label>
              <textarea placeholder="Ex: esse carrossel engajou muito, tema de amnésia ressoa forte..." value={novo.observacao} onChange={e => setNovo({...novo, observacao: e.target.value})} style={{ minHeight: '60px' }} />
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setAdicionando(false)} className="btn btn-outline" style={{ flex: 1, fontSize: '12px', padding: '8px' }}>Cancelar</button>
              <button onClick={registrar} className="btn btn-rose" style={{ flex: 2, fontSize: '12px', padding: '8px' }}>Salvar</button>
            </div>
          </div>
        )}

        {/* Lista de posts */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div className="loading-dots"><span></span><span></span><span></span></div>
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: '#888' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
            <p style={{ fontSize: '13px' }}>Nenhum post registrado ainda</p>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
              Histórico ({posts.length} posts)
            </div>
            {posts.map(post => (
              <div key={post.id} style={{
                border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px',
                padding: '10px 12px', marginBottom: '6px', background: 'white'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '2px' }}>{post.headline}</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>{post.formato} · {post.data}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                  <span style={{ fontSize: '10px', color: '#D4537E' }}>♥ {post.curtidas || 0}</span>
                  <span style={{ fontSize: '10px', color: '#888' }}>💬 {post.comentarios || 0}</span>
                  <span style={{ fontSize: '10px', color: '#1D9E75' }}>★ {post.salvamentos || 0}</span>
                  <span style={{ fontSize: '10px', color: '#888' }}>👤+{post.seguidores || 0}</span>
                </div>
                {post.observacao && (
                  <div style={{
                    background: '#FAEEDA', border: '0.5px solid #FAC775',
                    borderRadius: '5px', padding: '5px 8px', marginTop: '6px'
                  }}>
                    <p style={{ fontSize: '10px', color: '#412402', fontStyle: 'italic' }}>{post.observacao}</p>
                  </div>
                )}
              </div>
            ))}

            <button onClick={analisar} disabled={analisando} className="btn btn-outline" style={{ marginTop: '8px', fontSize: '12px' }}>
              {analisando ? '✨ Analisando...' : '✨ Analisar performance com IA'}
            </button>

            {analise && (
              <div style={{
                background: '#EEEDFE', border: '0.5px solid #CECBF6',
                borderRadius: '8px', padding: '12px', marginTop: '10px'
              }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#7F77DD', marginBottom: '6px' }}>
                  Análise da IA
                </div>
                <p style={{ fontSize: '12px', color: '#3C3489', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{analise}</p>
              </div>
            )}
          </>
        )}

      </div>
      <BottomNav />
    </div>
  );
}
