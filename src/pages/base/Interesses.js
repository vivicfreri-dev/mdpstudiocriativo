import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { gerarTexto } from '../../gemini';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

export default function Interesses() {
  const navigate = useNavigate();
  const { cerebro, perfil, salvarPerfil, concluirEtapa } = useApp();
  const [bloco, setBloco] = useState(0);
  const [dados, setDados] = useState(perfil?.interesses || {});
  const [conexoes, setConexoes] = useState(perfil?.interesses?.conexoes || []);
  const [loadingConexoes, setLoadingConexoes] = useState(false);
  const [saving, setSaving] = useState(false);

  function set(key, val) {
    setDados(prev => ({ ...prev, [key]: val }));
  }

  async function gerarConexoes() {
    if (!cerebro) return;
    setLoadingConexoes(true);
    try {
      const prompt = `Com base nos interesses da criadora e da persona, identifique pontos de conexão e sugira ideias de analogias para conteúdo.

INTERESSES DA CRIADORA: ${dados.interesses_proprios || ''}
INTERESSES DA PERSONA: ${dados.interesses_persona || ''}

Retorne APENAS JSON:
{
  "conexoes": [
    {"interesse": "interesse em comum ou ponto de cruzamento", "analogia": "ideia de conteúdo usando essa ponte"},
    {"interesse": "...", "analogia": "..."},
    {"interesse": "...", "analogia": "..."},
    {"interesse": "...", "analogia": "..."},
    {"interesse": "...", "analogia": "..."}
  ]
}`;

      const resp = await gerarTexto(prompt, cerebro);
      const data = JSON.parse(resp);
      setConexoes(data.conexoes || []);
    } catch (e) {
      console.error(e);
    }
    setLoadingConexoes(false);
  }

  async function salvarEAvancar() {
    setSaving(true);
    const dadosCompletos = { ...dados, conexoes };
    await salvarPerfil({ ...perfil, interesses: dadosCompletos });
    await concluirEtapa('interesses');
    navigate('/base/autopercepcao');
  }

  const BLOCOS_CONFIG = [
    {
      id: 1, titulo: '5 sentidos da sua persona', cor: '#D4537E',
      campos: [
        { key: 'persona_ve', label: 'O que ela vê / assiste?', placeholder: 'Séries, filmes, criadores, canais...' },
        { key: 'persona_ouve', label: 'O que ela ouve?', placeholder: 'Podcasts, músicas, vozes que influenciam...' },
        { key: 'persona_come', label: 'O que ela come / consome?', placeholder: 'Estilo de vida, alimentação, hábitos...' },
        { key: 'persona_faz', label: 'O que ela faz no tempo livre?', placeholder: 'Hobbies, atividades, rituais...' },
        { key: 'persona_sente', label: 'Cheiros e rituais do dia a dia?', placeholder: 'Café da manhã, rotina, pequenos prazeres...' }
      ]
    },
    {
      id: 2, titulo: '5 sentidos seus', cor: '#7F77DD',
      campos: [
        { key: 'propria_ve', label: 'O que você ama ver / assistir?', placeholder: 'Suas séries, filmes favoritos...' },
        { key: 'propria_ouve', label: 'O que você ouve?', placeholder: 'Podcasts, playlists, vozes que inspiram...' },
        { key: 'propria_come', label: 'Seu estilo de vida?', placeholder: 'Alimentação, hábitos, rotinas...' },
        { key: 'propria_faz', label: 'O que você faz no tempo livre?', placeholder: 'Hobbies, atividades, como desliga...' },
        { key: 'propria_sente', label: 'Seus rituais favoritos?', placeholder: 'Manhã, noite, hábitos que ama...' }
      ]
    }
  ];

  return (
    <div>
      <Header titulo="Interesses e repertório" subtitulo={`Etapa 4 de 5 · Bloco ${bloco + 1} de 3`} back={true} />
      <div className="page">

        <div className="progress-bar" style={{ marginBottom: '12px' }}>
          <div className="progress-fill" style={{ width: `${((bloco) / 3) * 100}%` }} />
        </div>

        {bloco < 2 && (
          <>
            <div style={{
              display: 'inline-block', padding: '3px 10px', borderRadius: '6px',
              background: `${BLOCOS_CONFIG[bloco].cor}20`, color: BLOCOS_CONFIG[bloco].cor,
              fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
              letterSpacing: '0.05em', marginBottom: '12px'
            }}>
              Bloco {bloco + 1} — {BLOCOS_CONFIG[bloco].titulo}
            </div>

            {BLOCOS_CONFIG[bloco].campos.map(campo => (
              <div key={campo.key} className="form-group">
                <label>{campo.label}</label>
                <textarea
                  placeholder={campo.placeholder}
                  value={dados[campo.key] || ''}
                  onChange={e => set(campo.key, e.target.value)}
                  style={{ minHeight: '64px' }}
                />
              </div>
            ))}

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={() => bloco > 0 ? setBloco(bloco - 1) : navigate('/')} className="btn btn-outline" style={{ flex: 1 }}>
                ← Voltar
              </button>
              <button onClick={() => { setBloco(bloco + 1); window.scrollTo(0, 0); }} className="btn btn-rose" style={{ flex: 2 }}>
                Próximo bloco →
              </button>
            </div>
          </>
        )}

        {bloco === 2 && (
          <>
            <div style={{
              display: 'inline-block', padding: '3px 10px', borderRadius: '6px',
              background: '#EEEDFE', color: '#3C3489',
              fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
              letterSpacing: '0.05em', marginBottom: '12px'
            }}>
              Bloco 3 — Conexões geradas pela IA
            </div>

            <p style={{ fontSize: '12px', color: '#888', marginBottom: '14px' }}>
              A IA vai identificar pontos de cruzamento entre seus interesses e os da persona — e sugerir analogias para conteúdos fora do óbvio.
            </p>

            {!conexoes.length && (
              <button onClick={gerarConexoes} disabled={loadingConexoes} className="btn btn-rose" style={{ marginBottom: '12px' }}>
                {loadingConexoes ? 'Gerando conexões...' : '✨ Gerar conexões com IA'}
              </button>
            )}

            {loadingConexoes && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div className="loading-dots"><span></span><span></span><span></span></div>
              </div>
            )}

            {conexoes.map((c, i) => (
              <div key={i} style={{
                border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px',
                padding: '10px 12px', marginBottom: '8px', background: '#FAFAFA'
              }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#7F77DD', marginBottom: '3px' }}>
                  {c.interesse}
                </div>
                <div style={{ fontSize: '12px', color: '#444' }}>{c.analogia}</div>
              </div>
            ))}

            {conexoes.length > 0 && (
              <button onClick={gerarConexoes} className="btn btn-outline" style={{ marginBottom: '8px' }}>
                ↻ Regerar conexões
              </button>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button onClick={() => setBloco(1)} className="btn btn-outline" style={{ flex: 1 }}>
                ← Voltar
              </button>
              <button onClick={salvarEAvancar} disabled={saving} className="btn btn-rose" style={{ flex: 2 }}>
                {saving ? 'Salvando...' : 'Salvar e avançar →'}
              </button>
            </div>
          </>
        )}

        {/* Indicadores */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '16px' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: i === bloco ? '20px' : '6px', height: '6px', borderRadius: '3px',
              background: i <= bloco ? '#D4537E' : 'rgba(0,0,0,0.1)', transition: 'all 0.2s'
            }} />
          ))}
        </div>

      </div>
      <BottomNav />
    </div>
  );
}
