// PROMPTS DE CADA FORMATO
// Cada função recebe: tema, dor, cerebro, emocao
// Retorna o prompt completo para enviar ao Gemini

export function promptCarrosselAutoridade(tema, dor) {
  return `Crie um CARROSSEL DE AUTORIDADE de 10 slides para Instagram Feed (1080x1080px).

TEMA: ${tema}
DOR DA PERSONA: ${dor || 'não especificada'}

ESTRUTURA OBRIGATÓRIA — retorne APENAS este JSON sem markdown:
{"slides":[
  {"num":1,"titulo":"HEADLINE FORTE QUE PARA O SCROLL","subtitulo":"","corpo":""},
  {"num":2,"titulo":"","subtitulo":"","corpo":"onde estava antes — dor real vivida"},
  {"num":3,"titulo":"","subtitulo":"","corpo":"gatilho de mudança — o que não dava mais"},
  {"num":4,"titulo":"","subtitulo":"","corpo":"o que fez diferente — método ou decisão"},
  {"num":5,"titulo":"","subtitulo":"","corpo":"primeiro resultado ou sinal de mudança"},
  {"num":6,"titulo":"","subtitulo":"","corpo":"crença que quebrou — antes vs depois"},
  {"num":7,"titulo":"","subtitulo":"","corpo":"quem se tornou hoje"},
  {"num":8,"titulo":"","subtitulo":"","corpo":"o que acredita e defende"},
  {"num":9,"titulo":"","subtitulo":"","corpo":"quem ajuda e como"},
  {"num":10,"titulo":"FECHAMENTO FORTE","subtitulo":"","corpo":"CTA provocativo de engajamento"}
]}

REGRAS: Voz firme da criadora. Autoridade = superação não conquista. Slide 1 = headline que para o scroll. Cada slide = 1 insight. Max 3 linhas por slide.`;
}

export function promptCarrosselPosicionamento(tema, dor) {
  return `Crie um CARROSSEL DE POSICIONAMENTO de 10 slides defendendo uma visão forte.

TEMA: ${tema}
DOR DA PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"DECLARAÇÃO FORTE — verdade ou revolta","subtitulo":"","corpo":""},
  {"num":2,"titulo":"","subtitulo":"","corpo":"por que isso importa — conecta com realidade da persona"},
  {"num":3,"titulo":"","subtitulo":"","corpo":"de onde vem essa visão — experiência real"},
  {"num":4,"titulo":"","subtitulo":"","corpo":"para quem é e para quem não é"},
  {"num":5,"titulo":"","subtitulo":"","corpo":"erro comum que o mercado comete"},
  {"num":6,"titulo":"","subtitulo":"","corpo":"o que ensina no lugar — alternativa clara"},
  {"num":7,"titulo":"","subtitulo":"","corpo":"exemplo prático ou resultado real"},
  {"num":8,"titulo":"","subtitulo":"","corpo":"o que acredita e sustenta"},
  {"num":9,"titulo":"","subtitulo":"","corpo":"frase forte de reforço"},
  {"num":10,"titulo":"POSICIONAMENTO FINAL","subtitulo":"","corpo":"pergunta provocativa para engajamento"}
]}

Tom firme, sem suavizar. Pode incomodar. Posicionar = defender visão, não se apresentar.`;
}

export function promptCarrosselConexao(tema, dor) {
  return `Crie um CARROSSEL DE CONEXÃO de 10 slides que humaniza e gera identificação.

TEMA: ${tema}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"FRASE EMOCIONAL que para o scroll","subtitulo":"","corpo":""},
  {"num":2,"titulo":"","subtitulo":"","corpo":"dor vivida — emoção real: medo, vergonha, cansaço"},
  {"num":3,"titulo":"","subtitulo":"","corpo":"impacto na rotina — realidade prática"},
  {"num":4,"titulo":"","subtitulo":"","corpo":"ponto de virada — decisão ou estalo"},
  {"num":5,"titulo":"","subtitulo":"","corpo":"o que fez para mudar"},
  {"num":6,"titulo":"","subtitulo":"","corpo":"início da transformação — pequenas mudanças"},
  {"num":7,"titulo":"","subtitulo":"","corpo":"quem se tornou hoje — leveza e segurança"},
  {"num":8,"titulo":"","subtitulo":"","corpo":"virada para a persona — empatia e identificação"},
  {"num":9,"titulo":"","subtitulo":"","corpo":"mensagem que ela precisa ouvir"},
  {"num":10,"titulo":"FECHAMENTO ACOLHEDOR","subtitulo":"","corpo":"CTA emocional ou aberto"}
]}

História resolvida com intenção. Emoção com controle — não desabafo, não ferida aberta.`;
}

export function promptChecklist(tema, dor) {
  return `Crie um CARROSSEL CHECKLIST de 10 slides com lista de alto valor.

TEMA: ${tema}
DOR DA PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"PROMESSA DA LISTA que para o scroll","subtitulo":"","corpo":""},
  {"num":2,"titulo":"","subtitulo":"","corpo":"contexto — por que essa lista importa agora"},
  {"num":3,"titulo":"01","subtitulo":"NOME DO ITEM","corpo":"explicação prática — o que fazer e por que"},
  {"num":4,"titulo":"02","subtitulo":"NOME DO ITEM","corpo":"explicação prática"},
  {"num":5,"titulo":"03","subtitulo":"NOME DO ITEM","corpo":"explicação prática"},
  {"num":6,"titulo":"04","subtitulo":"NOME DO ITEM","corpo":"explicação prática"},
  {"num":7,"titulo":"05","subtitulo":"NOME DO ITEM","corpo":"explicação prática"},
  {"num":8,"titulo":"06","subtitulo":"NOME DO ITEM","corpo":"explicação prática"},
  {"num":9,"titulo":"07","subtitulo":"NOME DO ITEM","corpo":"explicação prática"},
  {"num":10,"titulo":"FECHAMENTO","subtitulo":"","corpo":"qual você vai aplicar primeiro?"}
]}

Checklist profundo, não óbvio. Items aplicáveis. Conecta naturalmente com a solução sem anunciar.`;
}

export function promptPassoAPasso(tema, dor) {
  return `Crie um CARROSSEL PASSO A PASSO de 10 slides — guia prático e aplicável.

TEMA: ${tema}
DOR DA PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"PROMESSA DIRETA — ensinar algo específico","subtitulo":"","corpo":""},
  {"num":2,"titulo":"","subtitulo":"","corpo":"validar dor ou desejo — gerar identificação"},
  {"num":3,"titulo":"","subtitulo":"","corpo":"contexto curto — preparar para o passo a passo"},
  {"num":4,"titulo":"PASSO 1","subtitulo":"Nome do passo","corpo":"o que fazer, como fazer, o que evitar"},
  {"num":5,"titulo":"PASSO 2","subtitulo":"Nome do passo","corpo":"o que fazer, como fazer"},
  {"num":6,"titulo":"PASSO 3","subtitulo":"Nome do passo","corpo":"o que fazer, como fazer"},
  {"num":7,"titulo":"PASSO 4","subtitulo":"Nome do passo","corpo":"o que fazer, como fazer"},
  {"num":8,"titulo":"PASSO 5","subtitulo":"Nome do passo","corpo":"o que fazer, como fazer"},
  {"num":9,"titulo":"","subtitulo":"","corpo":"reforçar transformação — mostrar que é possível"},
  {"num":10,"titulo":"","subtitulo":"","corpo":"salva para aplicar depois. Qual passo você começa hoje?"}
]}

Guia aplicável — a persona consegue começar hoje. Mostre seu método.`;
}

export function promptVenda(tema, dor, produto) {
  return `Crie um CARROSSEL DE VENDA de 10 slides — vende sem parecer flyer.

TEMA: ${tema}
OFERTA: ${produto || 'produto/serviço da criadora'}
DOR DA PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"FRASE DE DESEJO OU PROVOCAÇÃO","subtitulo":"","corpo":""},
  {"num":2,"titulo":"","subtitulo":"","corpo":"ampliar dor ou desejo — gerar curiosidade"},
  {"num":3,"titulo":"","subtitulo":"","corpo":"situação real da persona — identificação"},
  {"num":4,"titulo":"","subtitulo":"","corpo":"apresentar produto — mostra que resolve a dor"},
  {"num":5,"titulo":"","subtitulo":"","corpo":"como funciona — formato, experiência, como acontece"},
  {"num":6,"titulo":"","subtitulo":"","corpo":"o que muda na prática — resultados esperados"},
  {"num":7,"titulo":"","subtitulo":"","corpo":"prova social — resultado real de cliente"},
  {"num":8,"titulo":"","subtitulo":"","corpo":"para quem é — e para quem não é"},
  {"num":9,"titulo":"","subtitulo":"","corpo":"frase de decisão — reforçar a escolha"},
  {"num":10,"titulo":"","subtitulo":"","corpo":"CTA direto: link na bio, direct, ou formulário"}
]}

Emoção + identificação + desejo. Não é catálogo. Conteúdo com intenção de venda.`;
}

export function promptQuemEVoce(tema) {
  return `Crie um CARROSSEL QUEM É VOCÊ de 10 slides — apresentação com autoridade, não currículo.

TEMA: ${tema || 'apresentação pessoal e profissional'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"HEADLINE FORA DO ÓBVIO — curiosidade ou quebra de expectativa","subtitulo":"","corpo":""},
  {"num":2,"titulo":"","subtitulo":"","corpo":"quem era antes — contexto real de vida e mentalidade"},
  {"num":3,"titulo":"","subtitulo":"","corpo":"fato inesperado — gera humanização"},
  {"num":4,"titulo":"","subtitulo":"","corpo":"situação que a persona reconhece — identificação direta"},
  {"num":5,"titulo":"","subtitulo":"","corpo":"momento de decisão — mudança de direção"},
  {"num":6,"titulo":"","subtitulo":"","corpo":"o que estudou, viveu, aprendeu — com contexto"},
  {"num":7,"titulo":"","subtitulo":"","corpo":"o que faz hoje — claro e direto"},
  {"num":8,"titulo":"","subtitulo":"","corpo":"o que acredita — visão diferente do mercado"},
  {"num":9,"titulo":"","subtitulo":"","corpo":"quem ajuda, como ajuda, método"},
  {"num":10,"titulo":"","subtitulo":"","corpo":"pergunta ou CTA leve — reflexão ou interação"}
]}

Humaniza + posiciona + conecta + diferencia. Sem lista de certificados.`;
}

export function promptComoConsegui(tema, dor) {
  return `Crie um CARROSSEL COMO CONSEGUI de 10 slides — resultado com processo real.

TEMA: ${tema}
DOR DA PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"RESULTADO IMPACTANTE + contexto emocional","subtitulo":"","corpo":""},
  {"num":2,"titulo":"","subtitulo":"","corpo":"onde estava antes — dor, dúvida ou medo"},
  {"num":3,"titulo":"","subtitulo":"","corpo":"o que tentou e não funcionou — identificação"},
  {"num":4,"titulo":"","subtitulo":"","corpo":"momento de virada — estalo ou ruptura"},
  {"num":5,"titulo":"","subtitulo":"","corpo":"o que fez diferente — método ou reposicionamento"},
  {"num":6,"titulo":"","subtitulo":"","corpo":"1 ou 2 aprendizados principais"},
  {"num":7,"titulo":"","subtitulo":"","corpo":"primeira vitória — micro resultado, sinal inicial"},
  {"num":8,"titulo":"","subtitulo":"","corpo":"resultado final — conquista tangível"},
  {"num":9,"titulo":"","subtitulo":"","corpo":"o que acredita hoje — filosofia após a jornada"},
  {"num":10,"titulo":"","subtitulo":"","corpo":"pergunta ou convite — gerar interação ou movimento"}
]}

Resultado sem contexto = desconexão. História com processo = autoridade.`;
}

export function promptDiaPersona(tema, dor) {
  return `Crie um CARROSSEL DIA DA PERSONA de 10 slides — fala diretamente COM ela, não sobre você.

TEMA: ${tema}
DOR DA PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"FRASE DIRETA PARA ELA","subtitulo":"","corpo":"isso é para você que..."},
  {"num":2,"titulo":"","subtitulo":"","corpo":"situação do cotidiano dela — realidade prática"},
  {"num":3,"titulo":"","subtitulo":"","corpo":"pensamento interno que ela não fala para ninguém"},
  {"num":4,"titulo":"","subtitulo":"","corpo":"conflito emocional — dúvida ou insegurança"},
  {"num":5,"titulo":"","subtitulo":"","corpo":"tentativa frustrada — o que ela já tentou"},
  {"num":6,"titulo":"","subtitulo":"","corpo":"sentimento gerado — cansaço, culpa, frustração"},
  {"num":7,"titulo":"","subtitulo":"","corpo":"virada de consciência — mostrar novo olhar"},
  {"num":8,"titulo":"","subtitulo":"","corpo":"acolhimento — você não está sozinha"},
  {"num":9,"titulo":"","subtitulo":"","corpo":"direcionamento — caminho possível"},
  {"num":10,"titulo":"","subtitulo":"","corpo":"CTA emocional — pergunta ou reflexão"}
]}

Parece escrito para uma pessoa. Antes de alguém comprar, precisa sentir que você a entende.`;
}

export function promptHype(tema, dor) {
  return `Crie um POST HYPE de 1 slide — usa assunto em alta com visão própria.

TEMA/ASSUNTO EM ALTA: ${tema}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"HEADLINE + REFERÊNCIA AO HYPE","subtitulo":"","corpo":"contexto do hype + sua visão sobre ele + conexão com a realidade da persona + frase forte de posicionamento + CTA para comentário ou debate"}
]}

Não seguir trend no automático. Usar o assunto para mostrar como você pensa. Hype com visão = autoridade.`;
}

export function promptPostEstatico(tema, dor, produto) {
  return `Crie um POST ESTÁTICO para Instagram Feed com headline e legenda completa.

TEMA: ${tema}
DOR DA PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"HEADLINE DO POST — frase que para o scroll","subtitulo":"subtítulo opcional","corpo":"Legenda completa pronta para publicar. Use parágrafos separados com quebra de linha. Inclua emojis estratégicos no início de parágrafos chave. Termine com CTA direto. Inclua 5 a 8 hashtags relevantes ao final."}
]}`;
}

export function promptReelsAutoridade(tema, dor) {
  return `Crie um ROTEIRO DE REELS DE AUTORIDADE de 60 segundos.

TEMA: ${tema}
DOR DA PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"REELS DE AUTORIDADE — 60s","subtitulo":"Roteiro completo","corpo":"ABERTURA (0-3s):\\n[frase forte que para o scroll — gancho direto na dor ou desejo]\\n\\nCONTEXTO (3-10s):\\n[mostrar erro comum ou pensamento da maioria]\\n\\nVISÃO (10-35s):\\n[seu ponto de vista — o que acredita — conectar com método]\\n\\nPROVA (35-50s):\\n[exemplo real: cliente, experiência própria, resultado]\\n\\nREFORÇO (50-55s):\\n[frase forte — consolidar autoridade]\\n\\nCTA (55-60s):\\n[ação clara: comentar, salvar ou direct]"}
]}

Fala como conversa 1 a 1. Olhar direto para câmera. Frases curtas e firmes. Não é entretenimento — é posicionamento.`;
}

export function promptReelsConexao(tema, dor) {
  return `Crie um ROTEIRO DE REELS DE CONEXÃO de 60 segundos.

TEMA: ${tema}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"REELS DE CONEXÃO — 60s","subtitulo":"Roteiro completo","corpo":"ABERTURA (0-3s):\\n[frase forte e direta para a persona]\\n\\nDESENVOLVIMENTO (3-40s):\\n[contar história real com emoção leve e autêntica — sem dramatização]\\n\\nVIRADA PERSONA (40-50s):\\n[mostrar empatia — ela não está sozinha]\\n\\nFECHAMENTO (50-60s):\\n[frase de acolhimento + CTA opcional: comentar, salvar]"}
]}

Tom de conversa. Natural. Sem leitura ou decoração. Ser humana sem ser vítima.`;
}

export function promptStories5(tema, dor) {
  return `Crie uma SEQUÊNCIA DE 5 STORIES COM ANALOGIAS para Instagram.

TEMA: ${tema}
CONTEXTO DA PERSONA: ${dor || 'mulher 40+ em transição profissional'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"STORY 1 — Introdução","subtitulo":"Pergunta direta","corpo":"texto curto que gera identificação imediata (max 2 linhas)"},
  {"num":2,"titulo":"STORY 2 — Início da analogia","subtitulo":"Cena do cotidiano","corpo":"situação do dia a dia reconhecível pela persona"},
  {"num":3,"titulo":"STORY 3 — Aprofundamento","subtitulo":"Exagero leve ou humor","corpo":"aprofunda a analogia com reconhecimento e leveza"},
  {"num":4,"titulo":"STORY 4 — Virada","subtitulo":"Insight","corpo":"novo olhar — frase firme e direta"},
  {"num":5,"titulo":"STORY 5 — Fechamento","subtitulo":"CTA interativo","corpo":"mensagem + caixa de pergunta ou enquete: 'Você também sente isso?'"}
]}

Analogias simples, visuais e reconhecíveis. Tom de conversa. Cada story leva ao próximo.`;
}

export function promptStories10(tema, dor) {
  return `Crie uma SEQUÊNCIA DE 10 STORIES COM ANALOGIAS para Instagram.

TEMA: ${tema}
CONTEXTO DA PERSONA: ${dor || 'mulher 40+ em transição profissional'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"STORY 1","subtitulo":"Pergunta direta","corpo":"identificação imediata"},
  {"num":2,"titulo":"STORY 2","subtitulo":"Aprofunda a pergunta","corpo":"reforça dor ou desejo"},
  {"num":3,"titulo":"STORY 3","subtitulo":"Início da analogia","corpo":"cena do cotidiano"},
  {"num":4,"titulo":"STORY 4","subtitulo":"Aprofunda","corpo":"situação mais clara"},
  {"num":5,"titulo":"STORY 5","subtitulo":"Exagero leve","corpo":"humor e reconhecimento"},
  {"num":6,"titulo":"STORY 6","subtitulo":"Conecta com dor real","corpo":"traz emoção"},
  {"num":7,"titulo":"STORY 7","subtitulo":"Amplia entendimento","corpo":"prepara a virada"},
  {"num":8,"titulo":"STORY 8","subtitulo":"Virada","corpo":"novo olhar — insight"},
  {"num":9,"titulo":"STORY 9","subtitulo":"Reforço emocional","corpo":"possibilidade de mudança"},
  {"num":10,"titulo":"STORY 10","subtitulo":"CTA interativo","corpo":"enquete ou caixa de pergunta"}
]}

Sequência que prende do início ao fim. Analogias reconhecíveis. Tom leve e de conversa.`;
}

export function promptHeadlines(tema, dor) {
  return `Crie 15 HEADLINES para Instagram que param o scroll.

TEMA: ${tema}
DOR DA PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"15 HEADLINES PRONTAS","subtitulo":"Escolha a que mais conecta","corpo":"1. [headline confronto — você acha que X mas é Y]\\n2. [headline identificação — você faz isso e não percebe]\\n3. [headline provocação — ninguém fala isso sobre tema]\\n4. [headline curiosidade — foi isso que mudou tudo]\\n5. [headline quebra padrão — o problema não é X]\\n6. [headline realidade — a verdade que você evita admitir]\\n7. [headline confronto 2]\\n8. [headline identificação 2]\\n9. [headline provocação 2]\\n10. [headline curiosidade 2]\\n11. [headline direta e forte]\\n12. [headline com número]\\n13. [headline com pergunta]\\n14. [headline comparação]\\n15. [headline mais ousada]"}
]}

Varie os estilos. Linguagem natural. Cada headline deve parar o dedo, gerar emoção e abrir loop mental.`;
}

export function promptNomeAula(tema, dor) {
  return `Crie 12 OPÇÕES DE NOME para aula ou live estratégica.

TEMA DA AULA: ${tema}
DOR DA PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"12 OPÇÕES DE NOME DE AULA","subtitulo":"Escolha o que desperta mais curiosidade","corpo":"1. [nome direto]\\n2. [nome provocativo]\\n3. [nome curioso]\\n4. [nome com contraste: de X para Y]\\n5. [nome com o que ninguém te contou]\\n6. [nome com checklist]\\n7. [nome com passo a passo]\\n8. [nome com analogia]\\n9. [nome com pergunta]\\n10. [nome mais ousado]\\n11. [nome com resultado]\\n12. [nome com humor leve]"}
]}

Nomes que despertam curiosidade sem entregar a solução completa. Parece feito para a persona.`;
}

export function promptLive(tema, dor) {
  return `Crie um ROTEIRO DE LIVE ESTRATÉGICA de até 60 minutos.

TEMA: ${tema}
DOR DA PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"ROTEIRO DE LIVE — 60min","subtitulo":"Estrutura completa","corpo":"HEADLINE:\\n[chamada forte que gera curiosidade + urgência]\\n\\nABERTURA (5-10 min):\\n- Apresentação rápida\\n- Pergunta direta: quem aqui já passou por isso?\\n- Provocação: o problema não é [X]\\n- Promessa: hoje você vai entender [benefício]\\n\\nDESENVOLVIMENTO (35-40 min):\\nBloco 1: [explicar problema real + identificação]\\nBloco 2: [mostrar erro comum + quebrar crença]\\nBloco 3: [apresentar nova visão + introduzir método]\\nBloco 4: [mostrar caminho ou estrutura]\\n\\nMOMENTOS DE INTERAÇÃO:\\n- Início: pergunta simples sim/não\\n- Meio: pedir opinião nos comentários\\n- Antes do final: pergunta reflexiva\\n\\nFECHAMENTO (5 min):\\n- Recapitular pontos principais\\n- Reforçar transformação\\n- CTA: [link/direct/grupo]"}
]}`;
}

export function promptStorytellingEstrategico(tema, dor) {
  return `Crie um STORYTELLING ESTRATÉGICO — experiência transformada em narrativa envolvente.

TEMA/EXPERIÊNCIA: ${tema}
CONEXÃO COM A PERSONA: ${dor || 'não especificada'}

Retorne APENAS JSON:
{"slides":[
  {"num":1,"titulo":"GANCHO FORTE — frase que gera curiosidade imediata","subtitulo":"","corpo":""},
  {"num":2,"titulo":"","subtitulo":"","corpo":"CONTEXTO — situar rapidamente a história sem excesso de detalhe"},
  {"num":3,"titulo":"","subtitulo":"","corpo":"CONFLITO — mostrar emoção real. O que estava em jogo."},
  {"num":4,"titulo":"","subtitulo":"","corpo":"VIRADA — momento de mudança. Decisão ou insight."},
  {"num":5,"titulo":"","subtitulo":"","corpo":"REFLEXÃO — extrair aprendizado. Conectar com realidade da persona."},
  {"num":6,"titulo":"","subtitulo":"","corpo":"CONEXÃO COM MÉTODO — como isso se relaciona com o que entrega"},
  {"num":7,"titulo":"","subtitulo":"","corpo":"PARA A PERSONA — como ela pode se ver nessa história"},
  {"num":8,"titulo":"","subtitulo":"","corpo":"REFORÇO — frase que consolida o aprendizado"},
  {"num":9,"titulo":"","subtitulo":"","corpo":"PRÓXIMO PASSO — orientação prática ou reflexão"},
  {"num":10,"titulo":"","subtitulo":"","corpo":"CTA — comentar, salvar, compartilhar ou comprar"}
]}

Parece conversa, não roteiro. Prende até o final. Ensina sem parecer aula.`;
}

// MAPA DE FORMATOS PARA FUNÇÕES
export const PROMPT_MAP = {
  carrossel_autoridade: promptCarrosselAutoridade,
  carrossel_posicionamento: promptCarrosselPosicionamento,
  carrossel_conexao: promptCarrosselConexao,
  checklist: promptChecklist,
  passo_a_passo: promptPassoAPasso,
  venda: promptVenda,
  quem_e_voce: promptQuemEVoce,
  como_consegui: promptComoConsegui,
  hype: promptHype,
  dia_persona: promptDiaPersona,
  post_estatico: promptPostEstatico,
  reels_autoridade: promptReelsAutoridade,
  reels_conexao: promptReelsConexao,
  stories_5: promptStories5,
  stories_10: promptStories10,
  stories_persona: promptStories5,
  headlines: promptHeadlines,
  nome_aula: promptNomeAula,
  live: promptLive,
  storytelling: promptStorytellingEstrategico
};

export function getPrompt(formatoId, tema, dor, produto) {
  const fn = PROMPT_MAP[formatoId];
  if (!fn) return null;
  return fn(tema, dor, produto);
}
