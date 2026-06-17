function AllAppoinment({ appoinment, loading }) {
    const getAppointmentKey = (appointment, index) => {
        const stableParts = [
            appointment.id,
            appointment.name,
            appointment.doctor,
            appointment.date,
            appointment.status,
        ].filter(Boolean);

        return stableParts.length > 0
            ? `${stableParts.join("-")}-${index}`
            : `appointment-row-${index}`;
    };



    return (
        <main className="mt-3 h-full overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
            <div className="h-full overflow-auto">
                <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-sky-100 text-slate-900">
                            <th className="border-b border-slate-200 px-4 py-3 font-semibold">ID</th>
                            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Patient</th>
                            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Doctor</th>
                            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Date</th>
                            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            loading ? (
                                [...Array(10)].map((_, i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                appoinment.map((a, index) => (
                                    <tr
                                        key={getAppointmentKey(a, index)}
                                        className="odd:bg-white even:bg-slate-50"
                                    >
                                        <td className="border-b border-slate-100 px-4 py-3">{a.id}</td>
                                        <td className="border-b border-slate-100 px-4 py-3">{a.name}</td>
                                        <td className="border-b border-slate-100 px-4 py-3">{a.doctor}</td>
                                        <td className="border-b border-slate-100 px-4 py-3">{a.date}</td>
                                        <td className="border-b border-slate-100 px-4 py-3">{a.status}</td>
                                    </tr>)
                                ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default AllAppoinment;
