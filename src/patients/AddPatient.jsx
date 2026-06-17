import React, { useEffect, useReducer } from "react";
import axios from "axios";
const styles = {
  page:
    "flex h-full min-h-0 w-full overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_left,#ccfbf1_0,#f8fafc_36%,#e2e8f0_100%)] p-3 sm:p-4 lg:p-5",
  shell:
    "mx-auto grid h-full min-h-0 w-full max-w-6xl gap-4 lg:grid-cols-[0.75fr_1.25fr]",
  hero:
    "relative hidden min-h-0 overflow-hidden rounded-3xl bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300 lg:block",
  formCard:
    "flex min-h-0 flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-4 shadow-2xl shadow-slate-200 backdrop-blur sm:p-5",
  sectionTitle:
    "text-xs font-bold uppercase tracking-[0.24em] text-teal-700",
  inputGroup: "flex flex-col gap-2",
  label: "text-sm font-semibold text-slate-700",
  input:
    "h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100",
  textarea:
    "min-h-28 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100",
  fieldGrid: "grid gap-4 md:grid-cols-2",
  sumbitbtn: "h-11 rounded-2xl bg-teal-600 px-8 font-bold text-white shadow-lg shadow-teal-200 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl active:translate-y-0",
  resetbtn: "h-11 rounded-2xl border border-slate-200 px-6 font-bold text-slate-600 transition duration-200 hover:border-slate-300 hover:bg-slate-50"
};
const initialState = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  phone: "",
  disease: "",
  address: "",
  errors: {}
}


function Reducer(state, action) {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state, [action.payload.field]: action.payload.value
      };

    case "SET_ERRORS":
      return {
        ...state, errors: {
          ...state.errors,
          [action.field]: action.error
        }
      }
    case "RESET":
      return initialState;
    default:
      return state;

  }
}

function AddPatient() {
  const [state, dispatch] = useReducer(Reducer, initialState);


  const handlesumbit = (e) => {
    const { name, value } = e.target;
    console.log("name:-", name, value);

    let cleanvalue = value;
    let regex = validationRules[name];
    let Error = "";
    if (regex) {
      console.log("Regex :- ", regex);

      cleanvalue = value.replace(regex, "");
    }
    if (name === "phone") {

      cleanvalue = cleanvalue.slice(0, 10);

      if (cleanvalue.length < 10) {

        Error = "Phone number must be 10 digits";
      }
    }
    if (name === "age") {
      cleanvalue = cleanvalue.slice(0, 3);
      cleanvalue = cleanvalue > 120 ? "120" : cleanvalue;
      if (Number(cleanvalue) > 120) {

        Error = "Age cannot be greater than 120";

        cleanvalue = "120";
      }
    }
    if (!cleanvalue) {

      Error = `Please Enter ${name}`;

      dispatch({
        type: "SET_ERRORS",
        field: name,
        error: Error
      });
    }
    else if (cleanvalue !== value) {

      Error = `Invalid Character In ${name}`;

      dispatch({
        type: "SET_ERRORS",
        field: name,
        error: Error
      });

      setTimeout(() => {

        dispatch({
          type: "SET_ERRORS",
          field: name,
          error: ""
        });

      }, 1500);
    }
    else {

      dispatch({
        type: "SET_ERRORS",
        field: name,
        error: ""
      });
    }
    dispatch({ type: "INPUT_CHANGE", payload: { field: name, value: cleanvalue } })
  }

  const isFormValid = state.firstName && state.lastName && state.age && state.gender && state.phone && state.disease && state.address;

  const fields = [
    {
      label: "First Name",
      name: "firstName",
      type: "text"
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text"
    },
    {
      label: "Age",
      name: "age",
      type: "text"
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other"]
    },
    {
      label: "Phone",
      name: "phone",
      type: "text"
    },
    {
      label: "Disease",
      name: "disease",
      type: "text"
    },
    {
      label: "Address",
      name: "address",
      type: "text"
    }
  ];

  const validationRules = {

    firstName: /[^A-Za-z ]/g,
    lastName: /[^A-Za-z ]/g,
    phone: /[^0-9 ]/g,
    age: /[^0-9 ]/g,
    address: /[^A-Za-z0-9 ]/g,
    gender: null,
    phone: /[^0-9 ]/g,
    disease: /[^A-Za-z0-9 ]/g

  }





const datasubmit = async (e)=>{
  e.preventDefault();
  const { errors, ...patientsData } = state;
  console.log("Patients Dataa:---",patientsData);
  
  if(!isFormValid)return;

  try{
    const token = "Razz123";
    const res = await axios.post("http://localhost:8080/HospitalManagementSystem/AddPatient",patientsData,{
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      }
    });
    console.log(res.data);
    
  }
  catch (error) {
    console.error("Error submitting form:", error);
  }

}

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.hero}>
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-teal-400/30 blur-2xl" />
          <div className="absolute -bottom-20 left-8 h-52 w-52 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative z-10 flex h-full min-h-0 flex-col justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
                MediFlow HMS
              </p>
              <h1 className="mt-5 max-w-sm text-4xl font-black leading-tight text-white xl:text-5xl">
                Add a new patient profile
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
                Capture core patient details clearly so the care team can find,
                review, and update records without friction.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold text-teal-200">01</p>
                <p className="mt-1">Identity</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold text-teal-200">02</p>
                <p className="mt-1">Contact</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold text-teal-200">03</p>
                <p className="mt-1">Condition</p>
              </div>
            </div>
          </div>
        </aside>

        <section className={styles.formCard}>
          <div className="mb-4 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={styles.sectionTitle}>Patient registration</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                Submit Patient Details
              </h2>
            </div>
            <div className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 ring-1 ring-teal-100">
              New Record
            </div>
          </div>

          <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={datasubmit}
          >
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <div className={styles.fieldGrid}>
                {fields.map((f) => (
                  <div
                    className={`${styles.inputGroup} ${f.name === "address" ? "md:col-span-2" : ""}`}
                    key={f.name}
                  >
                    <label htmlFor={f.name} className={styles.label}>{f.label}</label>
                    {f.type === "select" ? (<select id={f.name} name={f.name} className={styles.input} onChange={handlesumbit} value={state[f.name]}>
                      <option value="">Select Gender</option>
                      {f.options.map((otp, index) => (
                        <option key={index} value={otp}>{otp}</option>
                      ))}</select>) : (<input type={f.type} value={state[f.name]} name={f.name} className={styles.input} onChange={handlesumbit} />)

                    }
                    {<p className={`text-sm text-red-500 transition-all duration-500 ${state.errors[f.name] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 h-0'}`}>{state.errors[f.name]}</p>}

                  </div>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
              <button type="reset" className={styles.resetbtn} onClick={() => { dispatch({ type: "RESET" }) }}> Clear </button>
              <button type="submit" className={` ${styles.sumbitbtn} ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""} `} disabled={!isFormValid}>Submit Patient </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default AddPatient;
