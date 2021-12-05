import { Connection, Channel, connect, Message } from "amqplib";

export class RabbitMQServer {
  private conn: Connection;
  private channel: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    try {
      this.conn = await connect(this.uri);
      this.channel = await this.conn.createChannel();
    } catch(err) {
      console.log('ERRO: ', err);
    }
  }
  async closeChannel(): Promise<void> {
    try {
      await this.channel.close();
    }catch(err) {
      console.log('ERRO: ', err)
    }
  }


//   async publishOnQueue(queue: string, message: string) {
//     return this.channel.sendToQueue(queue, Buffer.from(message));
//   }

//   async publishInExchange(
//     exchage: string,
//     routingKey: string,
//     message: string
//   ) {
//     return this.channel.publish(exchage, routingKey, Buffer.from(message))
//   }

  async cosume(queue: string, callback: (message: Message) => void) {
    return this.channel.consume(queue, (message) => {
      if (message) {
        callback(message);
        this.channel.ack(message);
      }
    });
  }
}
