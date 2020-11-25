import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src/utils/dbConnect";
import User from "../../../models/User";
import bcrypt from 'bcrypt'
import mongoose from "mongoose";

const handler = nc()
	.get(async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			await dbConnect()

			User.find().exec()
				.then(users => {
					res.status(200).json({ success: true, data: users })
				})
		} catch (error) {
			return res.status(500).json({ success: false, error: error.message })
		}
	})
	.post(async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			if (!req.body.email || !req.body.password || !req.body.first_name) {
				return res.status(406).json({ success: false, error: 'Pl send user information' })
			}

			await dbConnect()

			User.find({ email: req.body.email }).exec()
				.then(users => {
					if (users.length > 0) {
						return res.status(409).send({ success: false, error: 'User already exists' })
					} else {
						bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
							if (error) {
								return res.status(406).json({ success: false, error: error.message })
							} else {
								const user = new User({
									id: new mongoose.Types.ObjectId(),
									email: req.body.email,
									password: hashedPassword,
									first_name: req.body.first_name,
									last_name: req.body.last_name
								})
								user.save().then(data => {
									res.status(201).json({ success: true, data })
								}).catch(error => {
									res.status(406).json({ success: false, error: error.message })
								})
							}
						})
					}
				})
				.catch()
		} catch (error) {
			res.status(500).json({ success: false, error: error.message })
		}
	})

export default handler