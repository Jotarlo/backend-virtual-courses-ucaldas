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
  Student,
  Enroll,
} from '../models';
import {StudentRepository} from '../repositories';

export class StudentEnrollController {
  constructor(
    @repository(StudentRepository) protected studentRepository: StudentRepository,
  ) { }

  @get('/students/{id}/enrolls', {
    responses: {
      '200': {
        description: 'Array of Student has many Enroll',
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
    return this.studentRepository.enrolls(id).find(filter);
  }

  @post('/students/{id}/enrolls', {
    responses: {
      '200': {
        description: 'Student model instance',
        content: {'application/json': {schema: getModelSchemaRef(Enroll)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Student.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enroll, {
            title: 'NewEnrollInStudent',
            exclude: ['id'],
            optional: ['studentId']
          }),
        },
      },
    }) enroll: Omit<Enroll, 'id'>,
  ): Promise<Enroll> {
    return this.studentRepository.enrolls(id).create(enroll);
  }

  @patch('/students/{id}/enrolls', {
    responses: {
      '200': {
        description: 'Student.Enroll PATCH success count',
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
    return this.studentRepository.enrolls(id).patch(enroll, where);
  }

  @del('/students/{id}/enrolls', {
    responses: {
      '200': {
        description: 'Student.Enroll DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Enroll)) where?: Where<Enroll>,
  ): Promise<Count> {
    return this.studentRepository.enrolls(id).delete(where);
  }
}
