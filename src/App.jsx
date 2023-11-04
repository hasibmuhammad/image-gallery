import { useState } from "react";
import ImageGallery from "./components/ImageGallery";

function App() {
  const [images, setImages] = useState([
    "./images/image-1.webp",
    "./images/image-2.webp",
    "./images/image-3.webp",
    "./images/image-4.webp",
    "./images/image-5.webp",
    "./images/image-6.webp",
    "./images/image-7.webp",
    "./images/image-8.webp",
    "./images/image-9.webp",
    "./images/image-10.jpeg",
    "./images/image-11.jpeg",
  ]);

  return (
    <>
      <div className="max-w-full mx-auto my-6 px-4 sm:px-8 md:px-10">
        <ImageGallery images={images} setImages={setImages} />
      </div>
    </>
  );
}

export default App;
