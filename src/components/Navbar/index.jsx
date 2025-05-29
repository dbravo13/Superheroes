export default function Navbar({
  nameFilter,
  setNameFilter,
  size,
  setSize,
  page,
  setPage,
  lastPage,
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-sky-950 text-sky-100 shadow-md px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1
          className="text-2xl sm:text-3xl font-bold  bg-mi-azul"
          style={{ color: "#0dacc4" }}
        >
          Superhéroes
        </h1>

        <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-end">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring focus:ring-indigo-300 text-white"
            value={nameFilter}
            onChange={(e) => {
              setPage(1);
              setNameFilter(e.target.value);
            }}
          />
          <select
            value={size}
            onChange={(e) => {
              setPage(1);
              setSize(Number(e.target.value));
            }}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="bg-sky-400 text-white px-3 py-1 rounded hover:bg-sky-500 disabled:bg-gray-300 text-sm"
            >
              ←
            </button>
            <span className="text-sm font-medium">
              Página {page} de {lastPage}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
              disabled={page >= lastPage}
              className="bg-sky-400 text-white px-3 py-1 rounded hover:bg-sky-500 disabled:bg-gray-300 text-sm"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
