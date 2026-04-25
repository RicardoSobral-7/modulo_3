
import { CheckInsRepositoryInterface } from "../interfaces/check-ins-repository";
import { CheckIn, Prisma } from '@prisma/client';
import dayjs from "dayjs";
import { randomUUID } from 'node:crypto';

export class InMemoryCheckInsRepository implements CheckInsRepositoryInterface {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {

    // aqui a gente pega o momento que inicia o dia
    const startOfTheDay = dayjs(date).startOf('date')
    // aqui a gente pega o momento que finaliza 
    const endOfTheDay = dayjs(date).endOf('date')

    const checkOnSameDate = this.items.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      checkIn.user_id === userId && isOnSameDate
    })

    if (!checkOnSameDate) {
      return null
    }

    return checkOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {

    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gymId: data.gymId,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}