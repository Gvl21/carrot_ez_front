import React, { useState } from 'react'

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend=() => {
                setSelectedImage({
                    file: file,
                    previewURL: reader.result,
                })
            }

            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };

    return (
        <div>
            <input
            type="file"
            accept='image/*'
            onChange={handleImageChange}
            />
            {selectedImage && (
                <div>
                    <img
                    src={selectedImage.previewURL}
                    alt='Preview'
                    style={{ maxWidth: '100%', maxHeight: '200px'}}
                />
                <p>File Name: {selectedImage.file.name}</p>
                <p>File Type: {selectedImage.file.type}</p>
                <p>File Size: {selectedImage.file.size /1024} KB</p>
                </div>
            )}
        </div>
    )

}

export default ImageUploader