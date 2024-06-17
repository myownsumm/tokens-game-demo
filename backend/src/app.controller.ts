import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { EventsGateway } from './events.gateway';


@Controller()
export class AppController {
  @WebSocketServer()
  server: Server;

  constructor(private readonly appService: AppService, private readonly eventsGateway: EventsGateway) {
  }

  @Get()
  getHello(): string {
    setInterval(() => {
      this.eventsGateway.sendMessageToAll();
    }, 1000);

    return this.appService.getHello();
  }
}
