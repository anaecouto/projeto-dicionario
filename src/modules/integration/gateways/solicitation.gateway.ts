import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { ICreateNewSolicitationRequestDTO } from "../useCases/solicitation/dto/createNewSolicitationDTO";

@WebSocketGateway({ namespace: "solicitation",
cors: {
  origin: '*',
  credentials: true
}
})
export class SolicitationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor() {}

  afterInit(server: any) {
    console.log("Initialize SolicitationGateway!");
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("joinRoom")
  async handleJoinRoom(
    client: Socket,
    solicitation: ICreateNewSolicitationRequestDTO
  ) {
    console.log("CONECNTOU NA SALA: ", solicitation.roomId);
    client.join(solicitation.roomId || "");
    client.emit("joinedRoom", solicitation.roomId);
  }

  @SubscribeMessage("leaveRoom")
  handleLeftRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit("leftRoom", room);
  }
}
