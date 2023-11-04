import { useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Image from "./Image";

const ImageGallery = ({ images, setImages }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelect = (index) => {
    const isSelected = selectedImages.includes(index);
    if (isSelected) {
      setSelectedImages((prev) => prev.filter((item) => item !== index));
    } else {
      setSelectedImages((prev) => [...prev, index]);
    }
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(reorderedImages);
  };

  const handleDelete = () => {
    const afterDelImages = images.filter(
      (image, index) => !selectedImages.includes(index)
    );

    setImages(afterDelImages);
    setSelectedImages([]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="image-gallery" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="max-w-7xl mx-auto my-6"
          >
            <div className="flex items-center justify-between font-medium mb-8 border-b-2 pb-4 text-2xl">
              <div>
                {selectedImages.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-2xl">
                      <BsFillCheckSquareFill />
                    </span>
                    <span>{`${selectedImages.length} file${
                      selectedImages.length > 0 && selectedImages.length !== 1
                        ? "s"
                        : ""
                    } selected`}</span>
                  </div>
                )}
                {selectedImages.length === 0 && <h1>Gallery</h1>}
              </div>
              <button className="text-red-400" onClick={handleDelete}>
                {`Delete File${
                  selectedImages.length > 0 && selectedImages.length !== 1
                    ? "s"
                    : ""
                }`}
              </button>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-5 gap-4 px-10">
              {images.map((image, idx) => (
                <Draggable key={idx} draggableId={`image-${idx}`} index={idx}>
                  {(provided) => (
                    <div
                      className={`first:col-span-2 first:row-span-2 relative group ${
                        selectedImages.includes(idx)
                          ? "border border-blue-500 rounded-md "
                          : ""
                      }`}
                      onMouseEnter={() => handleMouseEnter(idx)}
                      onMouseLeave={() => handleMouseLeave(idx)}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(idx)}
                        onChange={() => handleImageSelect(idx)}
                        className={`absolute top-2 left-2 z-10  group-hover:opacity-100 transition-opacity duration-300 cursor-pointer ${
                          selectedImages.includes(idx)
                            ? "opacity-1"
                            : "opacity-0"
                        }`}
                      />
                      <Image key={idx} image={image} />
                      {hoveredIndex === idx && (
                        <div className="overlay absolute inset-0 bg-black opacity-50 rounded-md"></div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default ImageGallery;
