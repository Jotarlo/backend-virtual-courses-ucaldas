import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Student, StudentRelations, User, Enroll, Certificate} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {EnrollRepository} from './enroll.repository';
import {CertificateRepository} from './certificate.repository';

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype.id,
  StudentRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Student.prototype.id>;

  public readonly enrolls: HasManyRepositoryFactory<Enroll, typeof Student.prototype.id>;

  public readonly certificates: HasManyRepositoryFactory<Certificate, typeof Student.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('EnrollRepository') protected enrollRepositoryGetter: Getter<EnrollRepository>, @repository.getter('CertificateRepository') protected certificateRepositoryGetter: Getter<CertificateRepository>,
  ) {
    super(Student, dataSource);
    this.certificates = this.createHasManyRepositoryFactoryFor('certificates', certificateRepositoryGetter,);
    this.registerInclusionResolver('certificates', this.certificates.inclusionResolver);
    this.enrolls = this.createHasManyRepositoryFactoryFor('enrolls', enrollRepositoryGetter,);
    this.registerInclusionResolver('enrolls', this.enrolls.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
