import React, { useState } from "react";

const products = [
  {
    id: "84",
    name: "Capturador Micelar",
    sizes: ["50 ml", "100 ml", "200 ml"],
    price: null,
    image: "https://www.secretosdelagua.com/7764-large_default/capturador-micelar.jpg",
    url: "https://www.secretosdelagua.com/limpiador/capturador-micelar",
  },
  {
    id: "85",
    name: "Limpiador Facial Luz",
    sizes: ["50 ml", "100 ml", "200 ml"],
    price: null,
    image: "https://www.secretosdelagua.com/7774-large_default/limpiador-facial-luz.jpg",
    url: "https://www.secretosdelagua.com/limpiador/limpiador-facial-luz",
  },
  {
    id: "86",
    name: "Desmaquillante de Ojos Waterproof",
    sizes: ["50 ml"],
    price: "24,50 €",
    image: "https://www.secretosdelagua.com/7784-large_default/desmaquillante-de-ojos-waterproof.jpg",
    url: "https://www.secretosdelagua.com/limpiador/desmaquillante-de-ojos-waterproof",
  },
  {
    id: "88",
    name: "Mousse Facial Limpiador",
    sizes: ["50 ml", "100 ml"],
    price: null,
    image: "https://www.secretosdelagua.com/7804-large_default/mousse-limpiador-facial.jpg",
    url: "https://www.secretosdelagua.com/limpiador/mousse-facial-limpiador",
  },
  {
    id: "89",
    name: "Algodones Desmaquillantes",
    sizes: null,
    price: "10,00 €",
    image: "https://www.secretosdelagua.com/7814-large_default/algodones-desmaquillantes.jpg",
    url: "https://www.secretosdelagua.com/algodones-desmaquillantes",
  },
  {
    id: "91",
    name: "Discos de Algodón Reutilizables",
    sizes: null,
    price: "11,90 €",
    image: "https://www.secretosdelagua.com/7824-large_default/discos-algodon-reutilizables.jpg",
    url: "https://www.secretosdelagua.com/discos-algodon-reutilizables",
  },
];

export default function StoreGrid() {
  const [basket, setBasket] = useState([]);

  const addToBasket = (product) => {
    setBasket((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev; // avoid duplicates
      return [...prev, product];
    });
  };

  return (
    <div className="w-full px-4 py-8 bg-[#fafafa]">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
        Tienda — Limpiadores Faciales
      </h2>

      {/* ✅ Grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-sm hover:shadow-md transition rounded-lg overflow-hidden flex flex-col"
          >
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover transition-transform duration-200 hover:scale-105"
              />
            </a>

            <div className="flex flex-col flex-grow p-3 text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-1">
                {p.name}
              </h3>

              {p.price ? (
                <p className="text-gray-600 text-sm mb-2">{p.price}</p>
              ) : (
                <p className="text-gray-400 text-xs mb-2">Consultar precio</p>
              )}

              {p.sizes && (
                <p className="text-xs text-gray-500 mb-2">
                  {p.sizes.join(" · ")}
                </p>
              )}

              <button
                onClick={() => addToBasket(p)}
                className="mt-auto bg-[#2e2121] text-white text-sm py-2 rounded hover:bg-[#3a2929] transition"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🧺 Basket preview */}
      <div className="mt-8 bg-white shadow p-4 rounded-lg max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Cesta ({basket.length})
        </h3>
        {basket.length === 0 ? (
          <p className="text-gray-500 text-sm">Tu cesta está vacía.</p>
        ) : (
          <ul className="divide-y divide-gray-200 text-sm text-gray-700">
            {basket.map((item) => (
              <li key={item.id} className="py-2">
                {item.name} {item.price && <span>— {item.price}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
