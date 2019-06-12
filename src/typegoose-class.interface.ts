import {Typegoose} from '@robinwongm/typegoose';

export interface TypegooseClass<T extends Typegoose> {
  new (...args: any[]): T;
}