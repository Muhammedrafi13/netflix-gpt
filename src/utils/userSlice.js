import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return null;
        },
        decrementGptCount: (state) => {
            if (state && state.gptSearchCount > 0) {
                state.gptSearchCount -= 1;
            }
        }
    }
})

export const { addUser, removeUser, decrementGptCount } = userSlice.actions;

export default userSlice.reducer;