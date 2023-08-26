import {
  Abstract,
  Catch, Type,
} from '@nestjs/common';

export const CustomCatch = (...exceptions: Array<Type<any> | Abstract<any>>): ClassDecorator => {
  return Catch(...exceptions)
}