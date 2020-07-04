import {repository} from '@loopback/repository';
import {ServiceKeys as keys} from '../keys/service-keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {EncryptDecrypt} from './encrypt-decrypt.service';
const jwt = require("jsonwebtoken");

export class AuthService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {

  }

  async Identify(username: string, password: string): Promise<User | false> {
    console.log(`Username: ${username} - Password: ${password}`);
    let user = await this.userRepository.findOne({where: {username: username}});
    if (user) {
      let cryptPass = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD).Encrypt(password);
      if (user.password == cryptPass) {
        return user;
      }
    }
    return false;
  }

  async GenerateToken(user: User) {
    user.password = '';
    let token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        _id: user.id,
        username: user.username,
        role: user.role,
        paternId: user.studentId
      }
    },
      keys.JWT_SECRET_KEY);
    return token;
  }

  async VerifyToken(token: string) {
    try {
      let data = jwt.verify(token, keys.JWT_SECRET_KEY).data;
      return data;
    } catch (error) {
      return false;
    }
  }

}
