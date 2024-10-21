import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

@Injectable()
export abstract class OAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    strategyName: string,
    clientIDConfigKey: string,
    clientSecretConfigKey: string,
    callbackPath: string,
    scope: string[] = ["profile", "email"]
  ) {
    super({
      clientID: configService.get(clientIDConfigKey),
      clientSecret: configService.get(clientSecretConfigKey),
      callbackURL: `${configService.get("SERVER_URL")}${callbackPath}}`,
      scope,
    });
    this.name = strategyName;
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ) {
    const { displayName, emails, photos } = profile;

    const user = {
      email: emails?.[0]?.value,
      name: displayName,
      picture: photos?.[0]?.value,
    };

    done(null, user);
  }
}

// google

// @Injectable()
// export class GoogleStrategy extends OAuthStrategyBase {
//   constructor(configService: ConfigService) {
//     super(
//       configService,
//       'google',
//       'GOOGLE_CLIENT_ID',
//       'GOOGLE_CLIENT_SECRET',
//       '/auth/google/callback',
//       ['profile', 'email'],
//     );
//   }
// }

// @Injectable()
// export class YandexStrategy extends OAuthStrategyBase {
//   constructor(configService: ConfigService) {
//     super(
//       configService,
//       'yandex',
//       'YANDEX_CLIENT_ID',
//       'YANDEX_CLIENT_SECRET',
//       '/auth/yandex/callback',
//     );
//   }
// }
