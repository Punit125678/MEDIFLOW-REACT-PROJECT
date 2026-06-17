import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080/HospitalManagementSystem/updatepatient?limit=10&page=1';

const styles = {
  page: 'h-screen w-full overflow-hidden bg-slate-50 px-4 py-5 sm:px-6 lg:px-8',
  shell: 'mx-auto flex h-full max-w-7xl flex-col gap-5',
  header: 'rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70',
  headerRow: 'flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between',
  eyebrow: 'text-xs font-bold uppercase tracking-[0.25em] text-cyan-700',
  title: 'mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl',
  subtitle: 'mt-2 max-w-2xl text-sm leading-6 text-slate-500',
  statsGrid: 'grid w-full gap-3 sm:w-auto sm:grid-cols-1 lg:min-w-[180px]',
  stat: 'rounded-2xl border border-slate-200 bg-slate-50 p-4',
  statLabel: 'text-xs font-semibold uppercase tracking-wide text-slate-500',
  statValue: 'mt-1 text-2xl font-extrabold text-slate-900',
  tablePanel: 'min-h-0 flex-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60',
  tableScroll: 'h-full overflow-auto',
  table: 'w-full min-w-[1050px] table-fixed border-collapse text-left text-sm',
  thead: 'sticky top-0 z-10 border-b border-slate-200 bg-slate-100 text-xs uppercase tracking-wide text-slate-600',
  th: 'px-4 py-4 font-extrabold whitespace-nowrap',
  row: 'border-b border-slate-100 transition hover:bg-cyan-50/70',
  nameCell: 'px-4 py-4 align-top font-bold text-slate-900',
  idText: 'mt-1 block text-xs font-semibold text-slate-400',
  cell: 'px-4 py-4 align-top text-slate-600',
  condition: 'inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-100',
  action: 'rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-cyan-800',
  stateBox: 'flex min-h-[420px] items-center justify-center px-6 text-center',
  stateTitle: 'text-lg font-extrabold text-slate-900',
  stateText: 'mt-2 max-w-md text-sm leading-6 text-slate-500',
};

function getFullName(patient) {
  return `${patient?.firstName || ''} ${patient?.lastName || ''}`.trim() || 'N/A';
}

function View_patient() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log("COMPONENT RENDER");

  const navigation = useNavigate();

  const handleshow = (patientId) => {
    navigation(`/patientdetails/${patientId}`);

  }

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(API_URL);

        console.log("Fetched patient data:", res.data);

        setPatients(res.data || []);
      } catch (err) {
        setError(err.message || 'Unable to load patients.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="8">
            <div className={styles.stateBox}>
              <div>
                <p className={styles.stateTitle}>Loading patient records...</p>
                <p className={styles.stateText}>Please wait while the latest patient data is fetched.</p>
              </div>
            </div>
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="8">
            <div className={styles.stateBox}>
              <div>
                <p className={styles.stateTitle}>Could not load patients</p>
                <p className={styles.stateText}>{error}</p>
              </div>
            </div>
          </td>
        </tr>
      );
    }

    if (patients.length === 0) {
      return (
        <tr>
          <td colSpan="8">
            <div className={styles.stateBox}>
              <div>
                <p className={styles.stateTitle}>No patients found</p>
                <p className={styles.stateText}>No patient records are available right now.</p>
              </div>
            </div>
          </td>
        </tr>
      );
    }

    return patients.map((patient) => (
      <tr key={patient.patientId} className={styles.row} >
        <td className={styles.nameCell}>
          {getFullName(patient)}
          <span className={styles.idText}>ID: {patient.patientId || 'N/A'}</span>
        </td>
        <td className={styles.cell}>{patient.age || 'N/A'}</td>
        <td className={styles.cell}>{patient.gender || 'N/A'}</td>
        <td className={styles.cell}>{patient.phone || 'N/A'}</td>
        <td className={styles.cell}>
          <span className={styles.condition}>{patient.disease || 'N/A'}</span>
        </td>
        <td className={styles.cell}>{patient.admitDate || 'N/A'}</td>
        <td className={styles.cell}>
          <div className="max-w-xs truncate" title={patient.address || 'N/A'}>
            {patient.address || 'N/A'}
          </div>
        </td>
        <td className={styles.cell}>
          <button type="button" className={styles.action} onClick={() => handleshow(patient.patientId)}>
            View
          </button>


        </td>
      </tr>
    ));
  };

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <section className={styles.header}>
          <div className={`${styles.headerRow} `}>
            <div>
              <p className={styles.eyebrow}>Patient Directory</p>
              <h1 className={styles.title}>View Patients Records</h1>
              <p className={styles.subtitle}>
                Scan patient records from one clean patient list.
              </p>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.stat}>
                <p className={styles.statLabel}>Records</p>
                <p className={styles.statValue}>{patients.length}</p>
              </div>
            </div>
            <div className='flex w-full overflow-hidden rounded-2xl border border-slate-200 lg:w-[35%]' >
              <input type="text" placeholder="Search patients..." className='min-w-0 flex-1 border-0 p-2 outline-none' />
              <button className='shrink-0 bg-slate-800 px-4 py-2 text-white hover:bg-slate-600'>Search</button>
            </div>
          </div>
        </section>
        <section className={styles.tablePanel}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Patient</th>
                  <th className={styles.th}>Age</th>
                  <th className={styles.th}>Gender</th>
                  <th className={styles.th}>Phone</th>
                  <th className={styles.th}>Disease</th>
                  <th className={styles.th}>Admit Date</th>
                  <th className={styles.th}>Address</th>
                  <th className={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>{renderTableBody()}</tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default View_patient;
