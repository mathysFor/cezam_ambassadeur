"use client";

import { useActionState, useEffect } from "react";
import { track, trackOnce } from "@/lib/track";
import {
  submitApplication,
  type FormState,
} from "../actions/submit-application";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

const INITIAL_STATE: FormState = { status: "idle" };

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
  const [state, formAction, isPending] = useActionState(
    submitApplication,
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.status === "success") {
      track("form_submit_success");
    } else if (state.status === "error") {
      track("form_submit_error", { message: state.message ?? "" });
    }
  }, [state.status, state.message]);

  if (state.status === "success") {
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
    <form
      action={formAction}
      onFocus={() => trackOnce("form_start")}
      onSubmit={() => track("form_submit_attempt")}
    >
      <div className="form-row">
        <div className="fg">
          <label htmlFor="firstName">Prénom</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Ton prénom"
            required
          />
        </div>
        <div className="fg">
          <label htmlFor="instagram">Instagram</label>
          <input
            id="instagram"
            name="instagram"
            type="text"
            placeholder="@tonhandle"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="fg">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ton@email.com"
            required
          />
        </div>
        <div className="fg">
          <label htmlFor="phone">Téléphone (WhatsApp)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="06 12 34 56 78"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="fg">
          <label htmlFor="followers">Abonnés</label>
          <select id="followers" name="followers" defaultValue="" required>
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
        <div className="fg">
          <label htmlFor="niche">Niche principale</label>
          <select id="niche" name="niche" defaultValue="" required>
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
          name="motivation"
          placeholder="Ce qui te parle dans le produit ou pourquoi tu veux rejoindre l'aventure..."
        />
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={isPending}
        onClick={() => {
          if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "Lead");
          }
        }}
      >
        {isPending ? "Envoi en cours…" : "Envoyer ma candidature →"}
      </button>

      {state.status === "error" && state.message && (
        <p className="form-error" role="alert">
          {state.message}
        </p>
      )}

      <p className="form-note">Aucun engagement. On te répond sous 48h.</p>
    </form>
  );
}
