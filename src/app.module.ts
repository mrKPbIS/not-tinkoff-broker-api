import { Module, HttpModule } from '@nestjs/common';

import { AppService } from './app.service';
import { BrokerService } from './broker/broker.service';

import { AppController } from './app.controller';
import { BrokerController } from './broker/broker.controller';
import { TinkoffApiService } from './api/tinkoff.api.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, BrokerController],
  providers: [AppService, BrokerService, TinkoffApiService],
})
export class AppModule {}
