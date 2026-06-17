import Header from "../components/header";
import Alldata from "./Alladata";
import AllData from "./AllListdata";

function DashboardPanel() {
    return (
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden p-4 sm:p-4">
            <Header name="Welcome To Dashbord" data="Hospital Management System" />
            <Alldata />
            <AllData />
        </main>
    );
}
export default DashboardPanel;
