import {Entity, hasMany, model, property} from '@loopback/repository';
import {Course} from './course.model';

@model()
export class Faculty extends Entity {
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
  name: string;

  @hasMany(() => Course, {keyTo: 'facultyId'})
  courses: Course[];

  constructor(data?: Partial<Faculty>) {
    super(data);
  }
}

export interface FacultyRelations {
  // describe navigational properties here
}

export type FacultyWithRelations = Faculty & FacultyRelations;
