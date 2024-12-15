import React, { useContext, useRef, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import './Profile.css';

const Profile = () => {
    const { user, userTracks, setUserTracks, deleteTrack } = useContext(UserContext);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [likes, setLikes] = useState({});
    const [volume, setVolume] = useState(1);
    const [showVolumeControl, setShowVolumeControl] = useState(false);
    const [, setIsEditing] = useState(false);
    const [editTrackInfo, setEditTrackInfo] = useState({ trackName: '', mainArtist: '' });
    const [showProfileSettings, setShowProfileSettings] = useState(false);
    const [profileSettings, setProfileSettings] = useState({ nickname: '', password: '', avatar: null, headerBackground: null });
    const [showEditTrackModal, setShowEditTrackModal] = useState(false);
    const [notification, setNotification] = useState(null);

    const audioRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !user.email) {
                console.error("User is null or email is undefined");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/users/${user.email}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfileSettings((prev) => ({
                        ...prev,
                        avatar: data.avatarPath || 'default-avatar.jpg',
                        headerBackground: data.backgroundPath || 'default-header.jpg',
                    }));
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, [user]);

   // Обработка загрузки аватара
   const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProfileSettings((prev) => ({ ...prev, avatar: file })); // Сохраняем файл для отправки на сервер
    }
};


// Обработка загрузки фона шапки
const handleHeaderBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProfileSettings((prev) => ({ ...prev, headerBackground: file })); // Сохраняем файл для отправки на сервер
    }
};

    useEffect(() => {
        const savedLikes = JSON.parse(localStorage.getItem('likes')) || {};
        setLikes(savedLikes);
    }, []);

    useEffect(() => {
        localStorage.setItem('likes', JSON.stringify(likes));
    }, [likes]);

    useEffect(() => {
        localStorage.setItem('userTracks', JSON.stringify(userTracks));
    }, [userTracks]);

    const handlePlayPause = (track) => {
        if (currentTrack?.id === track.id) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            if (audioRef.current) audioRef.current.pause();
            setCurrentTrack(track);
            setIsPlaying(true);
            setTimeout(() => {
                audioRef.current.play();
            }, 0);
        }
    };

    const handleLike = (trackId) => {
        setLikes((prevLikes) => {
            const updatedLikes = { ...prevLikes, [trackId]: !prevLikes[trackId] };
            localStorage.setItem('likes', JSON.stringify(updatedLikes));
            return updatedLikes;
        });
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration || 1;
            setProgress((currentTime / duration) * 100);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value / 100;
        setVolume(newVolume);
        if (audioRef.current) audioRef.current.volume = newVolume;
    };

    const handleEditClick = (track) => {
        setEditTrackInfo({ trackName: track.name, mainArtist: track.artist });
        setIsEditing(true);
        setShowEditTrackModal(true);
        setCurrentTrack(track);
    };

    const handleShareClick = (track) => {
        const trackLink = `https://flexsound.com/${user.nickname}/${track.name}`;

        navigator.clipboard.writeText(trackLink)
            .then(() => {
                setNotification(`The track link was copied: ${trackLink}`);
                setTimeout(() => setNotification(null), 3000);
            })
            .catch((err) => {
                console.error('Failed to copy link: ', err);
                setNotification('Failed to copy link');
                setTimeout(() => setNotification(null), 3000);
            });
    };

    const handleSaveEdit = async () => {
        try {
            const payload = {
                trackName: editTrackInfo.trackName,
                mainArtist: editTrackInfo.mainArtist,
            };

            const response = await fetch(`http://localhost:5000/users/${user.email}/tracks/${currentTrack.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const updatedTrack = await response.json();
                setUserTracks((prevTracks) =>
                    prevTracks.map((track) => (track.id === currentTrack.id ? updatedTrack : track))
                );
                setIsEditing(false);
                setShowEditTrackModal(false);
                alert('Track updated successfully!');
            } else {
                alert('Failed to save changes.');
            }
        } catch (error) {
            console.error('Error updating track:', error);
            alert('An error occurred while saving changes.');
        }
    };

    const handleSaveProfileSettings = async () => {
        try {
            const formData = new FormData();
    
            if (profileSettings.avatar instanceof File) {
                formData.append('avatar', profileSettings.avatar);
            }
            if (profileSettings.headerBackground instanceof File) {
                formData.append('background', profileSettings.headerBackground);
            }
    
            const response = await fetch(`http://localhost:5000/users/${user.email}/upload`, {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const { avatarPath, backgroundPath } = await response.json();
    
                // Обновляем пути для отображения
                setProfileSettings((prevSettings) => ({
                    ...prevSettings,
                    avatar: avatarPath,
                    headerBackground: backgroundPath,
                }));
    
                alert('Profile settings saved');
            } else {
                alert('Failed to save profile settings.');
            }
        } catch (error) {
            console.error('Error saving profile settings:', error);
        }
    };

    return (
        <div className="profile">
            <div className="header" style={{ backgroundImage: `url(${profileSettings.headerBackground || 'default-header.jpg'})` }}>
                <div className="avatar-and-settings">
                    <img
                        className="avatar"
                        src={profileSettings.avatar || 'default-avatar.jpg'}
                        alt="Avatar"
                    />
                    <button
                        className="settings-button"
                        onClick={() => setShowProfileSettings((prev) => !prev)}
                    >
                        ⚙️
                    </button>
                </div>
                <h1>Profile</h1>
            </div>

            <div className="content">
                <div className="tracks-list">
                    {userTracks.length > 0 ? (
                        userTracks.map((track) => (
                            <div key={track.id} className="track-item">
                                <div className="track-header">
                                    <img
                                        className="track-cover"
                                        src={track.coverLink || 'default-cover.jpg'}
                                        alt="Track Cover"
                                    />
                                    <div className="track-info">
                                        <p className="track-name">{track.name}</p>
                                        <p className="artist-name">{track.artist}</p>
                                    </div>
                                </div>

                                <div className="custom-player">
                                    <button
                                        className={`play-button ${currentTrack?.id === track.id && isPlaying ? 'pause' : ''}`}
                                        onClick={() => handlePlayPause(track)}
                                    >
                                        {currentTrack?.id === track.id && isPlaying ? '❚❚' : '►'}
                                    </button>
                                    <input
                                        type="range"
                                        className="progress-bar"
                                        value={currentTrack?.id === track.id ? progress : 0}
                                        onChange={(e) => {
                                            if (audioRef.current) {
                                                const newTime = (e.target.value / 100) * audioRef.current.duration;
                                                audioRef.current.currentTime = newTime;
                                            }
                                        }}
                                    />
                                </div>

                                <div className="actions">
                                    <button className="share-button" onClick={() => handleShareClick(track)}>Share</button>
                                    <button className="edit-button" onClick={() => handleEditClick(track)}>
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => deleteTrack(track.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className={`like-button ${likes[track.id] ? 'active' : ''}`}
                                        onClick={() => handleLike(track.id)}
                                    >
                                        ❤
                                    </button>
                                    <span className="like-count">{likes[track.id] ? 1 : 0}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tracks uploaded yet.</p>
                    )}
                </div>
                {currentTrack && (
                    <audio
                        ref={audioRef}
                        src={currentTrack.trackLink}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => setIsPlaying(false)}
                    />
                )}
            </div>

            {/* Bottom Player */}
            {currentTrack && (
                <div className="bottom-player">
                    <div className="controls">
                        <button>⏮</button>
                        <button onClick={() => handlePlayPause(currentTrack)}>
                            {isPlaying ? '❚❚' : '►'}
                        </button>
                        <button>⏭</button>
                        <button>🔁</button>
                    </div>
                    <input
                        type="range"
                        className="progress-bar"
                        value={progress}
                        onChange={(e) =>
                            audioRef.current && (audioRef.current.currentTime = (e.target.value / 100) * audioRef.current.duration)
                        }
                    />
                    <div
                        className="volume-control"
                        onMouseEnter={() => setShowVolumeControl(true)}
                        onMouseLeave={() => setShowVolumeControl(false)}
                    >
                        <button className="volume-icon">🔊</button>
                        {showVolumeControl && (
                            <div className="volume-slider-wrapper">
                                <input
                                    type="range"
                                    className="volume-slider"
                                    min="0"
                                    max="100"
                                    value={volume * 100}
                                    onChange={handleVolumeChange}
                                />
                            </div>
                        )}
                    </div>
                    <div className="track-info">
                        <p>{currentTrack.trackName}</p>
                        <p>{currentTrack.mainArtist}</p>
                    </div>
                    <button
                        className={`like-button ${likes[currentTrack.id] ? 'active' : ''}`}
                        onClick={() => handleLike(currentTrack.id)}
                    >
                        ❤
                    </button>
                </div>
            )}
            {notification && (
                <div className="notification-popup">
                    {notification}
                </div>
            )}

            {/* Profile Settings Modal */}
            {showProfileSettings && (
                <div className="profile-settings-modal">
                    <div className="dialog-content">
                        <h2>Profile Settings</h2>
                        <form>
                            <div className="dialog-body">
                                <label>Nickname</label>
                                <input
                                    type="text"
                                    value={profileSettings.nickname}
                                    onChange={(e) => setProfileSettings({ ...profileSettings, nickname: e.target.value })}
                                />
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={profileSettings.password}
                                    onChange={(e) => setProfileSettings({ ...profileSettings, password: e.target.value })}
                                />
                                <label>Avatar</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                                <label>Header Background</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleHeaderBackgroundChange}
                                />
                            </div>
                            <div className="dialog-footer">
                                <button type="button" className="save-button" onClick={handleSaveProfileSettings}>
                                    Save
                                </button>
                                <button type="button" className="cancel-button" onClick={() => setShowProfileSettings(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Edit Track Modal */}
            {showEditTrackModal && (
            <div className="edit-modal">
                <div className="dialog-content">
                    <h2>Edit Track Info</h2>
                    <div className="dialog-body">
                        <label>Track Name</label>
                        <input
                            type="text"
                            value={editTrackInfo.trackName}
                            onChange={(e) => setEditTrackInfo({ ...editTrackInfo, trackName: e.target.value })}
                        />
                        <label>Artist Name</label>
                        <input
                            type="text"
                            value={editTrackInfo.mainArtist}
                            onChange={(e) => setEditTrackInfo({ ...editTrackInfo, mainArtist: e.target.value })}
                        />
                    </div>
                    <div className="dialog-footer">
                        <button type="button" className="save-button" onClick={handleSaveEdit}>
                            Save
                        </button>
                        <button type="button" className="cancel-button" onClick={() => setShowEditTrackModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
};

export default Profile;