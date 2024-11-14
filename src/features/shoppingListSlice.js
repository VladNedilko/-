import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    filter: ''
};

export const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        addItem: (state, action) => {
            console.log('Before adding item:', JSON.stringify({
                items: [...state.items],
                filter: state.filter 
            }));

            state.items.push(action.payload);

            console.log('After adding item:', JSON.stringify({
                items: [...state.items], 
                filter: state.filter 
            }));
        },
        removeItem: (state, action) => {
            console.log('Before removing item:', JSON.stringify({
                items: [...state.items],   
                filter: state.filter       
            }));
            state.items = state.items.filter(item => item.id !== action.payload);

            console.log('After removing item:', JSON.stringify({
                items: [...state.items], 
                filter: state.filter
            }));
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const { addItem, removeItem, setFilter } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
