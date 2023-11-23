import React, { useState } from 'react';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage({
          file: file,
          previewURL: reader.result,
        });
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/gif"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div>
          <img
            src={selectedImage.previewURL}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
          <p>파일명 : {selectedImage.file.name}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;