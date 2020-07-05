import {NotificationDatasource} from '../datasources/notification.datasource';
import {SmsNotification} from '../models';
import {EmailNotification} from '../models/email-notification.model';
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');
export class NotificationService {

  async SmsNotification(notification: SmsNotification): Promise<boolean> {
    try {
      const accountSid = NotificationDatasource.TWILIO_SID;
      const authToken = NotificationDatasource.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);

      await client.messages
        .create({
          body: notification.body,
          from: NotificationDatasource.TWILIO_FROM,
          to: notification.to
        })
        .then((message: any) => {
          console.log(message)
        });
      return true;
    } catch (error) {
      return false;
    }
  }

  async MailNotification(notification: EmailNotification): Promise<boolean> {
    try {
      sgMail.setApiKey(NotificationDatasource.SENDGRID_API_KEY);
      const msg = {
        to: notification.to,
        from: NotificationDatasource.SENDGRID_FROM,
        subject: notification.subject,
        text: notification.textBody,
        html: notification.htmlBody,
      };
      await sgMail.send(msg).then((data: any) => {
        console.log(data);
        return true;
      }, function (error: any) {
        console.log(error);
        return false;
      });
      return true;
    }
    catch (err) {
      return false;
    }
  }
}
