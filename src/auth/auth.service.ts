import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Pool) {}

  // Login dengan username dan password
  async loginWithPassword(username: string, password: string) {
    const [rows] = await this.db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      return { message: 'Login successful' };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  // Login dengan OTP
  async loginWithOTP(username: string, otp: string) {
    const [rows] = await this.db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (user && user.otp_code === otp) {
      return { message: 'Login successful' };
    } else {
      throw new Error('Invalid OTP');
    }
  }
}
