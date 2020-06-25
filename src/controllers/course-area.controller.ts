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
  Area,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseAreaController {
  constructor(
    @repository(CourseRepository)
    public courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/area', {
    responses: {
      '200': {
        description: 'Area belonging to Course',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Area)},
          },
        },
      },
    },
  })
  async getArea(
    @param.path.string('id') id: typeof Course.prototype.id,
  ): Promise<Area> {
    return this.courseRepository.area(id);
  }
}
