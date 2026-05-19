import { createClient } from "@supabase/supabase-js";
import "./dashboard.css";

export const dynamic = "force-dynamic";

type EventRow = {
  id: string;
  event: string;
  path: string | null;
  referrer: string | null;
  session_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
);

function fmtPercent(n: number): string {
  return `${n.toFixed(1).replace(".", ",")}%`;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function countBy<T>(rows: T[], pick: (r: T) => string | null | undefined) {
  const out: Record<string, number> = {};
  for (const r of rows) {
    const k = pick(r);
    if (!k) continue;
    out[k] = (out[k] ?? 0) + 1;
  }
  return Object.entries(out).sort((a, b) => b[1] - a[1]);
}

export default async function Dashboard() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("created_at", sevenDaysAgo.toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="dashboard">
        <h1>Dashboard</h1>
        <p className="dashboard-error">
          Erreur Supabase : {error.message}
          <br />
          Vérifie que les colonnes <code>details</code> et{" "}
          <code>session_id</code> existent (voir la migration SQL).
        </p>
      </main>
    );
  }

  const events = (data ?? []) as EventRow[];

  // Top-level counts
  const pageviewsToday = events.filter(
    (e) => e.event === "pageview" && new Date(e.created_at) >= todayStart,
  ).length;
  const pageviews7d = events.filter((e) => e.event === "pageview").length;
  const sessions7d = new Set(
    events.map((e) => e.session_id).filter((s): s is string => !!s),
  ).size;

  const { count: applicationsTotal } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("event", "form_submit_success");

  const totalApps = applicationsTotal ?? 0;
  const conversion = sessions7d > 0 ? (totalApps / sessions7d) * 100 : 0;

  // Event type counts
  const byEvent = countBy(events, (e) => e.event);

  // CTA breakdown (event = cta_click, group by details.location)
  const ctaEvents = events.filter((e) => e.event === "cta_click");
  const byCta = countBy(ctaEvents, (e) => {
    const loc = e.details && typeof e.details === "object"
      ? (e.details as Record<string, unknown>).location
      : null;
    return typeof loc === "string" ? loc : null;
  });

  // Section views breakdown
  const sectionEvents = events.filter((e) => e.event === "section_view");
  const bySection = countBy(sectionEvents, (e) => {
    const sec = e.details && typeof e.details === "object"
      ? (e.details as Record<string, unknown>).section
      : null;
    return typeof sec === "string" ? sec : null;
  });

  // External link clicks (footer, nav logo)
  const externalEvents = events.filter((e) => e.event === "external_click");
  const byExternal = countBy(externalEvents, (e) => {
    const t = e.details && typeof e.details === "object"
      ? (e.details as Record<string, unknown>).target
      : null;
    return typeof t === "string" ? t : null;
  });

  // Funnel (unique sessions for each step)
  const sessionsWith = (event: string) =>
    new Set(
      events
        .filter((e) => e.event === event)
        .map((e) => e.session_id)
        .filter((s): s is string => !!s),
    ).size;

  const candidatureViews = sectionEvents.filter((e) => {
    const sec = e.details && typeof e.details === "object"
      ? (e.details as Record<string, unknown>).section
      : null;
    return sec === "candidature";
  });
  const formSessions = new Set(
    candidatureViews
      .map((e) => e.session_id)
      .filter((s): s is string => !!s),
  ).size;

  const formStartSessions = sessionsWith("form_start");
  const formAttemptSessions = sessionsWith("form_submit_attempt");
  const formSuccessSessions = sessionsWith("form_submit_success");

  const funnel = [
    { label: "Sessions (7j)", value: sessions7d },
    { label: "Form vu", value: formSessions },
    { label: "Form commencé", value: formStartSessions },
    { label: "Tentative envoi", value: formAttemptSessions },
    { label: "Candidature envoyée", value: formSuccessSessions },
  ];

  const recent = events.slice(0, 50);

  return (
    <main className="dashboard">
      <header className="dashboard-head">
        <h1>Dashboard</h1>
        <p>7 derniers jours</p>
      </header>

      <section className="dashboard-cards">
        <div className="dashboard-card">
          <span className="dashboard-card-label">Pageviews aujourd&apos;hui</span>
          <span className="dashboard-card-value">{pageviewsToday}</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Pageviews 7j</span>
          <span className="dashboard-card-value">{pageviews7d}</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Sessions uniques (7j)</span>
          <span className="dashboard-card-value">{sessions7d}</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Candidatures (total)</span>
          <span className="dashboard-card-value">{totalApps}</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Conv. session → candidature</span>
          <span className="dashboard-card-value">{fmtPercent(conversion)}</span>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Funnel candidature (par session unique)</h2>
        <ol className="dashboard-funnel">
          {funnel.map((step, i) => {
            const pct =
              i === 0 || funnel[0].value === 0
                ? 100
                : (step.value / funnel[0].value) * 100;
            return (
              <li key={step.label}>
                <span className="dashboard-funnel-label">{step.label}</span>
                <div className="dashboard-funnel-bar">
                  <div
                    className="dashboard-funnel-fill"
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>
                <span className="dashboard-funnel-val">
                  {step.value} <small>({fmtPercent(pct)})</small>
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="dashboard-cols">
        <section className="dashboard-section">
          <h2>CTAs cliqués</h2>
          {byCta.length === 0 ? (
            <p className="dashboard-empty">Aucun clic CTA enregistré.</p>
          ) : (
            <ul className="dashboard-counts">
              {byCta.map(([location, count]) => (
                <li key={location}>
                  <span className="dashboard-counts-name">{location}</span>
                  <span className="dashboard-counts-num">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="dashboard-section">
          <h2>Sections vues</h2>
          {bySection.length === 0 ? (
            <p className="dashboard-empty">Aucune section vue tracée.</p>
          ) : (
            <ul className="dashboard-counts">
              {bySection.map(([section, count]) => (
                <li key={section}>
                  <span className="dashboard-counts-name">{section}</span>
                  <span className="dashboard-counts-num">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="dashboard-section">
          <h2>Liens externes</h2>
          {byExternal.length === 0 ? (
            <p className="dashboard-empty">Aucun clic externe.</p>
          ) : (
            <ul className="dashboard-counts">
              {byExternal.map(([target, count]) => (
                <li key={target}>
                  <span className="dashboard-counts-name">{target}</span>
                  <span className="dashboard-counts-num">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="dashboard-section">
        <h2>Comptage par event</h2>
        {byEvent.length === 0 ? (
          <p className="dashboard-empty">Aucun event.</p>
        ) : (
          <ul className="dashboard-counts dashboard-counts-wide">
            {byEvent.map(([event, count]) => (
              <li key={event}>
                <span className="dashboard-counts-name">{event}</span>
                <span className="dashboard-counts-num">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="dashboard-section">
        <h2>50 derniers events</h2>
        {recent.length === 0 ? (
          <p className="dashboard-empty">Rien.</p>
        ) : (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Path</th>
                  <th>Details</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e) => (
                  <tr key={e.id}>
                    <td>{fmtDate(e.created_at)}</td>
                    <td>
                      <code>{e.event}</code>
                    </td>
                    <td>{e.path ?? "—"}</td>
                    <td className="dashboard-table-details">
                      {e.details ? (
                        <code>{JSON.stringify(e.details)}</code>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="dashboard-table-ref">
                      {e.referrer ?? "direct"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
