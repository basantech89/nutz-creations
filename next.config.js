const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')
const { default: next } = require('next')

dotenvLoad()

const withEnv = nextEnv()
//** { env: { REACT_APP_BASE_URL: blabla } } */
module.exports = withEnv()
