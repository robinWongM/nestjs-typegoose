import { getModelToken, getConnectionToken } from './typegoose.utils';
import { TypegooseClass } from './typegoose-class.interface';
import { Connection } from 'mongoose';
import * as isClass from 'is-class';

export type TypegooseClassWithOptions = {
  typegooseClass: TypegooseClass<any>,
}

export const isTypegooseClassWithOptions = (item): item is TypegooseClassWithOptions =>
  isClass(item.typegooseClass);

export const convertToTypegooseClassWithOptions = (item: TypegooseClass<any> | TypegooseClassWithOptions): TypegooseClassWithOptions => {
  if (isClass(item)) {
    return {
      typegooseClass: item as TypegooseClass<any>
    };
  } else if (isTypegooseClassWithOptions(item)) {
    return item;
  }

  throw new Error('Invalid model object');
};

export function createTypegooseProviders(connectionName: string, models: TypegooseClassWithOptions[] = []) {
  return models.map(({ typegooseClass }) => ({
    provide: getModelToken(typegooseClass.name),
    useFactory: (connection: Connection) => new typegooseClass().setModelForClass(typegooseClass, {
      existingConnection: connection,
    }),
    inject: [getConnectionToken(connectionName)]
  }));
}