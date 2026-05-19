import Image from "next/image";
import { ApplicationForm } from "./components/ApplicationForm";
import { ScrollReveal } from "./components/ScrollReveal";
import { Simulator } from "./components/Simulator";
import { TrackedLink } from "./components/TrackedLink";

// Set to null to show the placeholder.
const PRODUCT_IMAGE: string | null = "/illu.png";

const PRODUCT_PILLS = [
  "3 000 ans d'histoire",
  "500+ clients satisfaits",
  "Remboursé si insatisfait — 30 jours",
  "Disponible par abonnement",
];

const STATS = [
  { value: "20%", label: "Commission par vente" },
  { value: "500+", label: "Clients satisfaits" },
  { value: "30j", label: "Garantie remboursement" },
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

const PROOFS = [
  {
    initials: "L",
    name: "Léa",
    niche: "Nutrition & bien-être",
    followers: "8 400 abonnés",
    photo: "/lea.jpg.webp",
    revenue: "147€",
    quote: "147€ ce mois, et je commence à peine.",
    avatarBg: "#7B9E87",
    avatarFg: "#F2EBE0",
  },
  {
    initials: "R",
    name: "Romain",
    niche: "Fitness & lifestyle",
    followers: "14 200 abonnés",
    photo: "/romain.jpg",
    revenue: "271€",
    quote: "Mon code a converti 23 ventes en 3 semaines.",
    avatarBg: "#C9A84C",
    avatarFg: "#1A1A1A",
  },
  {
    initials: "C",
    name: "Camille",
    niche: "Longévité & anti-âge",
    followers: "5 900 abonnés",
    photo: "/camille.jpeg",
    revenue: "198€",
    quote:
      "Le produit se vend tout seul, je parle juste de ma routine.",
    avatarBg: "#C08861",
    avatarFg: "#F2EBE0",
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
    icon: "🔁",
    title: "Revenus qui s'accumulent",
    body: "Cezam est disponible par abonnement. Chaque client que tu convaincs te rapporte une commission automatique chaque mois — sans effort supplémentaire.",
  },
  {
    icon: "🤝",
    title: "Support direct",
    body: "Une ligne directe avec Mathys, le fondateur. Questions, idées de contenu, collabs — on est là.",
  },
  {
    icon: "🌱",
    title: "Liberté totale",
    body: "Pas de seuil minimum d'abonnés. Un compte engagé de 1 000 personnes vaut plus qu'un compte passif de 100 000. Pas de quota, pas de brief imposé.",
  },
];

export default function Home() {
  return (
    <>
      <ScrollReveal />
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
            Programme ouvert · 2026
          </div>
          <h1>
            Transforme ta passion
            <br />
            en <em>revenus récurrents.</em>
          </h1>
          <p className="hero-sub">
            Rejoins les ambassadeurs Cezam. Un client convaincu = une
            commission chaque mois, tant qu&apos;il reste abonné — sans créer
            de nouveau contenu.
          </p>
          <p className="hero-meta">
            1 000 abonnés suffisent. Ce qu&apos;on cherche : une communauté
            qui te fait confiance, pas un gros compte.
          </p>
          <div className="hero-actions">
            <TrackedLink
              event="cta_hero"
              href="#simulateur"
              className="btn-white"
            >
              Simuler mes revenus →
            </TrackedLink>
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

      <section id="produit">
        <div className="product-wrap">
          <p className="section-tag">Le produit</p>
          <h2 className="section-h">Ce que tu vas promouvoir.</h2>
          <p className="section-sub">
            Un produit ancestral qui se vend parce qu&apos;il fonctionne.
          </p>

          <div className="product-layout">
            <div className="product-text">
              <p>
                Le sésame noir est utilisé depuis plus de 3 000 ans en
                médecine chinoise pour la longévité, la vitalité et la santé
                des cheveux. Cezam en a fait une poudre quotidienne — facile
                à intégrer dans un smoothie, un yaourt ou un café du matin.
              </p>
              <p>
                Pas d&apos;ingrédients artificiels. Pas de tendance passagère.
                Un rituel que tes abonnés vont adopter durablement — et qui
                te rapporte une commission chaque mois qu&apos;ils continuent.
              </p>
            </div>

            <div className="product-visual">
              {PRODUCT_IMAGE ? (
                <Image
                  src={PRODUCT_IMAGE}
                  alt="Cezam — Poudre de sésame noir"
                  width={1024}
                  height={1536}
                  sizes="(max-width: 900px) 100vw, 480px"
                  className="product-image"
                  priority
                />
              ) : (
                <div className="product-placeholder" aria-hidden="true">
                  <span className="product-placeholder-brand">cezam</span>
                  <span className="product-placeholder-tagline">
                    Poudre de sésame noir
                  </span>
                </div>
              )}
            </div>
          </div>

          <ul className="product-pills">
            {PRODUCT_PILLS.map((pill) => (
              <li key={pill}>
                <span className="product-pill-dot" aria-hidden="true" />
                {pill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="simulateur">
        <div className="sim-wrap">
          <p className="section-tag">Simulateur de revenus</p>
          <h2 className="section-h">
            Combien pourrais-tu
            <br />
            gagner chaque mois ?
          </h2>
          <p className="section-sub">
            Déplace le curseur. Vois ce que tu peux gagner dans 12 mois.
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
                <span className="rank-headline-n">20%</span>
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
              <span className="rank-badge">12 partenaires actifs</span>
              <div className="rank-meta">
                <span className="rank-dot" />
                <span className="rank-num">Rang 02</span>
              </div>
              <h3 className="rank-name">Partenaire</h3>
              <p className="rank-access">
                Débloqué après 20 ventes cumulées.
              </p>
              <div className="rank-headline">
                <span className="rank-headline-n">+1€</span>
                <span className="rank-headline-l">
                  Par 1 000 vues, en plus du 20%
                </span>
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
            <TrackedLink
              event="cta_rangs"
              href="#candidature"
              className="btn-white"
            >
              Rejoindre le programme →
            </TrackedLink>
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

      <section id="proof">
        <div className="proof-wrap">
          <p className="section-tag">Ils ont rejoint</p>
          <h2 className="section-h">
            Des créateurs.
            <br />
            De vrais résultats.
          </h2>
          <p className="section-sub">
            Les premiers ambassadeurs Cezam, déjà en route.
          </p>

          <div className="proof-grid">
            {PROOFS.map((p) => (
              <article className="proof-card" key={p.name}>
                <div className="proof-head">
                  <div
                    className="proof-avatar"
                    style={
                      {
                        ["--avatar-bg" as string]: p.avatarBg,
                        ["--avatar-fg" as string]: p.avatarFg,
                      } as React.CSSProperties
                    }
                  >
                    {p.photo ? (
                      <Image
                        src={p.photo}
                        alt={p.name}
                        width={52}
                        height={52}
                        className="proof-avatar-img"
                      />
                    ) : (
                      p.initials
                    )}
                  </div>
                  <div className="proof-id">
                    <span className="proof-name">{p.name}</span>
                    <span className="proof-niche">{p.niche}</span>
                    <span className="proof-followers">{p.followers}</span>
                  </div>
                </div>
                <div className="proof-revenue">
                  <span className="proof-revenue-amount">{p.revenue}</span>
                  <span className="proof-revenue-label">/mois en ce moment</span>
                </div>
                <p className="proof-quote">&laquo;&nbsp;{p.quote}&nbsp;&raquo;</p>
              </article>
            ))}
          </div>

          <p className="proof-disclaimer">
            Exemples illustratifs basés sur les performances moyennes du
            programme.
          </p>
        </div>
      </section>

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
