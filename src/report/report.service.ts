import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class ReportService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Pool) {}

  async getTopCustomer() {
    const [rows] = await this.db.query(`
      SELECT customer_id, COUNT(*) as total_orders
      FROM orders
      GROUP BY customer_id
      ORDER BY total_orders DESC
      LIMIT 1
    `);
    return rows[0];
  }
}
