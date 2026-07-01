import { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

function ImageUpload({ images, setImages }) {
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (!images || images.length === 0) {
      setPreviewImages([]);
      return;
    }

    const previews = images.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(previews);

    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    setImages(files);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter(
      (_, i) => i !== index
    );

    setImages(updatedImages);
  };

  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">
        Upload Images
      </label>

      <label className="border-2 border-dashed border-green-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition">
        <FaCloudUploadAlt
          size={45}
          className="text-green-600 mb-3"
        />

        <p className="text-gray-600 font-medium">
          Click to upload equipment images
        </p>

        <p className="text-sm text-gray-400 mt-1">
          JPG, PNG, WEBP
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {previewImages.map((image, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="w-full h-36 object-cover rounded-xl"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;