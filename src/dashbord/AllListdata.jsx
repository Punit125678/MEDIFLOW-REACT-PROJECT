import { useEffect, useRef, useState } from "react";

function AllData() {

    const [data, setData] = useState([]);
    const [count, setCount] = useState(1);

    const containerRef = useRef(null);

    // API CALL
    useEffect(() => {

        const url =
            `http://localhost:8080/HospitalManagementSystem/LatestPatient?page=${count}`;

        fetch(url)
            .then(res => res.json())
            .then(newData => {

                // purana + naya data merge
                setData(prev => [...prev, ...newData]);

            })
            .catch(err => console.log(err));

    }, [count]);



    // SCROLL EVENT
    useEffect(() => {

        const handleScroll = () => {

            const container = containerRef.current;

            if (!container) return;

            const scrollTop = container.scrollTop;
            console.log("Scrool Top" + scrollTop);

            const clientHeight = container.clientHeight;
            console.log("Clilent Heghit" + clientHeight);

            const scrollHeight = container.scrollHeight;
            console.log("Scroll heghet" + scrollHeight);

            // bottom detect
            if (
                scrollTop + clientHeight >= scrollHeight - 10
            ) {

                setCount(prev => prev + 1);
            }
        };

        const container = containerRef.current;

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };

    }, []);




    return (

        <main
            ref={containerRef}
            className="mt-5 w-full flex-1 min-h-0 overflow-auto rounded-2xl border-2 bg-white h-[500px]"
        >

            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-4 shadow-sm">

                <h2 className="text-center text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                    Latest Patient Entry
                </h2>
            </div>

            <table className="w-full border-collapse border border-gray-300 text-left">

                <thead className="sticky top-[93px] overflow-hidden bg-gray-200">

                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Age</th>
                        <th className="border px-4 py-2">Gender</th>
                        <th className="border  px-4 py-2">Disease</th>
                        <th className="border px-4 py-2">Admit Date</th>
                    </tr>

                </thead>

                <tbody>

                    {data.map((d, index) => (

                        <tr key={index}>
                            <td className="border px-4 py-2">
                                {d.firstName} {d.lastname}
                            </td>

                            <td className="border px-4 py-2">
                                {d.age}
                            </td>

                            <td className="border px-4 py-2">
                                {d.gender}
                            </td>

                            <td className="border px-4 py-2">
                                {d.disease}
                            </td>

                            <td className="border px-4 py-2">
                                {d.admitDate}
                            </td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </main>
    );
}

export default AllData;