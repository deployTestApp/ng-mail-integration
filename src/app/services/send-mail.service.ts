import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { mailServers } from '../../environments/environment';
declare const Buffer;
@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(public http: HttpClient) { }

  private mapEmailAddress(mailObject) {
    const emailAddresses = mailObject.map(object => {
      let mailAdress = "";
      if(object.name) {
        mailAdress = `${object.name}<${object.email}>`
      } else {
        mailAdress = object.email;
      }
      return mailAdress;
    });
    return emailAddresses.toString();
  }

  private createMailGunRequestBody (body) {
    const baseTemplate = {
      "from": body.from,
      "subject": body.subject,
      "text": body.text
    };
    baseTemplate["to"] = this.mapEmailAddress(body.to);
    if (body.cc) {
      baseTemplate["cc"] =this. mapEmailAddress(body.cc);
    } 
    if (body.bcc) {
      baseTemplate["bcc"] = this.mapEmailAddress(body.bcc);
    } 
    return baseTemplate;
  }

  private createSendGridRequestBody (body) {
    const baseTemplate = {
      "personalizations": [
        {
          "to": [],
          "cc": [],
          "bcc": []
        }
      ],
      "from": {
        "email": body.from,
      },
      "subject": body.subject,
      "content": [
        {
          "type": "text/plain",
          "value": body.text
        }
      ]
    };
    baseTemplate.personalizations[0].to = body.to;
    baseTemplate.personalizations[0].cc = body.cc;
    baseTemplate.personalizations[0].bcc = body.bcc;
    return baseTemplate;
  }

  private postmail(serverUri, requestBody, authHeader, isForm) {
    const options: any= {};
    let queryParams = new HttpParams();
    let httpHeader = new HttpHeaders({
      "Authorization": authHeader
    });
    if (isForm) {
      queryParams = queryParams.set("form", requestBody);
    } else {
      queryParams = queryParams.set("body", requestBody);
    }
    options.queryParams = queryParams;
    options.httpHeader = httpHeader;
    return this.http.post(serverUri, options);
  }

  public postMailThroughSendGrid = function(body) {
    const mailServerUri = mailServers.sendGrid.uri;
    const reqBody = this.createSendGridRequestBody(body);
    const authHeader = `Bearer ${mailServers.sendGrid.api_key}`;
    // return this.postmail(mailServerUri, reqBody, authHeader, false);
    return new Promise((resolve, reject) => {
      return resolve("send mail through send grid");
    });
  }

  public postMailThroughMailGun = function(body) {
    const mailServerbase = mailServers.mailGun.uri;
    const domain = mailServers.mailGun.domain;
    const mailServerUri = `${mailServerbase}/${domain}/messages`;
    const apiKey = mailServers.mailGun.api_key;
    const base64ApiKey = Buffer.from(`api:${apiKey}`).toString('base64');
    const authHeader = `Basic ${base64ApiKey}`;
    const reqBody = this.createMailGunRequestBody(body);
    // return this.postmail(mailServerUri, reqBody, authHeader, true);
    return new Promise((resolve, reject) => {
      return resolve("send mail through mail gun");
    });
  }
  
}
