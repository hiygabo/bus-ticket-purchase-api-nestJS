import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PassengerService } from './passenger.service';
import { Passenger } from './entities/passenger.entity';

describe('PassengerService', () => {
  let service: PassengerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassengerService,
        {
          provide: getRepositoryToken(Passenger),
          useValue: {
            create: jest.fn((payload) => payload),
            save: jest.fn(async (payload) => payload),
          },
        },
      ],
    }).compile();

    service = module.get<PassengerService>(PassengerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
