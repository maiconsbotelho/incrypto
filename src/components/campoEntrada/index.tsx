interface CampoEntradaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function CampoEntrada({ id, label, value, onChange, placeholder }: CampoEntradaProps) {
  return (
    <div className="w-full flex flex-col items-center mb-4 max-w-md mx-auto">
      <div className="flex items-start justify-start w-full px-4 md:px-6">
        <label htmlFor={id} className="mb-2 text-start text-white font-medium">
          {label}
        </label>
      </div>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-[90%] min-h-[44px] px-4 py-3 rounded-lg bg-black/40 text-white border border-white/30 placeholder-white/50 focus:border-[#00ffc3] focus:outline-none focus:ring-2 focus:ring-[#00ffc3]/20 transition-all duration-200 text-base"
      />
    </div>
  );
}
