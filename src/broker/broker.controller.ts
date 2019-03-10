import { Controller, Post, Body } from '@nestjs/common';
import { BrokerService } from './broker.service';

@Controller('broker')
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) { }

  @Post('operations')
  operations(@Body() body) {
    return this.brokerService.operations(body);
  }
}
