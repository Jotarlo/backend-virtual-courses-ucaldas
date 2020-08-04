import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Area, Course, CourseRelations, Enroll, Faculty, Section} from '../models';
import {AreaRepository} from './area.repository';
import {EnrollRepository} from './enroll.repository';
import {FacultyRepository} from './faculty.repository';
import {SectionRepository} from './section.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id,
  CourseRelations
  > {

  public readonly faculty: BelongsToAccessor<Faculty, typeof Course.prototype.id>;

  public readonly area: BelongsToAccessor<Area, typeof Course.prototype.id>;

  public readonly enrolls: HasManyRepositoryFactory<Enroll, typeof Course.prototype.id>;

  public readonly sections: HasManyRepositoryFactory<Section, typeof Course.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacultyRepository') protected facultyRepositoryGetter: Getter<FacultyRepository>, @repository.getter('AreaRepository') protected areaRepositoryGetter: Getter<AreaRepository>, @repository.getter('EnrollRepository') protected enrollRepositoryGetter: Getter<EnrollRepository>, @repository.getter('SectionRepository') protected sectionRepositoryGetter: Getter<SectionRepository>,
  ) {
    super(Course, dataSource);
    this.sections = this.createHasManyRepositoryFactoryFor('sections', sectionRepositoryGetter,);
    this.registerInclusionResolver('sections', this.sections.inclusionResolver);
    this.enrolls = this.createHasManyRepositoryFactoryFor('enrolls', enrollRepositoryGetter,);
    this.registerInclusionResolver('enrolls', this.enrolls.inclusionResolver);
    this.area = this.createBelongsToAccessorFor('area', areaRepositoryGetter,);
    this.registerInclusionResolver('area', this.area.inclusionResolver);
    this.faculty = this.createBelongsToAccessorFor('faculty', facultyRepositoryGetter,);
    this.registerInclusionResolver('faculty', this.faculty.inclusionResolver);
  }
}
