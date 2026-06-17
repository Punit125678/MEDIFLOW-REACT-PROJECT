import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@mediflow.com";
const ADMIN_NAME = "admin";
const ADMIN_PASSWORD = "admin123";

function Adminlogin() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // ✅ add this

    const styles = {
        page: "min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-4 py-10",
        shell: "mx-auto flex min-h-[88vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur",
        hero: "hidden flex-1 flex-col justify-between bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.35),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(8,47,73,0.88))] p-10 text-white lg:flex",
        badge: "w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200",
        heroTitle: "max-w-md text-5xl font-black leading-tight",
        heroText: "max-w-md text-base text-slate-300",
        heroGrid: "grid grid-cols-2 gap-4",
        statCard: "rounded-2xl border border-white/10 bg-white/5 p-4",
        statValue: "text-3xl font-bold text-white",
        statLabel: "mt-2 text-sm text-slate-300",
        formWrap: "flex w-full items-center justify-center bg-white px-6 py-10 sm:px-10 lg:max-w-xl",
        card: "w-full max-w-md",
        title: "text-3xl font-bold text-slate-900",
        subtitle: "mt-3 text-sm leading-6 text-slate-500",
        form: "mt-8 space-y-5",
        label: "mb-2 block text-sm font-medium text-slate-700",
        input:
            "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100",
        hint: "text-xs text-slate-500",
        button:
            "w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]",
        error:
            "rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700",
        footer: "mt-6 rounded-2xl bg-slate-100 px-4 py-4 text-sm text-slate-600",
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const normalizedIdentifier = identifier.trim().toLowerCase();
        const isValidUser =
            normalizedIdentifier === ADMIN_EMAIL || normalizedIdentifier === ADMIN_NAME;

        if (!isValidUser || password !== ADMIN_PASSWORD) {
            setError("Use a valid admin email or admin name with the correct password.");
            return;
        }

        setError("");

        // ✅ save login
        sessionStorage.setItem("adminLoggedIn", "true");

        // ✅ redirect (main fix 🔥)
        navigate("/dashbordpanel");
    };

    return (
        <main className={styles.page}>
            <div className={styles.shell}>
                <section className={styles.hero}>
                    <div>
                        <span className={styles.badge}>MediFlow Admin</span>
                        <h1 className={styles.heroTitle}>
                            Control the hospital workflow from one secure panel.
                        </h1>
                        <p className={styles.heroText}>
                            Sign in with your admin email or admin name and manage appointments,
                            doctors, patients, and daily operations from a single place.
                        </p>
                    </div>

                    <div className={styles.heroGrid}>
                        <article className={styles.statCard}>
                            <p className={styles.statValue}>128</p>
                            <p className={styles.statLabel}>Appointments tracked today</p>
                        </article>
                        <article className={styles.statCard}>
                            <p className={styles.statValue}>36</p>
                            <p className={styles.statLabel}>Doctors active in the system</p>
                        </article>
                        <article className={styles.statCard}>
                            <p className={styles.statValue}>540+</p>
                            <p className={styles.statLabel}>Patient records secured</p>
                        </article>
                        <article className={styles.statCard}>
                            <p className={styles.statValue}>24/7</p>
                            <p className={styles.statLabel}>Administrative visibility</p>
                        </article>
                    </div>
                </section>

                <section className={styles.formWrap}>
                    <div className={styles.card}>
                        <h2 className={styles.title}>Admin Panel Login</h2>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="admin or email"
                                className={styles.input}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <p className={styles.error}>{error}</p>}

                            <button className={styles.button}>
                                Login
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Adminlogin;