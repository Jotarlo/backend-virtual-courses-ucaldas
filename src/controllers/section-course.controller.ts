import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Section,
  Course,
} from '../models';
import {SectionRepository} from '../repositories';

export class SectionCourseController {
  constructor(
    @repository(SectionRepository) protected sectionRepository: SectionRepository,
  ) { }

  @get('/sections/{id}/course', {
    responses: {
      '200': {
        description: 'Section has one Course',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Course),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Course>,
  ): Promise<Course> {
    return this.sectionRepository.course(id).get(filter);
  }

  @post('/sections/{id}/course', {
    responses: {
      '200': {
        description: 'Section model instance',
        content: {'application/json': {schema: getModelSchemaRef(Course)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Section.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Course, {
            title: 'NewCourseInSection',
            exclude: ['id'],
            optional: ['sectionId']
          }),
        },
      },
    }) course: Omit<Course, 'id'>,
  ): Promise<Course> {
    return this.sectionRepository.course(id).create(course);
  }

  @patch('/sections/{id}/course', {
    responses: {
      '200': {
        description: 'Section.Course PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Course, {partial: true}),
        },
      },
    })
    course: Partial<Course>,
    @param.query.object('where', getWhereSchemaFor(Course)) where?: Where<Course>,
  ): Promise<Count> {
    return this.sectionRepository.course(id).patch(course, where);
  }

  @del('/sections/{id}/course', {
    responses: {
      '200': {
        description: 'Section.Course DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Course)) where?: Where<Course>,
  ): Promise<Count> {
    return this.sectionRepository.course(id).delete(where);
  }
}
