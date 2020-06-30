import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Certificate, Course, Enroll, EnrollRelations, Student} from '../models';
import {CertificateRepository} from './certificate.repository';
import {CourseRepository} from './course.repository';
import {StudentRepository} from './student.repository';

export class EnrollRepository extends DefaultCrudRepository<
  Enroll,
  typeof Enroll.prototype.id,
  EnrollRelations
  > {

  public readonly course: BelongsToAccessor<Course, typeof Enroll.prototype.id>;

  public readonly certificate: HasOneRepositoryFactory<Certificate, typeof Enroll.prototype.id>;

  public readonly student: BelongsToAccessor<Student, typeof Enroll.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>, @repository.getter('CertificateRepository') protected certificateRepositoryGetter: Getter<CertificateRepository>, @repository.getter('StudentRepository') protected studentRepositoryGetter: Getter<StudentRepository>,
  ) {
    super(Enroll, dataSource);
    this.student = this.createBelongsToAccessorFor('student', studentRepositoryGetter,);
    this.registerInclusionResolver('student', this.student.inclusionResolver);
    this.certificate = this.createHasOneRepositoryFactoryFor('certificate', certificateRepositoryGetter);
    this.registerInclusionResolver('certificate', this.certificate.inclusionResolver);
    this.course = this.createBelongsToAccessorFor('course', courseRepositoryGetter,);
    this.registerInclusionResolver('course', this.course.inclusionResolver);
  }
}
