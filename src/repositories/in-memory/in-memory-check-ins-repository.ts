
import { CheckInsRepositoryInterface } from "../interfaces/check-ins-repository";
import { CheckIn, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryCheckInsRepository implements CheckInsRepositoryInterface {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const checkOnSameDate = this.items.find(checkIn => checkIn.user_id === userId)

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