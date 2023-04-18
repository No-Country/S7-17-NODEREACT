const { createSlice } = require("@reduxjs/toolkit");

export const socketSlice = createSlice({
  name: "socket",
  initialState: {},
  reducers: {
    initSocket: (state, action) => {
      console.log(action.payload);
      ({ state: action.payload });
    }
  }
});

// export const setSocket = socket => dispatch => {
//   console.log(socket.socket.id);
//   dispatch(initSocket(socket.socket.id));
// };

export const { initSocket } = socketSlice.actions;
export default socketSlice.reducer;
