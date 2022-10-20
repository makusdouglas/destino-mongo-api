import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  encryptText(text: string): string {
    return crypto
      .createHmac('sha256', process.env.SECRET_KEY_PASSWORD)
      .update(text)
      .digest('hex');
  }
}
