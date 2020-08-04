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
  Section,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseSectionController {
  constructor(
    @repository(CourseRepository) protected courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/sections', {
    responses: {
      '200': {
        description: 'Array of Course has many Section',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Section)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Section>,
  ): Promise<Section[]> {
    return this.courseRepository.sections(id).find(filter);
  }

  @post('/courses/{id}/sections', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: getModelSchemaRef(Section)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Course.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Section, {
            title: 'NewSectionInCourse',
            exclude: ['id'],
            optional: ['courseId']
          }),
        },
      },
    }) section: Omit<Section, 'id'>,
  ): Promise<Section> {
    return this.courseRepository.sections(id).create(section);
  }

  @patch('/courses/{id}/sections', {
    responses: {
      '200': {
        description: 'Course.Section PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Section, {partial: true}),
        },
      },
    })
    section: Partial<Section>,
    @param.query.object('where', getWhereSchemaFor(Section)) where?: Where<Section>,
  ): Promise<Count> {
    return this.courseRepository.sections(id).patch(section, where);
  }

  @del('/courses/{id}/sections', {
    responses: {
      '200': {
        description: 'Course.Section DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Section)) where?: Where<Section>,
  ): Promise<Count> {
    return this.courseRepository.sections(id).delete(where);
  }
}
