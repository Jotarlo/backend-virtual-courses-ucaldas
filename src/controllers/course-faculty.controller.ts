import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Course,
  Faculty,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseFacultyController {
  constructor(
    @repository(CourseRepository)
    public courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/faculty', {
    responses: {
      '200': {
        description: 'Faculty belonging to Course',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Faculty)},
          },
        },
      },
    },
  })
  async getFaculty(
    @param.path.string('id') id: typeof Course.prototype.id,
  ): Promise<Faculty> {
    return this.courseRepository.faculty(id);
  }
}
