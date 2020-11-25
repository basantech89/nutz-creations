import mongoose, { Document, Schema } from 'mongoose'

declare interface IUserDocument extends Document {
	// id: mongoose.Types.ObjectId
	first_name: string
	last_name: string
	email: string
	password: string
}

const UserSchema: Schema = new mongoose.Schema({
	// id: mongoose.Schema.Types.ObjectId,
	first_name: {
		type: String,
		require: [true, 'Please provide a name for this user']
	},
	last_name: {
		type: String
	},
	email: {
		type: String,
		unique: true,
		require: [true, 'Please provide an email for this user'],
		match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	},
	password: {
		type: String,
		require: [true, 'Please provide a password for this user']
	}
})

export default mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema)