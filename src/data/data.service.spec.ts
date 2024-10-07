import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class DataService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Pool) {}

  async saveData() {
    const connection = await this.db.getConnection();
    try {
      await connection.query('START TRANSACTION');
      const [result] = await connection.query('SELECT MAX(running_number) as max FROM data');
      const newRunningNumber = result[0].max + 1;
      const uniqueCode = `CODE-${newRunningNumber}`;
      await connection.query('INSERT INTO data (unique_code, running_number) VALUES (?, ?)', [uniqueCode, newRunningNumber]);
      await connection.query('COMMIT');
      return { uniqueCode, runningNumber: newRunningNumber };
    } catch (error) {
      await connection.query('ROLLBACK');
      throw new Error('Error saving data');
    } finally {
      connection.release();
    }
  }
}
