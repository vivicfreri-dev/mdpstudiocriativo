// DADOS DAS 30 TAREFAS
// Cada tarefa tem: id, bloco, título, descrição, formatos, prompt base

export const BLOCOS = {
  base: { label: 'Base', cor: 'base', descricao: 'Construção da identidade' },
  topo: { label: 'Topo de funil', cor: 'topo', descricao: 'Atrai e gera identificação' },
  meio: { label: 'Meio de funil', cor: 'meio', descricao: 'Educa e fortalece autoridade' },
  fundo: { label: 'Fundo de funil', cor: 'fundo', descricao: 'Conduz para a decisão' }
};

export const FORMATOS = {
  carrossel_autoridade: { nome: 'Carrossel de autoridade', icone: '🗂', slides: 10, dimensao: '1:1', tipo: 'feed' },
  carrossel_posicionamento: { nome: 'Carrossel de posicionamento', icone: '🎯', slides: 10, dimensao: '1:1', tipo: 'feed' },
  carrossel_conexao: { nome: 'Carrossel de conexão', icone: '💬', slides: 10, dimensao: '1:1', tipo: 'feed' },
  checklist: { nome: 'Checklist', icone: '✅', slides: 10, dimensao: '1:1', tipo: 'feed' },
  passo_a_passo: { nome: 'Passo a passo', icone: '👣', slides: 10, dimensao: '1:1', tipo: 'feed' },
  venda: { nome: 'Post de venda', icone: '💰', slides: 10, dimensao: '1:1', tipo: 'feed' },
  quem_e_voce: { nome: 'Quem é você', icone: '👤', slides: 10, dimensao: '1:1', tipo: 'feed' },
  como_consegui: { nome: 'Como consegui', icone: '🏆', slides: 10, dimensao: '1:1', tipo: 'feed' },
  hype: { nome: 'Post hype', icone: '🔥', slides: 1, dimensao: '1:1', tipo: 'feed' },
  dia_persona: { nome: 'Dia da persona', icone: '🤝', slides: 10, dimensao: '1:1', tipo: 'feed' },
  post_estatico: { nome: 'Post estático', icone: '🖼', slides: 1, dimensao: '1:1', tipo: 'feed' },
  reels_autoridade: { nome: 'Reels de autoridade', icone: '🎬', slides: 1, dimensao: '9:16', tipo: 'reels' },
  reels_conexao: { nome: 'Reels de conexão', icone: '🎥', slides: 1, dimensao: '9:16', tipo: 'reels' },
  reels_hype: { nome: 'Reels hype', icone: '📹', slides: 1, dimensao: '9:16', tipo: 'reels' },
  stories_5: { nome: 'Stories — 5 stories', icone: '📱', slides: 5, dimensao: '9:16', tipo: 'stories' },
  stories_10: { nome: 'Stories — 10 stories', icone: '📱', slides: 10, dimensao: '9:16', tipo: 'stories' },
  stories_persona: { nome: 'Stories dia da persona', icone: '🤳', slides: 5, dimensao: '9:16', tipo: 'stories' },
  headlines: { nome: 'Headlines', icone: '📝', slides: 1, dimensao: '1:1', tipo: 'texto' },
  nome_aula: { nome: 'Nome de aula', icone: '🎓', slides: 1, dimensao: '1:1', tipo: 'texto' },
  live: { nome: 'Roteiro de live', icone: '🔴', slides: 1, dimensao: '1:1', tipo: 'texto' },
  storytelling: { nome: 'Storytelling', icone: '📖', slides: 10, dimensao: '1:1', tipo: 'feed' }
};

export const TAREFAS = [
  // BLOCO TOPO DE FUNIL
  {
    id: 6, bloco: 'topo',
    titulo: 'Carrossel de autoridade + Quem é você',
    descricao: 'Dois posts para começar: o primeiro mostra sua trajetória como prova. O segundo apresenta quem você é com história e visão — não currículo.',
    formatos: ['carrossel_autoridade', 'quem_e_voce'],
    formatoRecomendado: { post1: 'carrossel_autoridade', post2: 'quem_e_voce' },
    dicaPost1: 'Autoridade = superação, não conquista. Mostre o caminho que atravessou.',
    dicaPost2: 'Quem você é = história + visão + o que acredita. Não apresentação básica.',
    emocao: 'confiante'
  },
  {
    id: 7, bloco: 'topo',
    titulo: 'Posicionamento + Como consegui',
    descricao: 'Posicionamento mostra o que você acredita e defende — não apresentação. Como consegui mostra o caminho, não só o resultado.',
    formatos: ['carrossel_posicionamento', 'como_consegui'],
    formatoRecomendado: { post1: 'carrossel_posicionamento', post2: 'como_consegui' },
    dicaPost1: 'Posicionar é defender uma visão. Pode incomodar — e tudo bem.',
    dicaPost2: 'Mostre onde estava antes, o que tentou, o que mudou e o primeiro sinal.',
    emocao: 'seria_focada'
  },
  {
    id: 8, bloco: 'topo',
    titulo: 'Checklist + Dia da persona',
    descricao: 'Checklist faz a pessoa pensar "eu precisava ver isso". Dia da persona faz ela pensar "esse conteúdo é pra mim".',
    formatos: ['checklist', 'dia_persona', 'post_estatico', 'stories_5'],
    formatoRecomendado: { post1: 'checklist', post2: 'dia_persona' },
    dicaPost1: 'Checklist profundo, não óbvio. Conecta naturalmente com sua solução.',
    dicaPost2: 'Fale diretamente com ela. Nomeie o que ela sente mas não consegue expressar.',
    emocao: 'acolhedora'
  },
  {
    id: 9, bloco: 'topo',
    titulo: 'Passo a passo + Reels de autoridade',
    descricao: 'Passo a passo ensina algo prático que ela aplica hoje. Reels de autoridade mostra que você realmente sabe do que fala.',
    formatos: ['passo_a_passo', 'reels_autoridade', 'carrossel_autoridade'],
    formatoRecomendado: { post1: 'passo_a_passo', post2: 'reels_autoridade' },
    dicaPost1: 'Ensine como você faz. Clareza acima de tudo.',
    dicaPost2: 'Não é trend ou áudio viral. É você falando com segurança sobre seu tema.',
    emocao: 'seria_focada'
  },
  {
    id: 10, bloco: 'topo',
    titulo: 'Post de conexão + Post hype',
    descricao: 'Conexão fortalece o vínculo com quem te acompanha. Hype usa assunto em alta com a sua visão — não para seguir trend.',
    formatos: ['carrossel_conexao', 'hype', 'reels_conexao', 'post_estatico'],
    formatoRecomendado: { post1: 'carrossel_conexao', post2: 'hype' },
    dicaPost1: 'História resolvida com intenção. Emoção com controle.',
    dicaPost2: 'Use o assunto como ponte para mostrar como você pensa.',
    emocao: 'acolhedora'
  },
  {
    id: 11, bloco: 'topo',
    titulo: 'Dia da persona aprofundado + Stories com analogias',
    descricao: 'Foco total na persona — não falar sobre você, falar COM ela. Stories criam conexão com analogias do cotidiano.',
    formatos: ['dia_persona', 'stories_5', 'stories_10', 'stories_persona'],
    formatoRecomendado: { post1: 'dia_persona', post2: 'stories_5' },
    dicaPost1: 'Se eu fosse escrever algo que parecesse uma conversa íntima com minha persona, o que eu diria?',
    dicaPost2: 'Analogias simples e visuais do cotidiano dela.',
    emocao: 'empatica'
  },
  {
    id: 12, bloco: 'topo',
    titulo: 'Storytelling estratégico + Headlines',
    descricao: 'Storytelling transforma experiência em conteúdo que prende. Headlines são 15 opções para parar o scroll.',
    formatos: ['storytelling', 'headlines', 'carrossel_autoridade'],
    formatoRecomendado: { post1: 'storytelling', post2: 'headlines' },
    dicaPost1: 'Gancho → contexto → conflito → virada → reflexão → conexão com produto → CTA.',
    dicaPost2: 'Varie: confronto, identificação, provocação, curiosidade, quebra de padrão.',
    emocao: 'reflexiva'
  },
  {
    id: 13, bloco: 'topo',
    titulo: 'Revisão de consistência',
    descricao: 'Não é sobre criar algo novo. É olhar para o que você já produziu e entender como tudo se conecta. O conjunto é o que posiciona.',
    formatos: [],
    formatoRecomendado: null,
    dicaPost1: 'O que está reforçando? Qual mensagem se repete? O que a audiência começa a perceber?',
    dicaPost2: '',
    emocao: 'reflexiva',
    semPost: true
  },

  // BLOCO MEIO DE FUNIL
  {
    id: 14, bloco: 'meio',
    titulo: 'Meio de funil + Nome de aula',
    descricao: 'Conteúdo que educa, posiciona e aumenta o desejo sem fazer a oferta final. Nome de aula estratégico para live ou aula.',
    formatos: ['carrossel_autoridade', 'passo_a_passo', 'nome_aula', 'reels_autoridade'],
    formatoRecomendado: { post1: 'carrossel_autoridade', post2: 'nome_aula' },
    dicaPost1: 'Gere consciência do problema. Mostre que existe um caminho possível.',
    dicaPost2: 'Nome que desperta curiosidade sem entregar tudo.',
    emocao: 'seria_focada'
  },
  {
    id: 15, bloco: 'meio',
    titulo: 'Aprofundamento de percepção + Live estratégica',
    descricao: 'Ajuda a persona a enxergar algo que ela ainda não vê. Live de até 60 minutos com roteiro completo.',
    formatos: ['carrossel_posicionamento', 'live', 'reels_autoridade'],
    formatoRecomendado: { post1: 'carrossel_posicionamento', post2: 'live' },
    dicaPost1: 'Não é sobre explicar o problema — é ajudar ela a enxergar o que não vê.',
    dicaPost2: 'Roteiro: headline + abertura + desenvolvimento em blocos + interação + fechamento.',
    emocao: 'seria_focada'
  },
  {
    id: 16, bloco: 'meio',
    titulo: 'Quebra de mitos + Método e processo',
    descricao: 'Desfaz crenças que travam a persona. Mostra seu método e o que você faz diferente.',
    formatos: ['carrossel_autoridade', 'passo_a_passo', 'reels_autoridade'],
    formatoRecomendado: { post1: 'carrossel_autoridade', post2: 'passo_a_passo' },
    dicaPost1: '3 mitos que afastam ela do resultado. Corrija cada um.',
    dicaPost2: 'Jeito tradicional vs seu jeito. Mostre o caminho.',
    emocao: 'seria_focada'
  },
  {
    id: 17, bloco: 'meio',
    titulo: 'Erros e ajustes + Provocação',
    descricao: 'Mostra os erros que bloqueiam o resultado. Provocação gera desconforto consciente.',
    formatos: ['checklist', 'carrossel_posicionamento', 'reels_autoridade'],
    formatoRecomendado: { post1: 'checklist', post2: 'carrossel_posicionamento' },
    dicaPost1: 'Você ainda não tem resultado porque... Você está pulando essa etapa.',
    dicaPost2: 'Você quer o resultado mas não faz o ajuste. Sem suavizar.',
    emocao: 'provocativa'
  },
  {
    id: 18, bloco: 'meio',
    titulo: 'Prova e transformação + Preparação para oferta',
    descricao: 'Mostra resultado real de cliente. Começa a preparar a persona para a oferta que vem.',
    formatos: ['storytelling', 'carrossel_conexao', 'reels_conexao'],
    formatoRecomendado: { post1: 'storytelling', post2: 'carrossel_conexao' },
    dicaPost1: 'Antes e depois real de cliente. Virada de chave concreta.',
    dicaPost2: 'O que você precisa saber antes de investir. Meu método não é pra todo mundo.',
    emocao: 'acolhedora'
  },
  {
    id: 19, bloco: 'meio',
    titulo: 'Conteúdo educativo aprofundado + Reels de conexão',
    descricao: 'Aprofunda o entendimento do problema. Reels humaniza com presença.',
    formatos: ['passo_a_passo', 'carrossel_autoridade', 'reels_conexao'],
    formatoRecomendado: { post1: 'passo_a_passo', post2: 'reels_conexao' },
    dicaPost1: 'Explica o problema em camadas. Traz clareza que ela não tinha.',
    dicaPost2: 'Tom de conversa. Natural. Sem dramatização.',
    emocao: 'acolhedora'
  },
  {
    id: 20, bloco: 'meio',
    titulo: 'Revisão meio de funil',
    descricao: 'O que a persona já entende? O que ainda precisa clarificar antes de ir para a venda?',
    formatos: [],
    formatoRecomendado: null,
    dicaPost1: 'Avalie: a persona já sabe que tem o problema? Já confia em você? Está pronta para decidir?',
    dicaPost2: '',
    emocao: 'reflexiva',
    semPost: true
  },

  // BLOCO FUNDO DE FUNIL
  {
    id: 21, bloco: 'fundo',
    titulo: 'Virada real + Quebra de crença',
    descricao: 'Mostra mudança concreta que aconteceu. Desconstrói pensamento limitante que trava a decisão.',
    formatos: ['storytelling', 'carrossel_posicionamento', 'reels_autoridade'],
    formatoRecomendado: { post1: 'storytelling', post2: 'carrossel_posicionamento' },
    dicaPost1: 'Como foi quando entendi isso. Mudança real e concreta.',
    dicaPost2: 'Você acha que precisa de X, mas precisa de Y.',
    emocao: 'confiante'
  },
  {
    id: 22, bloco: 'fundo',
    titulo: 'Erros e frustrações + Prova social',
    descricao: 'Gera identificação mostrando erros que você mesmo cometeu. Prova social com resultado real.',
    formatos: ['como_consegui', 'storytelling', 'carrossel_conexao'],
    formatoRecomendado: { post1: 'como_consegui', post2: 'storytelling' },
    dicaPost1: 'Erros que cometi tentando resolver sozinha. Humaniza sem diminuir autoridade.',
    dicaPost2: 'O que aconteceu depois que cliente fez a virada. Bastidores reais.',
    emocao: 'reflexiva'
  },
  {
    id: 23, bloco: 'fundo',
    titulo: 'Posicionamento forte + Bastidores',
    descricao: 'Diferencia sua entrega com firmeza. Bastidores mostram o que acontece por dentro.',
    formatos: ['carrossel_posicionamento', 'stories_5', 'reels_autoridade'],
    formatoRecomendado: { post1: 'carrossel_posicionamento', post2: 'stories_5' },
    dicaPost1: 'Eu não vendo produto, eu entrego transformação. Meu método não é pra todo mundo.',
    dicaPost2: 'O que acontece dentro. Como funciona por dentro.',
    emocao: 'seria_focada'
  },
  {
    id: 24, bloco: 'fundo',
    titulo: 'Decisão e ação + Ativação emocional',
    descricao: 'Leva a persona para a escolha. Ativa o desejo de mudança com urgência emocional.',
    formatos: ['carrossel_posicionamento', 'dia_persona', 'reels_autoridade'],
    formatoRecomendado: { post1: 'carrossel_posicionamento', post2: 'dia_persona' },
    dicaPost1: 'Você vai continuar assim ou vai mudar? E se você tivesse começado antes?',
    dicaPost2: 'Essa é pra quem cansou de tentar sozinha.',
    emocao: 'provocativa'
  },
  {
    id: 25, bloco: 'fundo',
    titulo: 'Antecipação da oferta + Stories de desejo',
    descricao: 'Prepara a audiência para a oferta que vem. Stories criam desejo antes da abertura.',
    formatos: ['post_estatico', 'stories_5', 'carrossel_conexao'],
    formatoRecomendado: { post1: 'post_estatico', post2: 'stories_5' },
    dicaPost1: 'Essa semana vou abrir algo diferente. Se você perder isso, não volta.',
    dicaPost2: 'Antecipação em sequência de stories. Cada um aumenta o desejo.',
    emocao: 'confiante'
  },
  {
    id: 26, bloco: 'fundo',
    titulo: 'Post de venda + Reels de autoridade (venda)',
    descricao: 'Vende sem parecer flyer. Conecta a dor da persona com a solução de forma natural.',
    formatos: ['venda', 'reels_autoridade', 'carrossel_autoridade'],
    formatoRecomendado: { post1: 'venda', post2: 'reels_autoridade' },
    dicaPost1: 'Não é catálogo. É conteúdo com intenção de venda. Emoção + identificação + desejo.',
    dicaPost2: 'Fala sobre a transformação, não sobre o produto.',
    emocao: 'confiante'
  },
  {
    id: 27, bloco: 'fundo',
    titulo: 'Objeções respondidas + Depoimentos',
    descricao: 'Responde as principais objeções antes que ela pergunte. Depoimentos reforçam com prova real.',
    formatos: ['checklist', 'carrossel_autoridade', 'stories_5'],
    formatoRecomendado: { post1: 'checklist', post2: 'stories_5' },
    dicaPost1: 'Não sei mexer com tecnologia. Não tenho tempo. Será mais um curso. Responda cada uma.',
    dicaPost2: 'Depoimento espontâneo, sem edição. Deixa a voz da cliente falar.',
    emocao: 'acolhedora'
  },
  {
    id: 28, bloco: 'fundo',
    titulo: 'Urgência + Escassez',
    descricao: 'Urgência honesta — não forçada. Escassez real das vagas ou do prazo.',
    formatos: ['post_estatico', 'stories_5', 'reels_autoridade'],
    formatoRecomendado: { post1: 'stories_5', post2: 'post_estatico' },
    dicaPost1: 'Vagas limitadas. Quando fechar, fecha. Próxima turma só em [data].',
    dicaPost2: 'Urgência honesta — baseada em fatos reais, não pressão artificial.',
    emocao: 'seria_focada'
  },
  {
    id: 29, bloco: 'fundo',
    titulo: 'Última chamada + CTA direto',
    descricao: 'Último momento antes de fechar. CTA direto e claro sem rodeios.',
    formatos: ['post_estatico', 'reels_autoridade', 'stories_5'],
    formatoRecomendado: { post1: 'reels_autoridade', post2: 'post_estatico' },
    dicaPost1: 'Últimas horas. Decisão agora ou na próxima turma em meses.',
    dicaPost2: 'CTA claro: link na bio, direct, ou formulário. Sem ambiguidade.',
    emocao: 'confiante'
  },
  {
    id: 30, bloco: 'fundo',
    titulo: 'Celebração + Próximos passos',
    descricao: 'Celebra quem entrou. Define próximos passos para quem não entrou. Fecha o ciclo com dignidade.',
    formatos: ['carrossel_conexao', 'stories_5', 'post_estatico'],
    formatoRecomendado: { post1: 'carrossel_conexao', post2: 'stories_5' },
    dicaPost1: 'Obrigada pelas conexões. O conteúdo continua independente da venda.',
    dicaPost2: 'Próxima turma em [data]. Enquanto isso, continue aqui.',
    emocao: 'alegre'
  }
];

export const EMOCOES = [
  { id: 'confiante', label: 'Confiante', icone: '💪', desc: 'Olhar firme, postura segura' },
  { id: 'seria_focada', label: 'Séria / focada', icone: '🎯', desc: 'Expressão determinada, direta' },
  { id: 'acolhedora', label: 'Acolhedora', icone: '😊', desc: 'Sorriso leve, expressão aberta' },
  { id: 'reflexiva', label: 'Reflexiva', icone: '🤔', desc: 'Pensativa, introspectiva' },
  { id: 'alegre', label: 'Alegre', icone: '😄', desc: 'Sorrindo, energia positiva' },
  { id: 'provocativa', label: 'Provocativa', icone: '🔥', desc: 'Olhar desafiador, firme' },
  { id: 'empatica', label: 'Empática', icone: '🤝', desc: 'Expressão de compreensão' },
  { id: 'profissional', label: 'Profissional', icone: '👔', desc: 'Postura formal, autoridade' }
];

export const AMBIENTES = ['Casa', 'Escritório', 'Externo', 'Neutro', 'Café'];
export const ROUPAS = ['Casual', 'Profissional', 'Elegante', 'Despojado'];

export function getTarefa(id) {
  return TAREFAS.find(t => t.id === id);
}

export function getProximaTarefa(progresso) {
  for (const t of TAREFAS) {
    if (!progresso?.[`tarefa_${t.id}`]?.concluida) return t;
  }
  return null;
}

export function getTarefasPorBloco(bloco) {
  return TAREFAS.filter(t => t.bloco === bloco);
}

export function getTarefaConcluida(progresso, id) {
  return progresso?.[`tarefa_${id}`]?.concluida || false;
}
