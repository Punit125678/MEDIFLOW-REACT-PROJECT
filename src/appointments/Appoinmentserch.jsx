import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AppSearch({ setAppoinment, setLoading }) {
    const navigate = useNavigate();
    // const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);

    const controllerRef = useRef(null);
    const timeout = useRef(null);

    function handleSearch(name) {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        setLoading(true);

        timeout.current = setTimeout(() => {
            searchByName(name);
        }, 500);
    }



    function filterStatus(status) {

        let url = "http://localhost:8080/HospitalManagementSystem/GetAppoinment";


        if (status !== "") {
            url += "?status=" + status;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => setAppoinment(data))
            .catch((err) => console.log(err));
    }

    async function searchByName(name) {
        let url = "http://localhost:8080/HospitalManagementSystem/Searchbyname";

        if (name !== "") {
            url += "?name=" + name;
        }
        else if (name === "") {
            url = "http://localhost:8080/HospitalManagementSystem/GetAppoinment";
        }
        try {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }

            const control = new AbortController();
            controllerRef.current = control;

            setLoading(true);
            setError(false);
            const res = await axios.get(url, {
                signal: control.signal
            });

            setAppoinment(res.data);
            setLoading(false);
        }
        catch (err) {
            if (err.name === "CanceledError") return;
            setError(true);
            setLoading(false);
        }


    }

    return (
        <main className="flex flex-wrap items-center gap-4 overflow-hidden p-4 sm:p-6 border-2 border-slate-300 bg-white shadow-sm rounded-2xl">
            <div
                onClick={() => navigate("/addappoinment")}
                className="inline-flex h-12 w-fit items-center justify-center rounded-xl bg-slate-700 px-6 text-xl font-semibold text-white shadow-sm
            hover:bg-slate-900 transition cursor-pointer ">
                Add Appointment

            </div>
            <div className="h-12">
                <input
                    type="text"
                    placeholder="Search By Name..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="h-full w-80 rounded-2xl border border-slate-700 bg-white px-5 text-base text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300"
                />
                {/* {loading&&<h3>Loding....</h3>} */}
                {error && <h3>Can't We Load Data</h3>}
            </div>
            <div className="h-12 ">
                <select onChange={(e) => filterStatus(e.target.value)} name="" className="h-full rounded-2xl border border-slate-700 bg-slate-900 px-2 text-base text-white" id="">
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
        </main>
    );
}
export default AppSearch;
