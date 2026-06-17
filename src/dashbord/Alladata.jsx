import { useEffect, useState } from "react";

function Alldata() {

    const [count, setCount] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/HospitalManagementSystem/countdata")
            .then(res => res.json())
            .then(data => setCount(data))
            .catch(err => console.log(err));
    }, []); 

    return (
        <main className="shrink-0 flex w-full items-center justify-around gap-4 overflow-hidden rounded-2xl">

            <div className="h-32 w-113 rounded-2xl border bg-white shadow-md flex items-center justify-center flex-col text-2xl font-bold">
                <h3 className="text-cyan-900">{count.GetPatientCount || 0}</h3>
                <h4>Total Patients</h4>
            </div>

            <div className="h-32 w-113 rounded-2xl border bg-white shadow-md flex items-center justify-center flex-col text-2xl font-bold">
                <h3 className="text-cyan-900">{count.GetdoctorCount || 0}</h3>
                <h4>Total Doctors</h4>
            </div>

            <div className="h-32 w-113 rounded-2xl border bg-white shadow-md flex items-center justify-center flex-col text-2xl font-bold">
                <h3 className="text-cyan-900">{count.GetAppoinmentCount || 0}</h3>
                <h4>Total Appointments</h4>
            </div>

        </main>
    );
}

export default Alldata;