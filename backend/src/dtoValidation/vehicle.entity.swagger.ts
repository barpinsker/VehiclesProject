import { ApiProperty } from '@nestjs/swagger';

export class CreateCar {
     @ApiProperty({
          example: {
               id: 3,
               licensePlate: '345-67-890',
               manufacturer: 'Ford',
               model: 'Mustang',
               status: 'active',
               createdAt: '2023-03-01',
               updatedAt: '2023-03-15',
          }, description: 'The details of new car'
     })
     data: Record<string, any>;
}
export class UpdateCar{
     @ApiProperty({
          example: {
               id: 3,
               licensePlate: '345-67-890',
               manufacturer: 'Ford',
               model: 'Mustang',
               status: 'active',
               createdAt: '2023-03-01',
               updatedAt: '2023-03-15',
          }, description: 'The new data car'
     })
     EditNewData: Record<string, any>;
}
export class GetSpecificCar{

     carReturn:{ id: 3,
          licensePlate: '345-67-890',
          manufacturer: 'Ford',
          model: 'Mustang',
          status: 'active',
          createdAt: '2023-03-01',
          updatedAt: '2023-03-15',
     }

}
