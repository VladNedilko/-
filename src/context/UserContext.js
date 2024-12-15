import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Создаём контекст
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Текущий пользователь
    const [userTracks, setUserTracks] = useState([]); // Треки текущего пользователя
    const [isLoading, setIsLoading] = useState(true); // Флаг загрузки данных пользователя

    // Проверка сохранённого пользователя при загрузке
    const restoreUserFromLocalStorage = async () => {
        const savedUser = localStorage.getItem('user'); 
    
        if (savedUser) {
            try {
                // Проверка и лог содержимого LocalStorage
                console.log('Saved user in LocalStorage:', savedUser);
    
                const parsedUser = JSON.parse(savedUser);
                const response = await axios.get(`http://localhost:5000/users/${parsedUser.email}`);
    
                // Проверка формата ответа
                if (response.status === 200 && response.data) {
                    console.log('Server response:', response.data);
                    setUser(response.data);
                    setUserTracks(response.data.tracks || []);
                } else {
                    console.error('Unexpected response:', response);
                }
            } catch (error) {
                console.error('Failed to restore user:', error.message);
                localStorage.removeItem('user'); // Удаляем некорректные данные
            }
        }
        setIsLoading(false);
    };
    

    useEffect(() => {
        restoreUserFromLocalStorage();
    }, []);

    // Регистрация пользователя
    const register = async (nickname, email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/register', {
                nickname,
                email,
                password,
            });
            console.log('Registration successful:', response.data);
            return true;
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            return false;
        }
    };
    
    // Авторизация пользователя
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            const userData = response.data;
            setUser(userData);
            setUserTracks(userData.tracks || []);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            return false;
        }
    };

    // Выход из аккаунта
    const logout = () => {
        setUser(null);
        setUserTracks([]);
        localStorage.removeItem('user');
    };

// Загрузка аватара и фона
const uploadAvatarOrBackground = async (avatarFile, backgroundFile) => {
    if (!user) return;

    try {
        const formData = new FormData();
        if (avatarFile) formData.append('avatar', avatarFile);
        if (backgroundFile) formData.append('headerBackground', backgroundFile);

        const response = await axios.post(
            `http://localhost:5000/users/${user.email}/upload`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        const updatedUser = {
            ...user,
            avatarPath: response.data.avatarPath,
            backgroundPath: response.data.backgroundPath,
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
        console.error('Upload error:', error.response?.data || error.message);
    }
};

// Получение URL аватара
const getAvatarUrl = () => {
    return user?.avatarPath
        ? `http://localhost:5000/users/${user.email}/avatar`
        : '/default-avatar.png';
};

// Получение URL фона
const getBackgroundUrl = () => {
    return user?.backgroundPath
        ? `http://localhost:5000/users/${user.email}/headerBackground`
        : '/default-background.png';
};

    // Добавление трека
    const addTrack = async (trackData, audioFile, coverFile) => {
        if (!user) return;

        try {
            const formData = new FormData();
            formData.append('trackData', JSON.stringify(trackData));
            if (audioFile) formData.append('audioFile', audioFile);
            if (coverFile) formData.append('coverFile', coverFile);

            const response = await axios.post(
                `http://localhost:5000/users/${user.email}/tracks`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            const newTrack = response.data;
            setUserTracks((prevTracks) => [...prevTracks, newTrack]);
        } catch (error) {
            console.error('Track upload error:', error.response?.data || error.message);
        }
    };

    // Удаление трека
    const deleteTrack = async (trackId) => {
        if (!user) return;

        try {
            await axios.delete(`http://localhost:5000/users/${user.email}/tracks/${trackId}`);
            setUserTracks((prevTracks) => prevTracks.filter((track) => track.id !== trackId));
        } catch (error) {
            console.error('Track deletion error:', error.response?.data || error.message);
        }
    };

    // Получение всех треков
    const fetchTracks = async () => {
        if (!user) return;

        try {
            const response = await axios.get(`http://localhost:5000/users/${user.email}/tracks`);
            setUserTracks(response.data);
        } catch (error) {
            console.error('Error fetching tracks:', error.response?.data || error.message);
        }
    };

    const fetchRecentlyPlayed = async () => {
        if (!user) return;
        try {
            const response = await axios.get(`http://localhost:5000/users/${user.email}/recently-played`);
            setUserTracks(response.data); // Обновление глобального состояния
        } catch (error) {
            console.error('Error fetching recently played:', error.message);
        }
    };
    

    return (
        <UserContext.Provider
            value={{
                user,
                register,
                login,
                logout,
                uploadAvatarOrBackground,
                getAvatarUrl,
                getBackgroundUrl,
                addTrack,
                deleteTrack,
                setUserTracks,
                fetchTracks,
                fetchRecentlyPlayed,
                fetchTracks: restoreUserFromLocalStorage,
                userTracks,
                isLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
