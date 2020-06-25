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
  Course,
} from '../models';
import {EnrollRepository} from '../repositories';

export class EnrollCourseController {
  constructor(
    @repository(EnrollRepository)
    public enrollRepository: EnrollRepository,
  ) { }

  @get('/enrolls/{id}/course', {
    responses: {
      '200': {
        description: 'Course belonging to Enroll',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Course)},
          },
        },
      },
    },
  })
  async getCourse(
    @param.path.string('id') id: typeof Enroll.prototype.id,
  ): Promise<Course> {
    return this.enrollRepository.course(id);
  }
}
