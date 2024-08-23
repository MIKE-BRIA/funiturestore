const RangeCard = ({ title, source }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-xs">
      <div className="w-full h-80 rounded-lg overflow-hidden shadow-md bg-white transform transition-transform hover:-translate-y-1">
        <img className="w-full h-full object-cover" src={source} alt={title} />
      </div>
      <p className="mt-4 text-lg text-gray-800">{title}</p>
    </div>
  );
};

export default RangeCard;
