import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Student,
} from '../models';
import {UserRepository} from '../repositories';

export class UserStudentController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/student', {
    responses: {
      '200': {
        description: 'Student belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Student)},
          },
        },
      },
    },
  })
  async getStudent(
    @param.path.string('id') id: typeof User.prototype.id,
  ): Promise<Student> {
    return this.userRepository.student(id);
  }
}
