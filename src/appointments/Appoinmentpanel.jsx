import { useEffect, useState } from "react";
import Header from "../components/header";
import AllAppoinment from "./AllAppoinmet";
import AppSearch from "./Appoinmentserch";

function Appoinmentp() {
    const [appoinment, setAppoinment] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8080/HospitalManagementSystem/GetAppoinment")
            .then((res) => res.json())
            .then((data) => {setAppoinment(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <main className="flex flex-1 flex-col overflow-hidden p-4 sm:p-6">
            <Header name="WelCome To All Appoinments" data="All Appoinmeents" />
            <AppSearch setAppoinment={setAppoinment} setLoading={setLoading}/>
            <AllAppoinment appoinment={appoinment} loading={loading}/>
        </main>
    );
}

export default Appoinmentp;
