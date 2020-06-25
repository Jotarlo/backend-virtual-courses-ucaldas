import {Entity, model, property, hasMany} from '@loopback/repository';
import {Course} from './course.model';

@model()
export class Area extends Entity {
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

  @hasMany(() => Course)
  courses: Course[];

  constructor(data?: Partial<Area>) {
    super(data);
  }
}

export interface AreaRelations {
  // describe navigational properties here
}

export type AreaWithRelations = Area & AreaRelations;
