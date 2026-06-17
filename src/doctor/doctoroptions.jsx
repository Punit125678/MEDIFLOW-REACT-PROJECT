import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


// function Header({ name, data }) {
//     return (
//         <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//             <p className="text-sm font-medium text-slate-500">{name}</p>
//             <h1 className="mt-1 text-2xl font-bold text-slate-900">{data}</h1>
//         </header>
//     );
// }


function Doctoroptions() {
    const navigate = useNavigate();
    const location = useLocation();
  const doctorData = location.state || {};

const patient = doctorData.patientCount?.[0] || {};

const stats = [
{
    title: "Specialization",
    value: patient.Specialization || "N/A",
    tone: "from-cyan-500 to-sky-600",
},
{
    title: "Total Patients",
    value: patient.Total_Patients || "0",
    tone: "from-emerald-500 to-teal-600",
},
{
    title: "Appointments",
    value: doctorData.TodayAppoinment || "0" + " Today",
    tone: "from-amber-500 to-orange-500",
},
];


    function handleLogout() {
        navigate("/");
    }

    return (
        <section className="shrink-0 grid gap-3 lg:grid-cols-[1fr_auto]">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((item) => (
                    <article
                        key={item.title}
                        className={`rounded-2xl bg-gradient-to-br ${item.tone} px-4 py-4 text-white shadow-lg shadow-slate-200`}
                    >
                        <p className="text-xs uppercase tracking-[0.2em] text-white/75">
                            {item.title}
                        </p>
                        <h3 className="mt-2 text-xl font-bold">{item.value}</h3>
                    </article>
                ))}
            </div>

            <div className="flex items-stretch lg:items-start">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 lg:w-auto"
                >
                    Logout
                </button>
            </div>
        </section>
    );
}

export default Doctoroptions;
