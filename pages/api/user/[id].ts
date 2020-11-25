import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import dbConnect from "../../../src/utils/dbConnect";

const handler = nc()
	.delete(async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			await dbConnect()

			const userId = req.query.id
			User.remove({ _id: userId })
				.exec()
				.then(data => {
					res.status(200).json({ success: true, data })
				})
				.catch(error => res.status(500).json({ success: false, error: error.message }))
		} catch (error) {
			res.status(500).json({ success: false, error: error.message })
		}
	})

export default handler
