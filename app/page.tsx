import { ApplicationForm } from "./components/ApplicationForm";
import { Simulator } from "./components/Simulator";

const STATS = [
  { value: "20%", label: "Commission par vente" },
  { value: "500+", label: "Clients satisfaits" },
  { value: "60j", label: "Garantie remboursement" },
  { value: "0€", label: "Pour commencer" },
];

const STEPS = [
  {
    num: "01",
    title: "Tu postules en 2 min",
    body: "Remplis le formulaire. On review chaque candidature individuellement et on revient vers toi sous 48h.",
  },
  {
    num: "02",
    title: "Tu reçois ton kit",
    body: "On t'envoie le produit offert. Prends le temps de le tester et de l'intégrer à ta routine. Pas de brief imposé.",
  },
  {
    num: "03",
    title: "Tu partages, tu gagnes",
    body: "Tu reçois ton code affilié unique. Chaque vente générée te rapporte une commission versée chaque mois.",
  },
];

const PERKS = [
  {
    icon: "📦",
    title: "Produit offert",
    body: "Un sachet de Cezam t'est envoyé gratuitement. Tu testes avant de recommander. Toujours.",
  },
  {
    icon: "🎟️",
    title: "Code affilié unique",
    body: "Ton propre code promo personnalisé. Tes abonnés bénéficient d'une réduction, toi d'une commission.",
  },
  {
    icon: "📊",
    title: "Dashboard en temps réel",
    body: "Clics, conversions, revenus — tu sais exactement ce que tu génères, à tout moment.",
  },
  {
    icon: "💸",
    title: "20% de commission",
    body: "Sur chaque vente via ton code. Sans plafond, sans délai de carence. Paiement mensuel garanti.",
  },
  {
    icon: "🤝",
    title: "Support direct",
    body: "Une ligne directe avec Mathys, le fondateur. Questions, idées de contenu, collabs — on est là.",
  },
  {
    icon: "🌱",
    title: "Liberté totale",
    body: "Pas de quota, pas de brief imposé. Tu partages quand tu veux, comme tu veux. Zéro pression.",
  },
];

export default function Home() {
  return (
    <>
      <div className="top-banner">
        Programme ambassadeur ouvert · Places limitées
      </div>

      <nav className="site-nav">
        <a href="https://cezam.store" className="nav-wordmark">
          cezam
        </a>
        <span className="nav-badge">Programme Ambassadeur</span>
        <a href="#candidature" className="nav-cta">
          Rejoindre →
        </a>
      </nav>

      <section>
        <div className="hero">
          <div className="badge-pill">
            <span className="badge-dot" />
            Programme ouvert · 2025
          </div>
          <h1>
            Transforme ta passion
            <br />
            en <em>revenus récurrents.</em>
          </h1>
          <p className="hero-sub">
            Rejoins les ambassadeurs Cezam. Partage un rituel ancestral qui
            convainc déjà 500+ clients — et touche une commission sur chaque
            vente que tu génères.
          </p>
          <div className="hero-actions">
            <a href="#simulateur" className="btn-white">
              Simuler mes revenus →
            </a>
            <a href="#comment" className="btn-ghost">
              Comment ça marche →
            </a>
          </div>
        </div>
      </section>

      <div className="stats">
        <div className="stats-inner">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-n">{s.value}</div>
              <div className="stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section id="simulateur">
        <div className="sim-wrap">
          <p className="section-tag">Simulateur de revenus</p>
          <h2 className="section-h">
            Combien pourrais-tu
            <br />
            gagner chaque mois ?
          </h2>
          <p className="section-sub">
            Déplace le curseur selon ta taille de communauté.
          </p>
          <Simulator />
        </div>
      </section>

      <div id="comment" className="how">
        <div className="how-inner">
          <p className="section-tag">Processus</p>
          <h2 className="section-h">
            Simple comme
            <br />
            un rituel du matin.
          </h2>
          <div className="steps">
            {STEPS.map((step) => (
              <div className="step" key={step.num}>
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section>
        <div className="perks-wrap">
          <p className="section-tag">Ce que tu reçois</p>
          <h2 className="section-h" style={{ marginBottom: 64 }}>
            Tout ce qu&apos;il te faut
            <br />
            pour réussir.
          </h2>
          <div className="perks-grid">
            {PERKS.map((perk) => (
              <div className="perk" key={perk.title}>
                <span className="perk-icon">{perk.icon}</span>
                <h3>{perk.title}</h3>
                <p>{perk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programme-createurs">
        <div className="ranks-wrap">
          <p className="section-tag">Programme Créateurs</p>
          <h2 className="section-h">
            Trois rangs.
            <br />
            Une progression méritée.
          </h2>
          <p className="section-sub">
            Plus tu crées, plus tu débloques. Pas de plafond, pas de
            favoritisme.
          </p>

          <div className="ranks-flow">
            <article
              className="rank-card"
              style={{ ["--rank-color" as string]: "#7B9E87" } as React.CSSProperties}
            >
              <div className="rank-meta">
                <span className="rank-dot" />
                <span className="rank-num">Rang 01</span>
              </div>
              <h3 className="rank-name">Découvreur</h3>
              <p className="rank-access">Accessible dès l&apos;inscription.</p>
              <div className="rank-headline">
                <span className="rank-headline-n">15%</span>
                <span className="rank-headline-l">Commission par vente</span>
              </div>
              <ul className="rank-perks">
                <li>Produit offert chaque mois</li>
                <li>Code promo personnel</li>
                <li>Accès au groupe WhatsApp créateurs Cezam</li>
              </ul>
            </article>

            <div className="rank-arrow" aria-hidden="true">
              <span className="rank-arrow-label">20 ventes</span>
              <span className="rank-arrow-line">→</span>
            </div>

            <article
              className="rank-card rank-card--featured"
              style={{ ["--rank-color" as string]: "#C9A84C" } as React.CSSProperties}
            >
              <span className="rank-badge">Le plus populaire</span>
              <div className="rank-meta">
                <span className="rank-dot" />
                <span className="rank-num">Rang 02</span>
              </div>
              <h3 className="rank-name">Partenaire</h3>
              <p className="rank-access">
                Débloqué après 20 ventes cumulées.
              </p>
              <div className="rank-headline">
                <span className="rank-headline-n">20%</span>
                <span className="rank-headline-l">+ CPM 1€ / 1 000 vues</span>
              </div>
              <ul className="rank-perks">
                <li>20% de commission sur chaque vente</li>
                <li>CPM 1€ pour 1 000 vues sur tes contenus Cezam</li>
                <li>Produit offert + groupe WhatsApp inclus</li>
                <li>Minimum 10 vidéos par mois</li>
              </ul>
            </article>

            <div className="rank-arrow" aria-hidden="true">
              <span className="rank-arrow-label">500k vues</span>
              <span className="rank-arrow-line">→</span>
            </div>

            <article
              className="rank-card rank-card--elite"
              style={{ ["--rank-color" as string]: "#1A1A1A" } as React.CSSProperties}
            >
              <div className="rank-meta">
                <span className="rank-dot" />
                <span className="rank-num">Rang 03</span>
              </div>
              <h3 className="rank-name">Élite</h3>
              <p className="rank-access">
                Débloqué après 500 000 vues cumulées.
              </p>
              <div className="rank-headline">
                <span className="rank-headline-n">500€</span>
                <span className="rank-headline-l">Fixe mensuel garanti</span>
              </div>
              <ul className="rank-perks">
                <li>500€ fixes chaque mois</li>
                <li>20% de commission + CPM 1€ / 1 000 vues</li>
                <li>30 vidéos par mois</li>
                <li>Exclusivité sur la niche longévité</li>
              </ul>
            </article>
          </div>

          <div className="ranks-cta">
            <a href="#candidature" className="btn-white">
              Rejoindre le programme →
            </a>
            <p className="ranks-footnote">
              Chaque vente compte. Chaque vue compte. La progression est
              automatique.
            </p>
          </div>
        </div>
      </section>

      <div className="quote-section">
        <div className="quote-inner">
          <p className="quote-text">
            &laquo; Le sésame noir n&apos;est pas une mode, c&apos;est un
            héritage. Trois millénaires de sagesse au service de ta longévité.
            &raquo;
          </p>
          <p className="quote-author">Mathys — Co-fondateur Cezam</p>
        </div>
      </div>

      <section id="candidature">
        <div className="form-section">
          <p className="section-tag">Candidature</p>
          <h2 className="section-h">Rejoindre le programme.</h2>
          <p className="form-sub">2 minutes. On te répond sous 48h.</p>
          <ApplicationForm />
        </div>
      </section>

      <footer className="site-footer">
        <span className="footer-copy">
          © 2025 Cezam. Tous droits réservés.
        </span>
        <div className="footer-links">
          <a href="https://cezam.store">Boutique</a>
          <a href="https://cezam.store/policies/privacy-policy">
            Confidentialité
          </a>
          <a
            href="https://www.instagram.com/cezam_fr"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </footer>
    </>
  );
}
