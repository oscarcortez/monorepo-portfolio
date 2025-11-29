import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import {
  GoogleProfile,
  GoogleUser,
} from './interfaces/google-profile.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL');

    console.log({ clientID, clientSecret, callbackURL });
    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Google OAuth credentials are not configured');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });

    this.logger.log('✅ GoogleStrategy initialized');
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ): Promise<any> {
    this.logger.log(`🔍 Validating user: ${profile.emails?.[0]?.value}`);
    try {
      const { name, emails, photos } = profile;

      const googleUser: GoogleUser = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        accessToken,
      };

      // Aquí guardas en tu BD
      const savedUser = await this.authService.validateGoogleUser(googleUser);

      done(null, savedUser);
    } catch (error) {
      this.logger.error('Error validating Google user', error);
      done(error, false);
    }
  }
}
