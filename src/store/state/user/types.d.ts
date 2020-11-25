import { SerializedError } from '@reduxjs/toolkit'
import { TStatus } from '../types'

declare interface IUser {
	name?: string
	email: string
}

export declare interface IUserState {
	user: IUser | null
}
