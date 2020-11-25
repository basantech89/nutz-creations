
declare interface IUser {
	firstName: string
	lastName?: string
	email: string
}

export declare interface IUserState {
	user: IUser | null
}
