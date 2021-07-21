
import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

class MailtrapMailProvider implements IMailProvider {
  private tranporter: Mail;

  constructor(){
    this.tranporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: { 
        user: '484c94e6340d43',
        pass: 'ef3ffa6806ce31'
      }
    })
  }
  async sendMail(message: IMessage): Promise<void> {
    await this.tranporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.body
  })

 }

}

export { 
  MailtrapMailProvider
}