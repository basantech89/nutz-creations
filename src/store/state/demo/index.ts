import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IDemo, IDemoPayload } from './types'
import { get } from '../../../utils/api'

const initialState: IDemo = { posts: [], status: 'idle', error: null }

export const fetchDemoData = createAsyncThunk('/posts/fetchPosts', async () => {
	const data = await get('/posts')
	return { data } as IDemoPayload
})

const demoSlice = createSlice({
	name: 'demo',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchDemoData.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(fetchDemoData.fulfilled, (state, action) => {
			state.status = 'resolved'
			state.posts = state.posts.concat(action.payload.data)
		})
		builder.addCase(fetchDemoData.rejected, (state, action) => {
			state.status = 'rejected'
			state.error = action.error
		})
	}
})

export default demoSlice.reducer
