import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppController } from '../src/app/app.controller';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Throw Error', async () => {
    jest.spyOn(AppController.prototype, 'getHealthzResponse').mockImplementation(() => {
      throw new Error('Test Error')
    })
    const response = await request(app.getHttpServer())
      .get('/v1/healthz')
      .expect(500)

    expect(response.body.errorId).toBeTruthy()
    expect(response.body.timestamp).toBeTruthy()
    expect(response.body.message).toBe('Test Error')
    expect(response.body.path).toBe('/v1/healthz')
    expect(response.body.statusCode).toBe(500)
  });
});
