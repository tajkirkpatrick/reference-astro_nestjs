import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function loadImport(): Promise<any> {
    return await import('../dist/server/entry.mjs');
}

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );

    app.use((await loadImport()).handler);

    await app.listen(3000);
}
bootstrap();
