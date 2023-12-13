interface ImageLegendProps {
  legend?: string;
}

const ImageLegend = ({ legend }: ImageLegendProps) => {
  if (!legend) return;
  return (
    <small className="mt-2 block text-center text-gray-400">{legend}</small>
  );
};

export default ImageLegend;
