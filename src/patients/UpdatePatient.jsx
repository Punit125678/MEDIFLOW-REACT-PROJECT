import axios from 'axios'
import React, { use, useEffect } from 'react'
import Updatepatientmenu from './Updatepatientmenu';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: 'min-h-screen w-full overflow-hidden rounded-3xl bg-slate-50 px-4 py-6 sm:px-6 lg:px-8',
  card: 'mx-auto max-w-7xl overflow-hidden rounded-3xl border border-cyan-200/30 bg-white/90 p-6 shadow-2xl shadow-cyan-100',
  hero: 'flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-sky-300 p-6 text-white shadow-lg shadow-cyan-200/50 sm:flex-row sm:items-center sm:justify-between',
  heroTitle: 'text-2xl font-extrabold tracking-tight',
  heroText: 'mt-2 max-w-2xl text-sm text-cyan-100',
  badge: 'inline-flex items-center rounded-2xl bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-sm',
  searchCard: 'mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm',
  searchRow: 'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
  label: 'block text-sm font-semibold text-slate-700',
  helperText: 'mt-1 text-sm text-slate-500',
  form: 'flex w-full max-w-2xl flex-1 overflow-hidden rounded-3xl border border-cyan-200 bg-white shadow-sm',
  input: 'min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400',
  button: 'inline-flex items-center justify-center rounded-r-3xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700',
  tableWrapper: 'mt-6 overflow-x-auto overflow-y-scroll h-[450px] scrollbar-hide rounded-3xl border border-slate-200 bg-white shadow-sm',
  table: 'min-w-full border-collapse text-left text-sm',
  thead: 'sticky top-0 z-10 bg-slate-100 text-slate-700',
  th: 'sticky top-0 z-10 bg-slate-100 px-4 py-4 font-semibold uppercase tracking-wide',
  emptyRow: 'border-t border-slate-200',
  emptyCell: 'px-4 py-12 text-center text-sm text-slate-500',
  row: 'border-t border-slate-200 transition hover:bg-cyan-50',
  cell: 'px-4 py-4 text-slate-700',
  nameCell: 'px-4 py-4 text-slate-900',
  patientIdLabel: 'block text-xs text-slate-500 mt-1 font-medium',
  addressBox: 'max-w-xs whitespace-pre-wrap break-words rounded-2xl bg-slate-50 p-3 text-sm text-slate-600 shadow-inner shadow-slate-100',
  actionButton: 'inline-flex rounded-2xl bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-700 transition hover:bg-cyan-100'
}

function UpdatePatient() {
  const [patients, setPatients] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  console.log(searchTerm);
  console.log("Searching ..", searchTerm);
  console.log(patients);
  console.log(Array.isArray(patients));
  const navigate  = useNavigate();

  const handalonchange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("Submitted search term:", searchTerm);
    axios.get(`http://localhost:8080/HospitalManagementSystem/updatepatient?search=${searchTerm}&limit=10&page=1`)
      .then(res => { setPatients(res.data) })
      .catch(err => console.log(err));
  }

  useEffect(() => {

    const time = setTimeout(() => {
      let url = `http://localhost:8080/HospitalManagementSystem/updatepatient?limit=10&page=1`;
      if (searchTerm.trim() !== '') {
        url += `&search=${searchTerm}`;
      }

      axios.get(url)
        .then(res => setPatients(res.data))
        .catch(err => console.log(err))
    }, 500);
    return () => clearTimeout(time);

  }, [searchTerm])
  const handleupdate = (id) => {

    // alert("Update patient with ID: " + id);
    navigate(`/Updatepatientmenu/${id}`);


  }



  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.hero}>
          <div>
            <h3 className={styles.heroTitle}>Update Patient</h3>
            <p className={styles.heroText}>Search and review patient records quickly. Select a patient row to edit details or update their status.</p>
          </div>
          <span className={styles.badge}>Patient records</span>
        </div>

        <div className={styles.searchCard}>
          <div className={styles.searchRow}>
            <div>
              <label htmlFor='searchInput' className={styles.label}>Search Patients</label>
              <p className={styles.helperText}>Filter the table by patient name, phone, or disease.</p>
            </div>
            <form onSubmit={handlesubmit} className={styles.form}>
              <input
                type='text'
                id='searchInput'
                className={styles.input}
                placeholder='Search Patients By Name, Phone, or Disease'
                onChange={handalonchange}
                value={searchTerm}
              />
              <button className={styles.button} type='submit'>
                Search
              </button>
            </form>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Age</th>
                <th className={styles.th}>Gender</th>
                <th className={styles.th}>Address</th>
                <th className={styles.th}>Disease</th>
                <th className={styles.th}>Phone</th>
                <th className={styles.th}>Admit Date</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr className={styles.emptyRow}>
                  <td colSpan='8' className={styles.emptyCell}>No patients available yet.</td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient.patientId} className={styles.row}>
                    <td className={styles.nameCell}>
                      <div>{`${patient.firstName} ${patient.lastName}`}</div>
                      <span className={styles.patientIdLabel}>ID: {patient.patientId}</span>
                    </td>
                    <td className={styles.cell}>{patient.age}</td>
                    <td className={styles.cell}>{patient.gender}</td>
                    <td className={styles.cell}>
                      <div className={styles.addressBox}>
                        {patient.address || 'N/A'}
                      </div>
                    </td>
                    <td className={styles.cell}>{patient.disease}</td>
                    <td className={styles.cell}>{patient.phone}</td>
                    <td className={styles.cell}>{patient.admitDate}</td>
                    <td className={styles.cell}>
                      <button className={styles.actionButton} onClick={() => handleupdate(patient.patientId)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UpdatePatient
