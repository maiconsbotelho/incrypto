import { useState } from "react";

interface BotaoProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Botao({ onClick, children }: BotaoProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick();
    setTimeout(() => setClicked(false), 200); // Reseta o estado após 200ms
  };

  return (
    <button
      onClick={handleClick}
      className={`mt-4 px-6 py-2 bg-gradient-to-r from-[#00d2ff] via-[#3a47d5] to-[#7e1adb] text-white font-bold rounded-full shadow-lg transition-transform duration-300 ${
        clicked ? "scale-95" : "hover:scale-105"
      }`}
    >
      {children}
    </button>
  );
}
