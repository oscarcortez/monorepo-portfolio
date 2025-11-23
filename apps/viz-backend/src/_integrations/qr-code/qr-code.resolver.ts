import { Resolver } from '@nestjs/graphql';
import { QrCodeService } from './qr-code.service';

@Resolver()
export class QrCodeResolver {
  constructor(private readonly qrCodeService: QrCodeService) {}
}
