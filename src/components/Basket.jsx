import React from "react";
import { useBasket } from "../context/BasketContext";

export default function Basket() {
  const { basket, addToBasket, decreaseQuantity, removeFromBasket, total } =
    useBasket();

  return (
    <div className="bg-white shadow p-4 max-w-md mx-auto h-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Cesta ({basket.length})
      </h3>

      {basket.length === 0 ? (
        <p className="text-gray-500 text-sm">Tu cesta está vacía.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 text-sm text-gray-700 mb-4">
            {basket.map((item) => (
              <li
                key={`${item.id}-${item.size}`}
                className="py-3 flex justify-between items-center"
              >
                <div className="text-left">
                  <p className="font-medium text-gray-800">
                    {item.name} — {item.size}
                  </p>
                  {item.price && <p className="text-gray-600">{item.price}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id, item.size)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="w-6 text-center">{item.quantity}</span>

                  <button
                    onClick={() => addToBasket(item, item.size, item.price)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromBasket(item.id, item.size)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* 💰 Total */}
          <div className="flex justify-between items-center border-t pt-3 mb-4">
            <span className="font-semibold text-gray-800">Total:</span>
            <span className="font-bold text-gray-900">{total.toFixed(2)} €</span>
          </div>

          {/* 🛒 Checkout button */}
          <button
            className="w-full bg-[#2e2121] text-white py-2 hover:bg-[#3a2929] transition font-medium"
            onClick={() => alert("Checkout no implementado aún 🧾")}
          >
            Finalizar compra
          </button>
        </>
      )}
    </div>
  );
}
