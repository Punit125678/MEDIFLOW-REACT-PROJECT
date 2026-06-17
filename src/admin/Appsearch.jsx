import React from "react";

function Appsearch({ adminName = "Admin" }) {
  const stats = [
    { label: "Total Patients", value: "1,248", tone: "from-cyan-500 to-blue-500" },
    { label: "Doctors Available", value: "36", tone: "from-emerald-500 to-teal-500" },
    { label: "Appointments Today", value: "128", tone: "from-amber-500 to-orange-500" },
    { label: "Pending Billing", value: "17", tone: "from-rose-500 to-pink-500" },
  ];

  const actions = [
    "Add new doctor",
    "Register patient",
    "Approve appointments",
    "Review billing summary",
  ];

  const activity = [
    "Dr. Sharma updated 8 patient files.",
    "12 appointments were approved this morning.",
    "3 new staff accounts were created.",
    "Daily hospital report is ready to review.",
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,_#0f172a,_#155e75,_#082f49)] p-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">
            Admin Dashboard
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black">Welcome, {adminName}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Here is a quick overview of hospital operations so you can monitor
                staffing, appointments, patient flow, and financial tasks from one place.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-sm text-cyan-100">System status</p>
              <p className="mt-1 text-2xl font-bold text-white">Operational</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className={`h-2 w-24 rounded-full bg-gradient-to-r ${item.tone}`} />
              <p className="mt-5 text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
            <p className="mt-2 text-sm text-slate-500">
              Common administration tasks for daily hospital management.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {actions.map((action) => (
                <button
                  key={action}
                  type="button"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-left font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700"
                >
                  {action}
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            <div className="mt-6 space-y-4">
              {activity.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default Appsearch;
