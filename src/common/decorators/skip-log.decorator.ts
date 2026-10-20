import { Reflector } from '@nestjs/core';

export const SkipLog = Reflector.createDecorator<boolean>({
  transform: (value) => value ?? true,
});
