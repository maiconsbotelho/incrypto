"use client";

import { useState } from "react";

interface ModalProps {
  title: string;
  content: string[]; // Certifique-se de que content é um array de strings
}

export default function Modal({ title, content }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão para abrir o modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white w-12 h-12 text-lg flex justify-center items-center rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
        aria-label="Como usar"
      >
        ?
      </button>

      {/* Modal */}
      <div
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white rounded-lg p-6 max-w-md w-full text-black transform transition-transform duration-300 ${
            isOpen ? "scale-100" : "scale-90"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <ul className="list-disc pl-5 space-y-2">
            {/* Verifique se content é um array antes de usar map */}
            {Array.isArray(content) && content.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300 mt-4"
          >
            Fechar
          </button>
        </div>
      </div>
    </>
  );
}
