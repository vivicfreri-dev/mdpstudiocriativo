import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { gerarTexto } from '../gemini';
import { getTarefa, FORMATOS, EMOCOES, AMBIENTES, ROUPAS } from '../data/tarefas';
import { getPrompt } from '../data/prompts';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import SlideVisual from '../components/SlideVisual';

const ETAPAS = ['contexto', 'foto', 'tema', 'formato', 'criativo'];

export default function TarefaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cerebro, progresso, concluirTarefa, user } = useApp();

  const tarefa = getTarefa(parseInt(id));
  const [etapa, setEtapa] = useState('contexto');
  const [foto, setFoto] = useState(null);
  const [ambiente, setAmbiente] = useState('Casa');
  const [roupa, setRoupa] = useState('Profissional');
  const [emocaoSel, setEmocaoSel] = useState(tarefa?.emocao || 'confiante');
  const [tema, setTema] = useState('');
  const [temaCustom, setTemaCustom] = useState('');
  const [validacaoTema, setValidacaoTema] = useState(null);
  const [formatoSel, setFormatoSel] = useState('');
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validandoTema, setValidandoTema] = useState(false);
  const [concluindo, setConcluindo] = useState(false);
  const [sugestoesTema, setSugestoesTema] = useState([]);
  const [loadingSugestoes, setLoadingSugestoes] = useState(false);

  if (!tarefa) return <div className="page">Tarefa não encontrada</div>;

  const dor = cerebro?.oferta?.problema || '';
  const produto = cerebro?.oferta?.produto || '';

  // Gerar sugestões de tema
  async function gerarSugestoesTema() {
    if (!cerebro) return;
    setLoadingSugestoes(true);
    try {
      const prompt = `Sugira 3 temas para um post de "${tarefa.titulo}" no Instagram.

Retorne APENAS JSON:
{"sugestoes":[
  {"titulo":"Tema específico e direto","funil":"topo","objetivo":"por que faz sentido agora"},
  {"titulo":"Tema específico e direto","funil":"meio","objetivo":"por que faz sentido agora"},
  {"titulo":"Tema específico e direto","funil":"topo","objetivo":"por que faz sentido agora"}
]}

Os temas devem ser personalizados para a oferta e persona da criadora. Sem genéricos.`;

      const resp = await gerarTexto(prompt, cerebro);
      const data = JSON.parse(resp);
      setSugestoesTema(data.sugestoes || []);
    } catch (e) { console.error(e); }
    setLoadingSugestoes(false);
  }

  // Validar tema próprio
  async function validarTema(t) {
    if (!t.trim() || !cerebro) return;
    setValidandoTema(true);
    try {
      const prompt = `Avalie se este tema está alinhado com a oferta e momento da jornada:

TEMA: "${t}"
BLOCO ATUAL: ${tarefa.bloco} de funil
TAREFA: ${tarefa.titulo}

Retorne APENAS JSON:
{"alinhado":true,"mensagem":"texto curto explicando o alinhamento ou sugestão de ajuste"}`;

      const resp = await gerarTexto(prompt, cerebro);
      const data = JSON.parse(resp);
      setValidacaoTema(data);
    } catch (e) { console.error(e); }
    setValidandoTema(false);
  }

  // Gerar criativo
  async function gerarCriativo(formato) {
    const temaFinal = temaCustom.trim() || tema;
    if (!temaFinal) return;
    setFormatoSel(formato);
    setLoading(true);
    setEtapa('criativo');

    try {
      const prompt = getPrompt(formato, temaFinal, dor, produto);
      if (!prompt) {
        setSlides([{ num: 1, titulo: 'Formato em desenvolvimento', subtitulo: '', corpo: 'Em breve disponível.' }]);
        setLoading(false);
        return;
      }

      const resp = await gerarTexto(prompt, cerebro);
      let texto = resp.replace(/```json/gi, '').replace(/```/g, '').trim();
      const data = JSON.parse(texto);
      setSlides(data.slides || []);
    } catch (e) {
      console.error(e);
      setSlides([{ num: 1, titulo: 'Erro ao gerar', subtitulo: '', corpo: 'Tente novamente.' }]);
    }
    setLoading(false);
  }

  async function concluir() {
    setConcluindo(true);
    await concluirTarefa(tarefa.id);
    navigate('/tarefas');
  }

  const fmt = FORMATOS[formatoSel] || {};
  const temaFinal = temaCustom.trim() || tema;

  return (
    <div>
      <Header
        titulo={`Tarefa ${tarefa.id}`}
        subtitulo={tarefa.titulo}
        back={'/tarefas'}
      />
      <div className="page">

        {/* ETAPA: CONTEXTO */}
        {etapa === 'contexto' && (
          <div className="fade-in">
            <div style={{
              background: '#FBEAF0', border: '0.5px solid #F4C0D1',
              borderRadius: '10px', padding: '14px', marginBottom: '16px'
            }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#D4537E', textTransform: 'uppercase', marginBottom: '6px' }}>
                Por que esse conteúdo agora
              </div>
              <p style={{ fontSize: '13px', color: '#993556', lineHeight: '1.6' }}>{tarefa.descricao}</p>
            </div>

            {tarefa.dicaPost1 && (
              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Post 1
                </div>
                <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.5' }}>{tarefa.dicaPost1}</p>
              </div>
            )}

            {tarefa.dicaPost2 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Post 2
                </div>
                <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.5' }}>{tarefa.dicaPost2}</p>
              </div>
            )}

            {tarefa.semPost ? (
              <div>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>
                  Essa é uma tarefa de reflexão. Não gera post — gera clareza.
                </p>
                <button onClick={concluir} className="btn btn-rose">
                  {concluindo ? 'Concluindo...' : 'Marcar como concluída ✓'}
                </button>
              </div>
            ) : (
              <button onClick={() => { setEtapa('foto'); window.scrollTo(0,0); }} className="btn btn-rose">
                Começar →
              </button>
            )}
          </div>
        )}

        {/* ETAPA: FOTO */}
        {etapa === 'foto' && (
          <div className="fade-in">
            <h3 style={{ marginBottom: '4px' }}>Foto de referência</h3>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '14px' }}>
              Aparece nos slides 1 e 10 do carrossel.
            </p>

            {/* Upload */}
            <div
              onClick={() => document.getElementById('foto-input').click()}
              style={{
                border: '1.5px dashed rgba(212,83,126,0.4)',
                borderRadius: '10px', padding: '20px',
                textAlign: 'center', marginBottom: '14px', cursor: 'pointer',
                background: foto ? '#FBEAF0' : 'transparent'
              }}
            >
              {foto ? (
                <div>
                  <img src={foto} alt="" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ fontSize: '11px', color: '#D4537E', marginTop: '6px' }}>Foto selecionada · Toque para trocar</div>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '28px', marginBottom: '6px' }}>📷</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>Toque para enviar sua foto</div>
                  <div style={{ fontSize: '10px', color: '#D4537E', marginTop: '3px' }}>JPG ou PNG</div>
                </>
              )}
            </div>
            <input
              id="foto-input" type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = ev => setFoto(ev.target.result);
                  reader.readAsDataURL(file);
                }
              }}
            />

            {/* Ambiente */}
            <div className="form-group">
              <label>Ambiente</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {AMBIENTES.map(a => (
                  <span key={a} className={`tag ${ambiente === a ? 'sel' : ''}`} onClick={() => setAmbiente(a)}>{a}</span>
                ))}
              </div>
            </div>

            {/* Roupa */}
            <div className="form-group">
              <label>Roupa</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {ROUPAS.map(r => (
                  <span key={r} className={`tag ${roupa === r ? 'sel' : ''}`} onClick={() => setRoupa(r)}>{r}</span>
                ))}
              </div>
            </div>

            {/* Emoção sugerida */}
            <div className="form-group">
              <label>Emoção sugerida para esse post</label>
              <div style={{ background: '#FAEEDA', border: '0.5px solid #FAC775', borderRadius: '6px', padding: '6px 10px', marginBottom: '8px' }}>
                <p style={{ fontSize: '10px', color: '#412402' }}>
                  ⚡ Sugerido para {tarefa.titulo}: <strong>{EMOCOES.find(e => e.id === tarefa.emocao)?.label}</strong>
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {EMOCOES.map(em => (
                  <div
                    key={em.id}
                    onClick={() => setEmocaoSel(em.id)}
                    style={{
                      border: `0.5px solid ${emocaoSel === em.id ? '#D4537E' : 'rgba(0,0,0,0.1)'}`,
                      background: emocaoSel === em.id ? '#FBEAF0' : 'white',
                      borderRadius: '8px', padding: '8px 6px', textAlign: 'center', cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '18px', marginBottom: '3px' }}>{em.icone}</div>
                    <div style={{ fontSize: '9px', color: emocaoSel === em.id ? '#993556' : '#888', fontWeight: emocaoSel === em.id ? '600' : '400' }}>
                      {em.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={() => setEtapa('contexto')} className="btn btn-outline" style={{ flex: 1 }}>← Voltar</button>
              <button onClick={() => { setEtapa('tema'); gerarSugestoesTema(); window.scrollTo(0,0); }} className="btn btn-rose" style={{ flex: 2 }}>
                Próximo — Tema →
              </button>
            </div>
          </div>
        )}

        {/* ETAPA: TEMA */}
        {etapa === 'tema' && (
          <div className="fade-in">
            <h3 style={{ marginBottom: '4px' }}>Escolher tema</h3>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '14px' }}>
              Sugestões baseadas no seu segundo cérebro e momento da jornada.
            </p>

            {loadingSugestoes && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div className="loading-dots"><span></span><span></span><span></span></div>
              </div>
            )}

            {sugestoesTema.map((s, i) => (
              <div
                key={i}
                onClick={() => { setTema(s.titulo); setTemaCustom(''); setValidacaoTema(null); }}
                style={{
                  border: `0.5px solid ${tema === s.titulo ? '#D4537E' : 'rgba(0,0,0,0.1)'}`,
                  background: tema === s.titulo ? '#FBEAF0' : 'white',
                  borderRadius: '8px', padding: '10px 12px', marginBottom: '6px', cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: '600', color: tema === s.titulo ? '#993556' : '#1a1a1a' }}>
                  {s.titulo}
                </div>
                <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
                  {s.funil} de funil · {s.objetivo}
                </div>
                {tema === s.titulo && <div style={{ fontSize: '9px', color: '#D4537E', marginTop: '2px' }}>✓ Selecionado</div>}
              </div>
            ))}

            <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)', margin: '12px 0' }} />

            <div className="form-group">
              <label>Ou traga o seu tema</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  placeholder="Digite seu tema aqui..."
                  value={temaCustom}
                  onChange={e => { setTemaCustom(e.target.value); setValidacaoTema(null); }}
                  style={{ flex: 1 }}
                />
                <button
                  onClick={() => validarTema(temaCustom)}
                  disabled={!temaCustom.trim() || validandoTema}
                  className="btn btn-outline btn-sm"
                >
                  {validandoTema ? '...' : 'Validar'}
                </button>
              </div>
            </div>

            {validacaoTema && (
              <div className={validacaoTema.alinhado ? 'valida-ok' : 'valida-warn'}>
                <p style={{ fontWeight: '600', fontSize: '11px', marginBottom: '2px' }}>
                  {validacaoTema.alinhado ? '✓ Tema alinhado' : '⚠ Atenção'}
                </p>
                <p style={{ fontSize: '11px' }}>{validacaoTema.mensagem}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={() => setEtapa('foto')} className="btn btn-outline" style={{ flex: 1 }}>← Voltar</button>
              <button
                onClick={() => { setEtapa('formato'); window.scrollTo(0,0); }}
                disabled={!temaFinal}
                className="btn btn-rose"
                style={{ flex: 2 }}
              >
                Próximo — Formato →
              </button>
            </div>
          </div>
        )}

        {/* ETAPA: FORMATO */}
        {etapa === 'formato' && (
          <div className="fade-in">
            <h3 style={{ marginBottom: '4px' }}>Escolher formato</h3>

            <div style={{ background: '#FBEAF0', border: '0.5px solid #F4C0D1', borderRadius: '7px', padding: '8px 10px', marginBottom: '12px' }}>
              <div style={{ fontSize: '8px', fontWeight: '700', color: '#993556', textTransform: 'uppercase' }}>Tema</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#72243E', marginTop: '2px' }}>{temaFinal}</div>
            </div>

            {/* Feed */}
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: '6px' }}>
              Feed — 1:1
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
              {tarefa.formatos.filter(f => FORMATOS[f]?.tipo === 'feed').map(f => {
                const fmt = FORMATOS[f];
                const recomendado = tarefa.formatoRecomendado && Object.values(tarefa.formatoRecomendado).includes(f);
                return (
                  <div
                    key={f}
                    onClick={() => gerarCriativo(f)}
                    style={{
                      border: `0.5px solid ${recomendado ? '#D4537E' : 'rgba(0,0,0,0.1)'}`,
                      background: recomendado ? '#FBEAF0' : 'white',
                      borderRadius: '8px', padding: '10px 8px', cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '18px', marginBottom: '4px' }}>{fmt?.icone}</div>
                    <div style={{ fontSize: '10px', fontWeight: '600', color: recomendado ? '#993556' : '#1a1a1a' }}>
                      {fmt?.nome}
                    </div>
                    <div style={{ fontSize: '8px', color: recomendado ? '#D4537E' : '#888', marginTop: '2px' }}>
                      {recomendado ? '✓ Recomendado' : `${fmt?.slides} slides · ${fmt?.dimensao}`}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reels e Stories */}
            {tarefa.formatos.some(f => ['reels', 'stories'].includes(FORMATOS[f]?.tipo)) && (
              <>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Reels e Stories — 9:16
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
                  {tarefa.formatos.filter(f => ['reels', 'stories'].includes(FORMATOS[f]?.tipo)).map(f => {
                    const fmt = FORMATOS[f];
                    return (
                      <div
                        key={f}
                        onClick={() => gerarCriativo(f)}
                        style={{
                          border: '0.5px solid rgba(0,0,0,0.1)', background: 'white',
                          borderRadius: '8px', padding: '10px 8px', cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontSize: '18px', marginBottom: '4px' }}>{fmt?.icone}</div>
                        <div style={{ fontSize: '10px', fontWeight: '600', color: '#1a1a1a' }}>{fmt?.nome}</div>
                        <div style={{ fontSize: '8px', color: '#888', marginTop: '2px' }}>{fmt?.dimensao}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Outros formatos */}
            {tarefa.formatos.some(f => FORMATOS[f]?.tipo === 'texto') && (
              <>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Texto e roteiros
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {tarefa.formatos.filter(f => FORMATOS[f]?.tipo === 'texto').map(f => {
                    const fmt = FORMATOS[f];
                    return (
                      <div
                        key={f}
                        onClick={() => gerarCriativo(f)}
                        style={{
                          border: '0.5px solid rgba(0,0,0,0.1)', background: 'white',
                          borderRadius: '8px', padding: '10px 8px', cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontSize: '18px', marginBottom: '4px' }}>{fmt?.icone}</div>
                        <div style={{ fontSize: '10px', fontWeight: '600' }}>{fmt?.nome}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <button onClick={() => setEtapa('tema')} className="btn btn-outline" style={{ marginTop: '12px' }}>
              ← Voltar
            </button>
          </div>
        )}

        {/* ETAPA: CRIATIVO */}
        {etapa === 'criativo' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700' }}>{fmt?.nome}</div>
                <div style={{ fontSize: '10px', color: '#888' }}>{slides.length} slides · {fmt?.dimensao}</div>
              </div>
              {slides.length > 0 && (
                <button
                  onClick={() => {
                    const texto = slides.map(s => `[${s.num}]\n${s.titulo}\n${s.subtitulo}\n${s.corpo}`).join('\n\n');
                    navigator.clipboard.writeText(texto);
                  }}
                  style={{ background: 'none', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', color: '#888', cursor: 'pointer' }}
                >
                  📋 Copiar
                </button>
              )}
            </div>

            {loading && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div className="loading-dots"><span></span><span></span><span></span></div>
                <p style={{ fontSize: '12px', color: '#888', marginTop: '12px' }}>Gerando seus slides...</p>
              </div>
            )}

            {!loading && slides.length > 0 && (
              <>
                {slides.map((slide, idx) => (
                  <SlideVisual
                    key={idx}
                    slide={slide}
                    foto={idx === 0 || idx === slides.length - 1 ? foto : null}
                    dimensao={fmt?.dimensao}
                    onEditar={(novoTexto) => {
                      const novos = [...slides];
                      novos[idx] = { ...novos[idx], corpo: novoTexto };
                      setSlides(novos);
                    }}
                    onRegerar={async () => {
                      const prompt = getPrompt(formatoSel, temaFinal, dor, produto);
                      if (!prompt) return;
                      const resp = await gerarTexto(prompt, cerebro);
                      const data = JSON.parse(resp.replace(/```json/gi,'').replace(/```/g,'').trim());
                      if (data.slides?.[idx]) {
                        const novos = [...slides];
                        novos[idx] = data.slides[idx];
                        setSlides(novos);
                      }
                    }}
                  />
                ))}

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button
                    onClick={() => setEtapa('formato')}
                    className="btn btn-outline"
                    style={{ flex: 1 }}
                  >
                    Trocar formato
                  </button>
                  <button
                    onClick={concluir}
                    disabled={concluindo}
                    className="btn btn-teal"
                    style={{ flex: 2 }}
                  >
                    {concluindo ? 'Salvando...' : 'Concluir tarefa ✓'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

      </div>
      <BottomNav />
    </div>
  );
}
