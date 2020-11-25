import jwt from 'jsonwebtoken'

module.exports = (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1]
		req.user = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY)
	} catch (error) {
		res.status(500).json({ success: false, error: error.message })
	}
}