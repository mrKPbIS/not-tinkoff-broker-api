import { Injectable } from '@nestjs/common';
import { BigNumber } from 'bignumber.js';
import { TinkoffApiService } from 'src/api/tinkoff.api.service';

@Injectable()
export class BrokerService {
  constructor(private readonly tinkoffApi: TinkoffApiService) { }

  async operations({
    sessionId,
    from,
    to,
    account,
    name,
  }) {
    if (!account) {
      return {error: 'no account'};
    }
    const data = {
      from,
      to,
      overnightsDisabled: true,
    };
    const path = `trading/user/operations?sessionId=${sessionId}`;
    const { status, payload } = await this.tinkoffApi.post(path, data);
    if (status === 'Error') {
      return {
        payload,
      };
    }
    const { items } = payload;
    const check = [];
    let sum: BigNumber = new BigNumber(0);
    for (const item of items) {
      const { operationType, payment, commission, accountName, showName } = item;
      if (name && showName !== name) {
        continue;
      }
      if (accountName !== account) {
        continue;
      }
      if (operationType === 'Buy' || operationType === 'Sell') {
        sum = BigNumber.sum(sum, new BigNumber(payment), new BigNumber(commission));
        check.push({
          payment,
          commission,
        });
      }
    }
    return {
      status,
      check,
      sum: this.bigNumberToNumber(sum),
    };
  }

  private bigNumberToNumber(value: BigNumber): number {
    return parseFloat(value.toFixed(2));
  }
}
