import React, { useState, useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const styles = {
    page: 'h-screen overflow-y-auto flex  border-2 gap-2 justify-center items-center bg-slate-50 w-full px-4 py-4 sm:px-4 lg:px-8',
    card: 'mx-auto w-[100%] max-w-5xl overflow-hidden rounded-3xl border border-cyan-200/30 h-full bg-white/90 p-2  border shadow-2xl shadow-cyan-100',
    hero: 'flex  gap-2 rounded-3xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-sky-300 h-[24%]  via-cyan-400 to-sky-300 p-3 text-white shadow-lg shadow-cyan-200/50 mb-2',
    heroTitle: 'text-2xl font-extrabold tracking-tight',
    heroText: 'text-sm text-cyan-100',
    badge: 'inline-flex items-center rounded-2xl bg-white/20 px-3 py-1 text-sm font-semibold text-white shadow-sm',
    formCard: 'rounded-3xl  border border-slate-200 bg-slate-50 p-4 shadow-sm',
    formGrid: 'grid gap-4 md:grid-cols-2',
    fieldGroup: 'flex flex-col gap-2',
    label: 'text-sm font-semibold text-slate-700',
    input: 'h-9 w-full rounded-2xl border border-slate-200 bg-white px-3 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100',
    textarea: 'min-h-20 w-full resize-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100',
    buttonGroup: 'flex gap-3 justify-center mt-4',
    updateBtn: 'h-10 rounded-2xl bg-cyan-600 px-6 font-bold text-white shadow-lg shadow-cyan-200 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-xl active:translate-y-0',
    clearBtn: 'h-10 rounded-2xl border border-slate-200 px-6 font-bold text-slate-600 transition duration-200 hover:border-slate-300 hover:bg-slate-50',
    disabled: 'cursor-not-allowed opacity-50'
}
const initionaltion = {
    patientId: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    disease: '',
    admitDate: '',
    picture: null,
    errors: {}
}


function Updatepatientmenu() {
    const { id } = useParams();
    const reduser = (state, action) => {
        switch (action.type) {
            case "UPDATE":
                return {
                    ...state, [action.payload.field]: action.payload.value
                }

            case "ERROR":
                return {
                    ...state, errors: {
                        ...state.errors,
                        [action.field]: action.error
                    }
                }

            case "SET_ERRORS":
                return {
                    ...state, errors: action.payload
                }

            case "RESET":
                return initionaltion;

            default:
                return state;
        }
    }



    const [state, disptch] = useReducer(reduser, initionaltion);


    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/HospitalManagementSystem/GetDatabyid?id=${id}`)
                .then(res => {
                    const patient = res.data;
                    console.log(patient);

                    disptch({ type: "UPDATE", payload: { field: "patientId", value: patient.patientId } });
                    disptch({ type: "UPDATE", payload: { field: "firstName", value: patient.firstName } });
                    disptch({ type: "UPDATE", payload: { field: "lastName", value: patient.lastName } });
                    disptch({ type: "UPDATE", payload: { field: "age", value: patient.age } });
                    disptch({ type: "UPDATE", payload: { field: "gender", value: patient.gender } });
                    disptch({ type: "UPDATE", payload: { field: "phone", value: patient.phone } });
                    disptch({ type: "UPDATE", payload: { field: "address", value: patient.address } });
                    disptch({ type: "UPDATE", payload: { field: "disease", value: patient.disease } });
                    disptch({ type: "UPDATE", payload: { field: "admitDate", value: patient.admitDate } });
                    disptch({ type: "UPDATE", payload: { field: "picture", value: patient.picture } });
                })
                .catch(err => console.log(err));
        }
    }, [id]);

    console.log("Satate :- ", state);
    const handleSubmit = async (e) => {

        e.preventDefault();
        // const [loading,setLoading] = useState(false);

        const formData = new FormData();

        const currentDateTime = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        for (const key in state) {

            if (key === "errors" || key === "admitDate") {
                continue;
            }

            if (key === "picture") {

                if (state.picture instanceof File) {

                    formData.append("picture", state.picture);
                }

                continue;
            }
            formData.append(key, state[key]);
        }
        for (let pair of formData.entries()) {

            console.log("form data goes to backend :-",pair[0], pair[1]);
        }

        formData.append("admitDate", currentDateTime);

        try {
            const res = await axios.post(
                "http://localhost:8080/HospitalManagementSystem/updatepatientdata",
                formData
            );
            console.log(res.data);
            if (res.data.Success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Patient Updated',
                    text: res.data.Message,
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: res.data.Message,
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                })
            }
        }
        catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    const fields = [
        {
            label: "First Name",
            name: "firstName",
            type: "text",
            placeholder: "Enter First Name..."
        },
        {
            label: "Last Name",
            name: "lastName",
            type: "text",
            placeholder: "Enter Last Name..."
        },
        {
            label: "Age",
            name: "age",
            type: "text",
            placeholder: "Enter Age..."
        },
        {
            label: "Gender",
            name: "gender",
            type: "select",
            option: ["Male", "Female", "Other"]
        },
        {
            label: "Phone",
            name: "phone",
            type: "text",
            placeholder: "Enter Phone Number..."
        },

        {
            label: "Disease/Condition",
            name: "disease",
            type: "text",
            placeholder: "Enter Disease..."
        },
        {
            label: "Admit Date",
            name: "admitDate",
            type: "text",
            placeholder: "Enter Date..."
        },
        {
            label: "Choose Picture",
            name: "picture",
            type: "file",
            placeholder: "Upload Picture..."
        },
        {
            label: "Address",
            name: "address",
            type: "textarea",
            placeholder: "Enter Full Address..."
        }
    ]
    const handleinput = (e) => {
        const { name, value } = e.target;
        if (name === "picture") {

            console.log(e.target.type);

            if (!e.target.files[0]) return;
            disptch({
                type: "UPDATE",
                payload: {
                    field: name,
                    value: e.target.files[0]
                }
            });
            return;
        }

        const regex = validation[name];

        if (!value.trim()) {
            disptch({
                type: "ERROR",
                field: name,
                error: `${name} is required`
            });

        }
        else if (regex && !regex.test(value)) {
            disptch({
                type: "ERROR",
                field: name,
                error: `Invalid ${name}`
            });
            setTimeout(() => {
                disptch({
                    type: "ERROR",
                    field: name,
                    error: ""
                });
            }, 1500);
            return;
        }
        else {
            disptch({
                type: "ERROR",
                field: name,
                error: ""
            });
        }


        disptch({
            type: "UPDATE",
            payload: {
                field: name,
                value: value
            }
        });
    }
    const validation = {
        firstName: /^[A-Za-z ]+$/,
        lastName: /^[A-Za-z ]+$/,
        age: /^\d{1,3}$/,
        phone: /^\d{10}$/,
        disease: /^[A-Za-z ]+$/,
        address: /^[A-Za-z0-9\s,.-]+$/,
        admitDate: /^\d{4}-\d{2}-\d{2}$/
    }
    const haserror = Object.values(state.errors).some((err) => err);
    console.log("Has Error :- ", haserror);

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.hero}>
                    <div>
                        <h1 className={styles.heroTitle}>Update Patient Record</h1>
                        <p className={styles.heroText}>Modify patient information securely and efficiently. All changes are tracked for audit purposes.</p>
                        <span className={styles.badge}>Patient ID: {id}</span>
                    </div>

                    <div className='w-[17%] h-[full] border-2'>
                        <img src={
                            state.picture instanceof File
                                ? URL.createObjectURL(state.picture)
                                : `http://localhost:8080/HospitalManagementSystem/${state.picture}`
                        } className='w-full h-full object-cover' />
                    </div>

                </div>


                <div className={styles.formCard}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>

                            {fields.map((f) => (
                                <div className={f.type === "textarea" ? "md:col-span-2" : styles.fieldGroup} key={f.name}>
                                    <label htmlFor={f.label} className={styles.label}>{f.label}</label>
                                    {
                                        f.type === "textarea" ?
                                            <textarea className=
                                                {styles.textarea} name={f.name} placeholder={f.placeholder} value={state[f.name]} onChange={handleinput} /> :
                                            f.type === "select" ? <select name={f.name} className={styles.input} value={state[f.name]} onChange={handleinput}>
                                                <option value="">Select {f.label}</option>
                                                {f.option.map((opt) => (<option value={opt} key={opt}>{opt}</option>
                                                ))}</select> :
                                                <input className={styles.input} type={f.type} name={f.name} placeholder={f.placeholder} value={f.type !== "file" ? state[f.name] : undefined} disabled={f.name === "admitDate" ? true : false} onChange={handleinput} />
                                    }
                                    {state.errors[f.name] && <span className={`text-red-500 text-sm transition-all duration-500 overflow-hidden ${state.errors[f.name]}`}>{state.errors[f.name]}</span>}

                                </div>
                            ))}
                        </div>

                        <div className={styles.buttonGroup}>
                            <button type="button" onClick={() => { disptch({ type: "RESET" }) }} className={styles.clearBtn}>
                                Clear Form
                            </button>
                            <button type="submit" className={haserror ? `${styles.updateBtn} ${styles.disabled}` : styles.updateBtn} disabled={haserror} >
                                Update Patient
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Updatepatientmenu
