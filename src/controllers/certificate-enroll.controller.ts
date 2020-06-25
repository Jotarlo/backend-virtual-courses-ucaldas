import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Certificate,
  Enroll,
} from '../models';
import {CertificateRepository} from '../repositories';

export class CertificateEnrollController {
  constructor(
    @repository(CertificateRepository)
    public certificateRepository: CertificateRepository,
  ) { }

  @get('/certificates/{id}/enroll', {
    responses: {
      '200': {
        description: 'Enroll belonging to Certificate',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Enroll)},
          },
        },
      },
    },
  })
  async getEnroll(
    @param.path.string('id') id: typeof Certificate.prototype.id,
  ): Promise<Enroll> {
    return this.certificateRepository.enroll(id);
  }
}
