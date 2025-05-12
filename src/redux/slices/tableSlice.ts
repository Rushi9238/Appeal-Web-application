import { createSlice } from '@reduxjs/toolkit';

export type TableItem={
    id: string;
    name: string;
    email: string;
    status: 'active' | 'inactive' | 'pending';
    role: string;
}


const initialState = {
  items: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      role: 'Admin'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'active',
      role: 'User'
    }
  ]
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.items.push({
        id: Date.now().toString(),
        ...action.payload
      });
    },
    updateUser: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteUser: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { addUser, updateUser, deleteUser } = tableSlice.actions;
export default tableSlice.reducer;