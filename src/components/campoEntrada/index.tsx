interface CampoEntradaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CampoEntrada({ id, label, value, onChange }: CampoEntradaProps) {
  return (
    <div className="flex flex-col  items-center mb-4 w-full max-w-md">
      <div className="flex items-start justify-start w-full px-4 md:px-6">
        <label htmlFor={id} className="mb-2 text-start">
          {label}
        </label>
      </div>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className="flex w-[90%] px-4 py-2 rounded bg-black/40 text-white border border-white"
      />
    </div>
  );
}
