import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppController } from '../src/application/app.controller';

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
      .expect(HttpStatus.INTERNAL_SERVER_ERROR)

    expect(response.body.errorId).toBeTruthy()
    expect(response.body.timestamp).toBeTruthy()
    expect(response.body.message).toBe('Internal server error')
    expect(response.body.path).toBe('/v1/healthz')
    expect(response.body.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
  });

  it('Throw Bad Request', async () => {
    jest.spyOn(AppController.prototype, 'getHealthzResponse').mockImplementation(() => {
      throw new BadRequestException('Test Error')
    })
    const response = await request(app.getHttpServer())
      .get('/v1/healthz')
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body.errorId).toBeTruthy()
    expect(response.body.timestamp).toBeTruthy()
    expect(response.body.message).toBe('Test Error')
    expect(response.body.path).toBe('/v1/healthz')
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST)
  });
});
