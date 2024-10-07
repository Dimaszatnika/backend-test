import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('execute')
  async executeTransaction(@Body() body) {
    const { userId, amount } = body;
    return await this.transactionService.executeTransaction(userId, amount);
  }
}
