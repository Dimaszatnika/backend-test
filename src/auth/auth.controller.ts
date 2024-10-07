import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-password')
  async loginWithPassword(@Body() body) {
    const { username, password } = body;
    return await this.authService.loginWithPassword(username, password);
  }

  @Post('login-otp')
  async loginWithOTP(@Body() body) {
    const { username, otp } = body;
    return await this.authService.loginWithOTP(username, otp);
  }
}
