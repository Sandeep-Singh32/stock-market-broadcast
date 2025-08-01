import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from 'src/kafka/kafka.service';

@Controller()
export class Broady {
    constructor(private readonly kafkaService: KafkaService){}
  @MessagePattern('stock_prices')
  broadcastNotification(@Payload() data): void {
    console.log(`Received notification in broadcastNotification : `, data);
    //send the update to users
    this.kafkaService.sendMessage('stock_prices_alert', data);
    
  }
}
