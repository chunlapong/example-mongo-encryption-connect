import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  EncryptionOptions,
  MongoEncryptModule,
} from '@eqxjs/mongodb-encrypt-data';

@Module({
  imports: [
    MongoEncryptModule.register(process.env.MONGODB_KEYVAULT || '', {
      AzureKeyvaultName: process.env.AZURE_KEYVAULT_ALT_NAME || '',
      keyVaultNamespace:
        process.env.AZURE_KEYVAULT_NAMESPACE || 'encryption.__keyVault',
      localMasterKey: process.env.AZURE_LOCAL_MASTER_KEY || '',
    } as EncryptionOptions) as DynamicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
