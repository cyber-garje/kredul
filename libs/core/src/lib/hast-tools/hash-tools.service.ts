import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { HashTools } from './hash-tools';

@Injectable()
export class HashToolsService {


  async hashPassword(password: string, algorithm = 'sha512') {

    const hasher = createHash(algorithm);
    hasher.update(password);
    return Promise.resolve<HashTools>({
      password,
      hash: hasher.update(password).digest('hex')
    });
  }
}
