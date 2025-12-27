// Path: src/pages/app/LoginPage/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { AtmosphericBackground } from "../../../components/atoms/sentinel/AtmosphericBackground";
import { DepthLayer } from "../../../components/atoms/sentinel/DepthLayer";
import { DataReveal } from "../../../components/atoms/sentinel/DataReveal";
import { InputText } from "../../../components/atoms/Input";
import { Button } from "../../../components/atoms/Button";
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

      <div className={styles.content}>
        <DataReveal delay={0} direction="up">
          <div className={styles.logoContainer}>
            {/* Animated SENTINEL Logo */}
            <svg
              className={styles.logo}
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer ring */}
              <circle
                cx="60"
                cy="60"
                r="55"
                stroke="var(--sentinel-accent-primary)"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              {/* Middle ring */}
              <circle
                cx="60"
                cy="60"
                r="42"
                stroke="var(--sentinel-accent-primary)"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
              {/* Inner ring */}
              <circle
                cx="60"
                cy="60"
                r="28"
                stroke="var(--sentinel-accent-primary)"
                strokeWidth="2"
                strokeOpacity="0.8"
              />
              {/* Center dot */}
              <circle
                cx="60"
                cy="60"
                r="8"
                fill="var(--sentinel-accent-primary)"
              />
              {/* Scanning line */}
              <line
                x1="60"
                y1="5"
                x2="60"
                y2="60"
                stroke="var(--sentinel-accent-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                className={styles.scanLine}
              />
            </svg>
          </div>
        </DataReveal>

        <DataReveal delay={200} direction="up">
          <h1 className={styles.title}>SENTINEL</h1>
          <p className={styles.subtitle}>INVESTMENT ANALYSIS SYSTEM</p>
        </DataReveal>

        <DataReveal delay={400} direction="up">
          <DepthLayer depth={2}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <InputText
                  type="email"
                  placeholder="analyst@sentinel.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
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
                  ariaLabel="Password"
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || !email || !password}
                className={styles.submitButton}
              >
                {isLoading ? (
                  <>
                    <Loader2 className={styles.spinner} size={18} />
                    Accessing...
                  </>
                ) : (
                  "Access System"
                )}
              </Button>
            </form>
          </DepthLayer>
        </DataReveal>

        <DataReveal delay={600} direction="up">
          <p className={styles.hint}>
            Demo credentials: any email/password
          </p>
        </DataReveal>
      </div>
    </div>
  );
}
