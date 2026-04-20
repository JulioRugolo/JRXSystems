'use strict';

const now = new Date();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'projects',
      [
        {
          slug: 'jjtech',
          title: 'JJ Tech',
          summary:
            'Para oficinas que cansaram de papel e planilha: orçamentos no celular, histórico por veículo e peças organizadas — o cliente acompanha tudo com clareza.',
          stack: 'Acesso pelo celular e pelo computador; tudo centralizado para a equipe.',
          url: null,
          display_order: 10,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          slug: 'vagaprime',
          title: 'VagaPrime',
          summary:
            'Para empresas que recebem muitos currículos: o candidato entra por um fluxo simples e você acompanha cada etapa em um painel — sem perder gente boa no meio do e-mail.',
          stack: 'Triagem organizada para o time de RH; menos caos, mais agilidade.',
          url: 'http://vagaprime.com.br',
          display_order: 20,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          slug: 'torres-veiculos',
          title: 'Torres Veículos',
          summary:
            'Para lojas de veículos: vitrine com busca, fotos em destaque e painel para atualizar estoque quando precisar — sem depender de terceiros a cada mudança.',
          stack: 'Site rápido no celular; equipe comercial altera ofertas com autonomia.',
          url: 'https://www.torresveiculos.com.br',
          display_order: 30,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          slug: '3dideas-erp',
          title: '3DIdeas ERP',
          summary:
            'Para quem vive de impressão 3D e precisa de números confiáveis: pedidos, fila de produção, materiais e finanças reunidos — menos planilha solta, mais margem visível.',
          stack: 'Visão da produção e do caixa no mesmo lugar; decisões com base real.',
          url: 'http://3dideas.com.br',
          display_order: 40,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          slug: 'sistema-agendamento',
          title: 'Sistema de Agendamento',
          summary:
            'Para quem vende horário — salões, clínicas, consultorias: agenda online, lembretes e cobrança alinhada ao fluxo do cliente.',
          stack: 'Cliente marca pelo celular; você reduz faltas e organiza a agenda.',
          url: null,
          display_order: 50,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          slug: 'sistema-contas',
          title: 'Sistema de Contas',
          summary:
            'Para organizar o financeiro pessoal sem complicar: entradas, saídas, metas e visão mensal em uma tela direta — com privacidade e segurança.',
          stack: 'Interface objetiva; seus dados acessíveis com proteção por trás.',
          url: null,
          display_order: 60,
          active: true,
          created_at: now,
          updated_at: now,
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('projects', null, {});
  },
};
