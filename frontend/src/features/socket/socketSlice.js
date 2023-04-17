const { createSlice } = require("@reduxjs/toolkit");

export const socketSlice = createSlice({
    name: "socket",
    initialState: {},
    reducers: {
        initSocket: (state, action) => {
            return action.payload;
        }
    }
});

export const setSocket = socket => dispatch => {
    dispatch(initSocket(socket));
};

export const { initSocket } = socketSlice.actions;
export default socketSlice.reducer;