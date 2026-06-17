import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:8080/HospitalManagementSystem';

function getFullName(patient) {
  return `${patient?.firstName || ''} ${patient?.lastName || ''}`.trim() || 'Patient Name';
}

function PatientDetailsHeader({ id }) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await axios.get(`${API_BASE}/GetDatabyid?id=${id}`);
        setPatient(res.data || null);
      } catch (err) {
        setError(err.message || 'Unable to load patient details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return (
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
        <p className="text-sm font-semibold text-slate-500">Loading patient details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-2xl border border-red-100 bg-red-50 p-6 shadow-sm">
        <p className="text-sm font-bold text-red-700">Could not load patient details</p>
        <p className="mt-1 text-sm text-red-600">{error}</p>
      </section>
    );
  }

  const imageUrl = patient?.picture ? `${API_BASE}/${patient.picture}` : '';

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
      <div className="flex flex-col gap-5 bg-gradient-to-r from-cyan-700 via-sky-600 to-slate-800 p-5 text-white lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white/30 bg-white/15">
            {imageUrl ? (
              <img src={imageUrl} alt={getFullName(patient)} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-extrabold">
                {getFullName(patient).charAt(0)}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-100">Patient Details</p>
            <h1 className="mt-1 truncate text-2xl font-extrabold sm:text-3xl">{getFullName(patient)}</h1>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-white/15 px-3 py-1 font-semibold ring-1 ring-white/20">
                ID: {patient?.patientId || id}
              </span>
              <span className="rounded-full bg-amber-300 px-3 py-1 font-bold text-slate-900">
                {patient?.disease || 'Condition N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-3 lg:min-w-[420px]">
          <div className="rounded-2xl bg-white/12 p-3 ring-1 ring-white/15">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100">Age</p>
            <p className="mt-1 text-lg font-extrabold">{patient?.age || 'N/A'}</p>
          </div>
          <div className="rounded-2xl bg-white/12 p-3 ring-1 ring-white/15">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100">Gender</p>
            <p className="mt-1 text-lg font-extrabold">{patient?.gender || 'N/A'}</p>
          </div>
          <div className="rounded-2xl bg-white/12 p-3 ring-1 ring-white/15">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100">Phone</p>
            <p className="mt-1 text-lg font-extrabold">{patient?.phone || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5 text-sm md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="font-bold text-slate-500">Admit Date</p>
          <p className="mt-1 font-semibold text-slate-900">{patient?.admitDate || 'N/A'}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
          <p className="font-bold text-slate-500">Address</p>
          <p className="mt-1 font-semibold text-slate-900">{patient?.address || 'N/A'}</p>
        </div>
      </div>
    </section>
  );
}

export default PatientDetailsHeader;
