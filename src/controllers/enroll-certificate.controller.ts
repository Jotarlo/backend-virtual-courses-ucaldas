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
  Enroll,
  Certificate,
} from '../models';
import {EnrollRepository} from '../repositories';

export class EnrollCertificateController {
  constructor(
    @repository(EnrollRepository) protected enrollRepository: EnrollRepository,
  ) { }

  @get('/enrolls/{id}/certificate', {
    responses: {
      '200': {
        description: 'Enroll has one Certificate',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Certificate),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Certificate>,
  ): Promise<Certificate> {
    return this.enrollRepository.certificate(id).get(filter);
  }

  @post('/enrolls/{id}/certificate', {
    responses: {
      '200': {
        description: 'Enroll model instance',
        content: {'application/json': {schema: getModelSchemaRef(Certificate)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Enroll.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Certificate, {
            title: 'NewCertificateInEnroll',
            exclude: ['id'],
            optional: ['enrollId']
          }),
        },
      },
    }) certificate: Omit<Certificate, 'id'>,
  ): Promise<Certificate> {
    return this.enrollRepository.certificate(id).create(certificate);
  }

  @patch('/enrolls/{id}/certificate', {
    responses: {
      '200': {
        description: 'Enroll.Certificate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Certificate, {partial: true}),
        },
      },
    })
    certificate: Partial<Certificate>,
    @param.query.object('where', getWhereSchemaFor(Certificate)) where?: Where<Certificate>,
  ): Promise<Count> {
    return this.enrollRepository.certificate(id).patch(certificate, where);
  }

  @del('/enrolls/{id}/certificate', {
    responses: {
      '200': {
        description: 'Enroll.Certificate DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Certificate)) where?: Where<Certificate>,
  ): Promise<Count> {
    return this.enrollRepository.certificate(id).delete(where);
  }
}
