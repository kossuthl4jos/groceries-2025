import { ObjectId } from "mongodb";

export function toDTO<T extends { _id: any }>(doc: T) {
  const { _id, ...rest } = doc;
  return {
    id: _id.toString(),
    ...rest,
  };
}

export function toMongo<T extends { id?: string }>(dto: T) {
  const { id, ...rest } = dto;
  return {
    ...(id && { _id: new ObjectId(id) }),
    ...rest,
  };
}
