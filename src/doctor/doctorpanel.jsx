import Header from "../components/header";
import Connform from "./Appoinment";
import Doctoroptions from "./doctoroptions";
function Doctorpanel() {
    return (
        <main className="min-h-screen w-full bg-slate-100 px-2 py-4">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4">
                <Header name="Welcome Back" data="Doctor Dashboard" />
                <Doctoroptions />
                <Connform />
            </div>
        </main>
    );
}

export default Doctorpanel;
