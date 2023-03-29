const { createSlice } = require("@reduxjs/toolkit");

const initialState =
{
    username: "",
    email: "",
    profileImg: "",
    lifes: 0,
    points: 0,
    coins: 0,
    session: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAuth: (state, action) => {
            const { username } = action.payload
            state.username = username
            state.session = true
        }
    }
})

export const { loginAuth } = authSlice.actions
export default authSlice.reducer