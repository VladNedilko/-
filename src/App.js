import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, setFilter } from './features/shoppingListSlice';
import { Container, Button, FormControl, ListGroup } from 'react-bootstrap';

const App = () => {
    const [newItem, setNewItem] = useState('');
    const [itemId, setItemId] = useState(1);
    const dispatch = useDispatch();
    const items = useSelector(state => state.shoppingList.items);
    const filter = useSelector(state => state.shoppingList.filter);

    const handleAddItem = () => {
        if (newItem) {
            dispatch(addItem({ id: itemId, name: newItem }));
            setItemId(itemId + 1);
            setNewItem('');
        }
    };

    const handleRemoveItem = (id) => {
        dispatch(removeItem(id));
    };

    const handleFilterChange = (e) => {
        dispatch(setFilter(e.target.value));
    };

    const filteredItems = items.filter(item => item.name.includes(filter));

    return (
        <Container className="mt-5">
            <h1>Shopping List</h1>
            <FormControl 
            type="text" 
            placeholder="Filter items..." 
            value={filter} 
            onChange={handleFilterChange} 
            className="mb-3"
            />
            <FormControl 
            type="text" 
            placeholder="Add item" 
            value={newItem} 
            onChange={(e) => setNewItem(e.target.value)} 
            className="mb-3"
            />
            <Button variant="primary" onClick={handleAddItem} className="mb-3">Add Item</Button>
            <ListGroup>
                {filteredItems.map(item => (
                    <ListGroup.Item key={item.id}>
                        {item.name} 
                        <Button variant="danger" onClick={() => handleRemoveItem(item.id)} className="float-end">Remove</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default App;
