import { useNavigate } from "react-router-dom";

const actions = [
  { title: "Add Patient", icon: "➕", path: "/add-patient" },
  { title: "Update Patient", icon: "✏️", path: "/update-patient" },
  { title: "Delete Patient", icon: "🗑️", path: "/delete-patient" },
  { title: "View Patient", icon: "👁️", path: "/view-patient" },
];

export default function PatientsFunction() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">

      {actions.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.path)} 
          className="
            cursor-pointer rounded-2xl p-5 bg-white shadow-md
            hover:scale-105 hover:shadow-xl transition-all duration-300
          "
        >
          <div className="text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <h4 className="font-semibold">{item.title}</h4>
          </div>
        </div>
      ))}

    </div>
  );
}