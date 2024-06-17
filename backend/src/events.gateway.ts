import {
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@WebSocketGateway(81, {
  cors: {
    origin: '*'
  },
  path: '/socket.io'
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private clients: Set<Socket> = new Set();

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${ client.id }`);
    this.clients.add(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${ client.id }`);
    this.clients.delete(client);
  }

  @SubscribeMessage('events')
  handleMessage(client: Socket, payload: any): void {
    console.log(`Message from client ${ client.id }: ${ payload }`);
    this.server.emit('events', payload);
  }

  sendMessageToAll() {
    this.server.emit('events','{message to all}')
  }
}