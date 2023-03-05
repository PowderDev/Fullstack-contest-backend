import express from 'express'
import errorCatcher from './middlewares/errorCatcher'
import facilitiesRoutes from './routes/sportsFacilities.routes'
import ratingRoutes from './routes/rating.routes'
import prisma from './prisma'
import cors from 'cors'
import checkCache from './middlewares/checkCache'

{
  // JSON cannot parse Bigint on its own
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
  // MDN recommendation
  ;(BigInt.prototype as any).toJSON = function () {
    return this.toString()
  }
}

const app = express()
const PORT = 4000

app.use(cors())

app.use(express.json())

app.use(checkCache)

app.use('/api', facilitiesRoutes)
app.use('/api/rating', ratingRoutes)

app.use(errorCatcher)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

process.on('exit', () => {
  prisma.$disconnect()
})
