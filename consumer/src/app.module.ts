import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { KafkaService } from './kafka/kafka.service';
import { Broady } from './consumers/broadcast.consumer';
import { AlertConsumer } from './consumers/alert.consumer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CONSUMER',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [Broady, AlertConsumer],
  providers: [AppService, KafkaService],
})
export class AppModule {}
