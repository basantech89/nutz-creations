import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "./types";

const initialState: IUser = { firstName: '', lastName: '', email: '' }

const commonSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<IUser>) => {
			state.firstName = action.payload.firstName
			state.lastName = action.payload.lastName
			state.email = action.payload.email
		}
	}
})

export const { addUser } = commonSlice.actions
export default commonSlice.reducer
