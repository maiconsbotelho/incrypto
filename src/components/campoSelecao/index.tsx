import Modal from "../modal";

interface CampoSelecaoProps {
  id: string;
  label: string;
  value: number;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CampoSelecao({ id, label, value, options, onChange }: CampoSelecaoProps) {
  return (
    <div className="flex justify-center items-center w-[200px]">
      <div className="flex flex-col md:flex-row items-center mb-4 w-full max-w-md">
        <label htmlFor={id} className="mb-2 md:mb-0 md:mr-4">
          {label}
        </label>
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="flex-1 px-4 py-2 rounded bg-black/40 text-white border border-white"
        >
          {options.map((option, index) => (
            <option key={index} value={index}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <Modal
        title="Como usar a aplicação"
        content={[
          "1. Insira a mensagem que deseja criptografar.",
          "2. Escolha o deslocamento desejado.",
          "3. Clique no botão 'Criptografar' para ver o resultado.",
        ]}
      />
    </div>
  );
}
