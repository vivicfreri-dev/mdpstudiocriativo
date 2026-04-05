import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { gerarTexto } from '../../gemini';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

const FUNIL_CORES = {
  topo: { bg: '#FBEAF0', cor: '#993556', label: 'Topo de funil' },
  meio: { bg: '#EEEDFE', cor: '#3C3489', label: 'Meio de funil' },
  fundo: { bg: '#E1F5EE', cor: '#085041', label: 'Fundo de funil' }
};

export default function LinhaEditorial() {
  const navigate = useNavigate();
  const { cerebro, perfil, salvarPerfil, concluirEtapa } = useApp();
  const [pilares, setPilares] = useState(perfil?.editorial?.pilares || []);
  const [loading, setLoading] = useState(false);
  const [abertos, setAbertos] = useState([0, 1, 2]);
  const [saving, setSaving] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!pilares.length && cerebro) gerar();
  }, [cerebro]);

  async function gerar() {
    if (!cerebro) return;
    setLoading(true);
    try {
      const prompt = `Crie uma linha editorial estratégica de 3 pilares para Instagram.

Retorne APENAS este JSON sem markdown:
{
  "pilares": [
    {
      "id": 1,
      "nome": "Nome do Pilar",
      "funil": "topo",
      "descricao": "Objetivo deste pilar",
      "temas": [
        {"titulo": "Tema 1", "gancho": "tipo de gancho estratégico"},
        {"titulo": "Tema 2", "gancho": "tipo de gancho estratégico"},
        {"titulo": "Tema 3", "gancho": "tipo de gancho estratégico"},
        {"titulo": "Tema 4", "gancho": "tipo de gancho estratégico"}
      ]
    },
    {
      "id": 2,
      "nome": "Nome do Pilar",
      "funil": "meio",
      "descricao": "Objetivo deste pilar",
      "temas": [...]
    },
    {
      "id": 3,
      "nome": "Nome do Pilar",
      "funil": "fundo",
      "descricao": "Objetivo deste pilar",
      "temas": [...]
    }
  ]
}

REGRAS:
- Pilar 1 (topo): conexão, identificação, alcance
- Pilar 2 (meio): autoridade, educação, método
- Pilar 3 (fundo): desejo, decisão, venda
- Temas conectados diretamente com a oferta da criadora
- Ganchos estratégicos específicos (ex: "ruptura de crença", "consequência futura", "diferencial")
- Temas personalizados para o contexto dela, não genéricos`;

      const resp = await gerarTexto(prompt, cerebro);
      const data = JSON.parse(resp);
      setPilares(data.pilares || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  function togglePilar(idx) {
    setAbertos(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  }

  async function salvarEAvancar() {
    setSaving(true);
    await salvarPerfil({ ...perfil, editorial: { pilares } });
    await concluirEtapa('editorial');
    navigate('/base/interesses');
  }

  return (
    <div>
      <Header titulo="Linha editorial" subtitulo="Etapa 3 de 5 · Gerada pela IA" back={true} />
      <div className="page">

        <div className="progress-bar" style={{ marginBottom: '12px' }}>
          <div className="progress-fill" style={{ width: '60%' }} />
        </div>

        <p style={{ fontSize: '12px', color: '#888', marginBottom: '14px' }}>
          Seus 3 pilares estratégicos conectados com sua oferta. Cada tema clicável vira um conteúdo.
        </p>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="loading-dots"><span></span><span></span><span></span></div>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '12px' }}>Criando sua linha editorial...</p>
          </div>
        )}

        {!loading && pilares.map((pilar, idx) => {
          const fc = FUNIL_CORES[pilar.funil] || FUNIL_CORES.topo;
          const aberto = abertos.includes(idx);
          return (
            <div key={pilar.id} style={{ marginBottom: '8px', borderRadius: '10px', overflow: 'hidden', border: '0.5px solid rgba(0,0,0,0.08)' }}>
              {/* Header do pilar */}
              <div
                onClick={() => togglePilar(idx)}
                style={{
                  background: fc.bg, padding: '10px 14px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: fc.cor }}>
                    Pilar {pilar.id} — {pilar.nome}
                  </div>
                  <div style={{ fontSize: '10px', color: fc.cor, opacity: 0.8, marginTop: '1px' }}>
                    {fc.label}
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: fc.cor }}>{aberto ? '▲' : '▼'}</span>
              </div>

              {/* Temas */}
              {aberto && (
                <div style={{ background: 'white', padding: '4px 0' }}>
                  {(pilar.temas || []).map((tema, tidx) => (
                    <div
                      key={tidx}
                      onClick={() => navigate(`/tarefas/tema?tema=${encodeURIComponent(tema.titulo)}&pilar=${pilar.funil}`)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '8px',
                        padding: '8px 14px',
                        borderBottom: tidx < pilar.temas.length - 1 ? '0.5px solid rgba(0,0,0,0.05)' : 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: fc.cor, flexShrink: 0, marginTop: '5px'
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', fontWeight: '500', color: '#1a1a1a' }}>{tema.titulo}</div>
                        <div style={{ fontSize: '10px', color: '#888', marginTop: '1px' }}>{tema.gancho}</div>
                      </div>
                      <span style={{ fontSize: '12px', color: '#D4537E' }}>→</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {!loading && pilares.length > 0 && (
          <>
            <button onClick={gerar} className="btn btn-outline" style={{ marginBottom: '8px', marginTop: '4px' }}>
              ↻ Regerar linha editorial
            </button>
            <button onClick={salvarEAvancar} disabled={saving} className="btn btn-rose">
              {saving ? 'Salvando...' : 'Salvar e avançar →'}
            </button>
          </>
        )}

      </div>
      <BottomNav />
    </div>
  );
}
