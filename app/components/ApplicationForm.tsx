"use client";

import { useState, type FormEvent } from "react";

type FormState = {
  firstName: string;
  instagram: string;
  email: string;
  followers: string;
  niche: string;
  motivation: string;
};

const FOLLOWER_RANGES = [
  "Moins de 1 000",
  "1 000 – 5 000",
  "5 000 – 10 000",
  "10 000 – 20 000",
  "20 000 – 50 000",
  "50 000+",
];

const NICHES = [
  "Bien-être & santé",
  "Nutrition & alimentation",
  "Yoga & méditation",
  "Longévité & anti-âge",
  "Ayurveda & médecines naturelles",
  "Fitness & sport",
  "Lifestyle & beauté naturelle",
  "Autre",
];

export function ApplicationForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    instagram: "",
    email: "",
    followers: "",
    niche: "",
    motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to backend / email service.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="success">
        <div className="success-check">✓</div>
        <h3>Candidature reçue !</h3>
        <p>
          On revient vers toi sous 48h.
          <br />
          En attendant, découvre le rituel sur{" "}
          <a href="https://cezam.store">cezam.store</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="fg">
          <label htmlFor="firstName">Prénom</label>
          <input
            id="firstName"
            type="text"
            placeholder="Ton prénom"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            required
          />
        </div>
        <div className="fg">
          <label htmlFor="instagram">Instagram</label>
          <input
            id="instagram"
            type="text"
            placeholder="@tonhandle"
            value={form.instagram}
            onChange={(e) => update("instagram", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="fg">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="ton@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </div>
        <div className="fg">
          <label htmlFor="followers">Abonnés</label>
          <select
            id="followers"
            value={form.followers}
            onChange={(e) => update("followers", e.target.value)}
            required
          >
            <option value="" disabled>
              Sélectionne
            </option>
            {FOLLOWER_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="fg">
        <label htmlFor="niche">Niche principale</label>
        <select
          id="niche"
          value={form.niche}
          onChange={(e) => update("niche", e.target.value)}
          required
        >
          <option value="" disabled>
            Ta niche
          </option>
          {NICHES.map((niche) => (
            <option key={niche} value={niche}>
              {niche}
            </option>
          ))}
        </select>
      </div>

      <div className="fg">
        <label htmlFor="motivation">
          Pourquoi Cezam ?{" "}
          <span
            style={{
              opacity: 0.4,
              fontWeight: 400,
              textTransform: "none",
              letterSpacing: 0,
            }}
          >
            (optionnel)
          </span>
        </label>
        <textarea
          id="motivation"
          placeholder="Ce qui te parle dans le produit ou pourquoi tu veux rejoindre l'aventure..."
          value={form.motivation}
          onChange={(e) => update("motivation", e.target.value)}
        />
      </div>

      <button type="submit" className="submit-btn">
        Envoyer ma candidature →
      </button>
      <p className="form-note">Aucun engagement. On te répond sous 48h.</p>
    </form>
  );
}
