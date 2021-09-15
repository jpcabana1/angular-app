import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/userService/users.service';
import { MessageWarning } from '../../Enums/MessageWarning.enum';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
})
export class FormUserComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  warning: boolean = false;
  message: string = MessageWarning.Ok;

  userForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
  });

  createNewUser(): void {
    this.userService.postUser(this.userForm.value).subscribe();
    this.showWarning();
  }

  showWarning() {
    this.warning = true;
    setTimeout(() => {
      this.warning = false;
    }, 2000);
  }
}
