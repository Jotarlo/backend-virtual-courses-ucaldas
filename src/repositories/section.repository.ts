import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Course, Section, SectionRelations} from '../models';
import {CourseRepository} from './course.repository';

export class SectionRepository extends DefaultCrudRepository<
  Section,
  typeof Section.prototype.id,
  SectionRelations
  > {

  public readonly course: HasOneRepositoryFactory<Course, typeof Section.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>,
  ) {
    super(Section, dataSource);
    this.course = this.createHasOneRepositoryFactoryFor('course', courseRepositoryGetter);
    this.registerInclusionResolver('course', this.course.inclusionResolver);
  }
}
