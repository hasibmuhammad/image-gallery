// Single image component - to display each individual image inside the grid
const Image = ({ image }) => {
  return (
    <div className="border border-gray-300 rounded-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg overflow-hidden">
      <img className="w-full h-auto object-cover" src={image} alt="" />
    </div>
  );
};

export default Image;
