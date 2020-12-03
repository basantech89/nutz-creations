import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { query } from '../../../lib/db'
import User from '../../../models/User'
import dbConnect from '../../../src/utils/dbConnect'

const handler = nc().post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(406)
        .json({ success: false, error: 'Credentials not supplied' })
    }

    const result = await query(
      `
        SELECT email from users WHERE email = ?
      `,
      req.body.email
    )

    console.log('here result', result)

    // User.find({ email })
    //   .exec()
    //   .then(async (users) => {
    //     if (users.length < 1) {
    //       return res.status(401).json({ success: false, error: 'Auth failed' })
    //     }
    //     const match = await bcrypt.compare(password, users[0].password)
    //     if (match) {
    //       const token = jwt.sign(
    //         {
    //           email,
    //           userId: users[0]._id
    //         },
    //         process.env.NEXT_PUBLIC_SECRET_KEY,
    //         {
    //           expiresIn: '1h'
    //         }
    //       )
    //       return res.status(200).json({
    //         success: true,
    //         data: {
    //           token,
    //           firstName: users[0].first_name,
    //           lastName: users[0].last_name,
    //           email: users[0].email
    //         }
    //       })
    //     } else {
    //       res.status(401).json({ success: false, error: 'Auth failed' })
    //     }
    //   })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default handler
