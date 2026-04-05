import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

const BLOCOS = [
  {
    id: 1, key: 'essencia', titulo: 'Quem você é', cor: '#D4537E',
    campos: [
      { key: 'descricao', label: 'Descrição em uma frase', placeholder: 'Quem você é hoje em uma frase...' },
      { key: 'momento', label: 'Momento que te define profissionalmente', placeholder: 'O momento que mudou tudo na sua trajetória...' },
      { key: 'reconhecimento', label: 'O que as pessoas mais reconhecem em você?', placeholder: 'Suas características mais marcantes...' },
      { key: 'dor', label: 'Dor pessoal que te moveu a criar seu método/produto', placeholder: 'O que você viveu que te fez criar isso...' },
      { key: 'legado', label: 'Que legado quer deixar?', placeholder: 'O que você quer que fique quando não estiver mais aqui...' }
    ]
  },
  {
    id: 2, key: 'crencas', titulo: 'No que você acredita', cor: '#7F77DD',
    campos: [
      { key: 'conviccao', label: 'Maior convicção sobre sua persona', placeholder: 'O que você sabe com certeza sobre quem você atende...' },
      { key: 'naoTolera', label: 'O que NÃO tolera no mercado digital', placeholder: 'O que te incomoda profundamente no seu mercado...' },
      { key: 'mentira', label: 'A mentira que quer desmascarar', placeholder: 'Qual crença falsa você quer quebrar...' },
      { key: 'transformacao', label: 'Transformação de verdade acontece quando...', placeholder: 'O que precisa acontecer para a mudança ser real...' },
      { key: 'profundidade', label: 'Viralidade ou profundidade? O que você defende?', placeholder: 'Sua posição sobre crescimento nas redes...' }
    ]
  },
  {
    id: 3, key: 'entrega', titulo: 'O que você faz e entrega', cor: '#BA7517',
    campos: [
      { key: 'explicacao', label: 'Como explica seu produto/método em uma frase', placeholder: 'De forma simples, o que você faz...' },
      { key: 'transformacaoReal', label: 'Transformação REAL que entrega', placeholder: 'O que muda de verdade na vida da sua cliente...' },
      { key: 'diferencial', label: 'O que te diferencia de todo mundo', placeholder: 'O que só você faz do jeito que você faz...' },
      { key: 'funciona', label: 'Meu trabalho funciona porque...', placeholder: 'A razão profunda do seu método funcionar...' },
      { key: 'palavra', label: 'Uma palavra que define sua entrega', placeholder: 'Dignidade, Clareza, Estrutura...' }
    ]
  },
  {
    id: 4, key: 'comunicacao', titulo: 'Como você comunica', cor: '#1D9E75',
    campos: [
      { key: 'estilo', label: 'Seu estilo de comunicação', placeholder: 'Provoca, acolhe, desafia, é direta...' },
      { key: 'sentimento', label: 'Como quer que as pessoas se sintam', placeholder: 'Vistas, desafiadas, acolhidas...' },
      { key: 'palavras', label: 'Palavras e expressões que você USA MUITO', placeholder: '"olha só", "né?", "faz sentido?"...' },
      { key: 'nuncaDiria', label: 'Palavras e expressões que NUNCA usaria', placeholder: 'Jornada, transformação, clichês...' },
      { key: 'verbos', label: 'Seus verbos de poder', placeholder: 'Conduzo, organizo, estruturo, mapear...' }
    ]
  },
  {
    id: 5, key: 'referencias', titulo: 'Referências e inspirações', cor: '#D4537E',
    campos: [
      { key: 'admira', label: 'Quem você admira profissionalmente e por quê', placeholder: 'Nome + o que admira e o que não curte nessa pessoa...' },
      { key: 'livros', label: 'Livros e conceitos que guiam seu trabalho', placeholder: 'O Segredo, Jornada do Herói, Arquétipos...' },
      { key: 'musicas', label: 'Músicas e cultura que conectam com sua persona', placeholder: 'Anos 80/90, Whitney Houston, Alpha FM...' },
      { key: 'series', label: 'Séries e filmes que você assiste', placeholder: "The Pitt, Grey's Anatomy, Modern Family..." },
      { key: 'assuntos', label: 'Assuntos que você VAI falar (e os que não vai)', placeholder: 'VAI: amnésia identitária, menopausa... NÃO VAI: vida amorosa...' }
    ]
  },
  {
    id: 6, key: 'provas', titulo: 'Depoimentos e provas sociais', cor: '#1D9E75',
    campos: [
      { key: 'depoimento1', label: 'Depoimento 1 — Nome + história + resultado', placeholder: 'Ex: Mutisia Santos — tinha medo de começar, travava, mas finalizou o briefing e publicou...' },
      { key: 'depoimento2', label: 'Depoimento 2 — Nome + história + resultado', placeholder: 'Ex: Eliane — engajada, espera ansiosamente pelas aulas, reconhece o valor...' },
      { key: 'depoimento3', label: 'Depoimento 3 — Nome + história + resultado', placeholder: 'Ex: Isabella Becker — mais clara sobre posicionamento, cada aula é uma descoberta...' },
      { key: 'resultado_turma', label: 'Resultado geral da turma', placeholder: 'Ex: Turma 1 — 18 mulheres, zero desistências, todas completaram os documentos...' },
      { key: 'prints_destaque', label: 'Prints e momentos de destaque para usar em posts', placeholder: 'Ex: Print do grupo com mensagem espontânea da Raquel na aula 3...' }
    ]
  }
];

const RESPOSTAS_VIVI = {
  essencia: {
    descricao: 'Uma mulher de 49 anos que acredita que todo mundo pode evoluir e ser uma pessoa melhor a cada dia.',
    momento: 'A descoberta de que posso ser quem eu sou. Passei 28 anos no corporativo — foi muito, mas não era eu. Saí aos 46 anos depois de um surto de estresse pós-traumático. Se não tivesse saído, estaria doente. Agora estou descobrindo meu propósito.',
    reconhecimento: 'Muito criativa — tenho ideias e soluções para muitas coisas. Fui muito tempo da área operacional do banco, então essa questão de processo e estrutura é algo que tenho naturalmente.',
    dor: 'Senti MEDO — e ainda tenho. Perdi minha identidade profissional. Agora que estou resgatando a minha, não quero que outras mulheres percam a delas. Porque a gente tem uma construção, uma história linda por trás, e pode se posicionar com essa história.',
    legado: 'Um movimento, uma comunidade que quebra barreiras de velhice e quebra essa ideia de que quem tem muita experiência não pode falar. Quem tem experiência TEM experiência.'
  },
  crencas: {
    conviccao: 'Mulheres 40+ estão na descoberta — e o mais lindo é que estão na sua essência. Depois dos 40 você quebra padrão. Sai das crenças e valores impostos e começa a seguir seu próprio movimento.',
    naoTolera: 'Essa ilusão de "faz isso, posta isso, coloca isso" — você vira uma personagem que não é você, que te adoece igual o sistema corporativo. As pessoas vendem uma fórmula pronta. Mas a mulher 40+, quando entende quem ela é, pode criar estrutura voltada para quem ela realmente é. Ninguém fala da HISTÓRIA dela.',
    mentira: 'Começar do zero. Como vou começar do zero? Eu tenho uma história, eu tenho uma trajetória.',
    transformacao: 'Quando organizo minhas informações e tenho clareza de quem eu sou e quem eu posso ajudar. É o que o método faz: entender a bagagem, entender o mercado, entender o público, para então entender quem sou e melhorar a comunicação.',
    profundidade: 'Profundidade é o mais importante. Viralidade é boa para o algoritmo, mas entregar para mais pessoas não significa que vai ser a pessoa que compra de você. Eu quero pessoas que COMPREM. Que se engajem com aquele conteúdo e tema.'
  },
  entrega: {
    explicacao: 'É um método mão na massa, feito junto em aula ao vivo. Conduzo essa mulher a empacotar a experiência dela: primeiro a experiência dela, depois como essa experiência é vista no mercado, depois qual é a pessoa ideal para ela atender. O MDP traz estrutura de temas do que vou comunicar com minha persona — não vou sair falando qualquer coisa, tenho uma estratégia.',
    transformacaoReal: 'Helena sai encantada. Primeiro porque ela não tinha dimensão de que tinha amnésia identitária — ela nem sabia disso. Ela fica fazendo novos cursos achando que precisa estar preparada, sendo que ela JÁ TEM uma história. Quando começamos a mapear isso e dar novas possibilidades, ela se encanta. Melhora a comunicação, tem clareza, descobre nichos que não via.',
    diferencial: 'Estou pegando mulheres que não sabem nem entrar no ChatGPT, não sabem salvar documento no Google Drive. Eu ensino as coisas BÁSICAS do digital. Por isso chama Dignidade Digital — ter dignidade com poucas ferramentas de fácil utilização. Eu não vejo ninguém fazer isso.',
    funciona: 'Porque vou aplicar isso na prática no Instagram. É mão na massa — ela não sai com teoria, sai com documentos prontos e conteúdo publicado.',
    palavra: 'Dignidade — sem dúvida. Todo mundo merece ter o mínimo de dignidade para evoluir enquanto ser humano. Dignidade tem uma AÇÃO por trás. Não é ficar parada esperando.'
  },
  comunicacao: {
    estilo: 'Gosto dessa mistura de provocar e afirmar. Quero trazer que tem sim uma luz no fim do túnel. Não tenho muita paciência para mimimi. As pessoas precisam de acolhimento, mas têm que ser desafiadas.',
    sentimento: 'Vistas e desafiadas. Percebo que quando sou muito direta, algumas pessoas não gostam. Elas gostam do acolhimento, mas não pode ser só acolhimento — tem que ser desafiadas também. Esse negócio de acolhimento com mimimi eu não gosto.',
    palavras: '"olha só", "então", "né?", "faz sentido?", "concorda?", "você percebe?", "entendeu?", "dignidade", "estrutura", "bagagem"',
    nuncaDiria: 'Jornada, transformação — essas coisas clichês. Coisas técnicas também não. Gosto de ser eu mesma. E quando sou eu mesma, erro no português, falo coisas às vezes sem conexão — essa sou eu e quero ser eu.',
    verbos: 'Conduzo, organizo, estruturo, mapear, redesenhar, perceber, reconhecer, identificar, nomear, decidir, aplicar, executar, implementar, reestruturar, reposicionar'
  },
  referencias: {
    admira: 'Yasmin Domingues — admiro a autonomia, fazer, ser dona. Mas não curto o padrão exigente de imagem, sempre de terninho. Isa Moreira — trazer naturalidade, mora na praia, cabelo desarrumado, roupas leves. Quero esse estilo de mostrar que estou no interior com autenticidade. Mas fala demais de conhecimento. Pablo Marçal — independente do que as pessoas falam, ele tem uma estrutura e tanto. Não gosto de tudo que ele fala, mas admiro a estrutura.',
    livros: 'O Segredo (Rhonda Byrne), O Poder do Subconsciente (Joseph Murphy), Mais Esperto que o Diabo (Napoleon Hill), Jornada do Herói (Joseph Campbell), Primal Branding, Arquétipos Junguianos, Virtologia (metodologia que criei).',
    musicas: 'Anos 80/90 — mesma geração da Helena, cria conexão imediata. Alpha FM. Whitney Houston (I Wanna Dance with Somebody), Madonna, Cyndi Lauper. Nostalgia geracional é uma ponte poderosa com a persona.',
    series: 'The Pitt, Modern Family, The Good Place, Welcome to Plathville, Grey\'s Anatomy, All Her Fault, Rainha da Sucata. Novelas Globo anos 80/90 (Terra Nostra). Sagas: Crepúsculo completo, Marvel/MCU completo, DC.',
    assuntos: 'VAI FALAR: do analógico ao digital, experiência estruturada, dignidade no processo, dependência emocional tecnológica, alfabetização digital básica (Google Drive, ChatGPT, WhatsApp Web), menopausa + produtividade, amnésia identitária digital. NÃO VAI FALAR: vida amorosa, espiritualidade profunda, detalhes íntimos da família, hobbies desconectados do negócio.'
  },
  provas: {
    depoimento1: 'Mutisia Santos — tinha medo de começar, travava, mas finalizou o briefing e publicou o Instagram. "Não vai ficar no ar de novo. Amanhã, nem depois de amanhã, nem nunca mais." Prova de quem executa mesmo com medo.',
    depoimento2: 'Eliane — "Estou adorando as aulas e tenho certeza que serei uma mulher bem melhor no final desse trabalho. Fico feliz demais quando chega a sexta-feira!" Aluna engajada que reconhece o valor da mentoria.',
    depoimento3: 'Isabella Becker — "Estou me sentindo mais clara sobre meu posicionamento. Cada aula é uma descoberta!" Clareza sobre posicionamento é uma das principais transformações do MDP. Raquel (comentário espontâneo no Instagram na aula 3): "Agora estou encontrando meu caminho, graças à sua condução nos apoiando no mundo digital!" Patricia Rodrigues: "Nunca imaginei que seria possível organizar 20 anos de carreira em documentos tão estratégicos. Agora vejo meu valor!"',
    resultado_turma: 'Turma 1 — 18 mulheres, ZERO desistências, todas completaram os 13 documentos estratégicos. Depoimentos espontâneos não solicitados. Transformação antes/depois documentada. Crescimento individual a cada aula.',
    prints_destaque: 'Print do grupo com mensagem espontânea da Raquel na aula 3 dizendo que já sente transformação. Print da Mutisia anunciando que finalizou o briefing. Print da Eliane falando que espera ansiosa pela sexta-feira.'
  }
};

export default function SegundoCerebro() {
  const navigate = useNavigate();
  const { cerebro, salvarCerebro, concluirEtapa } = useApp();
  const [blocoAtual, setBlocoAtual] = useState(0);
  const [dados, setDados] = useState({});
  const [saving, setSaving] = useState(false);
  const [isVivi, setIsVivi] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (cerebro) setDados(cerebro);
  }, []);

  const bloco = BLOCOS[blocoAtual];
  const totalBlocos = BLOCOS.length;
  const progPct = (blocoAtual / totalBlocos) * 100;

  function setCampo(blocoKey, campoKey, valor) {
    setDados(prev => ({
      ...prev,
      [blocoKey]: { ...(prev[blocoKey] || {}), [campoKey]: valor }
    }));
  }

  function preencherComVivi() {
    setDados(RESPOSTAS_VIVI);
    setIsVivi(true);
  }

  async function avancar() {
    setSaving(true);
    await salvarCerebro(dados);
    setSaving(false);
    if (blocoAtual < totalBlocos - 1) {
      setBlocoAtual(blocoAtual + 1);
      window.scrollTo(0, 0);
    } else {
      await concluirEtapa('cerebro');
      navigate('/base/bio');
    }
  }

  function voltar() {
    if (blocoAtual > 0) {
      setBlocoAtual(blocoAtual - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  }

  return (
    <div>
      <Header
        titulo={bloco.titulo}
        subtitulo={`Segundo cérebro · Bloco ${blocoAtual + 1} de ${totalBlocos}`}
      />
      <div className="page">

        <div className="progress-bar" style={{ marginBottom: '12px' }}>
          <div className="progress-fill" style={{ width: `${progPct}%` }} />
        </div>

        <div style={{
          display: 'inline-block', padding: '3px 10px', borderRadius: '6px',
          background: `${bloco.cor}20`, color: bloco.cor,
          fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
          letterSpacing: '0.05em', marginBottom: '12px'
        }}>
          BLOCO {blocoAtual + 1} — {bloco.titulo.toUpperCase()}
        </div>

        {blocoAtual === 0 && !isVivi && (
          <div
            style={{
              background: '#E1F5EE', border: '0.5px solid #9FE1CB',
              borderRadius: '8px', padding: '10px 12px', marginBottom: '12px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
            onClick={preencherComVivi}
          >
            <span style={{ fontSize: '18px' }}>✨</span>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#085041' }}>
                Sou a Vivi — preencher automaticamente
              </div>
              <div style={{ fontSize: '10px', color: '#1D9E75' }}>
                Carrega todas as minhas informações nos 6 blocos
              </div>
            </div>
          </div>
        )}

        {bloco.id === 3 && (
          <div style={{
            background: '#FAEEDA', border: '0.5px solid #FAC775',
            borderRadius: '8px', padding: '8px 12px', marginBottom: '12px'
          }}>
            <p style={{ fontSize: '11px', color: '#412402' }}>
              ⚡ Este é o bloco mais importante. Aqui fica a oferta que o app vai usar em todos os criativos. Atualize sempre que trocar de produto.
            </p>
          </div>
        )}

        {bloco.id === 6 && (
          <div style={{
            background: '#E1F5EE', border: '0.5px solid #9FE1CB',
            borderRadius: '8px', padding: '8px 12px', marginBottom: '12px'
          }}>
            <p style={{ fontSize: '11px', color: '#085041' }}>
              ✓ A IA vai usar esses depoimentos nos posts de prova social, autoridade e resultado. Quanto mais detalhes, melhor o conteúdo gerado.
            </p>
          </div>
        )}

        {bloco.campos.map(campo => (
          <div key={campo.key} className="form-group">
            <label>{campo.label}</label>
            <textarea
              placeholder={campo.placeholder}
              value={dados[bloco.key]?.[campo.key] || ''}
              onChange={e => setCampo(bloco.key, campo.key, e.target.value)}
              style={{ minHeight: '80px' }}
            />
          </div>
        ))}

        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button onClick={voltar} className="btn btn-outline" style={{ flex: 1 }}>
            ← Voltar
          </button>
          <button onClick={avancar} disabled={saving} className="btn btn-rose" style={{ flex: 2 }}>
            {saving ? 'Salvando...' : blocoAtual < totalBlocos - 1 ? 'Próximo bloco →' : 'Concluir e avançar →'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '16px' }}>
          {BLOCOS.map((b, i) => (
            <div key={b.id} style={{
              width: i === blocoAtual ? '20px' : '6px',
              height: '6px', borderRadius: '3px',
              background: i <= blocoAtual ? '#D4537E' : 'rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }} />
          ))}
        </div>

      </div>
      <BottomNav />
    </div>
  );
}
