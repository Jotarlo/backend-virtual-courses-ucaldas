// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {UserRepository} from '../repositories';
import {AuthService} from '../services/auth.service';

// import {inject} from '@loopback/core';


class Credentials {
  username: string;
  password: string;
}

class PasswordResetData {
  username: string;
  type: number;
}

export class UserController {

  authService: AuthService;

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {
    this.authService = new AuthService(this.userRepository);
  }


  @post('/login', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async login(
    @requestBody() credentials: Credentials
  ): Promise<object> {
    let user = await this.authService.Identify(credentials.username, credentials.password);
    if (user) {
      let tk = await this.authService.GenerateToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or Password invalid.");
    }
  }


  @post('/password-reset', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async reset(
    @requestBody() passwordResetData: PasswordResetData
  ): Promise<boolean> {
    let randomPassword = await this.authService.ResetPassword(passwordResetData.username);
    if (randomPassword) {
      // send sms or mail with new password
      // 1. SMS
      // 2. Mail
      // ....
      switch (passwordResetData.type) {
        case 1:
          // send sms
          console.log("Sending sms: " + randomPassword);
          return true;
          break;
        case 2:
          // send mail
          console.log("Sending mail: " + randomPassword);
          return true;
          break;

        default:
          throw new HttpErrors[400]("This notification type is not supported.");
          break;
      }
    }
    throw new HttpErrors[400]("User not found");
  }

}
