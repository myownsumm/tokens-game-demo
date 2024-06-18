import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { EventsGateway } from './events.gateway';


const TOKENS_AVAILABLE = [
  { userId: '111', tokens: 10 },
  { userId: '222', tokens: 10 },
  { userId: '333', tokens: 10 },
  { userId: '444', tokens: 10 }
];

const TOKENS_TRANSFERS = [
  { senderId: '111', recipientId: '222', amount: 5, status: 'pending' },
  { senderId: '222', recipientId: '333', amount: 4, status: 'pending' },
  { senderId: '444', recipientId: '333', amount: 5, status: 'pending' },
  { senderId: '222', recipientId: '111', amount: 1, status: 'pending' },
  { senderId: '333', recipientId: '111', amount: 9, status: 'pending' }
]


@Controller()
export class AppController {
  @WebSocketServer()
  server: Server;

  constructor(private readonly appService: AppService, private readonly eventsGateway: EventsGateway) {
  }

  @Get()
  getHello(): string {
    // setInterval(() => {
    //   this.eventsGateway.sendMessageToAll();
    // }, 1000);

    // TOKENS_AVAILABLE.find(ta => ta.userId === '111').tokens = 5;

    return this.appService.getHello();
  }

  @Get('/users-tokens')
  getUsersTokens() {
    return TOKENS_AVAILABLE;
  }

  @Get('/tokens-transfers')
  getTokenTransfers() {
    return TOKENS_TRANSFERS;
  }
}
