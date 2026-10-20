import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  signin(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  signup(@Body() dto: Signup) {
    return this.authService.signup(dto);
  }
}
