import './UploadRecipeImage.css';
import React, { useState } from "react";

function UploadRecipeImage() {
    const [file, setFile] = useState(null);

    function handleChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            setFile(URL.createObjectURL(e.target.files[0]));
        } else {
            setFile(null);
        }
    }

    return (
        <div className="upload-recipe-image-container">
            <label className="file-upload-label" htmlFor="file-upload-input">
                {file ? (
                    <img src={file} alt="Recipe" className="uploaded-image" />
                ) : (
                    <>
                        <span className="material-symbols-outlined">upload</span>
                        <p>Click to upload</p>
                    </>
                )}
            </label>
            <input
                id="file-upload-input"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </div>
    );
}

export default UploadRecipeImage;
