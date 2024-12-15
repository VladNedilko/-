import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './UploadDetails.css';

const genres = [
    'Rock', 'Pop', 'Hip-Hop', 'Jazz', 'Classical', 'Electronic', 'Reggae',
    'Blues', 'Country', 'Funk', 'Disco', 'Soul', 'Metal', 'Punk', 'R&B', 'Techno'
];

const tags = ['Chill', 'Dance', 'Relax', 'Study', 'Workout', 'Party', 'Romantic'];

const UploadDetails = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { addTrack, user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        trackName: '', trackLink: '', mainArtist: '', genre: '', tags: [],
        description: '', isPublic: true, cover: null, coverLink: null, audioFile: null
    });
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        if (state) {
            const { file, trackName, mainArtist } = state;
    
            // Формируем название трека и ссылку на аудио, если они переданы
            const fileName = file ? file.name.replace(/\s+/g, '') : trackName || '';
            const trackLink = file ? URL.createObjectURL(file) : '';
    
            setFormData((prevFormData) => ({
                ...prevFormData,
                trackName: fileName || prevFormData.trackName, // Приоритет: state -> prev
                trackLink: trackLink || prevFormData.trackLink,
                mainArtist: mainArtist || prevFormData.mainArtist,
                audioFile: file || prevFormData.audioFile, // Загружаем файл, если есть
            }));
        }
    }, [state]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleCheckboxChange = () => {
        setFormData((prevFormData) => ({ ...prevFormData, isPublic: !prevFormData.isPublic }));
    };

    const handleTagChange = (e) => {
        const value = e.target.value;
        if (!formData.tags.includes(value)) {
            setFormData((prevFormData) => ({ ...prevFormData, tags: [...prevFormData.tags, value] }));
        }
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const coverLink = URL.createObjectURL(file);
            setFormData((prevFormData) => ({ ...prevFormData, cover: file, coverLink: coverLink }));
        } else {
            alert('Please upload a valid image file.');
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
        handleCoverImageChange({ target: { files: [file] } });
    };

    const handleSubmit = async () => {
        if (!formData.mainArtist) {
            alert('Please enter the main artist name.');
            return;
        }
    
        if (!formData.audioFile) {
            alert('Please upload an audio file.');
            return;
        }
    
        const form = new FormData();
        form.append('trackName', formData.trackName);
        form.append('mainArtist', formData.mainArtist);
        form.append('genre', formData.genre);
        form.append('tags', JSON.stringify(formData.tags));
        form.append('description', formData.description);
        form.append('isPublic', formData.isPublic);
        if (formData.cover) {
            form.append('cover', formData.cover);
        }
        form.append('audioFile', formData.audioFile);
    
        try {
            const response = await fetch(`http://localhost:5000/users/${user.email}/tracks`, {
                method: 'POST',
                body: form,
            });
    
            if (response.ok) {
                const newTrack = await response.json();
                addTrack(newTrack); // Обновляем список треков в контексте
                alert('Track uploaded successfully!');
                navigate('/profile'); // Переход к профилю пользователя
            } else {
                alert('Failed to upload track.');
            }
        } catch (error) {
            console.error('Error uploading track:', error);
            alert('An error occurred while uploading the track.');
        }
    };
    

    const formattedLink = user
        ? `https://flexsound.com/${user.name || user.email.split('@')[0]}/`
        : 'https://flexsound.com/';

    return (
        <div className="upload-details">
            <div className="header">
                <div className="logo">MyMusic</div>
                <h1>Track Info</h1>
            </div>
            <div className="content">
                <div className="left-section">
                    {!formData.coverLink ? (
                        <div className={`upload-cover ${dragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}>
                            <p>Drag and drop a cover image here, or click to choose.</p>
                            <button className="upload-button">
                                <label htmlFor="cover-input">Choose cover image</label>
                            </button>
                            <input id="cover-input" type="file" accept="image/*" onChange={handleCoverImageChange} className="cover-input" />
                        </div>
                    ) : (
                        <div className="cover-preview">
                            <img src={formData.coverLink} alt="Selected Cover" className="selected-cover-image" />
                            <button className="change-cover-button" onClick={() => setFormData((prevFormData) => ({ ...prevFormData, cover: null, coverLink: null }))}>
                                Change Cover Image
                            </button>
                        </div>
                    )}
                </div>
                <div className="right-section">
                    <div className="form-group">
                        <label>Track Name</label>
                        <input type="text" name="trackName" value={formData.trackName} onChange={handleInputChange} placeholder="Enter track name" />
                    </div>
                    <div className="form-group">
                        <label>Track Link</label>
                        <input type="text" name="trackLink" value={formattedLink} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Main Artist(s)</label>
                        <input type="text" name="mainArtist" value={formData.mainArtist} onChange={handleInputChange} placeholder="Enter main artist(s)" />
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <input type="text" name="genre" list="genre-list" value={formData.genre} onChange={handleInputChange} placeholder="Select or search for a genre" />
                        <datalist id="genre-list">
                            {genres.map((genre, index) => (
                                <option key={index} value={genre} />
                            ))}
                        </datalist>
                    </div>
                    <div className="form-group">
                        <label>Tags</label>
                        <input type="text" name="tags" list="tag-list" onBlur={handleTagChange} placeholder="Enter or select tags" />
                        <datalist id="tag-list">
                            {tags.map((tag, index) => (
                                <option key={index} value={tag} />
                            ))}
                        </datalist>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter a description for your track" />
                    </div>
                    <div className="form-group-checkbox">
                        <label>
                            <input type="radio" name="privacy" checked={formData.isPublic} onChange={handleCheckboxChange} /> Public
                        </label>
                        <label>
                            <input type="radio" name="privacy" checked={!formData.isPublic} onChange={handleCheckboxChange} /> Private
                        </label>
                    </div>
                    <button onClick={handleSubmit}>Save Track</button>
                </div>
            </div>
        </div>
    );
};

export default UploadDetails;
