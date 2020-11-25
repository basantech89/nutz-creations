import nc from 'next-connect'
import * as jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const KEY = '83462@$qW'

const handler = nc()
	.post((req: NextApiRequest, res: NextApiResponse) => {
		if (!req.body) {
			res.statusCode = 404
			res.end('Error')
			return
		}

		const { username, password } = req.body

		res.json({
			token: jwt.sign(
				{ username }, KEY
			)
		})
	})

export default handler