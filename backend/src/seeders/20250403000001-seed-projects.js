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
            'Sistema para oficina mecânica: orçamentos em PWA (mobile first), geração de PDF e gestão de clientes, veículos e peças.',
          stack: 'React, Vite, PWA, Node.js, Express, Sequelize, MySQL',
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
            'Candidaturas a vagas com formulário público multi-step, área administrativa e CRM com pipeline.',
          stack: 'React, Vite, Node.js, Express, MySQL',
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
            'Vitrine pública com filtros e painel administrativo para estoque de veículos e fotos. PWA instalável.',
          stack: 'React, TypeScript, Vite, PWA, Node.js, Express, Sequelize, MySQL',
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
            'Gestão para impressão 3D: produção, vendas, financeiro e estoque.',
          stack: 'Full stack (detalhes no repositório do produto)',
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
            'Agendamentos com foco mobile e PWA, backend com integrações de pagamento.',
          stack: 'React, TypeScript, Vite, PWA, Node.js, Express, Sequelize, MySQL',
          url: null,
          display_order: 50,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          slug: 'sistema-contas',
          title: 'Sistema de Contas',
          summary: 'Controle financeiro pessoal com API segura e interface web.',
          stack: 'React, Vite, Node.js, Express, Sequelize, MySQL',
          url: null,
          display_order: 60,
          active: true,
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('projects', null, {});
  },
};
