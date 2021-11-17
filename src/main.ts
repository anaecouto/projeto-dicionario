

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { AppModule } from "./app.module";
import { RedocModule, RedocOptions } from "nestjs-redoc";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // isso faz com que apenas o que estiver no validation pipe chegue na requisição
    })
  );
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "src", "shared", "views"));
  app.setViewEngine("hbs");

  console.log(
    "CAMINHO VIEWS: ",
    join(__dirname, "..", "src", "shared", "views")
  );
  app.setViewEngine("ejs");
  const config = new DocumentBuilder()
    .setTitle("Ban Digital API")
    .setDescription("Ban Digital API documentation.")
    .setVersion("1.0.0")
    .addTag("BanDigital-API")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const redocOptions: RedocOptions = {
    title: 'BanDigital API',
    logo: {
      url: 'https://bandigital-public-bucket.s3.amazonaws.com/logo-bandigital.png',
      backgroundColor: '#003f98',
      altText: 'Logo BanDigital '
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    noAutoAuth: false
  };

  await RedocModule.setup('/api/docs', app, document, redocOptions);
  // SwaggerModule.setup("api/docs", app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
