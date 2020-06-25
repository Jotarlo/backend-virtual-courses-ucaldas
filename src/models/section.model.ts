import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Course} from './course.model';

@model()
export class Section extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'string',
  })
  video?: string;

  @property({
    type: 'string',
    required: true,
  })
  attached: string;

  @belongsTo(() => Course)
  courseId: string;

  constructor(data?: Partial<Section>) {
    super(data);
  }
}

export interface SectionRelations {
  // describe navigational properties here
}

export type SectionWithRelations = Section & SectionRelations;
