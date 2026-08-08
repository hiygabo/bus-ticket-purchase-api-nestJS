import { Test, TestingModule } from '@nestjs/testing';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';

describe('PassengerController', () => {
  let controller: PassengerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassengerController],
      providers: [
        {
          provide: PassengerService,
          useValue: {
            create: jest.fn(),
            createPassenger: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PassengerController>(PassengerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
