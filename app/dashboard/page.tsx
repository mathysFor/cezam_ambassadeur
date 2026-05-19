import { createClient } from "@supabase/supabase-js";
import "./dashboard.css";

export const dynamic = "force-dynamic";

type EventRow = {
  id: string;
  event: string;
  path: string | null;
  referrer: string | null;
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

export default async function Dashboard() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data: events7d, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .gte("created_at", sevenDaysAgo.toISOString())
    .order("created_at", { ascending: false });

  const { count: applicationsTotal } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("event", "candidature_soumise");

  if (eventsError) {
    return (
      <main className="dashboard">
        <h1>Dashboard</h1>
        <p className="dashboard-error">
          Erreur Supabase : {eventsError.message}
          <br />
          Vérifie tes vars d&apos;env et que la table <code>events</code>{" "}
          existe avec les bonnes politiques RLS.
        </p>
      </main>
    );
  }

  const all = (events7d ?? []) as EventRow[];
  const pageviewsToday = all.filter(
    (e) => e.event === "pageview" && new Date(e.created_at) >= todayStart,
  ).length;
  const pageviews7d = all.filter((e) => e.event === "pageview").length;
  const totalApps = applicationsTotal ?? 0;
  const conversion = pageviews7d > 0 ? (totalApps / pageviews7d) * 100 : 0;

  const counts: Record<string, number> = {};
  for (const e of all) counts[e.event] = (counts[e.event] ?? 0) + 1;
  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  const recent = all.slice(0, 50);

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
          <span className="dashboard-card-label">Pageviews 7 jours</span>
          <span className="dashboard-card-value">{pageviews7d}</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Candidatures (total)</span>
          <span className="dashboard-card-value">{totalApps}</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Taux conversion (7j)</span>
          <span className="dashboard-card-value">{fmtPercent(conversion)}</span>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Comptage par event</h2>
        {sortedCounts.length === 0 ? (
          <p className="dashboard-empty">Aucun event sur les 7 derniers jours.</p>
        ) : (
          <ul className="dashboard-counts">
            {sortedCounts.map(([event, count]) => (
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
          <p className="dashboard-empty">Rien pour l&apos;instant.</p>
        ) : (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Path</th>
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
