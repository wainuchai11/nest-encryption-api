import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

describe('EncryptionController (e2e)', () => {
  let app: INestApplication;

  beforeAll(() => {
    const privateKeyPath = path.join(__dirname, 'private.key');
    const publicKeyPath = path.join(__dirname, 'public.key');
    if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
      throw new Error('Key files do not exist');
    }
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/get-encrypt-data (POST)', async () => {
    const payload = 'Hello, world!';
    const response = await request(app.getHttpServer())
      .post('/get-encrypt-data')
      .send({ payload });

    expect(response.status).toBe(201);
    expect(response.body.successful).toBe(true);
    expect(response.body.data).toHaveProperty('data1');
    expect(response.body.data).toHaveProperty('data2');
  });

  it('/get-decrypt-data (POST)', async () => {
    const payload = 'Hello, world!';
    const encryptedResponse = await request(app.getHttpServer())
      .post('/get-encrypt-data')
      .send({ payload });

    const { data1, data2 } = encryptedResponse.body.data;

    const decryptedResponse = await request(app.getHttpServer())
      .post('/get-decrypt-data')
      .send({ data1, data2 });

    expect(decryptedResponse.status).toBe(201);
    expect(decryptedResponse.body.successful).toBe(true);
    expect(decryptedResponse.body.data.payload).toBe(payload);
  });
});
