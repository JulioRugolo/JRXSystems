import styles from './ProjectCard.module.css';

const INSIGHTS = {
  jjtech:
    'Ideal quando o carro “some” no meio do atendimento: tudo fica registrado e o orçamento chega claro no celular do cliente.',
  vagaprime:
    'Para parar de caçar currículo na caixa de entrada: cada candidato num lugar só e a equipe enxerga em que etapa está.',
  'torres-veiculos':
    'Quem vende carro precisa de vitrine bonita e estoque atualizado — sem esperar dias para mudar preço ou foto.',
  '3dideas-erp':
    'Quem imprime em 3D sente na pele: fila, material e dinheiro têm que conversar; aqui isso fica visível.',
  'sistema-agendamento':
    'Menos buraco na agenda e menos “esqueci”: cliente marca online e você cobra no ritmo certo.',
  'sistema-contas':
    'Para quem quer ver para onde vai o dinheiro sem virar contador: metas e mês a mês em linguagem simples.',
};

function MiniPreview({ slug }) {
  const s = slug || '';

  if (s === 'jjtech') {
    return (
      <div className={styles.mock} data-mock="jjtech">
        <div className={styles.mockTop}>
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
        </div>
        <div className={styles.mockJjBody}>
          <div className={styles.mockJjSide}>
            <div className={styles.mockLine} />
            <div className={styles.mockLine} />
            <div className={`${styles.mockLine} ${styles.mockLineShort}`} />
          </div>
          <div className={styles.mockJjMain}>
            <div className={styles.mockJjCard} />
            <div className={styles.mockJjRows}>
              <div className={styles.mockRow} />
              <div className={styles.mockRow} />
              <div className={styles.mockRow} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (s === 'vagaprime') {
    return (
      <div className={styles.mock} data-mock="vagaprime">
        <div className={styles.mockTop}>
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
        </div>
        <div className={styles.mockVp}>
          <div className={styles.mockVpCol}>
            <div className={styles.mockVpTag} />
            <div className={styles.mockVpCard} />
            <div className={styles.mockVpCard} />
          </div>
          <div className={styles.mockVpCol}>
            <div className={`${styles.mockVpTag} ${styles.mockVpTagMid}`} />
            <div className={styles.mockVpCard} />
          </div>
          <div className={styles.mockVpCol}>
            <div className={`${styles.mockVpTag} ${styles.mockVpTagEnd}`} />
            <div className={styles.mockVpCard} />
            <div className={styles.mockVpCard} />
          </div>
        </div>
      </div>
    );
  }

  if (s === 'torres-veiculos') {
    return (
      <div className={styles.mock} data-mock="torres">
        <div className={styles.mockTop}>
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
        </div>
        <div className={styles.mockTv}>
          <div className={styles.mockTvHero} />
          <div className={styles.mockTvGrid}>
            <div className={styles.mockTvThumb} />
            <div className={styles.mockTvThumb} />
            <div className={styles.mockTvThumb} />
            <div className={styles.mockTvThumb} />
          </div>
        </div>
      </div>
    );
  }

  if (s === '3dideas-erp') {
    return (
      <div className={styles.mock} data-mock="3d">
        <div className={styles.mockTop}>
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
        </div>
        <div className={styles.mock3d}>
          <div className={styles.mock3dLayer} />
          <div className={styles.mock3dLayer} />
          <div className={styles.mock3dLayer} />
          <div className={styles.mock3dStats}>
            <div className={styles.mockPill} />
            <div className={styles.mockPill} />
          </div>
        </div>
      </div>
    );
  }

  if (s === 'sistema-agendamento') {
    return (
      <div className={styles.mock} data-mock="agenda">
        <div className={styles.mockTop}>
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
        </div>
        <div className={styles.mockAg}>
          <div className={styles.mockAgCal}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`${styles.mockAgCell} ${i === 5 || i === 6 ? styles.mockAgCellOn : ''}`}
              />
            ))}
          </div>
          <div className={styles.mockAgSide}>
            <div className={styles.mockAgSlot} />
            <div className={styles.mockAgSlot} />
          </div>
        </div>
      </div>
    );
  }

  if (s === 'sistema-contas') {
    return (
      <div className={styles.mock} data-mock="contas">
        <div className={styles.mockTop}>
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
        </div>
        <div className={styles.mockSc}>
          <div className={styles.mockScChart}>
            <div className={styles.mockScBar} style={{ height: '40%' }} />
            <div className={styles.mockScBar} style={{ height: '65%' }} />
            <div className={styles.mockScBar} style={{ height: '50%' }} />
            <div className={styles.mockScBar} style={{ height: '85%' }} />
          </div>
          <div className={styles.mockScList}>
            <div className={styles.mockRow} />
            <div className={styles.mockRow} />
            <div className={`${styles.mockRow} ${styles.mockRowShort}`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mock} data-mock="generic">
      <div className={styles.mockTop}>
        <span className={styles.mockDot} />
        <span className={styles.mockDot} />
        <span className={styles.mockDot} />
      </div>
      <div className={styles.mockGeneric}>
        <div className={styles.mockRow} />
        <div className={styles.mockRow} />
        <div className={`${styles.mockRow} ${styles.mockRowShort}`} />
      </div>
    </div>
  );
}

export default function ProjectCard({ project }) {
  const { title, summary, stack, url, slug } = project;
  const insight = INSIGHTS[slug] || null;
  const variant = slug || 'generic';

  return (
    <article className={styles.card} data-variant={variant}>
      <MiniPreview slug={slug} />
      <div className={styles.cardBody}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>
        {insight ? <p className={styles.insight}>{insight}</p> : null}
        {stack ? (
          <div className={styles.stackWrap}>
            <span className={styles.stackLabel}>Destaques</span>
            <p className={styles.stack}>{stack}</p>
          </div>
        ) : null}
        <div className={styles.cardFooter}>
          {url ? (
            <a className={styles.cta} href={url} target="_blank" rel="noopener noreferrer">
              Visitar site
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </a>
          ) : (
            <span className={styles.badge}>Disponível sob consulta</span>
          )}
        </div>
      </div>
    </article>
  );
}
