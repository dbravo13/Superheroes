function HeroCard({ hero, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden border border-sky-800 rounded-2xl p-4 shadow-md bg-gradient-to-b from-sky-900 to-sky-950 w-full max-w-xs transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={hero.images?.md || "https://via.placeholder.com/150"}
          alt={hero.name}
          className="w-full h-60 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h2 className="text-2xl font-semibold mt-4 text-white">{hero.name}</h2>
      <div className="mt-2 space-y-1 text-sky-200 text-sm">
        <p>Altura: {hero.appearance?.height?.[1]}</p>
        <p>Peso: {hero.appearance?.weight?.[1]}</p>
        <p>Género: {hero.appearance?.gender}</p>
      </div>
    </div>
  );
}

export default HeroCard;
