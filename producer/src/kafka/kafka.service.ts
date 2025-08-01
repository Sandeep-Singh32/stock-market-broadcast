import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  private logger = new Logger(KafkaService.name);

  constructor(
    @Inject('KAFKA_PRODUCER') private readonly kafkaClient: ClientKafka,
  ) {}
  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  sendMessage(topic: string, message: any) {
    console.log(`Sending message from producer app to topic ${topic}: `, message);
    this.kafkaClient.emit(topic, message);
  }
}
