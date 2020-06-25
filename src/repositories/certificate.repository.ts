import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Certificate, CertificateRelations, Student, Course, Enroll} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {StudentRepository} from './student.repository';
import {CourseRepository} from './course.repository';
import {EnrollRepository} from './enroll.repository';

export class CertificateRepository extends DefaultCrudRepository<
  Certificate,
  typeof Certificate.prototype.id,
  CertificateRelations
> {

  public readonly student: BelongsToAccessor<Student, typeof Certificate.prototype.id>;

  public readonly course: BelongsToAccessor<Course, typeof Certificate.prototype.id>;

  public readonly enroll: BelongsToAccessor<Enroll, typeof Certificate.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('StudentRepository') protected studentRepositoryGetter: Getter<StudentRepository>, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>, @repository.getter('EnrollRepository') protected enrollRepositoryGetter: Getter<EnrollRepository>,
  ) {
    super(Certificate, dataSource);
    this.enroll = this.createBelongsToAccessorFor('enroll', enrollRepositoryGetter,);
    this.registerInclusionResolver('enroll', this.enroll.inclusionResolver);
    this.course = this.createBelongsToAccessorFor('course', courseRepositoryGetter,);
    this.registerInclusionResolver('course', this.course.inclusionResolver);
    this.student = this.createBelongsToAccessorFor('student', studentRepositoryGetter,);
    this.registerInclusionResolver('student', this.student.inclusionResolver);
  }
}
