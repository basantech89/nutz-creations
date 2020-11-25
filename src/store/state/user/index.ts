import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit'
import {IUser, IUserState} from "./types";

const initialState: IUser = { name: '', email: '' }

const commonSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser: {
			reducer: (state, action: PayloadAction<IUser>) => {
				state.name = action.payload.name
				state.email = action.payload.email
			},
			prepare: (user: IUser) => {
				return { payload: { id: nanoid(), ...user } }
			}
		}
	}
})

export const { addUser } = commonSlice.actions
export default commonSlice.reducer
