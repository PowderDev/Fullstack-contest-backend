import { SportsFacility } from '@prisma/client'
import { parse } from 'csv-parse'
import * as fs from 'node:fs'
import ApiError from '../exceptions/ApiError'
import { parseDottedDate } from '../helpers/format'
import { numberRegExp, dateRegExp } from '../helpers/regExps'
import prisma from '../prisma'

class SportsFacilityService {
  ACCEPTABLE_COLUMNS = [1, 2, 4, 5, 6, 10, 14, 18, 19, 20, 21, 44, 47, 48]
  rows: SportsFacility[] = []

  seed(pathToCSV: string) {
    fs.createReadStream(pathToCSV, 'utf-8')
      .pipe(
        parse({
          from: 2,
          to: 928,
          onRecord: (record: string[]) =>
            record
              .filter((_, i) => this.ACCEPTABLE_COLUMNS.includes(i + 1))
              .map((value) => {
                if (numberRegExp.test(value)) {
                  return Number(value)
                }
                if (dateRegExp.test(value)) {
                  return parseDottedDate(value)
                }
                if (value === '') {
                  return null
                }
                return value
              }),
        }),
      )

      .on('data', (record) => {
        const row = this.parseCSVRecord(record)
        prisma.sportsFacility.create({ data: row }).then((facility) => {
          console.log(`Successfully seeded ${facility.id}`)
        })
      })
      .on('error', (error) => console.error(error))
  }

  parseCSVRecord(record: any[]) {
    return {
      id: record[0],
      name: record[1],
      active: record[2],
      briefDescription: record[4],
      fullDescription: record[3],
      federalSubject: record[5],
      address: record[6],
      facilityAction: record[7],
      actionStartDate: record[8],
      actionEndDate: record[9],
      budget: record[10],
      type: record[11],
      coord_x: record[12],
      coord_y: record[13],
    } as SportsFacility
  }

  async getBuiltFacilitiesPerYear() {
    const facilities = await prisma.$queryRaw<
      {
        year: number | null
        amount: string | number
      }[]
    >`
      SELECT DATE_PART('YEAR', "actionEndDate") AS year, COUNT(*) AS amount
      FROM "SportsFacility"
      WHERE "facilityAction"='строительство'
      GROUP BY year
      ORDER BY year
    `

    const formattedFacilities = facilities
      .filter((f) => f.year && f.year >= 2000)
      .map((f) => ({ year: f.year!.toString(), amount: Number(f.amount) }))

    return formattedFacilities
  }

  async getTopFederalSubjectsByFacilities() {
    let federalSubjects = await prisma.$queryRaw<
      {
        federalSubject: string | null
        amount: string | number
      }[]
    >`
      SELECT "federalSubject", COUNT(*) AS amount
      FROM "SportsFacility"
      GROUP BY "federalSubject"
      ORDER BY amount DESC
      LIMIT 10
    `

    federalSubjects = federalSubjects.map((s) => ({
      ...s,
      amount: Number(s.amount),
    }))

    return federalSubjects
  }

  async getTopFederalSubjectsByBudget() {
    const federalSubjects = await prisma.$queryRaw<
      {
        federalSubject: string | null
        budget: string
      }[]
    >`
      SELECT "federalSubject", SUM(budget) AS budget
      FROM "SportsFacility"
      GROUP BY "federalSubject"
      ORDER BY budget DESC
      LIMIT 10
    `

    return federalSubjects
  }

  async getTopTypesByAmount() {
    let types = await prisma.$queryRaw<
      {
        type: string | null
        amount: string | number
      }[]
    >`
      SELECT "type", COUNT(*) AS amount
      FROM "SportsFacility"
      GROUP BY "type"
      ORDER BY amount DESC
      LIMIT 10
    `

    types = types.map((s) => ({
      ...s,
      amount: Number(s.amount),
    }))

    return types
  }

  async getCoordsOfActiveFacilities() {
    const data = await prisma.sportsFacility.findMany({
      where: { active: 'Y', coord_x: { not: null }, coord_y: { not: null } },
      select: { coord_x: true, coord_y: true, id: true },
    })

    return data
  }

  async getFacilityDetails(id: number) {
    const facility = await prisma.sportsFacility.findFirst({
      where: { id },
      include: { rating: { select: { rating: true } } },
    })

    if (!facility) {
      throw ApiError.NotFound('Facility not found')
    }

    return facility
  }
}

export default new SportsFacilityService()
