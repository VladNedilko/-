import React, { useState } from 'react';
import { Button, message } from 'antd';

const HomePage = ({ currentUser }) => {
    const [pizzaOrder, setPizzaOrder] = useState('');

    const handlePizzaOrder = () => {
        if (pizzaOrder) {
            message.success(`Піцу "${pizzaOrder}" успішно замовлено!`);
            setPizzaOrder('');
        } else {
            message.error('Будь ласка, виберіть піцу для замовлення!');
        }
    };

    return (
        <div>
            <h2>Головна сторінка</h2>
            {currentUser ? (
                <div>
                    <p>Привіт, {currentUser}! Ось ваш функціонал:</p>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Введіть назву піци"
                            value={pizzaOrder}
                            onChange={(e) => setPizzaOrder(e.target.value)}
                            style={{ padding: '10px', marginRight: '10px' }}
                        />
                        <Button onClick={handlePizzaOrder}>Замовити піцу</Button>
                    </div>
                </div>
            ) : (
                <p>Будь ласка, авторизуйтеся для доступу до можливості замовлення піци.</p>
            )}
        </div>
    );
};

export default HomePage;
