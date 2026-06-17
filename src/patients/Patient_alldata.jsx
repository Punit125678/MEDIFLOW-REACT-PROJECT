import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function PatientAllData() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/HospitalManagementSystem/AllPatientData")
            .then(res => res.json())
            .then(data => setPatients(data))
            .catch(err => console.log(err));
    }, []);


    return (
        <div className="flex h-full min-h-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="grid grid-cols-4 gap-4 mb-4">

                <div className="bg-white p-4 rounded-xl shadow">
                    <p>Total Patients</p>
                    <h2 className="text-xl font-bold">{patients.length}</h2>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p>Active Patients</p>
                    <h2 className="text-xl font-bold text-green-500">80</h2>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p>Pending</p>
                    <h2 className="text-xl font-bold text-yellow-500">20</h2>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p>Cancelled</p>
                    <h2 className="text-xl font-bold text-red-500">10</h2>
                </div>

            </div>

            <div className="min-h-0 flex-1 overflow-hidden">
                <div className="h-full overflow-auto">
                    <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                        <thead className="sticky top-0 z-10 bg-amber-200">
                            <tr>
                                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Name</th>
                                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Age</th>
                                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Gender</th>
                                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Address</th>
                                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Disease</th>
                                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Doctor</th>
                                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Appointment</th>
                                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p, index) => (
                                // console.log(p,index);
                                <tr key={index} className="odd:bg-white even:bg-slate-50">

                                    <td className="border-b border-slate-100 px-4 py-3 font-medium text-slate-900">
                                        {p.firstName} {p.lastName}
                                    </td>
                                    <td className="border-b border-slate-100 px-4 py-3">{p.age}</td>
                                    <td className="border-b border-slate-100 px-4 py-3">{p.gender}</td>
                                    <td className="border-b border-slate-100 px-4 py-3">{p.address}</td>
                                    <td className="border-b border-slate-100 px-4 py-3">{p.disease}</td>
                                    <td className="border-b border-slate-100 px-4 py-3">{p.doctorName}</td>
                                    <td className="border-b border-slate-100 px-4 py-3">{p.appointmentDate}</td>
                                    <td className="border-b border-slate-100 px-4 py-3">{p.status}</td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default PatientAllData;
