import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common'; // ValidationPipe
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication');

  // ✅ Register cookie-parser FIRST, before any other middleware
  app.use(cookieParser());

  // Validation pipe
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     // forbidNonWhitelisted: true,
  //     transform: true,
  //     transformOptions: {
  //       enableImplicitConversion: true,
  //     },
  //   }),
  // );

  // CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', // viz-frontend
      'http://localhost:3010', // auth-frontend
      'http://localhost:3020', // admin-frontend
      process.env.FRONTEND_URL,
      process.env.AUTH_FRONTEND_URL,
      process.env.ADMIN_FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
    ],
  });

  // ============================================
  // SWAGGER CONFIGURATION
  // ============================================
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API de autenticación y gestión de usuarios')
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticación')
    .addTag('users', 'Endpoints de usuarios')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addCookieAuth('auth_token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'auth_token',
      description: 'JWT token stored in httpOnly cookie',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'Auth API Documentation',
  });

  const port = process.env.PORT ?? 4000;
  await app.listen(port);

  logger.log(`🚀 Server running on http://localhost:${port}`);
  logger.log(
    `📚 Swagger documentation available at http://localhost:${port}/api/docs`,
  );
}

bootstrap().catch((err) => {
  console.error('❌ Bootstrap error:', err);
  process.exit(1);
});
