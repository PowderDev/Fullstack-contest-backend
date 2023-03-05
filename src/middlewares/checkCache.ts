import { RequestHandler } from 'express'
import { redis } from '../redis'

const checkCache: RequestHandler = async (req, res, next) => {
  if (req.method !== 'GET') next()

  const cachedData = await redis.get(req.path)

  if (cachedData) {
    return res.send(cachedData)
  } else {
    next()
  }
}

export default checkCache
