// Todo o texto e os dados do site ficam aqui.
// Convenções:
//   // PREENCHER            → variável do projeto ainda não informada (item 0 do briefing)
//   // VALIDAR COM A CLÍNICA → texto escrito como base, precisa de aprovação da clínica
// Títulos aceitam *asteriscos* para marcar a palavra-chave em itálico caramelo.

export type OrigemCTA =
  | "header"
  | "hero"
  | "resultados"
  | "implantodontia"
  | "periodontia"
  | "ortodontia"
  | "harmonizacao-facial"
  | "sobre"
  | "viviane"
  | "andre"
  | "faq"
  | "rodape"
  | "flutuante";

// ---------------------------------------------------------------------------
// 0. VARIÁVEIS DO PROJETO
// ---------------------------------------------------------------------------

export const clinica = {
  nome: "Leles Cavalcanti Odontologia",
  cidade: "Itabira",
  uf: "MG",
  endereco: {
    rua: "Av. Carlos Drummond de Andrade, 51",
    complemento: "Sala 415",
    predio: "Edifício Quality",
    bairro: "Centro",
    cep: "35900-025",
  },
  // PREENCHER: número com DDD, só dígitos, sem o 55 (ex.: "31999999999")
  whatsappDigitos: "31985946414",
  // Telefone fixo (ligação)
  telefoneDigitos: "3138316414",
  telefoneExibicao: "(31) 3831-6414",
  whatsappExibicao: "(31) 98594-6414",
  // Dias no padrão schema.org (Monday…Sunday); períodos em 24h. Sem períodos = fechado.
  horarios: [
    {
      rotulo: "Segunda a Sexta",
      texto: "8h às 12h e 14h às 18h",
      dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      periodos: [
        { abre: "08:00", fecha: "12:00" },
        { abre: "14:00", fecha: "18:00" },
      ],
    },
    { rotulo: "Sábado e Domingo", texto: "Fechado", dias: ["Saturday", "Sunday"], periodos: [] },
  ],
  instagram: "", // PREENCHER: só o usuário, sem @ (ex.: "lelesodontologia")
  cnpj: "[00.000.000/0001-00]", // PREENCHER
  responsavelTecnico: {
    nome: "[Dr(a). NOME]", // PREENCHER
    cro: "CRO-MG [00000]", // PREENCHER
  },
  // Opcional: `src` do iframe "Incorporar um mapa" do Google Maps. Vazio = mapa gerado pelo endereço.
  mapaEmbedUrl: "",
  geo: null as { lat: number; lng: number } | null, // PREENCHER (opcional, melhora o SEO local)
  modoAntesDepois: "pares" as "pares" | "slider", // PREENCHER: "pares" ou "slider"
};

// Profissionais da clínica (o casal). Cada um atende as suas áreas.
// Atenção (CFO): só use "especialista" no texto se o profissional tiver a especialidade registrada no CRO.
export const profissionais = {
  dra: { nome: "Dra. Viviane Leles", cro: "CRO-MG 27280" },
  dr: { nome: "Dr. André Cavalcanti", cro: "CRO-MG 27864" },
};

export type IdEspecialidade = "implantodontia" | "periodontia" | "ortodontia" | "harmonizacao-facial";

// Áreas de atuação. A ordem aqui é a ordem dos cards na página.
export const especialidades: {
  id: IdEspecialidade;
  nome: string;
  nomeMinusculo: string;
  profissional: { nome: string; cro: string };
  descricao: string;
  indicacoes: string[];
  cta: string;
}[] = [
  {
    id: "implantodontia",
    nome: "Implantodontia",
    nomeMinusculo: "implante dentário",
    profissional: profissionais.dr,
    descricao: "Reposição de dentes perdidos com implantes, devolvendo a função da mastigação e a estética do sorriso.", // VALIDAR COM A CLÍNICA
    indicacoes: [
      "Perdeu um ou mais dentes", // VALIDAR COM A CLÍNICA
      "Usa prótese móvel e quer mais estabilidade", // VALIDAR COM A CLÍNICA
      "Sente dificuldade para mastigar", // VALIDAR COM A CLÍNICA
      "Evita sorrir por causa de espaços na boca", // VALIDAR COM A CLÍNICA
    ],
    cta: "Avaliar implantes",
  },
  {
    id: "harmonizacao-facial",
    nome: "Harmonização Facial",
    nomeMinusculo: "harmonização facial",
    profissional: profissionais.dra,
    descricao: "Procedimentos que buscam equilíbrio entre os traços do rosto, respeitando a sua naturalidade.", // VALIDAR COM A CLÍNICA
    indicacoes: [
      "Deseja realçar os traços com naturalidade", // VALIDAR COM A CLÍNICA
      "Se incomoda com sinais de expressão", // VALIDAR COM A CLÍNICA
      "Busca mais equilíbrio entre sorriso e rosto", // VALIDAR COM A CLÍNICA
      "Quer um planejamento feito para o seu rosto", // VALIDAR COM A CLÍNICA
    ],
    cta: "Avaliar harmonização",
  },
  {
    id: "periodontia",
    nome: "Periodontia",
    nomeMinusculo: "tratamento periodontal",
    profissional: profissionais.dr,
    descricao: "Cuidado com a gengiva e com as estruturas que sustentam os dentes, da prevenção ao tratamento.", // VALIDAR COM A CLÍNICA
    indicacoes: [
      "Percebe sangramento ao escovar ou usar fio dental", // VALIDAR COM A CLÍNICA
      "Nota a gengiva retraída ou os dentes mais longos", // VALIDAR COM A CLÍNICA
      "Sente os dentes sensíveis ou com mobilidade", // VALIDAR COM A CLÍNICA
      "Tem mau hálito frequente", // VALIDAR COM A CLÍNICA
    ],
    cta: "Avaliar a gengiva",
  },
  {
    id: "ortodontia",
    nome: "Ortodontia",
    nomeMinusculo: "tratamento ortodôntico",
    profissional: profissionais.dra,
    descricao: "Correção do alinhamento dos dentes e da mordida, com planejamento para cada fase da vida.", // VALIDAR COM A CLÍNICA
    indicacoes: [
      "Tem dentes tortos ou apinhados", // VALIDAR COM A CLÍNICA
      "Percebe espaços entre os dentes", // VALIDAR COM A CLÍNICA
      "Sente que a mordida não encaixa bem", // VALIDAR COM A CLÍNICA
      "Quer um sorriso mais alinhado, em qualquer idade", // VALIDAR COM A CLÍNICA
    ],
    cta: "Avaliar ortodontia",
  },
];

const listaEspecialidades = "Implantodontia, Harmonização Facial, periodontia e ortodontia";

export const enderecoCompleto = `${clinica.endereco.predio} · ${clinica.endereco.rua}, ${clinica.endereco.complemento} · ${clinica.endereco.bairro}, ${clinica.cidade} – ${clinica.uf} · ${clinica.endereco.cep}`;

// Google Maps: busca pelo nome + endereço (sem o nome do prédio, que confunde a busca)
const buscaMapa = encodeURIComponent(
  `${clinica.nome}, ${clinica.endereco.rua}, ${clinica.endereco.bairro}, ${clinica.cidade} - ${clinica.uf}, ${clinica.endereco.cep}`,
);
export const mapa = {
  embed: clinica.mapaEmbedUrl || `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${buscaMapa}`,
  rotas: `https://www.google.com/maps/dir/?api=1&destination=${buscaMapa}`,
};

// ---------------------------------------------------------------------------
// SITE / SEO / TRACKING
// ---------------------------------------------------------------------------

export const site = {
  // Domínio final (sem www). NEXT_PUBLIC_SITE_URL, se definida, tem prioridade.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lelescavalcantiodonto.com.br",
  titulo: `Implantes, Periodontia, Ortodontia e Harmonização Facial em ${clinica.cidade} | ${clinica.nome}`,
  descricao: `Implantodontia, periodontia, ortodontia e harmonização facial com planejamento individual na ${clinica.nome}, em ${clinica.cidade} – ${clinica.uf}. Agende sua avaliação pelo WhatsApp.`,
};

export const tracking = {
  gtmId: "", // PREENCHER (ex.: "GTM-XXXXXXX")
  metaPixelId: "", // PREENCHER (ex.: "123456789012345")
};

// ---------------------------------------------------------------------------
// WHATSAPP: mensagem diferente por origem
// ---------------------------------------------------------------------------

export const mensagensWhatsApp: Record<OrigemCTA, string> = {
  header: `Olá! Estou na página da ${clinica.nome} e quero agendar uma avaliação.`,
  hero: `Olá! Vi a página da ${clinica.nome} e quero agendar minha avaliação.`,
  resultados: `Olá! Vi os resultados de antes e depois da ${clinica.nome} e quero agendar minha avaliação.`,
  implantodontia: `Olá! Quero agendar uma avaliação para implante dentário com o ${profissionais.dr.nome}.`,
  periodontia: `Olá! Quero agendar uma avaliação da gengiva (periodontia) com o ${profissionais.dr.nome}.`,
  ortodontia: `Olá! Quero agendar uma avaliação de ortodontia com a ${profissionais.dra.nome}.`,
  "harmonizacao-facial": `Olá! Quero agendar uma avaliação de harmonização facial com a ${profissionais.dra.nome}.`,
  sobre: `Olá! Quero conhecer a ${clinica.nome} e agendar uma avaliação.`,
  viviane: `Olá! Quero agendar uma avaliação com a ${profissionais.dra.nome}.`,
  andre: `Olá! Quero agendar uma avaliação com o ${profissionais.dr.nome}.`,
  faq: `Olá! Tenho uma dúvida sobre os tratamentos da ${clinica.nome} e gostaria de conversar com a equipe.`,
  rodape: `Olá! Quero agendar uma consulta na ${clinica.nome}.`,
  flutuante: `Olá! Vim pela página da ${clinica.nome} e gostaria de falar com a equipe.`,
};

// ---------------------------------------------------------------------------
// SEÇÕES
// ---------------------------------------------------------------------------

export const header = {
  links: [
    // Na mesma ordem das seções na página (o link da seção visível fica destacado)
    { href: "#resultados", rotulo: "Resultados" },
    { href: "#especialidades", rotulo: "Especialidades" },
    { href: "#clinica", rotulo: "Clínica" },
    { href: "#profissionais", rotulo: "Profissionais" },
    { href: "#duvidas", rotulo: "Dúvidas" },
  ],
  cta: "Agendar",
};

export const hero = {
  eyebrow: `${clinica.cidade} · Odontologia`,
  // 3 linhas; a palavra-chave vai em itálico caramelo
  titulo: ["Cuidado completo", "para sua face", "e *sorriso*"], // VALIDAR COM A CLÍNICA
  subtitulo: `${listaEspecialidades}, com planejamento individual do primeiro contato ao acompanhamento. Converse com a nossa equipe e agende sua avaliação.`, // VALIDAR COM A CLÍNICA
  cta: "Agendar minha avaliação",
  linkSecundario: "Conhecer os tratamentos",
  cardVidro: { titulo: "Avaliação personalizada", texto: "Agende pelo WhatsApp" },
  imagemAlt: `Equipe da ${clinica.nome}`,
};

export const faixaConfianca = [
  "Avaliação individualizada", // VALIDAR COM A CLÍNICA
  "Implantes, periodontia, ortodontia e harmonização", // VALIDAR COM A CLÍNICA
  "Atendimento humanizado", // VALIDAR COM A CLÍNICA
  "Ambiente acolhedor", // VALIDAR COM A CLÍNICA
  "Explicação clara de cada etapa", // VALIDAR COM A CLÍNICA
  "Acompanhamento após o tratamento", // VALIDAR COM A CLÍNICA
];

type Profissional = "viviane" | "andre";

/** Paciente da Dra. Viviane: 3 fotos (frente e os dois lados). Originais em /images/resultados/, versões padronizadas (scripts/padronizar-resultados.mjs) em /padrao/ */
function casoViviane(n: number) {
  const vista = (lado: "frente" | "direito" | "esquerdo", rotulo: string, descricao: string) => ({
    src: `/images/resultados/padrao/viviane-${n}-${lado}.jpg`,
    rotulo,
    alt: `Harmonização facial, ${profissionais.dra.nome}, paciente ${n}, ${descricao}: antes (à esquerda) e depois (à direita)`,
  });
  return {
    de: "viviane" as Profissional,
    procedimento: "Harmonização Facial",
    fotos: [
      vista("frente", "Frente", "vista de frente"),
      vista("direito", "Lado direito", "lado direito do rosto"),
      vista("esquerdo", "Lado esquerdo", "lado esquerdo do rosto"),
    ],
  };
}

export const resultados = {
  eyebrow: "Antes e depois",
  titulo: "Resultados reais, *planejados* com cuidado",
  badge: `Resultados reais de pacientes da ${clinica.nome}`,
  aviso: "Resultados variam de acordo com cada caso.",
  cta: "Quero agendar minha avaliação",
  filtros: [
    { id: "todos" as const, rotulo: "Todos" },
    { id: "viviane" as const, rotulo: profissionais.dra.nome },
    { id: "andre" as const, rotulo: profissionais.dr.nome },
  ],
  ampliar: "Ampliar imagem",
  // Só pacientes reais da clínica, com autorização de uso de imagem.
  // Modo "pares": cada CASO é um paciente, com 1 ou mais fotos (ângulos). Antes e depois já vêm montados na mesma foto
  // e são mostrados inteiros, sem corte. A ordem aqui é a ordem do carrossel.
  // Lembrete (CFO): manter a autorização por escrito de cada paciente para uso da imagem.
  casos: [
    casoViviane(1),
    {
      de: "andre" as Profissional,
      procedimento: "Periodontia", // VALIDAR COM A CLÍNICA
      fotos: [
        {
          src: "/images/resultados/padrao/resultado-andre-acompanhamento.jpg",
          rotulo: "Evolução",
          alt: `Caso clínico do ${profissionais.dr.nome}: caso inicial, pós-operatório de dois meses e acompanhamento de 2 anos e meio`,
        },
      ],
    },
    casoViviane(2),
    {
      de: "andre" as Profissional,
      procedimento: "Periodontia", // VALIDAR COM A CLÍNICA
      fotos: [
        {
          src: "/images/resultados/padrao/resultado-andre-gengiva.jpg",
          rotulo: "Antes e depois",
          alt: `Caso clínico do ${profissionais.dr.nome}: dentes e gengiva antes (em cima) e depois (embaixo)`,
        },
      ],
    },
    casoViviane(3),
    {
      de: "andre" as Profissional,
      procedimento: "Enxerto Gengival", // VALIDAR COM A CLÍNICA
      fotos: [
        {
          src: "/images/resultados/padrao/andre-enxerto.jpg",
          rotulo: "Antes, enxerto posicionado e pós-cicatrização (5 meses)",
          alt: `Caso clínico do ${profissionais.dr.nome}: gengiva antes, enxerto posicionado e resultado após 5 meses de cicatrização`,
        },
      ],
    },
    casoViviane(4),
    {
      de: "andre" as Profissional,
      procedimento: "Recobrimento Radicular", // VALIDAR COM A CLÍNICA
      fotos: [
        {
          src: "/images/resultados/padrao/andre-recessao.jpg",
          rotulo: "Evolução do tratamento da retração gengival",
          alt: `Caso clínico do ${profissionais.dr.nome}: retração gengival em dente inferior (destacada) e evolução do tratamento em três etapas`,
        },
      ],
    },
    casoViviane(5),
  ],
  sliders: ["01", "02", "03", "04", "05", "06"].map((n) => ({
    antes: `/images/antes-${n}.jpg`,
    depois: `/images/depois-${n}.jpg`,
    alt: `Tratamento na ${clinica.nome}, caso ${Number(n)}`, // PREENCHER: dizer qual tratamento
  })),
};

export const secaoEspecialidades = {
  eyebrow: "Especialidades",
  titulo: "Tratamentos para o seu *sorriso* e o seu rosto",
  subtitulo: "Cada área é conduzida por um dos profissionais da clínica, com avaliação e planejamento individual.", // VALIDAR COM A CLÍNICA
  rotuloIndicacoes: "Indicado para quem:",
};

// Enquanto for `false`, a seção aparece só em desenvolvimento e NÃO entra no build de produção.
export const depoimentosReais = true;

export const depoimentos = {
  eyebrow: "Avaliações no Google",
  titulo: "*Depoimentos*",
  // Painel de avaliações da clínica no Google (aberto ao clicar em qualquer depoimento)
  linkGoogle: "https://www.google.com/search?q=Leles+Cavalcanti+Odontologia#lrd=0xa5a19834f166c7:0x51057a7e6821fbcc,1,,,,",
  // Avaliações reais do Google, copiadas sem edição (nome como aparece lá). Todas com 5 estrelas.
  itens: [
    {
      nome: "Dora Galdino",
      texto:
        "Profissionais incríveis, atendimento humanizado e um ambiente super agradável. Cuidam do nosso sorriso com muita dedicação e competência. Parabéns Dr André e Dra Viviane!",
    },
    {
      nome: "Rafaela Nóbrega",
      texto:
        "Minha filha fez tratamento ortodôntico na clínica e tivemos uma ótima experiência com a Dra. Viviane Leles. Sempre muito atenciosa, pontual e clara nas explicações. O atendimento foi humanizado, com muito carinho e cuidado com a criança. Recomendo com total confiança.",
    },
    {
      nome: "Jessika Cominetti",
      texto:
        "Que sorte a minha ter encontrado esse consultório! A equipe é incrível: competentes, atenciosos e extremamente dedicados. O atendimento é humanizado e passa muita confiança. Super recomendo para quem procura excelência e cuidado de verdade!",
    },
    {
      nome: "Deuzely Rocha Araujo Fernandes",
      texto: "Eu só tenho a Agradecer pelo cuidado e carinho que Recebi tanto do Dr.Andre como das suas secretarias .",
    },
    {
      nome: "Gisele Salvador Carvalho",
      texto:
        "Minha experiência com Dra. Viviane foi excelente. Profissional extremamente competente, me passou segurança confiança. Tudo foi conduzido com muito profissionalismo e cuidado. Estou muito satisfeita com o resultado dos meus dentes, e por escolher Dra. Viviane.",
    },
    {
      nome: "Dany Cota",
      texto:
        "Ambiente lindo e sofisticado com atendimento de muito profissionalismo e cuidado nos detalhes, detalhes esses que fazem a diferença. Parabéns Vivi e equipe.",
    },
    {
      nome: "KESSIA LELES DE REZENDE CARVALHO",
      texto:
        "Atendimento de excelência, com alto nível de personalização e padrão elevado nos aspectos técnicos, no ambiente e no acolhimento. Amo!",
    },
    {
      nome: "Viviane Silva",
      texto:
        "Excelente atendimento começando pela recepção,. A Tati e a Juliana são super competentes e atenciosas. Viviane e André excelentes profissionais confio de olhos fechados e recomendo. Melhor clínica 😍",
    },
    {
      nome: "wemerson silva",
      texto: "A melhor cliente odontológica da região, profissionais responsáveis dedicados, resultado do tratamento rápido e excelente!",
    },
  ],
};

export const sobre = {
  eyebrow: "A clínica",
  titulo: `Venha conhecer a *${clinica.nome}*!`,
  subtitulo: "Um ambiente pensado para o seu conforto, do momento em que você chega até o fim da consulta.", // VALIDAR COM A CLÍNICA
  cta: "Agendar uma visita",
  // Galeria em mosaico. `rotulo` aparece sobre a foto; `posicao` = ponto da foto que fica sempre visível no recorte
  fotos: [
    { src: "/images/clinica-espera-hd.jpg", rotulo: "Sala de espera", alt: `Sala de espera com o letreiro da ${clinica.nome}`, posicao: "50% 45%" },
    { src: "/images/clinica-recepcao-hd.jpg", rotulo: "Recepção", alt: "Recepção da clínica", posicao: "45% 50%" },
    { src: "/images/clinica-consultorio-viviane.jpg", rotulo: "Consultório da Dra. Viviane", alt: `Consultório da ${profissionais.dra.nome}`, posicao: "40% 40%" },
    { src: "/images/clinica-consultorio-andre-hd.jpg", rotulo: "Consultório do Dr. André", alt: `Consultório do ${profissionais.dr.nome}`, posicao: "35% 50%" },
    { src: "/images/clinica-consultorio-hd.jpg", rotulo: "Consultório", alt: "Cadeira odontológica em um dos consultórios", posicao: "50% 45%" },
    { src: "/images/clinica-lavabo-hd.jpg", rotulo: "Lavabo", alt: "Lavabo da clínica", posicao: "50% 30%" },
  ],
};

// Seção "Quem cuida de você": apresentação dos dois profissionais (textos enviados pela clínica).
export const secaoProfissionais = {
  eyebrow: "Quem cuida de você",
  titulo: "Conheça os *profissionais*",
  perfis: [
    {
      origem: "viviane" as const,
      nome: profissionais.dra.nome,
      tratamento: "Dra.",
      nomeSemTitulo: "Viviane Leles",
      cro: profissionais.dra.cro,
      areas: ["Harmonização Facial", "Ortodontia"],
      foto: "/images/dra-viviane-leles-hd.jpg",
      fotoAlt: `Retrato da ${profissionais.dra.nome}`,
      texto:
        "Dra. Viviane Leles é cirurgiã-dentista, formada pela UFMG há mais de 25 anos, especialista em Harmonização Facial e Ortodontia. Seu trabalho é pautado pela valorização da beleza natural, buscando resultados elegantes, equilibrados e personalizados, que respeitem a individualidade de cada paciente.",
      cta: "Agendar com a Dra. Viviane",
    },
    {
      origem: "andre" as const,
      nome: profissionais.dr.nome,
      tratamento: "Dr.",
      nomeSemTitulo: "André Cavalcanti",
      cro: profissionais.dr.cro,
      areas: ["Periodontia", "Implantodontia"],
      foto: "/images/dr-andre-cavalcanti-hd.jpg",
      fotoAlt: `Retrato do ${profissionais.dr.nome}`,
      texto:
        "André Cavalcanti é cirurgião-dentista, formado pela UFMG há mais de 25 anos, especialista em Periodontia, Implantodontia e Prótese Dentária. Seu trabalho une experiência e precisão, buscando resultados funcionais, naturais e harmoniosos.",
      cta: "Agendar com o Dr. André",
    },
  ],
};

// Alimenta o accordion E o JSON-LD FAQPage.
export const faq = {
  eyebrow: "Perguntas frequentes",
  titulo: "Dúvidas? A gente *responde*",
  cta: "Falar com a equipe",
  itens: [
    {
      pergunta: "Quais tratamentos a clínica oferece?",
      resposta: `Implantodontia e periodontia, com o ${profissionais.dr.nome}, e ortodontia e harmonização facial, com a ${profissionais.dra.nome}. Na avaliação, a equipe indica o tratamento mais adequado para o seu caso.`, // VALIDAR COM A CLÍNICA
    },
    {
      pergunta: "Quem pode fazer implante dentário?",
      resposta:
        "Depende de uma avaliação da saúde geral, da gengiva e da quantidade de osso no local. Em alguns casos, é preciso um preparo antes do implante. Isso é definido na consulta.", // VALIDAR COM A CLÍNICA
    },
    {
      pergunta: "Quanto tempo dura o tratamento ortodôntico?",
      resposta:
        "Varia conforme o caso e o tipo de aparelho. Na avaliação, a equipe explica as etapas e o tempo previsto para o seu tratamento.", // VALIDAR COM A CLÍNICA
    },
    {
      pergunta: "A harmonização facial fica com aparência natural?",
      resposta:
        "O planejamento busca equilíbrio entre os traços, respeitando as características de cada rosto. Resultados variam de acordo com cada caso.", // VALIDAR COM A CLÍNICA
    },
    {
      pergunta: "Posso fazer mais de um tratamento na clínica?",
      resposta:
        "Sim. Como as áreas ficam no mesmo lugar, os profissionais podem planejar os tratamentos em conjunto quando for indicado para o seu caso.", // VALIDAR COM A CLÍNICA
    },
    {
      pergunta: "Como faço para agendar minha avaliação?",
      resposta:
        "É só tocar em qualquer botão de WhatsApp desta página. A nossa equipe responde e combina com você o horário da avaliação.",
    },
  ],
};

export const rodape = {
  politicaPrivacidadeUrl: "#", // PREENCHER
  ano: 2026,
};

export const cookies = {
  texto: "Usamos cookies para medir o desempenho da página e melhorar sua experiência.",
  aceitar: "Aceitar",
  recusar: "Recusar",
};
