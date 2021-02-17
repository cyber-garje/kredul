import { Test } from '@nestjs/testing';

import { HashToolsService } from './hash-tools.service';

describe('HashToolService', () => {
  let service: HashToolsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [HashToolsService],
    }).compile();

    console.log({app})
    service = app.get<HashToolsService>(HashToolsService);
    console.log({service})
  });

  describe('hash password SHA-512', () => {
    it('should return a correct hash', async () => {
      const goodHash = '4f8847d67b81a84c1b8de3173928d3840cba937aec34103b82752d1bf23c1ab5082997feb1bb50832b9529c49e721283d6c3c6824291bf6c490deba02a7ece5f';
      expect(await service.hashPassword('password')).toEqual({ password: 'password', hash: goodHash });
    });

    it('should not return a bad hash', async () => {
      const badHash = 'f8847d67b81a84c1b8de3173928d3840cba937aec34103b82752d1bf23c1ab5082997feb1bb50832b9529c49e721283d6c3c6824291bf6c490deba02a7ece5f';
      expect(await service.hashPassword('password')).not.toEqual({ password: 'password', hash: badHash });
    });

    it('should not return an empty password', async () => {
      const goodHash = '4f8847d67b81a84c1b8de3173928d3840cba937aec34103b82752d1bf23c1ab5082997feb1bb50832b9529c49e721283d6c3c6824291bf6c490deba02a7ece5f';
      expect(await service.hashPassword('password')).not.toEqual({ password: '', hash: goodHash });
    });
  });

  describe('hash password SHA-256', () => {
    it('should return a correct hash', async () => {
      const goodHash = '2e2b24f8ee40bb847fe85bb23336a39ef5948e6b49d897419ced68766b16967a';
      expect(await service.hashPassword('password', 'sha256')).toEqual({ password: 'password', hash: goodHash });
    });

    it('should not return an empty password', async () => {
      const goodHash = '2e2b24f8ee40bb847fe85bb23336a39ef5948e6b49d897419ced68766b16967a';
      expect(await service.hashPassword('password', 'sha256')).not.toEqual({ password: '', hash: goodHash });
    });

    it('should not return a SHA512 hash', async () => {
      const badHash = '4f8847d67b81a84c1b8de3173928d3840cba937aec34103b82752d1bf23c1ab5082997feb1bb50832b9529c49e721283d6c3c6824291bf6c490deba02a7ece5f';
      expect(await service.hashPassword('password', 'sha256')).not.toEqual({ password: '', hash: badHash });
    });
  });
});
