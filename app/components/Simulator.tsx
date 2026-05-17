"use client";

import { useMemo, useState } from "react";

const AVERAGE_BASKET = 59;
const COMMISSION_RATE = 0.2;

function formatFollowers(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1)} 000`;
  }
  return n.toString();
}

export function Simulator() {
  const [followers, setFollowers] = useState(10_000);

  const { sales, commissionPerSale, earnings } = useMemo(() => {
    const sales = Math.max(1, Math.round(followers * 0.001));
    const commissionPerSale = AVERAGE_BASKET * COMMISSION_RATE;
    const earnings = Math.round(sales * commissionPerSale);
    return { sales, commissionPerSale, earnings };
  }, [followers]);

  const commissionFormatted = commissionPerSale.toFixed(2).replace(".", ",");

  return (
    <div className="sim-card">
      <div className="sim-layout">
        <div className="sim-left">
          <label htmlFor="followers-slider">Nombre d&apos;abonnés Instagram</label>
          <div className="followers-val">
            {formatFollowers(followers)} <sup>abonnés</sup>
          </div>
          <input
            id="followers-slider"
            type="range"
            min={1000}
            max={100_000}
            step={500}
            value={followers}
            onChange={(e) => setFollowers(parseInt(e.target.value, 10))}
          />
          <div className="slider-row">
            <span>1 000</span>
            <span>100 000</span>
          </div>
          <div className="sim-meta">
            <div className="sim-meta-label">Basé sur</div>
            <div className="sim-meta-detail">
              ~{sales} ventes / mois
              <br />
              20% de commission
              <br />
              Panier moyen €59
            </div>
          </div>
        </div>

        <div className="sim-right">
          <div className="sim-right-label">Revenus estimés</div>
          <div className="sim-amount">€{earnings}</div>
          <div className="sim-period">par mois</div>
          <div className="sim-breakdown">
            ~{sales} ventes à €{commissionFormatted} de commission
          </div>
          <a
            href="#candidature"
            className="btn-white"
            style={{ justifyContent: "center" }}
          >
            Rejoindre le programme →
          </a>
        </div>
      </div>
    </div>
  );
}
