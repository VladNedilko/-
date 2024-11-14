import React, { useState, useEffect } from 'react';
import { Layout, Button, message } from 'antd';
import ThemeSwitch from './components/ThemeSwitch';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import AuthModal from './components/AuthModal';
import './App.css';

const { Header, Content } = Layout;

const App = () => {
    const [darkTheme, setDarkTheme] = useState(false);  
    const [isAdmin, setIsAdmin] = useState(false); 
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);

    const addUser = (newUser) => {
        setUsers([...users, newUser]);
    };

    const handleLogin = (username, password) => {
        if (username === 'Admin' && password === 'Admin') {
            setIsAdmin(true);
            setCurrentUser('Admin');
            message.success('Вхід як адміністратор успішний');
        } else {
            setCurrentUser(username);
            message.success('Вхід як користувач успішний');
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
        setCurrentUser(null);
        message.info('Вихід виконано');
    };

    const deleteUser = (username) => {
        setUsers(users.filter((user) => user.username !== username));
        message.success(`Користувач ${username} видалений`);
    };

    const toggleTheme = (checked) => {
        setDarkTheme(checked);
    };

    useEffect(() => {
        if (darkTheme) {
            document.documentElement.style.setProperty('--background-color', '#333');
            document.documentElement.style.setProperty('--text-color', '#fff');
        } else {
            document.documentElement.style.setProperty('--background-color', '#fff');
            document.documentElement.style.setProperty('--text-color', '#000');
        }
    }, [darkTheme]);

    return (
        <Layout>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ color: 'white' }}>Flexability</h1>
                <div>
                    <ThemeSwitch onChange={toggleTheme} />
                    {currentUser && <span style={{ color: 'white', marginRight: '10px' }}>Привіт, {currentUser}</span>}
                    {currentUser ? (
                        <Button onClick={handleLogout} style={{ marginLeft: '10px' }}>
                            Вийти
                        </Button>
                    ) : (
                        <AuthModal onLogin={handleLogin} addUser={addUser} />
                    )}
                </div>
            </Header>
            <Content style={{ padding: '20px', backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
                {currentUser ? (isAdmin ? (
                    <AdminPage users={users} deleteUser={deleteUser} addUser={addUser} />
                ) : (
                    <HomePage currentUser={currentUser} />
                )) : (
                    <HomePage currentUser={currentUser} />
                )}
            </Content>
        </Layout>
    );
};

export default App;
