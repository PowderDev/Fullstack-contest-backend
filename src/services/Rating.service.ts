import prisma from '../prisma'

class RatingService {
  async rateFacility(rating: number, facilityId: number) {
    const currentRating = await prisma.rating.findFirst({
      where: { facilityId },
    })

    if (!currentRating) {
      await prisma.rating.create({
        data: {
          rating,
          facility: {
            connect: {
              id: facilityId,
            },
          },
        },
      })
    } else {
      const newRating = (Number(currentRating.rating) + rating) / 2
      await prisma.rating.update({
        where: { facilityId },
        data: { rating: newRating },
      })
    }
  }
}

export default new RatingService()
