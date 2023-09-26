//This we have defined in the common library, which was generate using "nest g lib common",
//we have its config in the nestjs.config.ts
import { AUTH_PACKAGE_NAME } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        //remember the compiled code will be in the dist folder
        protoPath: join(__dirname, '../auth.proto'),
        //the package name is defined in the proto file
        package: AUTH_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
