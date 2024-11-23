import { EntityMapper } from "@/core/contracts/entityMapper.contract";
import { Repository } from "@/core/contracts/repository.contract";
import { NotFoundException } from "@/core/exceptions/notFound.error";

interface EntityBase {
  id: string;
}

export class InMemoryRepository<T, U extends EntityBase>
  implements Repository<T, string>
{
  static data: Record<string, unknown> = {};

  static pull(entityName: string) {
    if (!(InMemoryRepository.data as Record<string, unknown>)[entityName]) {
      InMemoryRepository.data = {
        ...InMemoryRepository.data,
        [entityName]: [],
      };
    }
  }

  constructor(
    protected readonly _entityMapper: EntityMapper<T, U>,
    protected readonly _entityName: string
  ) {
    InMemoryRepository.pull(this._entityName);
  }

  async create(data: T): Promise<T> {
    const dataInMemory = await this._entityMapper.toData(data);

    (InMemoryRepository.data[this._entityName] as U[]).push(dataInMemory);

    return await this._entityMapper.toEntity(dataInMemory);
  }

  async update(data: T): Promise<T> {
    const dataInMemory = await this._entityMapper.toData(data);

    const dataFound = (InMemoryRepository.data[this._entityName] as U[]).find(
      (entity) =>
        Object.entries(entity).every(
          ([key, value]) => entity[key as keyof U] === value
        )
    );

    if (!dataFound) {
      throw new NotFoundException();
    }

    return await this._entityMapper.toEntity(dataInMemory);
  }

  async delete(data: T): Promise<T> {
    const dataInMemory = await this._entityMapper.toData(data);

    const dataFound = (InMemoryRepository.data[this._entityName] as U[]).find(
      (entity) =>
        Object.entries(entity).every(
          ([key, value]) => entity[key as keyof U] === value
        )
    );

    if (!dataFound) {
      throw new NotFoundException();
    }

    return await this._entityMapper.toEntity(dataInMemory);
  }

  async findById(id: string): Promise<T> {
    const dataInMemory = (
      InMemoryRepository.data[this._entityName] as U[]
    ).find((entity) => (entity.id as string) === id);

    if (!dataInMemory) {
      throw new NotFoundException();
    }

    return await this._entityMapper.toEntity(dataInMemory);
  }

  async findByParams(params: Partial<T>): Promise<T[]> {
    const dataInMemory = (
      InMemoryRepository.data[this._entityName] as U[]
    ).filter((entity) =>
      Object.entries(params).every(
        ([key, value]) => entity[key as keyof U] === value
      )
    );

    if (!dataInMemory) {
      throw new NotFoundException();
    }

    return await Promise.all(dataInMemory.map(this._entityMapper.toEntity));
  }
}
