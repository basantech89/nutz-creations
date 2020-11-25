import { createSlice } from '@reduxjs/toolkit'
import { TStatus } from '../types'

type SliceState = {
	status: TStatus
	error: Error | null
}

const initialState: SliceState = { status: 'idle', error: null }

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		statusPending: (state) => {
			state.status = 'pending'
		},
		statusResolved: (state) => {
			state.status = 'resolved'
		},
		statusRejected: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload.error
		}
	}
})

export const {
	statusPending,
	statusResolved,
	statusRejected
} = commonSlice.actions
export default commonSlice.reducer
