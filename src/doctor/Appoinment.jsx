import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const statusStyles = {
    Completed: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    Cancelled: "bg-rose-100 text-rose-700 ring-rose-200",
    Pending: "bg-amber-100 text-amber-700 ring-amber-200",
    Confirmed: "bg-sky-100 text-sky-700 ring-sky-200",
};

function Connform() {
    const doctorid = sessionStorage.getItem("DoctorId");

    console.log("DoctorId :- ",doctorid);
    const [data, setData] = useState([]);
    const [dataa, setTodayAppoinment] = useState([]);
    // const loction = 

    const countdata = (doctorid)=>{
        fetch("http://localhost:8080/HospitalManagementSystem/CountData?id="+doctorid)
        .then(res => res.json())
        .then(response => setTodayAppoinment(response))
        .catch(err => console.log(err));
    };

    const loadData = (doctorid) => {
        console.log("DoctorId in loadData:- ",sessionStorage.getItem("DoctorId"));
       axios.get("http://localhost:8080/HospitalManagementSystem/GetListAppoinmentDoctor?id=" + sessionStorage.getItem("DoctorId"))

        .then((response) => {
            console.log("Data:- ", response.data);
            setData(response.data);
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
        countdata(doctorid);
        loadData();
        console.log("Data:- ",data);
        
    }, []);

    const updateStatus = (id, status) => {
        
        fetch("http://localhost:8080/HospitalManagementSystem/Updatestatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, status }),
        })
        .then(()=>{loadData();countdata(doctorid);})
        .then(() => loadData())
        .catch((err) => console.log(err));
      
    };


    return (
        <section className="flex min-h-0 flex-1">
            <div className="flex min-h-0 w-full flex-col">
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
                    <div className="flex shrink-0 flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
                                Schedule Overview
                            </p>
                            <h1 className="mt-1 text-2xl font-bold text-slate-900">
                                Appointment Management
                            </h1>
                            <p className="mt-1 max-w-2xl text-sm text-slate-500">
                                Review requests and update statuses without leaving this screen.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            <div className="rounded-2xl bg-slate-900 px-3 py-2.5 text-white shadow-lg shadow-slate-900/10">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Total</p>
                                <p className="mt-1 text-xl font-semibold">{dataa?.total}</p>
                            </div>
                            <div className="rounded-2xl bg-amber-50 px-3 py-2.5 text-amber-900 ring-1 ring-amber-100">
                                <p className="text-xs uppercase tracking-[0.2em] text-amber-600">Pending</p>
                                <p className="mt-1 text-xl font-semibold">{dataa?.pending}</p>
                            </div>
                            <div className="rounded-2xl bg-emerald-50 px-3 py-2.5 text-emerald-900 ring-1 ring-emerald-100">
                                <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Completed</p>
                                <p className="mt-1 text-xl font-semibold">{dataa?.completed}</p>
                            </div>
                            <div className="rounded-2xl bg-rose-50 px-3 py-2.5 text-rose-900 ring-1 ring-rose-100">
                                <p className="text-xs uppercase tracking-[0.2em] text-rose-600">Cancelled</p>
                                <p className="mt-1 text-xl font-semibold">{dataa?.cancelled}</p>
                            </div>
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 px-4 py-4 sm:px-5">
                        {data.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
                                <h2 className="text-lg font-semibold text-slate-800">No appointments found</h2>
                                <p className="mt-2 text-sm text-slate-500">
                                    New patient bookings will appear here once they are available.
                                </p>
                            </div>
                        ) : (
                            <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200">
                                <div className="min-h-0 flex-1 overflow-auto">
                                    <table className="w-full divide-y divide-slate-200 text-sm text-slate-600">
                                        <thead className="sticky top-0 z-10 bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500 shadow-sm">
                                            <tr>
                                                <th className="px-5 py-4 font-semibold">Patient</th>
                                                <th className="px-5 py-4 font-semibold">Age</th>
                                                <th className="px-5 py-4 font-semibold">Disease</th>
                                                <th className="px-5 py-4 font-semibold">Date</th>
                                                <th className="px-5 py-4 font-semibold">Status</th>
                                                <th className="px-5 py-4 font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 bg-white">
                                            {data.map((appointment,index) => {
                                                const badgeStyle =
                                                    statusStyles[appointment.status] ||
                                                    "bg-slate-100 text-slate-700 ring-slate-200";

                                                return (
                                                    <tr key={index} className="transition hover:bg-slate-50/80">
                                                        <td className="px-5 py-4">
                                                            <div className="min-w-[170px]">
                                                                <p className="font-semibold text-slate-900">
                                                                    {appointment.PatientName} 
                                                                </p>
                                                                <p className="text-xs text-slate-400">
                                                                    Patient ID: {appointment.id || "Not added"}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-4 font-medium text-slate-700">
                                                            {appointment.Age}
                                                        </td>
                                                        <td className="px-5 py-4">
                                                            <span className="inline-flex min-w-[120px] rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                                                                {appointment.Disease || "Not added"}
                                                            </span>
                                                        </td>
                                                        <td className="px-5 py-4 font-medium text-slate-700">
                                                            {appointment.AppoinmentDate || "Not added"}
                                                        </td>
                                                        <td className="px-5 py-4">
                                                            <span
                                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${badgeStyle}`}
                                                            >
                                                                {appointment.Status}
                                                            </span>
                                                        </td>
                                                        <td className="px-5 py-4">
                                                            <div className="flex min-w-[190px] flex-wrap gap-2">
                                                                <button
                                                                    onClick={() => updateStatus(appointment.id, "Completed")}
                                                                    className="rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-emerald-700"
                                                                >
                                                                    Confirm
                                                                </button>
                                                                <button
                                                                    onClick={() => updateStatus(appointment.id, "Cancelled")}
                                                                    className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 font-medium text-rose-700 transition hover:bg-rose-100"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Connform;
