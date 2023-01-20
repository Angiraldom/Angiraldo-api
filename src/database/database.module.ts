import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import configuration from '../config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigType<typeof configuration>) => {
        const { db, password, username } = config.database;
        return {
          uri: `mongodb+srv://${username}:${password}@cluster0.qhxy3yd.mongodb.net/landing-live?retryWrites=true&w=majority`,
          user: username,
          pass: password,
          dbName: db,
        };
      },
      inject: [configuration.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (config: ConfigType<typeof configuration>) => {
        const { db, password, username } = config.database;
        const uri = `mongodb+srv://${username}:${password}@cluster0.qhxy3yd.mongodb.net/landing-live?retryWrites=true&w=majority`;
        const client = new MongoClient(uri);
        await client.connect();
        return client.db(db);
      },
      inject: [configuration.KEY],
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
