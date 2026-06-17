import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


function DoctorLogine() {
  const navigate = useNavigate();
  const styles = {
    page: "min-h-screen w-full bg-gradient-to-br from-sky-100 via-white to-blue-100 px-4 py-10",
    container:
      "mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center",
    card: "w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-2xl backdrop-blur",
    title: "text-3xl font-bold text-slate-800",
    subtitle: "mt-2 text-sm text-slate-500",
    form: "mt-8 space-y-5",
    fieldGroup: "",
    label: "mb-2 block text-sm font-medium text-slate-700",
    input:
      "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
    button:
      "w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]",
    link: "mt-5 inline-block text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline",
  };

  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data);
    const data = {
      email: email,
      password: pass
    }

    axios.post("http://localhost:8080/HospitalManagementSystem/doctorLogin",data,{
      headers: {
      "Content-Type": "application/json"
    }
    })
      .then(res => {
        console.log("success data ", res.data);
        if(res.data.status === "success")
        {
          sessionStorage.setItem("doctorLoggedIn", "true");
          sessionStorage.setItem("DoctorId",res.data.doctorId);
          
          navigate("/doctorpanel",{
            state: res.data
          });
        }

      })
      .catch(err => console.log(err));

      
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.card}>
          <h1 className={styles.title}>Doctor Login</h1>
          <p className={styles.subtitle}>
            Sign in to access your MediFlow dashboard
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label
                htmlFor="email"
                className={styles.label}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="doctor@hospital.com"
                className={styles.input}
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label
                htmlFor="password"
                className={styles.label}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className={styles.input}
                value={pass}
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </div>

            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>

          <a href="#" className={styles.link}>
            Forgot password?
          </a>
        </section>
      </div>
    </main>
  );
}

export default DoctorLogine;
