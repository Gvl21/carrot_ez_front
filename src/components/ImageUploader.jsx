import React, { useContext } from 'react';
import { ImagesContext } from '../App';

const ImageUploader = () => {
    const { images, setImages } = useContext(ImagesContext);

    const handleImageChange = (e) => {
        /**
         * 이전의 단일 파일 업로드용 핸들러
         */
        // const file = e.target.files[0];

        // if (file) {
        //   const reader = new FileReader();

        //   reader.onloadend = () => {
        //     setSelectedImage({
        //       file: file,
        //       previewURL: reader.result,
        //     });
        //   };

        //   reader.readAsDataURL(file);
        // } else {
        //   setSelectedImage(null);
        // }
        const files = e.target.files;

        if (files.length > 0) {
            const newImages = [
                ...images,
                ...Array.from(files).map((file) => ({
                    file: file,
                    previewURL: URL.createObjectURL(file),
                })),
            ];
            console.log(newImages);
            setImages(newImages);
        } else {
            setImages([]);
        }
    };
    const deleteImage = (i) => {
        const updatedImages = [...images];
        updatedImages.splice(i, 1);
        setImages(updatedImages);
    };

    return (
        <div>
            <input
                type='file'
                accept='image/jpg, image/png, image/jpeg, image/gif'
                onChange={handleImageChange}
                multiple // <- 다중 파일 선택 허용하기
            />
            {images.length > 0 && (
                <div>
                    {images.map((e, i) => (
                        <div key={i}>
                            <img
                                src={e.previewURL}
                                alt={`이미지 파일 ${i}`}
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                            <p>
                                파일명 : {e.file.name}
                                <button onClick={() => deleteImage(i)}>
                                    ❌
                                </button>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
