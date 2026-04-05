const GEMINI_KEY = 'AIzaSyBHDuyN_AUdfdRVxzxXW5A5HbAE6EtieIE';
const GEMINI_TEXT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
const GEMINI_IMAGE_URL = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GEMINI_KEY}`;

const PALAVRAS_PROIBIDAS = [
  'leveza', 'potente', 'com verdade', 'com alma', 'presença',
  'poderosa', 'permissão', 'insuficiente', 'sólido',
  'agora me conta', 'agora me diz', 'deixa eu te falar',
  'jornada', 'transformação', 'incrível'
];

const REGRAS_BASE = `
REGRAS ABSOLUTAS DE LINGUAGEM:
- NUNCA usar: ${PALAVRAS_PROIBIDAS.join(', ')}
- Evitar: excesso de ponto final, texto quebrado artificialmente, ritmo forçado
- Tom: direto, firme, sem floreio, linguagem natural que parece conversa real
- Clareza acima de estilo
- Verbos de poder: conduzo, organizo, estruturo, mapear, redesenhar, reconhecer, reposicionar
- NUNCA usar verbos fracos: tentar, achar, esperar, sonhar, desejar
- Entregue apenas o conteúdo solicitado, sem introduções ou explicações adicionais
`;

export async function gerarTexto(prompt, cerebro) {
  const promptCompleto = `${montarContextoCerebro(cerebro)}\n\n${prompt}\n\n${REGRAS_BASE}`;
  
  const response = await fetch(GEMINI_TEXT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptCompleto }] }],
      generationConfig: { temperature: 0.85, maxOutputTokens: 2500 }
    })
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text.replace(/```json/gi, '').replace(/```/g, '').trim();
}

export async function gerarImagem(prompt) {
  const response = await fetch(GEMINI_IMAGE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: { sampleCount: 1 }
    })
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  
  const bytes = data.predictions?.[0]?.bytesBase64Encoded;
  if (!bytes) throw new Error('Sem imagem retornada');
  
  return `data:image/png;base64,${bytes}`;
}

function montarContextoCerebro(cerebro) {
  if (!cerebro) return '';
  
  return `
SEGUNDO CÉREBRO CRIATIVO — IDENTIDADE DA CRIADORA:

QUEM ELA É:
Descrição: ${cerebro.essencia?.descricao || ''}
Momento que a define: ${cerebro.essencia?.momento || ''}
O que as pessoas reconhecem: ${cerebro.essencia?.reconhecimento || ''}
Dor que a moveu: ${cerebro.essencia?.dor || ''}
Legado que quer deixar: ${cerebro.essencia?.legado || ''}

NO QUE ACREDITA:
Maior convicção sobre a persona: ${cerebro.crencas?.conviccao || ''}
O que não tolera no mercado: ${cerebro.crencas?.naoTolera || ''}
Mentira que quer desmascarar: ${cerebro.crencas?.mentira || ''}
Transformação acontece quando: ${cerebro.crencas?.transformacao || ''}
Defende profundidade ou viralidade: ${cerebro.crencas?.profundidade || ''}

O QUE FAZ E ENTREGA:
Como explica o método: ${cerebro.entrega?.explicacao || ''}
Transformação real que entrega: ${cerebro.entrega?.transformacaoReal || ''}
O que a diferencia: ${cerebro.entrega?.diferencial || ''}
Por que funciona: ${cerebro.entrega?.funciona || ''}
Uma palavra que define a entrega: ${cerebro.entrega?.palavra || ''}

COMO COMUNICA:
Estilo de comunicação: ${cerebro.comunicacao?.estilo || ''}
Como quer que as pessoas se sintam: ${cerebro.comunicacao?.sentimento || ''}
Palavras que usa muito: ${cerebro.comunicacao?.palavras || ''}
Palavras que nunca usaria: ${cerebro.comunicacao?.nuncaDiria || ''}
Verbos de poder: ${cerebro.comunicacao?.verbos || ''}

REFERÊNCIAS:
Quem admira: ${cerebro.referencias?.admira || ''}
Livros e conceitos: ${cerebro.referencias?.livros || ''}
Músicas e cultura da persona: ${cerebro.referencias?.musicas || ''}
Séries e filmes: ${cerebro.referencias?.series || ''}
Assuntos que vai falar: ${cerebro.referencias?.assuntos || ''}

DEPOIMENTOS E PROVAS SOCIAIS:
${cerebro.provas?.depoimento1 || ''}
${cerebro.provas?.depoimento2 || ''}
${cerebro.provas?.depoimento3 || ''}
Resultado da turma: ${cerebro.provas?.resultado_turma || ''}
`.trim();
}

export { REGRAS_BASE, montarContextoCerebro };
