import { SerializedError } from '@reduxjs/toolkit'
import { TStatus } from '../types'

declare interface IDemoData {
	userId: number
	id: number
	title: string
	body: string
}

export declare interface IDemo {
	posts: Array<IDemoData>
	status: TStatus
	error: SerializedError | null
}

export declare interface IDemoPayload {
	data: Array<IDemoData>
}
