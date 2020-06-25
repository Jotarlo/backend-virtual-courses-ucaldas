import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Enroll, EnrollRelations, Course, Student} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CourseRepository} from './course.repository';
import {StudentRepository} from './student.repository';

export class EnrollRepository extends DefaultCrudRepository<
  Enroll,
  typeof Enroll.prototype.id,
  EnrollRelations
> {

  public readonly course: BelongsToAccessor<Course, typeof Enroll.prototype.id>;

  public readonly student: BelongsToAccessor<Student, typeof Enroll.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>, @repository.getter('StudentRepository') protected studentRepositoryGetter: Getter<StudentRepository>,
  ) {
    super(Enroll, dataSource);
    this.student = this.createBelongsToAccessorFor('student', studentRepositoryGetter,);
    this.registerInclusionResolver('student', this.student.inclusionResolver);
    this.course = this.createBelongsToAccessorFor('course', courseRepositoryGetter,);
    this.registerInclusionResolver('course', this.course.inclusionResolver);
  }
}
