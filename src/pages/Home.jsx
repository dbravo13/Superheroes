import { useEffect, useState } from "react";
import Lottie from "lottie-react";

import "../styles/home.css";

import { fetchHeroesService, fetchHeroDetails } from "../services/heroService";

import HeroCard from "../components/HeroCard";
import HeroModal from "../components/HeroModal";
import Navbar from "../components/Navbar";

import loadingAnimation from "../assets/loading.json";

function Home() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedHeroId, setSelectedHeroId] = useState(null);
  const [selectedHeroDetails, setSelectedHeroDetails] = useState(null);

  const [size, setSize] = useState(20);
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");

  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchHeroesService({ size, page })
      .then((data) => {
        setHeroes(data.items || []);
        setLastPage(data.lastPage || 1);
      })
      .catch((err) => {
        console.error("Error al obtener héroes:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [size, page]);

  useEffect(() => {
    if (!selectedHeroId) return;

    const fetchDetails = async () => {
      try {
        const data = await fetchHeroDetails(selectedHeroId);
        setSelectedHeroDetails(data);
      } catch (error) {
        console.error("Error al obtener detalles del héroe:", error);
      }
    };

    fetchDetails();
  }, [selectedHeroId]);

  return (
    <div className="min-h-screen  pt-24 px-4 sm:px-8 bg-sky-900">
      <header className="fixed top-0 left-0 right-0 z-10 bg-sky-950 text-sky-100 shadow-md px-4 sm:px-8 py-4">
        <div>
          <Navbar
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            size={size}
            setSize={setSize}
            page={page}
            setPage={setPage}
            lastPage={lastPage}
          />
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="w-96 h-96">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 place-items-center">
          {heroes.length > 0 ? (
            heroes
              .filter((hero) =>
                hero.name.toLowerCase().includes(nameFilter.toLowerCase())
              )
              .map((hero) => (
                <HeroCard
                  key={hero.id}
                  hero={hero}
                  onClick={() => setSelectedHeroId(hero.id)}
                />
              ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No se encontraron héroes.
            </p>
          )}
        </div>
      )}
      <HeroModal
        hero={selectedHeroDetails}
        isOpen={!!selectedHeroDetails}
        onClose={() => {
          setSelectedHeroId(null);
          setSelectedHeroDetails(null);
        }}
      />
    </div>
  );
}

export default Home;
