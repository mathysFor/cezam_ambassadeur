"use client";

import { useMemo, useState } from "react";
import { track, trackOnce } from "@/lib/track";

const ONESHOT_COMM = 11.8;
const SUB_COMM = 7.8;
const CONVERSION_RATE = 0.004;
const SUB_SHARE = 0.4;
const DEFAULT_FOLLOWERS = 5_000;

function fmtFollowers(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function fmtEur(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function compute(followers: number) {
  const buyersPerMonth = followers * CONVERSION_RATE;
  const newSubsPerMonth = buyersPerMonth * SUB_SHARE;
  const oneShotPerMonth = buyersPerMonth * (1 - SUB_SHARE);
  const oneShotIncome = oneShotPerMonth * ONESHOT_COMM;

  const totalAt = (month: number) =>
    oneShotIncome + newSubsPerMonth * month * SUB_COMM;

  return {
    totalM1: Math.round(totalAt(1)),
    totalM6: Math.round(totalAt(6)),
    totalM12: Math.round(totalAt(12)),
    subIncomeM12: Math.round(newSubsPerMonth * 12 * SUB_COMM),
  };
}

export function Simulator() {
  const [followers, setFollowers] = useState(DEFAULT_FOLLOWERS);
  const { totalM1, totalM6, totalM12, subIncomeM12 } = useMemo(
    () => compute(followers),
    [followers],
  );

  return (
    <div className="sim-card">
      <div className="sim-control">
        <div className="sim-control-head">
          <span className="sim-control-label">Ma communauté</span>
          <span className="sim-control-value">
            {fmtFollowers(followers)}
            <span className="sim-control-unit">abonnés</span>
          </span>
        </div>
        <input
          type="range"
          min={500}
          max={30_000}
          step={500}
          value={followers}
          onChange={(e) => {
            setFollowers(parseInt(e.target.value, 10));
            trackOnce("simulator_interact");
          }}
          aria-label="Taille de ma communauté"
        />
        <div className="sim-control-bounds">
          <span>500</span>
          <span>30 000</span>
        </div>
        <p className="sim-reassure">
          Les petits comptes convertissent mieux. Une communauté de 1 000
          personnes qui te fait confiance vaut plus qu&apos;une audience de
          50 000 abonnés passifs.
        </p>
      </div>

      <div className="sim-headline">
        <div className="sim-headline-label">Revenus estimés à 12 mois</div>
        <div className="sim-headline-amount">
          €{fmtEur(totalM12)}
          <span className="sim-headline-period">/mois</span>
        </div>
        <p className="sim-headline-sub">
          dont €{fmtEur(subIncomeM12)} automatiques chaque mois grâce aux
          abonnements actifs.
        </p>
      </div>

      <div className="sim-progress" aria-hidden="true">
        <div className="sim-progress-rail">
          <span className="dot" />
          <span className="line" />
          <span className="dot dot-mid" />
          <span className="line" />
          <span className="dot dot-active" />
        </div>
        <div className="sim-progress-labels">
          <div className="step step-left">
            <span className="month">Mois 1</span>
            <span className="val">€{fmtEur(totalM1)}</span>
          </div>
          <div className="step step-mid">
            <span className="month">Mois 6</span>
            <span className="val">€{fmtEur(totalM6)}</span>
          </div>
          <div className="step step-right active">
            <span className="month">Mois 12</span>
            <span className="val">€{fmtEur(totalM12)}</span>
          </div>
        </div>
      </div>

      <div className="sim-cta-row">
        <a
          href="#candidature"
          className="btn-white"
          onClick={() =>
            track("cta_click", {
              location: "simulator",
              followers,
              estimated_m12: totalM12,
            })
          }
        >
          Rejoindre le programme →
        </a>
      </div>
    </div>
  );
}
