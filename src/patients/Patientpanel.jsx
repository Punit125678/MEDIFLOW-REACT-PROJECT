import Header from "../components/header.jsx";
import PatientAllData from "./Patient_alldata.jsx";
import PatientsFunction from "./PatientsFunction.jsx";

function Patientp()
    {
        return(
          <div className="flex  flex-1 flex-col overflow-hidden p-4 sm:p-6">
              <Header name="Welcome To Panel" data="All Patients"/>
              <PatientsFunction/>
            <PatientAllData/>
          </div>
        );
    }
    export default Patientp;
