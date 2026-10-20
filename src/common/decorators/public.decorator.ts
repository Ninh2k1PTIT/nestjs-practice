import { Reflector } from '@nestjs/core';

export const Public = Reflector.createDecorator<boolean>({
  transform: (value) => value ?? true,
});
