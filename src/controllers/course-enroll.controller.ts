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
  Course,
  Enroll,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseEnrollController {
  constructor(
    @repository(CourseRepository) protected courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/enrolls', {
    responses: {
      '200': {
        description: 'Array of Course has many Enroll',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Enroll)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Enroll>,
  ): Promise<Enroll[]> {
    return this.courseRepository.enrolls(id).find(filter);
  }

  @post('/courses/{id}/enrolls', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: getModelSchemaRef(Enroll)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Course.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enroll, {
            title: 'NewEnrollInCourse',
            exclude: ['id'],
            optional: ['courseId']
          }),
        },
      },
    }) enroll: Omit<Enroll, 'id'>,
  ): Promise<Enroll> {
    return this.courseRepository.enrolls(id).create(enroll);
  }

  @patch('/courses/{id}/enrolls', {
    responses: {
      '200': {
        description: 'Course.Enroll PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enroll, {partial: true}),
        },
      },
    })
    enroll: Partial<Enroll>,
    @param.query.object('where', getWhereSchemaFor(Enroll)) where?: Where<Enroll>,
  ): Promise<Count> {
    return this.courseRepository.enrolls(id).patch(enroll, where);
  }

  @del('/courses/{id}/enrolls', {
    responses: {
      '200': {
        description: 'Course.Enroll DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Enroll)) where?: Where<Enroll>,
  ): Promise<Count> {
    return this.courseRepository.enrolls(id).delete(where);
  }
}
