import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { SendMailService } from '../../services/send-mail.service';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class NewMailComponent implements OnInit {
  public servers = [
    {
      name: "Send Grid",
      value: "sendGrid"
    },
    {
      name: "Mail Gun",
      value: "mailGun"
    }
  ];
  public mailForm: FormGroup;
  constructor(public fb: FormBuilder, public mailService: SendMailService) { 
    this.mailForm = this.fb.group({
      from: [, {validators: Validators.email, updateOn: 'blur'}],
      to: [[], {validators: Validators.compose([this.validateEmail.bind(this)]), updateOn: 'blur'}],
      cc: [[], {validators:Validators.compose([this.validateEmail.bind(this)]), updateOn: 'blur'}],
      bcc: [[], {validators: Validators.compose([this.validateEmail.bind(this)]), updateOn: 'blur'}],
      subject: ["", Validators.required],
      text: [""],
      mailServer:[this.servers[0].value, Validators.required]
    });
  }

  ngOnInit() {
  }

  public validateEmail(mailList: FormControl) {
    if(mailList.pristine) return null;
    const mailAddresses: [] = (mailList.value).split(",");
    const isInvalid = mailAddresses.some((mail: string) => {
      return !!mail.trim().match(/^(?!.*?@.*?\.).*/gi);
    });
    if (isInvalid) {
      return {emailError:true};
    } 
    return null;
  }

  public sendMail(form: any) {
    form.to = form.to.split(",");
    form.cc = form.cc.split(",");
    form.bcc = form.bcc.split(",");
    form.to = form.to.map(to =>to = {email:to.trim()});
    form.cc = form.cc.map(cc =>cc = {email:cc.trim()});
    form.bcc = form.bcc.map(bcc =>bcc = {email:bcc.trim()});
    if (form.mailServer === "sendGrid") {
      return this.mailService.postMailThroughSendGrid(form);
    } else {
      return this.mailService.postMailThroughMailGun(form);
    }
  }
}
