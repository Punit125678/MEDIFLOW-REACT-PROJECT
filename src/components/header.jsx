
function Header(props) {
    return (
            <header className="shrink-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{props.name}</p>
                <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">{props.data}</h2>
            </header>
    );
}
export default Header;
