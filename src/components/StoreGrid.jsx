import React from "react";
import { useBasket } from "../context/BasketContext";
import img337 from "../assets/categorias/rostro/limpiadores/337-100ml-600x600.png";

const products = [
  {
    id: "84",
    name: "Capturador Micelar",
    sizes: [
      { size: "50 ml",  price: "16.95€" },
      { size: "100 ml", price: "28.95€" },
      { size: "200 ml", price: "49.95€" },
    ],
    image: img337,
    url: "https://www.secretosdelagua.com/limpiador/capturador-micelar",
  },
  {
    id: "85",
    name: "Limpiador Facial Luz",
    sizes: [
      { size: "50 ml",  price: "16.95€" },
      { size: "100 ml", price: "28.95€" },
      { size: "200 ml", price: "49.95€" },
    ],
    image: img337,
    url: "https://www.secretosdelagua.com/limpiador/limpiador-facial-luz",
  },
  {
    id: "86",
    name: "Desmaquillante de Ojos Waterproof",
    sizes: [
      { size: "50 ml",  price: "16.95€" },
      { size: "100 ml", price: "28.95€" },
      { size: "200 ml", price: "49.95€" },
    ],
    image: img337,
    url: "https://www.secretosdelagua.com/limpiador/desmaquillante-de-ojos-waterproof",
  },
  {
    id: "88",
    name: "Mousse Facial Limpiador",
    sizes: [
      { size: "50 ml",  price: "16.95€" },
      { size: "100 ml", price: "28.95€" },
      { size: "200 ml", price: "49.95€" },
    ],
    image: img337,
    url: "https://www.secretosdelagua.com/limpiador/mousse-facial-limpiador",
  },
  {
    id: "89",
    name: "Algodones Desmaquillantes",
    sizes: [
      { size: "50 ml",  price: "16.95€" },
      { size: "100 ml", price: "28.95€" },
      { size: "200 ml", price: "49.95€" },
    ],
    image: img337,
    url: "https://www.secretosdelagua.com/algodones-desmaquillantes",
  },
  {
    id: "91",
    name: "Discos de Algodón Reutilizables",
    sizes: [
      { size: "50 ml",  price: "16.95€" },
      { size: "100 ml", price: "28.95€" },
      { size: "200 ml", price: "49.95€" },
    ],
    image: img337,
    url: "https://www.secretosdelagua.com/discos-algodon-reutilizables",
  },
];

export default function StoreGrid() {
  const { addToBasket } = useBasket();

  return (
    <div className="w-full bg-primary">
      {/* Grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-0.5">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
          >
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-contain bg-white transition-transform duration-200 hover:scale-105"
              />
            </a>

            <div className="flex flex-col flex-grow p-3 text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-1">
                {p.name}
              </h3>

              {p.sizes?.map((s) => (
                <button
                  key={s.size}
                  onClick={() => addToBasket(p, s.size, s.price)}
                  className="mt-auto bg-primary text-white text-sm py-2 hover:scale-105 transition-transform duration-200"
                >
                  {s.size} - {s.price}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
