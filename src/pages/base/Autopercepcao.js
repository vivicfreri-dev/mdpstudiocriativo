import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

const VERSOES_SUGERIDAS = [
  'Mentora', 'Professora', 'Estudiosa', 'Empresária', 'Especialista',
  'Consultora', 'Estrategista', 'Criadora', 'Liderança', 'Referência'
];

export default function Autopercepcao() {
  const navigate = useNavigate();
  const { perfil, salvarPerfil, concluirEtapa } = useApp();
  const saved = perfil?.autopercepcao || {};

  const [comoeVe, setComoVe] = useState(saved.comoVe || '');
  const [comoVeem, setComoVeem] = useState(saved.comoVeem || '');
  const [versoes, setVersoes] = useState(saved.versoes || []);
  const [versoesSel, setVersoesSel] = useState(saved.versoesSel || []);
  const [novaVersao, setNovaVersao] = useState('');
  const [reforco, setReforco] = useState(saved.reforco || '');
  const [saving, setSaving] = useState(false);
  const [celebrando, setCelebrando] = useState(false);

  const todasVersoes = [...new Set([...VERSOES_SUGERIDAS, ...versoes])];

  function toggleVersao(v) {
    if (versoesSel.includes(v)) {
      setVersoesSel(versoesSel.filter(x => x !== v));
    } else if (versoesSel.length < 3) {
      setVersoesSel([...versoesSel, v]);
    }
  }

  function adicionarVersao() {
    if (novaVersao.trim() && !versoes.includes(novaVersao.trim())) {
      setVersoes([...versoes, novaVersao.trim()]);
      setNovaVersao('');
    }
  }

  async function concluir() {
    setSaving(true);
    await salvarPerfil({
      ...perfil,
      autopercepcao: { comoVe: comoeVe, comoVeem, versoes: todasVersoes, versoesSel, reforco }
    });
    await concluirEtapa('autopercepcao');
    setCelebrando(true);
    setTimeout(() => navigate('/'), 2500);
  }

  if (celebrando) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '24px',
        background: '#FBEAF0', textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ color: '#D4537E', marginBottom: '8px' }}>Base completa!</h2>
        <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6' }}>
          Sua identidade está estruturada.<br />
          Agora é hora de produzir com autoridade.
        </p>
        <div style={{ marginTop: '16px' }}>
          <div className="loading-dots"><span></span><span></span><span></span></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header titulo="Autopercepção" subtitulo="Etapa 5 de 5 — última de base" back={true} />
      <div className="page">

        <div className="progress-bar" style={{ marginBottom: '12px' }}>
          <div className="progress-fill" style={{ width: '90%' }} />
        </div>

        <div className="form-group">
          <label>Como você se percebe?</label>
          <textarea
            placeholder="Como você se enxerga — características, pontos fortes, dúvidas..."
            value={comoeVe}
            onChange={e => setComoVe(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Como as pessoas costumam te ver?</label>
          <textarea
            placeholder="Feedbacks que já recebeu, como se apresenta, impressão que passa..."
            value={comoVeem}
            onChange={e => setComoVeem(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Versões que aparecem no digital</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
            {todasVersoes.map(v => (
              <span key={v} className={`tag ${versoesSel.includes(v) ? 'sel' : ''}`} onClick={() => toggleVersao(v)}>
                {v}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input
              placeholder="Adicionar versão..."
              value={novaVersao}
              onChange={e => setNovaVersao(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && adicionarVersao()}
              style={{ flex: 1 }}
            />
            <button onClick={adicionarVersao} className="btn btn-outline btn-sm">
              + Add
            </button>
          </div>
        </div>

        {versoesSel.length > 0 && (
          <div style={{
            background: '#FBEAF0', border: '0.5px solid #F4C0D1',
            borderRadius: '8px', padding: '10px 12px', marginBottom: '12px'
          }}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#D4537E', marginBottom: '6px' }}>
              ✓ Vai reforçar ({versoesSel.length}/3):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {versoesSel.map(v => (
                <span key={v} className="tag sel">{v}</span>
              ))}
            </div>
            {versoesSel.length === 3 && (
              <p style={{ fontSize: '10px', color: '#993556', marginTop: '4px' }}>
                Máximo de 3 versões atingido.
              </p>
            )}
          </div>
        )}

        <div className="form-group">
          <label>O que vai reforçar nos conteúdos?</label>
          <textarea
            placeholder="Ex: Vou reforçar minha versão de mentora estratégica e professora prática. Menos empresária por enquanto..."
            value={reforco}
            onChange={e => setReforco(e.target.value)}
          />
        </div>

        <button
          onClick={concluir}
          disabled={saving || !comoeVe || !versoesSel.length}
          className="btn btn-rose"
          style={{ marginTop: '8px' }}
        >
          {saving ? 'Salvando...' : 'Concluir base → Ir para produção 🎉'}
        </button>

      </div>
      <BottomNav />
    </div>
  );
}
