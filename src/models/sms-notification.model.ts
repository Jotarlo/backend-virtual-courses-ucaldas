import {Model, model, property} from '@loopback/repository';

@model()
export class SmsNotification extends Model {
  @property({
    type: 'string',
    required: true,
  })
  body: string;

  @property({
    type: 'string',
    required: true,
  })
  to: string;


  constructor(data?: Partial<SmsNotification>) {
    super(data);
  }
}

export interface SmsNotificationRelations {
  // describe navigational properties here
}

export type SmsNotificationWithRelations = SmsNotification & SmsNotificationRelations;
