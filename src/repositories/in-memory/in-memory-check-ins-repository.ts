
import { CheckInsRepositoryInterface } from "../interfaces/check-ins-repository";
import { CheckIn, Prisma } from '@prisma/client';
import dayjs from "dayjs";
import { randomUUID } from 'node:crypto';

export class InMemoryCheckInsRepository implements CheckInsRepositoryInterface {


  public items: CheckIn[] = []

  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

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
    console.log(checkOnSameDate);

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

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter(item => item.user_id = userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find(item => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkinIndex = this.items.findIndex((item) => item.id === checkIn.id)

    // o findIndex vai encontrar o index que precisamos para ai sim nos mudarmos o necessário reatribuindo o checkin com validate_at atualizado
    if (checkinIndex >= 0) {
      this.items[checkinIndex] = checkIn
    }

    return checkIn
  }
}