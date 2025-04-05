interface BotaoProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Botao({ onClick, children }: BotaoProps) {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00d2ff] via-[#3a47d5] to-[#7e1adb] text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
    >
      {children}
    </button>
  );
}
