import { Dialog, Transition, Tab } from "@headlessui/react";
import { Fragment } from "react";

const statsColors = {
  combat: "bg-red-500",
  durability: "bg-yellow-500",
  intelligence: "bg-green-500",
  power: "bg-purple-500",
  speed: "bg-blue-500",
  strength: "bg-pink-500",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeroModal({ hero, isOpen, onClose }) {
  if (!hero) return null;

  const tabs = [
    {
      name: "Biografía",
      content: (
        <>
          <p>
            <strong>Nombre completo:</strong>{" "}
            {hero.name || hero.biography?.fullName || "No disponible"}
          </p>
          <p>
            <strong>Publisher:</strong> {hero.biography?.publisher}
          </p>
          <p>
            <strong>Primera aparición:</strong>{" "}
            {hero.biography?.firstAppearance}
          </p>
          <p>
            <strong>Alias:</strong>{" "}
            {hero.biography?.aliases.join(", ") || "No disponible"}
          </p>
          <p>
            <strong>Aligment:</strong> {hero.biography?.alignment}
          </p>
          <p>
            <strong>Trabajo:</strong>{" "}
            {hero.work.base || hero.occupation || "No disponible"}
          </p>
        </>
      ),
    },
    {
      name: "Apariencia",
      content: (
        <>
          <p>
            <strong>Género:</strong> {hero.appearance?.gender}
          </p>
          <p>
            <strong>Altura:</strong> {hero.appearance?.height.join(" / ")}
          </p>
          <p>
            <strong>Peso:</strong> {hero.appearance?.weight.join(" / ")}
          </p>
          <p>
            <strong>Color de ojos:</strong> {hero.appearance?.eyeColor}
          </p>
          <p>
            <strong>Color de cabello:</strong> {hero.appearance?.hairColor}
          </p>
        </>
      ),
    },
    {
      name: "Estadísticas",
      content: (
        <div className="space-y-3">
          {Object.entries(hero.powerstats).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span className="capitalize font-semibold">{key}</span>
                <span>{value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={classNames(
                    statsColors[key] || "bg-gray-500",
                    "h-3 rounded-full"
                  )}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto bg-white/10 backdrop-blur-sm flex items-center justify-center p-4"
        onClose={onClose}
      >
        <Dialog.Panel className="bg-gradient-to-b from-sky-900 to-sky-950 rounded-3xl max-w-4xl w-full p-6 shadow-2xl overflow-auto max-h-[90vh]">
          <Dialog.Title className="text-4xl font-extrabold mb-6 text-center">
            {hero.name}
          </Dialog.Title>

          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={hero.images?.lg}
              alt={hero.name}
              className="w-full md:w-1/3 rounded-xl object-cover shadow-lg"
            />

            <div className="flex-1">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-sky-400 p-1 mb-6">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      className={({ selected }) =>
                        classNames(
                          "w-full py-2 text-sm font-medium leading-5 rounded-lg",
                          selected
                            ? "bg-white shadow text-sky-600"
                            : "text-gray-600 hover:bg-white/[0.12] hover:text-sky-600"
                        )
                      }
                    >
                      {tab.name}
                    </Tab>
                  ))}
                </Tab.List>

                <Tab.Panels>
                  {tabs.map((tab) => (
                    <Tab.Panel
                      key={tab.name}
                      className="text-white text-base space-y-3"
                    >
                      {tab.content}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="inline-block px-8 py-3 bg-sky-600 text-white rounded-full font-semibold hover:bg-sky-700 transition"
            >
              Cerrar
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}
