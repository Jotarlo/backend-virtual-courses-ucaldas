import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Enroll} from './enroll.model';
import {User} from './user.model';

@model()
export class Student extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  document: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  career: string;

  @property({
    type: 'string',
    required: false,
  })
  profilePhoto: string;

  @hasMany(() => Enroll)
  enrolls: Enroll[];

  @hasOne(() => User)
  user: User;

  constructor(data?: Partial<Student>) {
    super(data);
  }
}

export interface StudentRelations {
  // describe navigational properties here
}

export type StudentWithRelations = Student & StudentRelations;
