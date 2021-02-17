import { INestApplication, Injectable } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class CoreSwagger {
    private static readonly title = 'Database model comparator';
    private static readonly description = 'API to compare datamodels';
    private static readonly version = '1.0';
    private static readonly tag = 'dmc';
    private static readonly rootPath = 'api';

    static initSwagger(app: INestApplication) {
        const options = new DocumentBuilder()
            .setTitle(this.title)
            .setDescription(this.description)
            .setVersion(this.version)
            .addTag(this.tag)
            .build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(this.rootPath, app, document);
    }
}
