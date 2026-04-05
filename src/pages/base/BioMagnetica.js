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

  // Modo personalizado
  const [modoPersonalizado, setModoPersonalizado] = useState(false);
  const [bioPersonalizada, setBioPersonalizada] = useState('');
  const [validando, setValidando] = useState(false);
  const [validacao, setValidacao] = useState(null);
  const [bioValidada, setBioValidada] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!nomes.length && cerebro && Object.keys(cerebro).length > 0) {
      gerar();
    }
  }, [cerebro]);

  async function gerar() {
    if (!cerebro) return;
    setLoading(true);
    setValidacao(null);
    setBioValidada(false);
    try {
      const prompt = `Você é uma especialista em bio magnética para Instagram.

Use a estrutura abaixo para criar a bio:

ESTRUTURA DO NOME (campo de busca):
- Usar palavras-chave buscáveis
- Formato: [especialidade] | [resultado] | [palavra-chave]
- Evitar termos vagos
- Priorizar dor ou desejo da persona
- Máximo 30 caracteres

ESTRUTURA DA BIO (4 blocos):
Bloco 1: quem ajuda + problema claro
Bloco 2: transformação prometida (linguagem tangível, não abstrata)
Bloco 3: contexto da oferta atual (opcional)
Bloco 4: CTA direto e claro

REGRAS:
- Frases curtas, leitura imediata
- Evitar títulos e certificados
- Foco em clareza e identificação
- Palavras da persona, direto ao ponto, sem floreio
- Linguagem simples, nunca técnica
- Nunca usar: jornada, transformação, poderosa, permissão

Retorne APENAS este JSON sem markdown:
{
  "nomes": [
    "nome opção 1",
    "nome opção 2", 
    "nome opção 3"
  ],
  "bios": [
    "Bio opção 1:\\nBloco 1\\nBloco 2\\nBloco 3\\n→ CTA",
    "Bio opção 2:\\nBloco 1\\nBloco 2\\nBloco 3\\n→ CTA",
    "Bio opção 3:\\nBloco 1\\nBloco 2\\nBloco 3\\n→ CTA"
  ]
}`;

      const resp = await gerarTexto(prompt, cerebro);
      const data = JSON.parse(resp);
      setNomes(data.nomes || []);
      setBios(data.bios || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  async function validarBioPersonalizada() {
    if (!bioPersonalizada.trim()) return;
    setValidando(true);
    setValidacao(null);
    try {
      const prompt = `Você é especialista em bio magnética para Instagram.

A usuária escreveu esta bio:
"${bioPersonalizada}"

Analise com base nesses critérios:
1. Tem clareza de quem ajuda?
2. O problema está claro?
3. A transformação é tangível (não abstrata)?
4. Tem CTA direto?
5. Está em linguagem simples e direta?
6. Evita títulos, certificados e termos técnicos?

Retorne APENAS este JSON sem markdown:
{
  "aprovada": true ou false,
  "pontuacao": número de 0 a 10,
  "pontos_fortes": ["ponto 1", "ponto 2"],
  "pontos_melhorar": ["sugestão 1", "sugestão 2"],
  "versao_melhorada": "versão melhorada da bio se necessário, ou a mesma se já estiver boa",
  "mensagem": "mensagem direta e encorajadora em 1-2 frases"
}`;

      const resp = await gerarTexto(prompt, cerebro);
      const data = JSON.parse(resp);
      setValidacao(data);
      if (data.aprovada || data.pontuacao >= 7) {
        setBioValidada(true);
      }
    } catch (e) {
      console.error(e);
    }
    setValidando(false);
  }

  function usarBioValidada() {
    const bioFinal = validacao?.versao_melhorada || bioPersonalizada;
    setBios([bioFinal, ...bios]);
    setBioSel(0);
    setModoPersonalizado(false);
    setBioValidada(true);
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

  const podeAvancar = nomes.length > 0 && (bios.length > 0 || bioValidada);

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

        {cerebro && !loading && !nomes.length && (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>
              Clique para gerar sua bio com IA
            </p>
            <button onClick={gerar} className="btn btn-rose">
              ✨ Gerar bio agora
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
                <div key={i} onClick={() => setNomeSel(i)} style={{
                  border: `0.5px solid ${nomeSel === i ? '#D4537E' : 'rgba(0,0,0,0.1)'}`,
                  background: nomeSel === i ? '#FBEAF0' : 'white',
                  borderRadius: '8px', padding: '10px 12px',
                  marginBottom: '6px', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: nomeSel === i ? '600' : '400', color: nomeSel === i ? '#993556' : '#1a1a1a' }}>
                      {nome}
                    </div>
                    {nomeSel === i && <div style={{ fontSize: '10px', color: '#D4537E', marginTop: '2px' }}>✓ Selecionado</div>}
                  </div>
                  <button onClick={e => { e.stopPropagation(); copiar(nome, `nome_${i}`); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#888', padding: '4px 8px' }}>
                    {copiado === `nome_${i}` ? '✓ Copiado' : 'Copiar'}
                  </button>
                </div>
              ))}
            </div>

            {/* Bios geradas */}
            {!modoPersonalizado && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#D4537E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Bio completa — {bios.length} opções
                </div>
                {bios.map((bio, i) => (
                  <div key={i} onClick={() => setBioSel(i)} style={{
                    border: `0.5px solid ${bioSel === i ? '#D4537E' : 'rgba(0,0,0,0.1)'}`,
                    background: bioSel === i ? '#FBEAF0' : 'white',
                    borderRadius: '8px', padding: '10px 12px',
                    marginBottom: '8px', cursor: 'pointer'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '600', color: bioSel === i ? '#D4537E' : '#888' }}>
                        Opção {i + 1} {bioSel === i ? '✓' : ''}
                      </span>
                      <button onClick={e => { e.stopPropagation(); copiar(bio, `bio_${i}`); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#888' }}>
                        {copiado === `bio_${i}` ? '✓ Copiado' : 'Copiar'}
                      </button>
                    </div>
                    <p style={{ fontSize: '12px', lineHeight: '1.7', color: '#1a1a1a', whiteSpace: 'pre-line' }}>{bio}</p>
                  </div>
                ))}

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <button onClick={gerar} className="btn btn-outline" style={{ flex: 1 }}>
                    ↻ Regerar
                  </button>
                  <button onClick={() => setModoPersonalizado(true)} className="btn btn-outline" style={{ flex: 1 }}>
                    ✏️ Escrever a minha
                  </button>
                </div>
              </div>
            )}

            {/* Modo personalizado */}
            {modoPersonalizado && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#D4537E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Escreva sua bio
                </div>
                <p style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>
                  Escreva sua bio e a IA vai analisar se está alinhada com seu posicionamento antes de liberar o próximo passo.
                </p>
                <textarea
                  value={bioPersonalizada}
                  onChange={e => { setBioPersonalizada(e.target.value); setValidacao(null); setBioValidada(false); }}
                  placeholder="Escreva sua bio aqui...&#10;&#10;Ex:&#10;Conduzo mulheres 40+ a sair do corporativo&#10;Organizo décadas de experiência em autoridade digital&#10;Método MDP — 12 semanas, mão na massa&#10;→ Vagas abertas, link na bio"
                  style={{ minHeight: '120px', width: '100%', fontSize: '12px' }}
                />

                {/* Resultado da validação */}
                {validacao && (
                  <div style={{
                    background: validacao.aprovada ? '#E1F5EE' : '#FAEEDA',
                    border: `0.5px solid ${validacao.aprovada ? '#9FE1CB' : '#FAC775'}`,
                    borderRadius: '8px', padding: '12px', marginTop: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: validacao.aprovada ? '#085041' : '#412402' }}>
                        {validacao.aprovada ? '✓ Bio aprovada!' : '⚡ Quase lá!'}
                      </span>
                      <span style={{ fontSize: '11px', color: '#888' }}>
                        {validacao.pontuacao}/10
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#1a1a1a', marginBottom: '8px' }}>{validacao.mensagem}</p>

                    {validacao.pontos_fortes?.length > 0 && (
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#1D9E75', marginBottom: '4px' }}>PONTOS FORTES</div>
                        {validacao.pontos_fortes.map((p, i) => (
                          <p key={i} style={{ fontSize: '11px', color: '#085041', margin: '2px 0' }}>✓ {p}</p>
                        ))}
                      </div>
                    )}

                    {validacao.pontos_melhorar?.length > 0 && (
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#BA7517', marginBottom: '4px' }}>SUGESTÕES</div>
                        {validacao.pontos_melhorar.map((p, i) => (
                          <p key={i} style={{ fontSize: '11px', color: '#412402', margin: '2px 0' }}>→ {p}</p>
                        ))}
                      </div>
                    )}

                    {validacao.versao_melhorada && validacao.versao_melhorada !== bioPersonalizada && (
                      <div style={{ marginTop: '8px', padding: '8px', background: 'white', borderRadius: '6px' }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', marginBottom: '4px' }}>VERSÃO SUGERIDA</div>
                        <p style={{ fontSize: '12px', color: '#1a1a1a', whiteSpace: 'pre-line' }}>{validacao.versao_melhorada}</p>
                      </div>
                    )}

                    {(bioValidada || validacao.aprovada) && (
                      <button onClick={usarBioValidada} className="btn btn-rose" style={{ marginTop: '8px', width: '100%' }}>
                        Usar esta bio →
                      </button>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button onClick={() => setModoPersonalizado(false)} className="btn btn-outline" style={{ flex: 1 }}>
                    ← Voltar
                  </button>
                  <button onClick={validarBioPersonalizada} disabled={validando || !bioPersonalizada.trim()} className="btn btn-rose" style={{ flex: 2 }}>
                    {validando ? 'Analisando...' : '🔍 Validar com IA'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {podeAvancar && !modoPersonalizado && (
          <button onClick={salvarEAvancar} disabled={saving} className="btn btn-rose" style={{ marginTop: '4px' }}>
            {saving ? 'Salvando...' : 'Salvar e avançar →'}
          </button>
        )}

      </div>
      <BottomNav />
    </div>
  );
}
