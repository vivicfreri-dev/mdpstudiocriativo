// API Claude (Anthropic) — texto
// API Gemini (Google) — imagens
const CLAUDE_KEY = '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';
const GEMINI_KEY = 'AIzaSyBHDuyN_AUdfdRVxzxXW5A5HbAE6EtieIE';
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
  const sistema = `${montarContextoCerebro(cerebro)}\n\n${REGRAS_BASE}`;
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2500,
      system: sistema,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  
  const text = data.content?.[0]?.text || '';
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
