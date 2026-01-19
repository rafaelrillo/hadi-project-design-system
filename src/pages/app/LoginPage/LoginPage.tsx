// Path: src/pages/app/LoginPage/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ChevronRight, ChevronLeft, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { AtmosphericBackground } from "../../../components/atoms/sentinel/AtmosphericBackground";
import { InputText } from "../../../components/atoms/Input";
import { FingEmblem } from "../../../components/atoms/FingEmblem";
import { FingWordmarkText } from "../../../components/atoms/FingWordmark";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      await login(email, password);
      navigate("/app/dashboard");
    } catch {
      // Error is handled in the store
    }
  };

  return (
    <div className={styles.container}>
      <AtmosphericBackground variant="default" animated />

      {/* Back to Home - Same as "View All" button */}
      <div className={styles.homeButtonPosition}>
        <div className={styles.homeButtonWrapper}>
          <button
            type="button"
            onClick={() => navigate("/")}
            className={styles.homeButton}
          >
            <span className={styles.homeIconCircle}>
              <ChevronLeft size={11} className={styles.homeIcon} />
            </span>
            Home
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {/* All elements emerge together from the marble surface */}
        <div className={styles.brandLockup}>
          {/* FING Emblem with framed variant (outer raised + inner inset) */}
          <FingEmblem size={140} animation="rippleSlow" variant="framed" />
          <div className={styles.brandText}>
            <FingWordmarkText variant="carved" size={72} />
            <p className={styles.subtitle}>Finance engine.</p>
          </div>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <InputText
                type="email"
                placeholder="analyst@fing.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                icon={<Mail size={18} />}
                ariaLabel="Email address"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <InputText
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                icon={<Lock size={18} />}
                ariaLabel="Password"
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {/* Pill Frame INSET → RAISED button */}
            <div className={styles.buttonWrapper}>
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className={styles.pillFrameButton}
              >
                {isLoading ? (
                  <>
                    <Loader2 className={styles.spinner} size={16} />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className={styles.buttonIconCircle}>
                      <ChevronRight size={14} className={styles.buttonIcon} />
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <p className={styles.hint}>
          Demo credentials: any email/password
        </p>
      </div>
    </div>
  );
}
