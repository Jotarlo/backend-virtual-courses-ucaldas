import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Area} from '../models';
import {AreaRepository} from '../repositories';

export class AreaController {
  constructor(
    @repository(AreaRepository)
    public areaRepository : AreaRepository,
  ) {}

  @post('/area', {
    responses: {
      '200': {
        description: 'Area model instance',
        content: {'application/json': {schema: getModelSchemaRef(Area)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Area, {
            title: 'NewArea',
            exclude: ['id'],
          }),
        },
      },
    })
    area: Omit<Area, 'id'>,
  ): Promise<Area> {
    return this.areaRepository.create(area);
  }

  @get('/area/count', {
    responses: {
      '200': {
        description: 'Area model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Area) where?: Where<Area>,
  ): Promise<Count> {
    return this.areaRepository.count(where);
  }

  @get('/area', {
    responses: {
      '200': {
        description: 'Array of Area model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Area, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Area) filter?: Filter<Area>,
  ): Promise<Area[]> {
    return this.areaRepository.find(filter);
  }

  @patch('/area', {
    responses: {
      '200': {
        description: 'Area PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Area, {partial: true}),
        },
      },
    })
    area: Area,
    @param.where(Area) where?: Where<Area>,
  ): Promise<Count> {
    return this.areaRepository.updateAll(area, where);
  }

  @get('/area/{id}', {
    responses: {
      '200': {
        description: 'Area model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Area, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Area, {exclude: 'where'}) filter?: FilterExcludingWhere<Area>
  ): Promise<Area> {
    return this.areaRepository.findById(id, filter);
  }

  @patch('/area/{id}', {
    responses: {
      '204': {
        description: 'Area PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Area, {partial: true}),
        },
      },
    })
    area: Area,
  ): Promise<void> {
    await this.areaRepository.updateById(id, area);
  }

  @put('/area/{id}', {
    responses: {
      '204': {
        description: 'Area PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() area: Area,
  ): Promise<void> {
    await this.areaRepository.replaceById(id, area);
  }

  @del('/area/{id}', {
    responses: {
      '204': {
        description: 'Area DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.areaRepository.deleteById(id);
  }
}
