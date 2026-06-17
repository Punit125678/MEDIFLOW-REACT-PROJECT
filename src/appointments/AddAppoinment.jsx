import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE = "http://localhost:8080/HospitalManagementSystem";

const styles = {
  page:
    "flex h-full min-h-0 w-full overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fafc_34%,#e0f2fe_100%)] p-3 sm:p-4 lg:p-5",
  shell:
    "mx-auto grid h-full min-h-0 w-full max-w-6xl gap-4 lg:grid-cols-[0.78fr_1.22fr]",
  hero:
    "relative hidden min-h-0 overflow-hidden rounded-3xl bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300 lg:block",
  formCard:
    "relative flex min-h-0 flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-4 shadow-2xl shadow-slate-200 backdrop-blur sm:p-5",
  sectionTitle:
    "text-xs font-bold uppercase tracking-[0.24em] text-sky-700",
  label: "text-sm font-semibold text-slate-700",
  field: "flex flex-col gap-2",
  input:
    "h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-70",
  submitBtn:
    "inline-flex h-11 items-center justify-center rounded-2xl bg-sky-600 px-8 font-bold text-white shadow-lg shadow-sky-200 transition duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0",
  resetBtn:
    "h-11 rounded-2xl border border-slate-200 px-6 font-bold text-slate-600 transition duration-200 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60",
};

export default function AddAppointment() {
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const isFormReady = Boolean(selectedPatientId && doctorId && date && status);

  const selectedDoctor = useMemo(
    () => doctors.find((doctor) => String(doctor.doctorId) === String(doctorId)),
    [doctorId, doctors]
  );

  useEffect(() => {
    const fetchOptions = async () => {
      setIsPageLoading(true);

      try {
        const [patientsRes, doctorsRes] = await Promise.all([
          axios.get(`${API_BASE}/patientsdata`),
          axios.get(`${API_BASE}/DrIdname`),
        ]);

        setPatients(patientsRes.data || []);
        setDoctors(doctorsRes.data || []);
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Loading Error",
          text: "Could not load patients or doctors. Please try again.",
          icon: "error",
        });
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;

    setPatientName(value);
    setSelectedPatientId("");

    const searchText = value.trim().toLowerCase();
    const filtered = patients.filter((patient) =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchText)
    );

    setFilteredPatients(searchText ? filtered : patients.slice(0, 6));
    setShowDropdown(true);
  };

  const handlePatientFocus = () => {
    if (!patientName) {
      setFilteredPatients(patients.slice(0, 6));
    }

    setShowDropdown(true);
  };

  const handleClear = () => {
    setPatientName("");
    setDoctorId("");
    setDate("");
    setStatus("");
    setSelectedPatientId("");
    setFilteredPatients([]);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormReady) {
      Swal.fire({
        title: "Warning!",
        text: "Please select a patient, doctor, date, and status.",
        icon: "warning",
      });

      return;
    }

    const data = {
      patient: {
        patientId: Number(selectedPatientId),
      },
      doctor: {
        doctorId: Number(doctorId),
      },
      appointmentDate: date,
      status,
    };

    setLoading(true);

    axios
      .post(`${API_BASE}/addAppointment`, data)
      .then((res) => {
        if (res.data.status === "success") {
          Swal.fire({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            navigate("/appointments");
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: res.data.message,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);

        Swal.fire({
          title: "Server Error!",
          text: "Something went wrong",
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.hero}>
          <div className="relative z-10 flex h-full min-h-0 flex-col justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">
                MediFlow HMS
              </p>
              <h1 className="mt-5 max-w-sm text-4xl font-black leading-tight text-white xl:text-5xl">
                Schedule care without the clutter
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
                Select a patient, match them with the right doctor, and confirm
                the appointment status in one focused workspace.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold text-sky-200">01</p>
                <p className="mt-1">Patient</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold text-sky-200">02</p>
                <p className="mt-1">Doctor</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold text-sky-200">03</p>
                <p className="mt-1">Confirm</p>
              </div>
            </div>
          </div>
        </aside>

        <section className={styles.formCard}>
          {loading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/75 backdrop-blur-sm">
              <div className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-white px-5 py-4 shadow-xl">
                <div className="h-8 w-8 rounded-full border-4 border-sky-100 border-t-sky-600 animate-spin" />
                <div>
                  <p className="font-bold text-slate-900">Saving appointment</p>
                  <p className="text-sm text-slate-500">Please wait...</p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-4 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={styles.sectionTitle}>Appointment booking</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                Add Appointment
              </h2>
            </div>
            <div className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 ring-1 ring-sky-100">
              New Schedule
            </div>
          </div>

          {isPageLoading ? (
            <div className="grid flex-1 content-start gap-4 md:grid-cols-2">
              {[...Array(4)].map((_, index) => (
                <div
                  className={`flex flex-col gap-2 ${index === 0 ? "md:col-span-2" : ""}`}
                  key={index}
                >
                  <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                  <div className="h-11 animate-pulse rounded-2xl bg-slate-200" />
                </div>
              ))}
              <div className="md:col-span-2 mt-3 flex justify-end gap-3">
                <div className="h-11 w-24 animate-pulse rounded-2xl bg-slate-200" />
                <div className="h-11 w-36 animate-pulse rounded-2xl bg-sky-100" />
              </div>
            </div>
          ) : (
            <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className={`${styles.field} md:col-span-2`}>
                    <label htmlFor="patientName" className={styles.label}>
                      Patient Name
                    </label>
                    <div className="relative">
                      <input
                        id="patientName"
                        type="text"
                        className={styles.input}
                        placeholder="Search patient by name"
                        value={patientName}
                        onChange={handleSearch}
                        onFocus={handlePatientFocus}
                        autoComplete="off"
                      />

                      {showDropdown && (
                        <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-56 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                          {filteredPatients.length > 0 ? (
                            filteredPatients.map((patient) => (
                              <button
                                key={patient.patientId}
                                type="button"
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-sky-50"
                                onClick={() => {
                                  setPatientName(`${patient.firstName} ${patient.lastName}`);
                                  setSelectedPatientId(patient.patientId);
                                  setShowDropdown(false);
                                }}
                              >
                                <span className="font-semibold text-slate-800">
                                  {patient.firstName} {patient.lastName}
                                </span>
                                <span className="text-xs font-bold text-sky-600">
                                  ID {patient.patientId}
                                </span>
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-3 text-sm font-semibold text-slate-500">
                              No patient found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="doctorId" className={styles.label}>
                      Doctor
                    </label>
                    <select
                      id="doctorId"
                      className={styles.input}
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.doctorId} value={doctor.doctorId}>
                          {doctor.doctorName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="date" className={styles.label}>
                      Appointment Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      className={styles.input}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="status" className={styles.label}>
                      Status
                    </label>
                    <select
                      id="status"
                      className={styles.input}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-bold text-slate-900">Preview</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      <p>
                        Patient:{" "}
                        <span className="font-semibold text-slate-900">
                          {selectedPatientId ? patientName : "Not selected"}
                        </span>
                      </p>
                      <p>
                        Doctor:{" "}
                        <span className="font-semibold text-slate-900">
                          {selectedDoctor?.doctorName || "Not selected"}
                        </span>
                      </p>
                      <p>
                        Status:{" "}
                        <span className="font-semibold capitalize text-slate-900">
                          {status || "Not selected"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={handleClear}
                  disabled={loading}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading || !isFormReady}
                >
                  {loading ? "Saving..." : "Submit Appointment"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
