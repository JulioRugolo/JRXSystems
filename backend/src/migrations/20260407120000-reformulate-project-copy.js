'use strict';

/** Atualiza textos dos produtos para linguagem mais clara (foco no cliente). */

const updates = [
  {
    slug: 'jjtech',
    summary:
      'Para oficinas que cansaram de papel e planilha: orçamentos no celular, histórico por veículo e peças organizadas — o cliente acompanha tudo com clareza.',
    stack: 'Acesso pelo celular e pelo computador; tudo centralizado para a equipe.',
  },
  {
    slug: 'vagaprime',
    summary:
      'Para empresas que recebem muitos currículos: o candidato entra por um fluxo simples e você acompanha cada etapa em um painel — sem perder gente boa no meio do e-mail.',
    stack: 'Triagem organizada para o time de RH; menos caos, mais agilidade.',
  },
  {
    slug: 'torres-veiculos',
    summary:
      'Para lojas de veículos: vitrine com busca, fotos em destaque e painel para atualizar estoque quando precisar — sem depender de terceiros a cada mudança.',
    stack: 'Site rápido no celular; equipe comercial altera ofertas com autonomia.',
  },
  {
    slug: '3dideas-erp',
    summary:
      'Para quem vive de impressão 3D e precisa de números confiáveis: pedidos, fila de produção, materiais e finanças reunidos — menos planilha solta, mais margem visível.',
    stack: 'Visão da produção e do caixa no mesmo lugar; decisões com base real.',
  },
  {
    slug: 'sistema-agendamento',
    summary:
      'Para quem vende horário — salões, clínicas, consultorias: agenda online, lembretes e cobrança alinhada ao fluxo do cliente.',
    stack: 'Cliente marca pelo celular; você reduz faltas e organiza a agenda.',
  },
  {
    slug: 'sistema-contas',
    summary:
      'Para organizar o financeiro pessoal sem complicar: entradas, saídas, metas e visão mensal em uma tela direta — com privacidade e segurança.',
    stack: 'Interface objetiva; seus dados acessíveis com proteção por trás.',
  },
];

module.exports = {
  async up(queryInterface) {
    for (const row of updates) {
      await queryInterface.sequelize.query(
        `UPDATE projects SET summary = ?, stack = ?, updated_at = NOW() WHERE slug = ?`,
        { replacements: [row.summary, row.stack, row.slug] }
      );
    }
  },

  async down() {
    // Sem reversão automática — evita sobrescrever edições manuais posteriores no banco.
  },
};
