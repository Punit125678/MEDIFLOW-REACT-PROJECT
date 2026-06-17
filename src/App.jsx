import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import Patientp from './patients/Patientpanel.jsx';
import Appoinmentp from './appointments/Appoinmentpanel.jsx';
import DashboardPanel from "./dashbord/dashbordpanel.jsx";
import Doctorpanel from "./doctor/doctorpanel.jsx";
// import AddAppointment from "./appointments/AddAppointment";
import DoctorLogine from './login/DoctorLogine.jsx'
import AddAppointment from "./appointments/AddAppoinment";
// import main_page from "./mediflow_main/main_page.jsx";
import MainPage from "./mediflow_main/main_page.jsx";
import Adminlogin from "./admin/Adminlogin";
import UpdatePatient from "./patients/UpdatePatient.jsx";
import AddPatient from "./patients/AddPatient.jsx";
import Updatepatientmenu from "./patients/Updatepatientmenu.jsx";
import View_patient from "./patients/View-patient.jsx";
import PatientDetails from "./patients/PatientDetails.jsx";
import Delete_Patient from "./patients/Delete_Patient.jsx";

function DoctorProtectedRoute({ children }) {
  const isDoctorLoggedIn = sessionStorage.getItem("doctorLoggedIn") === "true";

  if (!isDoctorLoggedIn) {
    return <Navigate to="/doctor-login" replace />;
  }

  return children;
}

function App() {
  const navItemClass = ({ isActive }) =>
    [
      "block rounded-xl px-4 py-3 font-medium transition duration-200",
      "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98]",
      isActive
        ? "bg-slate-800 text-amber-300 shadow-sm ring-1 ring-slate-700"
        : "border border-slate-700 text-slate-300 hover:bg-slate-800/70 hover:text-white",
    ].join(" ");
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/doctor-login" ||
    location.pathname === "/admin-login";
  const isDoctorPage = location.pathname === "/doctorpanel";
  // const showAdminSidebar = !isLoginPage && !isDoctorPage;


  const hideSidebarPaths = [
    "/",
    "/doctor-login",
    "/admin-login",
    "/doctorpanel"
  ];

  const showAdminSidebar = !hideSidebarPaths.includes(location.pathname);



  return (
    <div
      className={`text-slate-900 ${isLoginPage || isDoctorPage
        ? "min-h-screen bg-slate-950"
        : "flex h-screen overflow-hidden border-2 border-black bg-slate-100"
        }`}
    >

      {/* Sidebar sirf login pe hide hoga */}
      {showAdminSidebar && (
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-900 p-6 text-white lg:flex lg:flex-col">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            MediFlow
          </p>

          <div className="mt-10 space-y-3 text-sm">
            <NavLink to="/patients" className={navItemClass}>Patients</NavLink>
            <NavLink to="/appointments" className={navItemClass}>Appointments</NavLink>
            <NavLink to="/dashbordpanel" className={navItemClass}>Dashboard</NavLink>
            <NavLink to="/doctorpanel" className={navItemClass}>Doctor</NavLink>
          </div>
        </aside>
      )}

      <div
        className={
          isLoginPage || isDoctorPage
            ? "min-h-screen"
            : "flex min-w-0 flex-1 overflow-hidden p-4 lg:p-6"
        }
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/doctor-login" element={<DoctorLogine />} />
          <Route path="/admin-login" element={<Adminlogin />} />
          <Route
            path="/doctorpanel"
            element={
              <DoctorProtectedRoute>
                <Doctorpanel />
              </DoctorProtectedRoute>
            }
          />
          {/* <Route path="/" element={<DashboardPanel />} /> */}
          <Route path="/patients" element={<Patientp />} />
          <Route path="/appointments" element={<Appoinmentp />} />
          <Route path="/dashbordpanel" element={<DashboardPanel />} />
          {/* <Route path="/doctorpanel" element={<Doctorpanel />} /> */}
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/update-patient" element={<UpdatePatient />} />
          <Route path="/Updatepatientmenu/:id" element={<Updatepatientmenu />} />
          <Route path="/addappoinment" element={<AddAppointment />} />
          <Route path="/patientdetails/:id"  element={<PatientDetails/>}/>
          <Route path="/view-patient" element={<View_patient/>} />
          <Route path="/delete-patient" element={<Delete_Patient/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
