
import { Gym } from '@prisma/client';
import { GymRepositoryInterface } from '../interfaces/gyms-repository';

export class InMemoryGymRepository implements GymRepositoryInterface {

  public items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find(item => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

}