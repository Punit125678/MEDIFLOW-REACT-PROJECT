import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import user from '../assets/images.png';
import Swal from 'sweetalert2';

const styles = {
    page: 'flex h-full w-full flex-col items-center justify-center rounded-2xl bg-cyan-50 p-4',
    shell: 'flex h-[95%] w-[95%] flex-col items-center justify-center gap-3 rounded-2xl border border-cyan-100 bg-white p-3 shadow-xl shadow-cyan-100/70',
    header: 'flex h-[20%] w-[95%] items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 p-4 shadow-lg shadow-cyan-100',
    headerInfo: 'flex h-full min-w-0 flex-1 flex-col justify-center rounded-2xl bg-white/15 px-5 text-white ring-1 ring-white/20',
    eyebrow: 'text-xs font-extrabold uppercase tracking-[0.25em] text-cyan-100',
    title: 'mt-1 text-2xl font-extrabold text-white',
    subtitle: 'mt-1 text-sm font-medium text-cyan-50',
    headerStats: 'flex h-full w-[25%] min-w-[170px] flex-col items-center justify-center rounded-2xl bg-white text-teal-700 shadow-md shadow-cyan-900/10',
    statLabel: 'text-xs font-bold uppercase tracking-wide text-slate-500',
    statValue: 'mt-1 text-3xl font-extrabold',
    tablePanel: 'h-[75%] w-[95%] overflow-y-scroll rounded-2xl border border-cyan-100 bg-white shadow-sm',
    table: 'w-full border-collapse',
    thead: 'bg-cyan-100 text-teal-800',
    headRow: 'w-full overflow-hidden p-1',
    th: 'py-3 text-xs font-extrabold uppercase tracking-wide',
    tbody: 'h-auto w-full py-2 overflow-y-scroll',
    row: 'py-2 text-center transition odd:bg-white even:bg-cyan-50/40 hover:bg-amber-50',
    imageCell: 'py-3 font-bold',
    image: 'mx-auto h-11 w-11 rounded-full object-cover ring-2 ring-cyan-100',
    nameCell: 'font-bold text-slate-900',
    cell: 'font-bold text-slate-700',
    actionCell: 'font-bold',
    deleteBtn: 'rounded-lg bg-rose-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-rose-600 active:scale-95',
}


function Delete_Patient() {


    const url = "http://localhost:8080/HospitalManagementSystem/";
    console.log(url);

    const [data, setData] = useState([]);

    useEffect(() => {
        const res = axios.get(`${url}GetPatientFordelete?page=1&limit=10`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    console.log("Date :- ", data);

    const handledelete = (patientId, firstName, lastName) => {
            console.log(patientId,firstName,lastName);
            
        Swal.fire({
            title: `Are You Sure Delete ${firstName} ${lastName}  !!!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it !"
        }).then(async (result) => {

            // await axios.delete(`url${id}`)
            if (result.isConfirmed) {
                  
                Swal.fire({
                    title:"Succefully Deleted Patient",
                    text:"Patient Record has Been Deleted.",
                    icon:"success",
                  timerProgressBar:2000,
                  showCancelButton:false

            })
            }
        }).catch((err) => {
            console.log(err);


        })
    }



    // const handletbody = () => {
    //     console.log();


    //     return data.map((f)=>(
    //         <tr>

    //         </tr>
    //     ))
    // }


    return (
        <div className={styles.page}>
            <div className={styles.shell}>
                <div className={styles.header}>
                    <div className={styles.headerInfo}>
                        <p className={styles.eyebrow}>Patient Management</p>
                        <h1 className={styles.title}>Delete Patient Records</h1>
                        <p className={styles.subtitle}>Review patient details before removing a record.</p>
                    </div>
                    <div className={styles.headerStats}>
                        <p className={styles.statLabel}>Records</p>
                        <p className={styles.statValue}>{data.length}</p>
                    </div>
                </div>
                <div className={styles.tablePanel}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr className={styles.headRow}>
                                <th className={styles.th}>Image</th>
                                <th className={styles.th}>Name</th>
                                <th className={styles.th} >Age</th>
                                <th className={styles.th}>Gender</th>
                                <th className={styles.th}>Phone</th>
                                <th className={styles.th}>Disease</th>
                                <th className={styles.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {data.map((f) => (
                                <tr className={styles.row} key={f.patientId}>
                                    <td className={styles.imageCell}>
                                        <img src={f.picture ? `${url}${f.picture}` : user} alt="patient" className={styles.image} />
                                    </td>
                                    <td className={styles.nameCell}>{f.firstName}  {f.lastName}</td>
                                    <td className={styles.cell}>{f.age}</td>
                                    <td className={styles.cell}>{f.gender}</td>
                                    <td className={styles.cell}>{f.phone}</td>
                                    <td className={styles.cell}>{f.disease}</td>
                                    <td className={styles.actionCell}>
                                        <button className={styles.deleteBtn} onClick={()=>handledelete(f.patientId,f.firstName,f.lastName)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Delete_Patient
// {data.map((p)=>(
//                                 <tr className='border-2'>
//                                     <td className='font-extrabold'>{p.firtName}</td>
//                                 </tr>
//                             ))}
