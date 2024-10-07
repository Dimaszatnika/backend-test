import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class TransactionService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Pool) {}

  async executeTransaction(userId: number, amount: number) {
    const connection = await this.db.getConnection();
    try {
      await connection.query('START TRANSACTION');
      
      // Kurangi saldo user
      await connection.query('UPDATE users SET balance = balance - ? WHERE id = ?', [amount, userId]);

      // Catat pembayaran
      await connection.query('INSERT INTO payments (user_id, amount) VALUES (?, ?)', [userId, amount]);

      // Catat log transaksi
      await connection.query('INSERT INTO transaction_logs (user_id, amount) VALUES (?, ?)', [userId, amount]);

      await connection.query('COMMIT');
      return { message: 'Transaction successful' };
    } catch (error) {
      await connection.query('ROLLBACK');
      throw new Error('Transaction failed');
    } finally {
      connection.release();
    }
  }
}
