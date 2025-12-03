import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MongoClient } from 'mongodb';
import { MongoEncryptService } from '@eqxjs/mongodb-encrypt-data';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mongodb: MongoEncryptService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('create-coleection')
  async createCollection(): Promise<string> {
    const client = new MongoClient(process.env.MONGODB_KEYVAULT || '');
    await client.connect();
    const [db, collection] =
      process.env.AZURE_KEYVAULT_NAMESPACE?.split('.') ||
      'encryption.__keyVault'.split('.');
    if ((await client.db(db).collection(collection).countDocuments()) === 0) {
      await this.mongodb.createDataKey();
    } else {
      return 'Key vault collection already exists.';
    }
    return 'Document inserted with encrypted fields.';
  }
}
