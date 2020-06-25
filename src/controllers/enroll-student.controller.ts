import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Enroll,
  Student,
} from '../models';
import {EnrollRepository} from '../repositories';

export class EnrollStudentController {
  constructor(
    @repository(EnrollRepository)
    public enrollRepository: EnrollRepository,
  ) { }

  @get('/enrolls/{id}/student', {
    responses: {
      '200': {
        description: 'Student belonging to Enroll',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Student)},
          },
        },
      },
    },
  })
  async getStudent(
    @param.path.string('id') id: typeof Enroll.prototype.id,
  ): Promise<Student> {
    return this.enrollRepository.student(id);
  }
}
