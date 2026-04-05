import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { gerarTexto } from '../../gemini';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

export default function BioMagnetica() {
  const navigate = useNavigate();
  const { cerebro, salvarPerfil, perfil, concluirEtapa } = useApp();
  const [nomes, setNomes] = useState(perfil?.bio?.nomes || []);
  const [bios, setBios] = useState(perfil?.bio?.bios || []);
  const [nomeSel, setNomeSel] = useState(perfil?.bio?.nomeSelecionado || 0);
  const [bioSel, setBioSel] = useState(perfil?.bio?.bioSelecionada || 0);
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState('');
  const [saving, setSaving] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!nomes.length && cerebro) gerar();
  }, [cerebro]);

  async function gerar() {
    if (!cerebro) return;
    setLoading(true);
    try {
      const prompt = `Baseado na identidade e oferta abaixo, crie uma bio magnética para Instagram.

Retorne APENAS este JSON sem markdown:
{
  "nomes": [
    "Opção 1 — nome do perfil otimizado para busca",
    "Opção 2 — nome do perfil otimizado para busca",
    "Opção 3 — nome do perfil otimizado para busca"
  ],
  "bios": [
    "Bio completa opção 1:\\nLinha 1: quem ajuda + problema claro\\nLinha 2: transformação prometida\\nLinha 3: contexto ou diferencial\\nLinha 4: → CTA direto",
    "Bio completa opção 2:\\nLinha 1: abordar de outro ângulo\\nLinha 2: transformação\\nLinha 3: prova ou método\\nLinha 4: → CTA direto"
  ]
}

REGRAS:
- Nomes: palavras-chave buscáveis, evitar termos vagos, máximo 30 caracteres cada
- Bio: frases curtas, leitura imediata, sem títulos nem certificados, foco em clareza e identificação
- Use a linguagem natural da criadora, não corporativa`;

      const resp = await gerarTexto(prompt, cerebro);
      const data = JSON.parse(resp);
      setNomes(data.nomes || []);
      setBios(data.bios || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  function copiar(texto, key) {
    navigator.clipboard.writeText(texto);
    setCopiado(key);
    setTimeout(() => setCopiado(''), 2000);
  }

  async function salvarEAvancar() {
    setSaving(true);
    await salvarPerfil({
      ...perfil,
      bio: { nomes, bios, nomeSelecionado: nomeSel, bioSelecionada: bioSel }
    });
    await concluirEtapa('bio');
    navigate('/base/editorial');
  }

  return (
    <div>
      <Header titulo="Bio magnética" subtitulo="Etapa 2 de 5 · Gerada pela IA" back={true} />
      <div className="page">

        <div className="progress-bar" style={{ marginBottom: '12px' }}>
          <div className="progress-fill" style={{ width: '40%' }} />
        </div>

        {!cerebro && (
          <div style={{ background: '#FBEAF0', border: '0.5px solid #F4C0D1', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: '#993556' }}>
              Complete o segundo cérebro primeiro para gerar sua bio.
            </p>
            <button onClick={() => navigate('/base/cerebro')} className="btn btn-rose btn-sm" style={{ marginTop: '8px' }}>
              Ir para segundo cérebro
            </button>
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="loading-dots">
              <span></span><span></span><span></span>
            </div>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '12px' }}>Gerando sua bio...</p>
          </div>
        )}

        {!loading && nomes.length > 0 && (
          <>
            {/* Nomes */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#D4537E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Nome do perfil — 3 opções
              </div>
              <p style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>
                Esse nome aparece em buscas no Instagram. Escolha o que mais conecta.
              </p>
              {nomes.map((nome, i) => (
                <div
                  key={i}
                  onClick={() => setNomeSel(i)}
                  style={{
                    border: `0.5px solid ${nomeSel === i ? '#D4537E' : 'rgba(0,0,0,0.1)'}`,
                    background: nomeSel === i ? '#FBEAF0' : 'white',
                    borderRadius: '8px', padding: '10px 12px',
                    marginBottom: '6px', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: nomeSel === i ? '600' : '400', color: nomeSel === i ? '#993556' : '#1a1a1a' }}>
                      {nome}
                    </div>
                    {nomeSel === i && <div style={{ fontSize: '10px', color: '#D4537E', marginTop: '2px' }}>✓ Selecionado</div>}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); copiar(nome, `nome_${i}`); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#888', padding: '4px 8px' }}
                  >
                    {copiado === `nome_${i}` ? '✓ Copiado' : 'Copiar'}
                  </button>
                </div>
              ))}
            </div>

            {/* Bios */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#D4537E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Bio completa — {bios.length} opções
              </div>
              {bios.map((bio, i) => (
                <div key={i} style={{
                  border: `0.5px solid ${bioSel === i ? '#D4537E' : 'rgba(0,0,0,0.1)'}`,
                  background: bioSel === i ? '#FBEAF0' : 'white',
                  borderRadius: '8px', padding: '10px 12px',
                  marginBottom: '8px', cursor: 'pointer'
                }} onClick={() => setBioSel(i)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '600', color: bioSel === i ? '#D4537E' : '#888' }}>
                      Opção {i + 1} {bioSel === i ? '✓' : ''}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); copiar(bio, `bio_${i}`); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#888' }}
                    >
                      {copiado === `bio_${i}` ? '✓ Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <p style={{ fontSize: '12px', lineHeight: '1.7', color: '#1a1a1a', whiteSpace: 'pre-line' }}>{bio}</p>
                </div>
              ))}
            </div>

            {/* Regerar */}
            <button onClick={gerar} className="btn btn-outline" style={{ marginBottom: '8px' }}>
              ↻ Regerar bio
            </button>
          </>
        )}

        <button onClick={salvarEAvancar} disabled={saving || !nomes.length} className="btn btn-rose" style={{ marginTop: '4px' }}>
          {saving ? 'Salvando...' : 'Salvar e avançar →'}
        </button>

      </div>
      <BottomNav />
    </div>
  );
}
