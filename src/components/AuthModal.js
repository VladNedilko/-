import React, { useState } from 'react';
import { Modal, Button, Input, Form, message } from 'antd';

const AuthModal = ({ onLogin, addUser }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]); 

    const showModal = () => {
        setIsModalVisible(true);
        setIsRegistering(false);  
    };

    const handleOk = (values) => {
        setLoading(true);
        setTimeout(() => {
            if (isRegistering) {
                const { username, password, confirmPassword } = values;
                if (password !== confirmPassword) {
                    message.error('Паролі не співпадають');
                    setLoading(false);
                    return;
                }
                const newUser = { username, password };
                setUsers([...users, newUser]); 
                addUser(newUser);
                message.success('Реєстрація успішна!');
            } else {
                const { username, password } = values;
                const userExists = users.some(
                    (user) => user.username === username && user.password === password
                );
                if (userExists || (username === 'Admin' && password === 'Admin')) {
                    onLogin(username, password);
                } else {
                    message.error('Невірний логін або пароль');
                }
            }
            setLoading(false);
            setIsModalVisible(false);
        }, 1000);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Увійти
            </Button>
            <Modal
                title={isRegistering ? 'Реєстрація' : 'Авторизація'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form layout="vertical" onFinish={handleOk}>
                    <Form.Item
                        label="Логін"
                        name="username"
                        rules={[{ required: true, message: 'Введіть логін' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Введіть пароль' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    {isRegistering && (
                        <Form.Item
                            label="Повторіть пароль"
                            name="confirmPassword"
                            rules={[
                                { required: true, message: 'Повторіть пароль' },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    )}
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{ marginRight: '10px' }}
                    >
                        {isRegistering ? 'Зареєструватися' : 'Увійти'}
                    </Button>
                    <Button
                        type="link"
                        onClick={() => setIsRegistering(!isRegistering)}
                    >
                        {isRegistering ? 'У мене вже є акаунт' : 'Зареєструватися'}
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default AuthModal;
