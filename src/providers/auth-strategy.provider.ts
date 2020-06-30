import {
  AuthenticationBindings,
  AuthenticationMetadata
} from '@loopback/authentication';
import {inject, Provider, ValueOrPromise} from '@loopback/context';
import {repository} from '@loopback/repository';
import {Strategy} from 'passport';
import {BasicStrategy} from 'passport-http';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {UserRepository} from '../repositories';
import {AuthService} from '../services/auth.service';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  authService: AuthService;

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {
    this.authService = new AuthService(userRepository);
  }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    switch (name) {
      case 'BasicStrategy':
        return new BasicStrategy(this.VerifyUser.bind(this));
        break;
      case 'TokenStrategy':
        return new BearerStrategy(this.VerifyToken.bind(this));
      default:
        return Promise.reject(`The strategy ${name} is not available.`);
        break;
    }
  }

  VerifyUser(
    username: string,
    password: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    let user = this.authService.Identify(username, password);
    return cb(null, user);
  }


  VerifyToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(verification => {
      if (verification) {
        return cb(null, verification);
      }
      return cb(null, false);
    });
  }
}
