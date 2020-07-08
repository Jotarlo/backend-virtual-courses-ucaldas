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
import {Advertising} from '../models';
import {AdvertisingRepository} from '../repositories';

export class AdvertisingController {
  constructor(
    @repository(AdvertisingRepository)
    public advertisingRepository : AdvertisingRepository,
  ) {}

  @post('/advertising', {
    responses: {
      '200': {
        description: 'Advertising model instance',
        content: {'application/json': {schema: getModelSchemaRef(Advertising)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Advertising, {
            title: 'NewAdvertising',
            exclude: ['id'],
          }),
        },
      },
    })
    advertising: Omit<Advertising, 'id'>,
  ): Promise<Advertising> {
    return this.advertisingRepository.create(advertising);
  }

  @get('/advertising/count', {
    responses: {
      '200': {
        description: 'Advertising model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Advertising) where?: Where<Advertising>,
  ): Promise<Count> {
    return this.advertisingRepository.count(where);
  }

  @get('/advertising', {
    responses: {
      '200': {
        description: 'Array of Advertising model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Advertising, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Advertising) filter?: Filter<Advertising>,
  ): Promise<Advertising[]> {
    return this.advertisingRepository.find(filter);
  }

  @patch('/advertising', {
    responses: {
      '200': {
        description: 'Advertising PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Advertising, {partial: true}),
        },
      },
    })
    advertising: Advertising,
    @param.where(Advertising) where?: Where<Advertising>,
  ): Promise<Count> {
    return this.advertisingRepository.updateAll(advertising, where);
  }

  @get('/advertising/{id}', {
    responses: {
      '200': {
        description: 'Advertising model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Advertising, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Advertising, {exclude: 'where'}) filter?: FilterExcludingWhere<Advertising>
  ): Promise<Advertising> {
    return this.advertisingRepository.findById(id, filter);
  }

  @patch('/advertising/{id}', {
    responses: {
      '204': {
        description: 'Advertising PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Advertising, {partial: true}),
        },
      },
    })
    advertising: Advertising,
  ): Promise<void> {
    await this.advertisingRepository.updateById(id, advertising);
  }

  @put('/advertising/{id}', {
    responses: {
      '204': {
        description: 'Advertising PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() advertising: Advertising,
  ): Promise<void> {
    await this.advertisingRepository.replaceById(id, advertising);
  }

  @del('/advertising/{id}', {
    responses: {
      '204': {
        description: 'Advertising DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.advertisingRepository.deleteById(id);
  }
}
