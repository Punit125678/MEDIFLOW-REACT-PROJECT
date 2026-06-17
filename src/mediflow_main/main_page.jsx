import React, { useState } from "react";
import Adminlogin from "../admin/Adminlogin";
import DoctorLogine from "../login/DoctorLogine";
import { useNavigate } from "react-router-dom";
// import App from "../App";
import App from "../App";
function MainPage() {
    const navigate = useNavigate();
//   const [selectedPortal, setSelectedPortal] = useState("");

//   if (selectedPortal === "doctor") {
//     return <DoctorLogine />;
//   }

//   if (selectedPortal === "admin") {
//     return <Adminlogin />;
//   }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(135deg,_#020617,_#0f172a,_#164e63)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <p className="w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">
              MediFlow HMS
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Hospital Management System main portal.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              Choose your login area to continue. Doctors can access their daily
              workflow, and admins can manage patients, staff, and appointments from
              the admin panel.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="mt-2 text-sm text-slate-300">System access</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-3xl font-bold text-white">2</p>
                <p className="mt-2 text-sm text-slate-300">Secure login portals</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-3xl font-bold text-white">1</p>
                <p className="mt-2 text-sm text-slate-300">Unified HMS experience</p>
              </article>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur md:p-8">
            <h2 className="text-2xl font-bold text-white">Select Login</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Pick the correct portal to continue into MediFlow HMS.
            </p>

            <div className="mt-8 space-y-4">
              <button
                type="button"
                onClick={() => navigate("/doctor-login")}
                className="group w-full rounded-3xl border border-cyan-300/20 bg-slate-900/70 p-5 text-left transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-slate-900"
              >
                <p className="text-lg font-bold text-white">Doctor Login</p>
                <p className="mt-2 text-sm text-slate-300">
                  Open doctor access for appointments, consultations, and daily work.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-cyan-300">
                  Continue as doctor
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin-login")}
                className="group w-full rounded-3xl border border-amber-300/20 bg-white/10 p-5 text-left transition hover:-translate-y-1 hover:border-amber-300/50 hover:bg-white/15"
              >
                <p className="text-lg font-bold text-white">Admin Login</p>
                <p className="mt-2 text-sm text-slate-300">
                  Open admin access for dashboards, management, and hospital control.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-amber-300">
                  Continue as admin
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>
      {/* <App/> */}
    </main>
  );
}

export default MainPage;
