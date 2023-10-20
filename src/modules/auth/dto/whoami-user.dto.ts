import { Request } from '@nestjs/common';

export interface whoamiType extends Request {
  readonly user: {
    id: number;
  };
}
