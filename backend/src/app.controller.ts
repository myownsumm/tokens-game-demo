import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { EventsGateway } from './events.gateway';
import { v4 as uuidv4 } from 'uuid';

const USERS_TOKENS_MAP = new Map();
USERS_TOKENS_MAP.set('111', { tokens: 10 });
USERS_TOKENS_MAP.set('222', { tokens: 10 });
USERS_TOKENS_MAP.set('333', { tokens: 10 });
USERS_TOKENS_MAP.set('444', { tokens: 10 });

const TOKENS_TRANSFERS_MAP = new Map();
TOKENS_TRANSFERS_MAP.set(uuidv4(), {
  senderId: '111',
  recipientId: '222',
  amount: 5,
  status: 'pending',
});
TOKENS_TRANSFERS_MAP.set(uuidv4(), {
  senderId: '222',
  recipientId: '333',
  amount: 5,
  status: 'pending',
});
TOKENS_TRANSFERS_MAP.set(uuidv4(), {
  senderId: '444',
  recipientId: '111',
  amount: 5,
  status: 'pending',
});
TOKENS_TRANSFERS_MAP.set(uuidv4(), {
  senderId: '444',
  recipientId: '111',
  amount: 5,
  status: 'pending',
});

@Controller()
export class AppController {
  @WebSocketServer()
  server: Server;

  constructor(private readonly eventsGateway: EventsGateway) {}

  @Get('/users-tokens')
  getUsersTokens() {
    const list = [];

    for (const [id, value] of USERS_TOKENS_MAP) {
      list.push({ id, ...value });
    }

    return list;
  }

  @Get('/tokens-transfers')
  getTokenTransfers() {
    const list = [];

    for (const [id, value] of TOKENS_TRANSFERS_MAP) {
      list.push({ id, ...value });
    }

    return list;
  }

  @Post('/tokens-transfers')
  createTokenTransfer(@Body() tokenTransfer: any) {
    const userAvailableTokens = USERS_TOKENS_MAP.get(
      tokenTransfer.senderId,
    )?.tokens;

    if (!userAvailableTokens || userAvailableTokens < tokenTransfer.amount) {
      throw new BadRequestException(
        `Token transfer could not be created: Recipient has no such amount of tokens.`,
      );
    }

    tokenTransfer.status = 'pending';

    TOKENS_TRANSFERS_MAP.set(uuidv4(), tokenTransfer);

    this.eventsGateway.sendMessageToAll({ action: 'TOKEN_TRANSFER_CREATED' });
  }

  @Put('/tokens-transfers/:id/approve')
  approveTokenTransfer(@Param('id') id: string) {
    const transfer = TOKENS_TRANSFERS_MAP.get(id);

    if (!transfer) {
      throw new BadRequestException(`Token transfer not found: ${id}`);
    }

    const senderTokensAvailable = USERS_TOKENS_MAP.get(transfer.senderId);
    const recipientTokensAvailable = USERS_TOKENS_MAP.get(transfer.recipientId);

    if (!senderTokensAvailable) {
      throw new BadRequestException(`User tokens available not found: ${id}`);
    }

    if (senderTokensAvailable.tokens < transfer.amount) {
      throw new BadRequestException(
        `User has only ${senderTokensAvailable.tokens} tokens available. Operation is not allowed`,
      );
    }

    senderTokensAvailable.tokens -= Number(transfer.amount);
    recipientTokensAvailable.tokens += Number(transfer.amount);
    transfer.status = 'approved';

    this.eventsGateway.sendMessageToAll({ action: 'TOKEN_TRANSFER_APPROVED' });
  }

  @Put('/tokens-transfers/:id/reject')
  rejectTokenTransfer(@Param('id') id: string) {
    TOKENS_TRANSFERS_MAP.get(id).status = 'rejected';

    this.eventsGateway.sendMessageToAll({ action: 'TOKEN_TRANSFER_REJECTED' });
  }
}
