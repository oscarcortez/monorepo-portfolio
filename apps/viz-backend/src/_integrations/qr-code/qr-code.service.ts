import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrCodeService {
  toDataURL(data: string): Promise<string> {
    return QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });
  }

  async toBuffer(data: string): Promise<Buffer> {
    return QRCode.toBuffer(data, {
      type: 'png',
      width: 300,
      margin: 2,
    });
  }

  async toSvg(data: string): Promise<string> {
    return QRCode.toString(data, { type: 'svg' });
  }

  async toFile(data: string, path: string): Promise<void> {
    await QRCode.toFile(path, data, {
      type: 'png',
      width: 300,
      margin: 2,
    });
  }
}
