import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const ETAPAS_BASE = [
  { id: 1, key: 'cerebro', titulo: 'Segundo cérebro', sub: '5 blocos de identidade', path: '/base/cerebro' },
  { id: 2, key: 'bio', titulo: 'Bio magnética', sub: 'Gerada pela IA', path: '/base/bio' },
  { id: 3, key: 'editorial', titulo: 'Linha editorial', sub: '3 pilares estratégicos', path: '/base/editorial' },
  { id: 4, key: 'interesses', titulo: 'Interesses e repertório', sub: 'Banco de analogias', path: '/base/interesses' },
  { id: 5, key: 'autopercepcao', titulo: 'Autopercepção', sub: 'Versões que vai reforçar', path: '/base/autopercepcao' }
];

export default function Inicio() {
  const navigate = useNavigate();
  const { progresso, baseCompleta, etapaBase, proximaTarefa } = useApp();

  const etapaAtual = etapaBase();
  const totalBase = ETAPAS_BASE.filter(e => progresso[e.key]).length;
  const progPct = Math.round((totalBase / 5) * 100);

  function getStatusEtapa(etapa, idx) {
    if (progresso[etapa.key]) return 'done';
    if (idx + 1 === etapaAtual) return 'active';
    if (idx + 1 < etapaAtual) return 'done';
    return 'locked';
  }

  function continuar() {
    if (!baseCompleta()) {
      const proxEtapa = ETAPAS_BASE.find(e => !progresso[e.key]);
      if (proxEtapa) navigate(proxEtapa.path);
    } else {
      navigate('/tarefas');
    }
  }

  return (
    <div>
      <Header />
      <div className="page">

        {/* Progresso geral */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', color: '#888' }}>Progresso geral</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#D4537E' }}>{progPct}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progPct}%` }} />
          </div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '3px' }}>
            {totalBase} de 5 etapas de base concluídas
          </div>
        </div>

        {/* Base */}
        <div style={{ marginBottom: '8px' }}>
          <span className="bloco-label bloco-base">Base — construção da identidade</span>
        </div>

        {ETAPAS_BASE.map((etapa, idx) => {
          const status = getStatusEtapa(etapa, idx);
          return (
            <div
              key={etapa.id}
              onClick={() => status !== 'locked' && navigate(etapa.path)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', borderRadius: '10px',
                border: `0.5px solid ${status === 'active' ? '#D4537E' : status === 'done' ? '#1D9E75' : 'rgba(0,0,0,0.08)'}`,
                background: status === 'active' ? '#FBEAF0' : status === 'done' ? '#E1F5EE' : 'white',
                marginBottom: '6px',
                opacity: status === 'locked' ? 0.4 : 1,
                cursor: status === 'locked' ? 'default' : 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: status === 'done' ? '12px' : '11px', fontWeight: '700',
                background: status === 'done' ? '#1D9E75' : status === 'active' ? '#D4537E' : 'rgba(0,0,0,0.06)',
                color: status === 'done' || status === 'active' ? 'white' : '#888'
              }}>
                {status === 'done' ? '✓' : etapa.id}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '13px', fontWeight: '600',
                  color: status === 'done' ? '#085041' : status === 'active' ? '#993556' : '#1a1a1a'
                }}>
                  {etapa.titulo}
                </div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: '1px' }}>{etapa.sub}</div>
              </div>
              {status !== 'locked' && (
                <span style={{ fontSize: '14px', color: status === 'active' ? '#D4537E' : '#888' }}>→</span>
              )}
            </div>
          );
        })}

        {/* Produção */}
        <div style={{ marginTop: '16px', marginBottom: '8px' }}>
          <span className="bloco-label bloco-topo">Produção — 30 tarefas</span>
        </div>

        {!baseCompleta() ? (
          <div style={{
            padding: '14px', borderRadius: '10px',
            background: 'rgba(0,0,0,0.03)',
            border: '0.5px solid rgba(0,0,0,0.06)',
            opacity: 0.5
          }}>
            <div style={{ fontSize: '13px', color: '#888' }}>
              Disponível após concluir as 5 etapas de base
            </div>
          </div>
        ) : (
          <div
            onClick={() => navigate('/tarefas')}
            style={{
              padding: '14px 16px', borderRadius: '10px',
              border: '0.5px solid #D4537E', background: '#FBEAF0',
              cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#993556' }}>
                Ver todas as tarefas
              </div>
              <div style={{ fontSize: '11px', color: '#D4537E', marginTop: '2px' }}>
                30 tarefas · {Object.keys(progresso).filter(k => k.startsWith('tarefa_') && progresso[k]?.concluida).length} concluídas
              </div>
            </div>
            <span style={{ fontSize: '18px', color: '#D4537E' }}>→</span>
          </div>
        )}

        {/* Botão continuar */}
        <button
          className="btn btn-rose"
          onClick={continuar}
          style={{ marginTop: '20px' }}
        >
          {!baseCompleta()
            ? `Continuar — ${ETAPAS_BASE.find(e => !progresso[e.key])?.titulo || 'Base'} →`
            : proximaTarefa()
              ? `Continuar — Tarefa ${proximaTarefa()} →`
              : 'Ver tarefas →'
          }
        </button>

      </div>
      <BottomNav />
    </div>
  );
}
