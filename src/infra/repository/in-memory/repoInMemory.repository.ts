/* eslint-disable @typescript-eslint/no-explicit-any */

import { NotFoundException } from "@/core/exceptions/notFound.error";
import { randomUUID } from "crypto";
import { AlreadyExistsException } from "@/core/exceptions/users/alreadyExists.error";
import { AuditModel } from "@/core/models/audit.model";
import { Repository } from "@/core/repositories/repository.contract";
import { InputCreation } from "@/core/contracts/common/dto.contract";

type EntityStorage = Record<string, any[]>;

export class InMemoryRepository<T extends AuditModel>
  implements Repository<T, string>
{
  public static data: EntityStorage = {};

  static pull(entityName: string) {
    if (!InMemoryRepository.data[entityName]) {
      InMemoryRepository.data = {
        ...InMemoryRepository.data,
        [entityName]: [],
      };
    }
  }

  constructor(protected readonly _entityName: string) {
    InMemoryRepository.pull(this._entityName);
  }

  async create(data: InputCreation<T>): Promise<T> {
    const existingEntity = InMemoryRepository.data[this._entityName].find(
      (entity) =>
        Object.entries(data).every(
          ([key, value]) => entity[key as keyof T] === value
        )
    );

    if (existingEntity) {
      throw new AlreadyExistsException();
    }

    const dataCreation = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      createdBy: String(data.createdBy),
    } as T;

    InMemoryRepository.data[this._entityName].push(dataCreation);

    return dataCreation;
  }

  async updateById(id: string, data: Partial<T>): Promise<T> {
    const dataInMemory = await this.findById(id);

    const updatedData = {
      ...dataInMemory,
      ...data,
      updatedAt: new Date(),
    };

    InMemoryRepository.data[this._entityName] = InMemoryRepository.data[
      this._entityName
    ].map((entity) => (entity.id === id ? updatedData : entity));

    return updatedData;
  }

  async update(data: T): Promise<T[]> {
    const dataFound = InMemoryRepository.data[this._entityName].filter(
      (entity) =>
        Object.entries(data).every(
          ([key, value]) => entity[key as keyof T] === value
        )
    );

    if (!dataFound) {
      throw new NotFoundException();
    }

    dataFound.map((dataToUpdate) => ({
      ...dataToUpdate,
      updatedAt: new Date(),
    }));

    InMemoryRepository.data[this._entityName] = InMemoryRepository.data[
      this._entityName
    ].map((entity) =>
      dataFound.some((item) => item.id === entity.id)
        ? { ...entity, ...data, updatedAt: new Date() }
        : entity
    );

    return dataFound;
  }

  async deleteById(id: string): Promise<T> {
    const dataInMemory = await this.findById(id);

    InMemoryRepository.data[this._entityName] = InMemoryRepository.data[
      this._entityName
    ].filter((entity) => id === entity.id);

    return dataInMemory;
  }

  async delete(data: T): Promise<T[]> {
    const dataFound = InMemoryRepository.data[this._entityName].filter(
      (entity) =>
        Object.entries(data).every(([key, value]) => entity[key] === value)
    );

    if (!dataFound) {
      throw new NotFoundException();
    }

    const dataDeleted = dataFound.map((dataToDelete) => ({
      ...dataToDelete,
      deletedAt: new Date(),
    }));

    InMemoryRepository.data[this._entityName] = InMemoryRepository.data[
      this._entityName
    ].filter((entity) => !dataFound.some((item) => item.id === entity.id));

    return dataDeleted;
  }

  async findById(id: string): Promise<T> {
    const dataInMemory = InMemoryRepository.data[this._entityName].find(
      (entity) => entity.id === id
    );

    if (!dataInMemory) {
      throw new NotFoundException();
    }

    return dataInMemory;
  }

  async findByParams(params: Partial<T>): Promise<T[]> {
    const dataInMemory = InMemoryRepository.data[this._entityName].filter(
      (entity) =>
        Object.entries(params).every(([key, value]) => entity[key] === value)
    );

    if (!dataInMemory) {
      return [];
    }

    return dataInMemory;
  }
}
