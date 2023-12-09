interface TagProps {
  children: React.ReactNode;
}

const Tag = ({ children }: TagProps) => {
  return (
    <div className="uppxercase rounded-3xl bg-gray-200 p-2 px-4 text-sm font-light text-slate-800">
      {children}
    </div>
  );
};

export default Tag;
