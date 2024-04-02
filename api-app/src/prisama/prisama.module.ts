import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService,PrismaService]
})
export class PrisamaModule {}
