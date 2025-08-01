import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StockMarket } from './stockMarket/stockerMarket';
import { KafkaService } from './kafka/kafka.service';

@Injectable()
export class AppService {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly stockClass: StockMarket,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  updateStockMarket() {
    const stockPrices: Record<string, number> =
      this.stockClass.getStockPrices();
    this.kafkaService.sendMessage('stock_prices', {
      key: 'stock_prices_data',
      value: stockPrices,
    });
  }
}
