interface IInputLabelProps {
  text: string;
}

const InputLabel = ({ text }: IInputLabelProps) => {
  return <div className="mb-2 text-xs uppercase text-gray-400">{text}</div>;
};

export default InputLabel;
