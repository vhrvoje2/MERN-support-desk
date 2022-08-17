import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message =
            (error.response
                && error.response.data
                && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message =
            (error.response
                && error.response.data
                && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(register.rejected, (state, action) => {
                state.user = null
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer