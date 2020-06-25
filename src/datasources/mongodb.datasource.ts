import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
/*
const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://virtual_courses_user_db:QtWxwYxlzHeBDn19@cluster0-lqcr6.mongodb.net/VirtualCoursesDB?retryWrites=true&w=majority',
  host: 'cluster0-lqcr6.mongodb.net',
  port: 27017,
  user: 'virtual_courses_user_db',
  password: 'QtWxwYxlzHeBDn19',
  database: 'VirtualCoursesDB',
  useNewUrlParser: true
};*/


const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb://localhost:27017/VirtualCoursesDB',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'VirtualCoursesDB',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
