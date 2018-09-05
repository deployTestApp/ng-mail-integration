import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent implements OnInit {
  public servers = ["Send Grid", "Mail Gun"];
  public mailForm: FormGroup;
  constructor(public fb: FormBuilder) { 
    this.mailForm = this.fb.group({
      to: ["", {validators: Validators.email, updateOn: 'blur'}],
      cc: ["", {validators: Validators.email, updateOn: 'blur'}],
      bcc: ["", {validators: Validators.email, updateOn: 'blur'}],
      subject: ["", Validators.required],
      text: ["", Validators.required],
      mailServer:["", Validators.required]
    });
  }

  ngOnInit() {
  }

  public sendMail(form: any) {
    console.log(form);
  }
}
