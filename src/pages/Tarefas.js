import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TAREFAS, getTarefaConcluida } from '../data/tarefas';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const BLOCOS = [
  { key: 'topo', label: 'Topo de funil', cor: 'topo', bg: '#FBEAF0', corTexto: '#993556', desc: 'Atrai e gera identificação' },
  { key: 'meio', label: 'Meio de funil', cor: 'meio', bg: '#EEEDFE', corTexto: '#3C3489', desc: 'Educa e fortalece autoridade' },
  { key: 'fundo', label: 'Fundo de funil', cor: 'fundo', bg: '#E1F5EE', corTexto: '#085041', desc: 'Conduz para a decisão' }
];

export default function Tarefas() {
  const navigate = useNavigate();
  const { progresso, baseCompleta, proximaTarefa } = useApp();

  const totalConcluidas = TAREFAS.filter(t => getTarefaConcluida(progresso, t.id)).length;
  const progPct = Math.round((totalConcluidas / TAREFAS.length) * 100);

  function podeAcessar(tarefa) {
    if (!baseCompleta()) return false;
    if (tarefa.id === 6) return true;
    return getTarefaConcluida(progresso, tarefa.id - 1) || getTarefaConcluida(progresso, tarefa.id);
  }

  function getStatus(tarefa) {
    if (getTarefaConcluida(progresso, tarefa.id)) return 'done';
    if (!podeAcessar(tarefa)) return 'locked';
    const prev = tarefa.id > 6 ? getTarefaConcluida(progresso, tarefa.id - 1) : true;
    if (prev) return 'active';
    return 'locked';
  }

  if (!baseCompleta()) {
    return (
      <div>
        <Header titulo="Tarefas" />
        <div className="page" style={{ textAlign: 'center', paddingTop: '40px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔒</div>
          <h3 style={{ marginBottom: '8px' }}>Base incompleta</h3>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6', marginBottom: '20px' }}>
            Conclua as 5 etapas de base antes de produzir. A base é o que garante que seu conteúdo tenha identidade e direção.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-rose" style={{ maxWidth: '280px' }}>
            Ir para a base →
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div>
      <Header
        titulo="Tarefas"
        subtitulo="30 tarefas de produção"
        direita={
          <span style={{ fontSize: '11px', fontWeight: '600', color: '#D4537E', background: '#FBEAF0', padding: '3px 8px', borderRadius: '8px' }}>
            {progPct}%
          </span>
        }
      />
      <div className="page">

        {/* Progresso */}
        <div style={{ marginBottom: '16px' }}>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progPct}%` }} />
          </div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
            {totalConcluidas} de {TAREFAS.length} tarefas concluídas
          </div>
        </div>

        {/* Base */}
        <div style={{
          background: '#E1F5EE', border: '0.5px solid #9FE1CB',
          borderRadius: '8px', padding: '10px 14px', marginBottom: '12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#085041' }}>Base concluída ✓</div>
            <div style={{ fontSize: '10px', color: '#1D9E75' }}>5 etapas · identidade estruturada</div>
          </div>
          <span style={{ fontSize: '12px', color: '#1D9E75' }}>5/5</span>
        </div>

        {/* Blocos */}
        {BLOCOS.map(bloco => {
          const tarefasBloco = TAREFAS.filter(t => t.bloco === bloco.key);
          const concluidasBloco = tarefasBloco.filter(t => getTarefaConcluida(progresso, t.id)).length;

          return (
            <div key={bloco.key} style={{ marginBottom: '16px' }}>
              <div style={{
                background: bloco.bg, padding: '8px 12px', borderRadius: '8px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '6px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: bloco.corTexto }}>{bloco.label}</div>
                  <div style={{ fontSize: '9px', color: bloco.corTexto, opacity: 0.8 }}>{bloco.desc}</div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '600', color: bloco.corTexto }}>
                  {concluidasBloco}/{tarefasBloco.length}
                </span>
              </div>

              {tarefasBloco.map(tarefa => {
                const status = getStatus(tarefa);
                return (
                  <div
                    key={tarefa.id}
                    onClick={() => status !== 'locked' && navigate(`/tarefas/${tarefa.id}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 12px', borderRadius: '8px', marginBottom: '4px',
                      border: `0.5px solid ${status === 'active' ? '#D4537E' : status === 'done' ? '#1D9E75' : 'rgba(0,0,0,0.07)'}`,
                      background: status === 'active' ? '#FBEAF0' : status === 'done' ? '#E1F5EE' : 'white',
                      opacity: status === 'locked' ? 0.35 : 1,
                      cursor: status === 'locked' ? 'default' : 'pointer'
                    }}
                  >
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: status === 'done' ? '11px' : '10px', fontWeight: '700',
                      background: status === 'done' ? '#1D9E75' : status === 'active' ? '#D4537E' : 'rgba(0,0,0,0.05)',
                      color: status === 'done' || status === 'active' ? 'white' : '#888'
                    }}>
                      {status === 'done' ? '✓' : tarefa.id}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '12px', fontWeight: '600',
                        color: status === 'done' ? '#085041' : status === 'active' ? '#993556' : '#1a1a1a'
                      }}>
                        {tarefa.titulo}
                      </div>
                      {!tarefa.semPost && (
                        <div style={{ fontSize: '10px', color: '#888', marginTop: '1px' }}>
                          {tarefa.formatos.slice(0, 2).join(' · ')}
                        </div>
                      )}
                    </div>
                    {status !== 'locked' && (
                      <span style={{ fontSize: '13px', color: status === 'active' ? '#D4537E' : '#ccc' }}>→</span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Botão continuar */}
        {proximaTarefa() && (
          <button
            className="btn btn-rose"
            onClick={() => navigate(`/tarefas/${proximaTarefa()}`)}
            style={{ marginTop: '4px' }}
          >
            Continuar — Tarefa {proximaTarefa()} →
          </button>
        )}

      </div>
      <BottomNav />
    </div>
  );
}
