import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Certificate, CertificateRelations, Enroll} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EnrollRepository} from './enroll.repository';

export class CertificateRepository extends DefaultCrudRepository<
  Certificate,
  typeof Certificate.prototype.id,
  CertificateRelations
> {

  public readonly enroll: BelongsToAccessor<Enroll, typeof Certificate.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EnrollRepository') protected enrollRepositoryGetter: Getter<EnrollRepository>,
  ) {
    super(Certificate, dataSource);
    this.enroll = this.createBelongsToAccessorFor('enroll', enrollRepositoryGetter,);
    this.registerInclusionResolver('enroll', this.enroll.inclusionResolver);
  }
}
