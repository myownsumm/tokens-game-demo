import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { EventsGateway } from './events.gateway';
import { v4 as uuidv4 } from 'uuid';


const TOKENS_AVAILABLE_MAP = new Map();
TOKENS_AVAILABLE_MAP.set('111', { tokens: 10 });
TOKENS_AVAILABLE_MAP.set('222', { tokens: 10 });
TOKENS_AVAILABLE_MAP.set('333', { tokens: 10 });
TOKENS_AVAILABLE_MAP.set('444', { tokens: 10 });


const TOKENS_TRANSFERS_MAP = new Map();
TOKENS_TRANSFERS_MAP.set(uuidv4(), { senderId: '111', recipientId: '222', amount: 5, status: 'pending' });
TOKENS_TRANSFERS_MAP.set(uuidv4(), { senderId: '222', recipientId: '333', amount: 5, status: 'pending' });
TOKENS_TRANSFERS_MAP.set(uuidv4(), { senderId: '444', recipientId: '111', amount: 5, status: 'pending' });
TOKENS_TRANSFERS_MAP.set(uuidv4(), { senderId: '444', recipientId: '111', amount: 5, status: 'pending' });


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
    const list = [];

    for (let [ id, value ] of TOKENS_AVAILABLE_MAP) {
      list.push({ id, ...value });
    }

    return list;
  }

  @Get('/tokens-transfers')
  getTokenTransfers() {
    const list = [];

    for (let [ id, value ] of TOKENS_TRANSFERS_MAP) {
      list.push({ id, ...value });
    }

    return list;
  }

  @Post('/tokens-transfers')
  createTokenTransfer(@Body() tokenTransfer: any) {
    tokenTransfer.status = 'pending';

    TOKENS_TRANSFERS_MAP.set(uuidv4(), tokenTransfer);
  }

  @Put('/tokens-transfers/:id/approve')
  approveTokenTransfer(@Param('id') id: string) {
    const transfer = TOKENS_TRANSFERS_MAP.get(id);

    if (!transfer) {
      throw new BadRequestException(`Token transfer not found: ${ id }`);
    }

    const senderTokensAvailable = TOKENS_AVAILABLE_MAP.get(transfer.senderId);
    const recipientTokensAvailable = TOKENS_AVAILABLE_MAP.get(transfer.recipientId);

    if (!senderTokensAvailable) {
      throw new BadRequestException(`User tokens available not found: ${ id }`);
    }

    if (senderTokensAvailable.tokens < transfer.amount) {
      throw new BadRequestException(`User has only ${ senderTokensAvailable.tokens } tokens available. Operation is not allowed`);
    }

    senderTokensAvailable.tokens -= transfer.amount;
    recipientTokensAvailable.tokens += transfer.amount;
    transfer.status = 'approved';
  }

  @Put('/tokens-transfers/:id/reject')
  rejectTokenTransfer(@Param('id') id: string) {
    TOKENS_TRANSFERS_MAP.get(id).status = 'rejected';
  }
}
