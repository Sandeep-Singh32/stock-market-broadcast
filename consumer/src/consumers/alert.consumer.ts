import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlertConsumer {
  @MessagePattern('stock_prices_alert')
  alertNotifications(@Payload() data): void {
    console.log(`Received notification in alertNotifications : `, data);
    //if price is more than 4000 then send notification to users
  }
}
