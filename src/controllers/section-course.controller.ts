import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Section,
  Course,
} from '../models';
import {SectionRepository} from '../repositories';

export class SectionCourseController {
  constructor(
    @repository(SectionRepository)
    public sectionRepository: SectionRepository,
  ) { }

  @get('/sections/{id}/course', {
    responses: {
      '200': {
        description: 'Course belonging to Section',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Course)},
          },
        },
      },
    },
  })
  async getCourse(
    @param.path.string('id') id: typeof Section.prototype.id,
  ): Promise<Course> {
    return this.sectionRepository.course(id);
  }
}
