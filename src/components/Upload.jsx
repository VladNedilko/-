import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

const Upload = () => {
    const [dragging, setDragging] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('audioFile');
    }, []);

    const handleFileUpload = (file) => {
        if (file && file.type.startsWith('audio/')) {
            localStorage.setItem('audioFile', URL.createObjectURL(file));
            navigate('/upload/details', { state: { file } });
        } else {
            alert('Please upload a valid audio file.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileUpload(file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFileUpload(file);
    };

    return (
        <div className="upload-container">
            <h1>Upload your audio files</h1>
            <p>For best quality, use WAV, FLAC, AIFF, or ALAC. The maximum file size is 4GB uncompressed.</p>
            <div className={`upload-dropzone ${dragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <p>Drag and drop audio files to get started.</p>
                <button className="upload-button">
                    <label htmlFor="file-input">Choose files</label>
                </button>
                <input id="file-input" type="file" accept="audio/*" onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
        </div>
    );
};

export default Upload;
