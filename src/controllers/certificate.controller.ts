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
import {Certificate} from '../models';
import {CertificateRepository} from '../repositories';

export class CertificateController {
  constructor(
    @repository(CertificateRepository)
    public certificateRepository : CertificateRepository,
  ) {}

  @post('/certificate', {
    responses: {
      '200': {
        description: 'Certificate model instance',
        content: {'application/json': {schema: getModelSchemaRef(Certificate)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Certificate, {
            title: 'NewCertificate',
            exclude: ['id'],
          }),
        },
      },
    })
    certificate: Omit<Certificate, 'id'>,
  ): Promise<Certificate> {
    return this.certificateRepository.create(certificate);
  }

  @get('/certificate/count', {
    responses: {
      '200': {
        description: 'Certificate model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Certificate) where?: Where<Certificate>,
  ): Promise<Count> {
    return this.certificateRepository.count(where);
  }

  @get('/certificate', {
    responses: {
      '200': {
        description: 'Array of Certificate model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Certificate, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Certificate) filter?: Filter<Certificate>,
  ): Promise<Certificate[]> {
    return this.certificateRepository.find(filter);
  }

  @patch('/certificate', {
    responses: {
      '200': {
        description: 'Certificate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Certificate, {partial: true}),
        },
      },
    })
    certificate: Certificate,
    @param.where(Certificate) where?: Where<Certificate>,
  ): Promise<Count> {
    return this.certificateRepository.updateAll(certificate, where);
  }

  @get('/certificate/{id}', {
    responses: {
      '200': {
        description: 'Certificate model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Certificate, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Certificate, {exclude: 'where'}) filter?: FilterExcludingWhere<Certificate>
  ): Promise<Certificate> {
    return this.certificateRepository.findById(id, filter);
  }

  @patch('/certificate/{id}', {
    responses: {
      '204': {
        description: 'Certificate PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Certificate, {partial: true}),
        },
      },
    })
    certificate: Certificate,
  ): Promise<void> {
    await this.certificateRepository.updateById(id, certificate);
  }

  @put('/certificate/{id}', {
    responses: {
      '204': {
        description: 'Certificate PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() certificate: Certificate,
  ): Promise<void> {
    await this.certificateRepository.replaceById(id, certificate);
  }

  @del('/certificate/{id}', {
    responses: {
      '204': {
        description: 'Certificate DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.certificateRepository.deleteById(id);
  }
}
