interface CampoSelecaoProps {
  id: string;
  label: string;
  value: number;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CampoSelecao({ id, label, value, options, onChange }: CampoSelecaoProps) {
  return (
    <div className="w-full flex flex-col items-center mb-4 max-w-md mx-auto">
      <div className="flex items-start justify-start w-full px-4 md:px-6">
        <label htmlFor={id} className="mb-2 text-start text-white">
          {label}
        </label>
      </div>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-[90%] min-h-[44px] px-4 py-3 rounded-lg bg-black/40 text-white border border-white/30 focus:border-[#00ffc3] focus:outline-none focus:ring-2 focus:ring-[#00ffc3]/20 transition-all duration-200 text-base"
      >
        {options.map((option, index) => (
          <option key={index} value={index} className="bg-gray-800 text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
