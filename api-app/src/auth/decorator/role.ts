import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export const Role = createParamDecorator(
  (data: string[], context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (data.includes(request.user.Employee.role)) {
      return request.user.Employee.role;
    } else
      throw new HttpException(
        "Your role don't give you access",
        HttpStatus.FORBIDDEN,
      );
  },
);
