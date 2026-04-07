import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import ContactSection from '../components/ContactSection.jsx';
import WhatsAppFab from '../components/WhatsAppFab.jsx';
import { fetchProjects } from '../api/client.js';
import { COMPANY } from '../constants.js';
import styles from './Home.module.css';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchProjects();
        if (!cancelled) setProjects(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) {
          setLoadError('Não foi possível carregar os produtos. Tente atualizar a página.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: COMPANY.name,
      taxID: COMPANY.cnpj.replace(/\D/g, ''),
      telephone: COMPANY.phoneTel,
      url: window.location.origin,
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const titles = projects.map((p) => p.title);

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Software sob medida · SaaS em produção</p>
            <h1 className={styles.heroTitle}>
              Tecnologia de ponta a ponta para empresas que precisam escalar com segurança
            </h1>
            <p className={styles.heroText}>
              A <strong>{COMPANY.name}</strong> projeta, desenvolve e mantém aplicações web completas — da API ao
              que seu cliente vê no navegador ou no celular. Trabalhamos com arquitetura sólida (Node.js, bancos
              relacionais, integrações como <strong>Stripe</strong> para assinaturas) e entregamos produtos que já
              operam no mercado, além de projetos exclusivos sob demanda.
            </p>
            <div className={styles.heroActions}>
              <a href="#produtos" className={styles.btnPrimary}>
                Conheça os produtos
              </a>
              <a href={COMPANY.whatsappUrl} className={styles.btnGhost} target="_blank" rel="noreferrer">
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section id="sobre" className={styles.about}>
          <div className="container">
            <div className={styles.aboutGrid}>
              <div>
                <h2 className={styles.aboutTitle}>Quem somos</h2>
                <p className={styles.aboutText}>
                  Somos uma empresa especializada em <strong>desenvolvimento de software</strong> e em produtos no
                  modelo <strong>SaaS</strong>. Nosso foco é resolver problemas reais de operação, vendas e atendimento
                  com sistemas estáveis, rápidos e fáceis de usar — sem atalhos que comprometam segurança ou
                  manutenção no longo prazo.
                </p>
                <p className={styles.aboutText}>
                  Atendemos negócios que precisam de <strong>presença digital profissional</strong>, automação de
                  processos e integração com meios de pagamento. Cada solução listada neste site é um produto com
                  histórico em produção; para necessidades novas, montamos escopo, prazos e proposta alinhados ao seu
                  orçamento e prioridades.
                </p>
              </div>
              <aside className={styles.aboutAside} aria-label="Resumo institucional">
                <ul className={styles.aboutList}>
                  <li>
                    <strong>Missão</strong>
                    <span>Entregar software confiável que simplifique o dia a dia de empresas e equipes.</span>
                  </li>
                  <li>
                    <strong>Como atuamos</strong>
                    <span>Do levantamento de requisitos ao deploy, com código versionado, testes e documentação.</span>
                  </li>
                  <li>
                    <strong>SaaS</strong>
                    <span>Produtos com planos próprios e cobrança via Stripe, evoluindo com feedback dos clientes.</span>
                  </li>
                  <li>
                    <strong>Projetos sob medida</strong>
                    <span>Desenvolvimento dedicado quando o seu processo exige algo que ainda não existe pronto.</span>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.pillars} aria-labelledby="pillars-heading">
          <div className="container">
            <h2 id="pillars-heading" className={styles.pillarsTitle}>
              O que você encontra ao trabalhar conosco
            </h2>
            <p className={styles.pillarsLead}>
              Uma abordagem corporativa: transparência técnica, responsabilidade com dados e interfaces pensadas para
              quem usa o sistema todos os dias.
            </p>
            <div className={styles.pillarGrid}>
              <article className={styles.pillar}>
                <div className={styles.pillarIcon} aria-hidden="true">
                  ⚙
                </div>
                <h3>Engenharia sólida</h3>
                <p>
                  Backends em Node.js, modelagem de dados com ORM, migrations e ambientes separados para desenvolvimento
                  e produção — o mesmo rigor que você veria em times de produto maduros.
                </p>
              </article>
              <article className={styles.pillar}>
                <div className={styles.pillarIcon} aria-hidden="true">
                  ◎
                </div>
                <h3>Experiência do usuário</h3>
                <p>
                  Interfaces responsivas, foco em mobile quando o negócio exige campo ou cliente final no celular, e
                  textos claros para reduzir treinamento e suporte.
                </p>
              </article>
              <article className={styles.pillar}>
                <div className={styles.pillarIcon} aria-hidden="true">
                  ✓
                </div>
                <h3>Operação e crescimento</h3>
                <p>
                  Integração com pagamentos, multi-tenant quando aplicável e visão de produto: métricas, evolução contínua
                  e preparação para escalar uso e faturamento.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="produtos" className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Produtos e sistemas em operação</h2>
            <p className={styles.sectionLead}>
              Abaixo estão algumas das soluções que já estão no ar. Cada uma é um <strong>SaaS</strong> com{' '}
              <strong>planos e assinaturas próprios via Stripe</strong>: o valor e a contratação são tratados dentro do
              próprio produto. Este site não substitui o checkout de cada sistema — aqui você conhece o portfólio e, se
              precisar de algo novo, usa o formulário de contato.
            </p>

            {loading ? (
              <p className={styles.hint}>Carregando produtos…</p>
            ) : loadError ? (
              <p className={styles.errorBox}>{loadError}</p>
            ) : projects.length === 0 ? (
              <p className={styles.hint}>Nenhum produto ativo no momento. Volte em breve.</p>
            ) : (
              <ul className={styles.grid}>
                {projects.map((p) => (
                  <li key={p.id} className={styles.gridItem}>
                    <ProjectCard project={p} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section id="como-funciona" className={styles.sectionMuted}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Como funciona na prática</h2>
            <p className={styles.sectionLead}>
              Deixamos explícito o que é produto pronto e o que é desenvolvimento customizado, para você saber por onde
              começar.
            </p>
            <div className={styles.howGrid}>
              <article className={styles.howCard}>
                <h3>Assinatura de um SaaS existente</h3>
                <p>
                  Você escolhe o sistema que melhor encaixa no seu segmento, acessa o site do produto e contrata o plano
                  por lá. O pagamento recorrente e upgrades são geridos pelo próprio aplicativo (Stripe). Nossa equipe
                  acompanha evoluções e suporte conforme cada produto.
                </p>
              </article>
              <article className={styles.howCard}>
                <h3>Desenvolvimento sob medida</h3>
                <p>
                  Quando você precisa de integrações específicas, regras de negócio únicas ou um MVP para validar ideia,
                  use a seção de contato. Descreva objetivo, prazo desejado e orçamento aproximado: retornamos com
                  proposta e próximos passos.
                </p>
              </article>
              <article className={styles.howCard}>
                <h3>Contato direto</h3>
                <p>
                  Para dúvidas rápidas ou parcerias, o WhatsApp corporativo também está disponível. Use o botão flutuante
                  ou o telefone no rodapé — estamos no mesmo fuso e falamos com quem decide técnica ou negócio.
                </p>
              </article>
            </div>
          </div>
        </section>

        <ContactSection projectTitles={titles} />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
