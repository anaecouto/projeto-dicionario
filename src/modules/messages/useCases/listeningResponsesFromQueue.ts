import EventEmitterHandler from "src/eventEmitterHandler";
import { RabbitMQServer } from "src/rabbitMQ.server";

export class ListeningResponsesFromQueueUseCase {
  static server = new RabbitMQServer(
    "amqp://admin:admin@52.91.169.76:5672/lbs"
  );
  constructor() {}

  static async execute(): Promise<void> {
    await ListeningResponsesFromQueueUseCase.server.start();
    await this.server.consume("crawler-response", (message) => {
      const convertedMessage = message.content.toString();
      if (convertedMessage) {
        const parsed = Buffer.from(JSON.parse(convertedMessage).data.data.data).toString();
        EventEmitterHandler.getInstance().emit(
          "update.contract.crawler.result",
          JSON.parse(parsed)
        );
      }
      console.log("BOOOOOOOTSTRAP: ", convertedMessage);
    });
  }
}
