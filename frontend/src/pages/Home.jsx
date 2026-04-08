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
          setLoadError('Não foi possível carregar as soluções. Atualize a página ou fale conosco pelo WhatsApp.');
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
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Soluções que já rodam no mercado · projetos sob medida</p>
            <h1 className={styles.heroTitle}>
              Menos planilha e retrabalho; mais controle, vendas e tempo para o que importa
            </h1>
            <p className={styles.heroText}>
              Se o seu negócio perde pedido no WhatsApp, não sabe o que cobrar no fim do mês ou trava porque cada
              área usa uma planilha diferente, a <strong>{COMPANY.name}</strong> entrega sistemas web pensados para o
              dia a dia — no computador e no celular. Você pode contratar um dos nossos produtos (com planos no próprio
              site de cada um) ou pedir algo feito sob medida para o seu processo.
            </p>
            <div className={styles.heroActions}>
              <a href="#produtos" className={styles.btnPrimary}>
                Ver soluções
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
                  A <strong>{COMPANY.name}</strong> existe para tirar do seu colo o peso de organizar processo, equipe e
                  cliente no improviso. Criamos e mantemos sistemas online que equipes reais usam todos os dias — com
                  foco em clareza, velocidade e segurança, para você não depender de gambiarra nem de “aquela planilha
                  que só uma pessoa sabe mexer”.
                </p>
                <p className={styles.aboutText}>
                  Ajudamos quem precisa de <strong>site e operação alinhados</strong>, de <strong>vendas e atendimento
                  mais previsíveis</strong> e de <strong>pagamentos e assinaturas organizados</strong>. O que você vê
                  abaixo são produtos que já estão no ar; quando o seu desafio é único, montamos escopo, prazo e
                  investimento juntos com você.
                </p>
              </div>
              <aside className={styles.aboutAside} aria-label="Resumo institucional">
                <ul className={styles.aboutList}>
                  <li>
                    <strong>Missão</strong>
                    <span>Colocar ordem no caos operacional: menos erro manual, mais previsibilidade para você crescer.</span>
                  </li>
                  <li>
                    <strong>Como trabalhamos</strong>
                    <span>Ouvimos o problema primeiro, desenhamos o caminho com você e entregamos em etapas claras — sem surpresa no fim.</span>
                  </li>
                  <li>
                    <strong>Produtos prontos</strong>
                    <span>Soluções com planos no próprio site de cada sistema; você escolhe o que encaixa e contrata ali.</span>
                  </li>
                  <li>
                    <strong>Sob medida</strong>
                    <span>Quando nada pronto resolve 100% do seu processo, construímos o que falta, alinhado ao seu ritmo e orçamento.</span>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.pillars} aria-labelledby="pillars-heading">
          <div className="container">
            <h2 id="pillars-heading" className={styles.pillarsTitle}>
              Por que falar com a gente antes de comprar outra ferramenta genérica
            </h2>
            <p className={styles.pillarsLead}>
              Você não precisa entender termos de TI — precisa de resultado no caixa, no atendimento e na equipe. É
              nisso que nos apoiamos.
            </p>
            <div className={styles.pillarGrid}>
              <article className={styles.pillar}>
                <div className={styles.pillarIcon} aria-hidden="true">
                  ⚙
                </div>
                <h3>Confiança para operar</h3>
                <p>
                  Sistemas estáveis, preparados para muitos acessos ao mesmo tempo e com dados organizados — para você
                  parar de apagar incêndio e passar a acompanhar o que acontece no negócio.
                </p>
              </article>
              <article className={styles.pillar}>
                <div className={styles.pillarIcon} aria-hidden="true">
                  ◎
                </div>
                <h3>Fácil de usar no dia a dia</h3>
                <p>
                  Telas claras no computador e no celular, pensadas para quem vende, atende ou produz — não só para o
                  “pessoal de informática”. Menos treino, menos ligação pedindo ajuda.
                </p>
              </article>
              <article className={styles.pillar}>
                <div className={styles.pillarIcon} aria-hidden="true">
                  ✓
                </div>
                <h3>Pronto para crescer com você</h3>
                <p>
                  Cobrança recorrente e pagamentos quando o modelo do seu negócio pede; evolução contínua conforme a
                  demanda aumenta — sem travar na primeira temporada forte de vendas.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="produtos" className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Soluções que já estão em uso</h2>
            <p className={styles.sectionLead}>
              Abaixo estão sistemas que já rodam com clientes reais. Em cada um, <strong>valor e contratação</strong>{' '}
              ficam no próprio site do produto — aqui você só conhece o que fazemos e decide qual conversa vale a pena.
              Se nada da lista resolver o seu caso, fale com a gente: desenvolvemos sob medida.
            </p>

            {loading ? (
              <p className={styles.hint}>Carregando soluções…</p>
            ) : loadError ? (
              <p className={styles.errorBox}>{loadError}</p>
            ) : projects.length === 0 ? (
              <p className={styles.hint}>Nenhuma solução ativa no momento. Volte em breve ou fale conosco.</p>
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
              Três caminhos simples — você escolhe o que combina com o momento do seu negócio.
            </p>
            <div className={styles.howGrid}>
              <article className={styles.howCard}>
                <h3>Contratar um sistema pronto</h3>
                <p>
                  Achou algo na lista que resolve seu segmento? Entre no site do produto, veja os planos e feche por lá.
                  Assim você já sabe investimento e o que está incluso, sem depender deste site para pagamento.
                </p>
              </article>
              <article className={styles.howCard}>
                <h3>Pedir um projeto sob medida</h3>
                <p>
                  Precisa integrar com outro sistema, seguir uma regra de negócio bem específica ou testar uma ideia nova?
                  Use o formulário abaixo: conte o objetivo, o prazo que imagina e uma faixa de investimento. Voltamos
                  com proposta clara.
                </p>
              </article>
              <article className={styles.howCard}>
                <h3>Falar direto</h3>
                <p>
                  Prefere conversa rápida? Chame no WhatsApp pelo botão flutuante ou pelo número no rodapé — atendemos
                  quem cuida da operação e quem decide investimento, no mesmo horário de Brasília.
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
