import { Component, OnInit } from '@angular/core';
import { userDTO } from 'src/app/dtos/userDTO';

import { UsersService } from '../../services/userService/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: userDTO[] = [];
  error: any;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.setUsers();
  }

  setUsers() {
    this.userService.getUsers().subscribe(
      (resp: userDTO[]) => {
        this.users = [...resp];
      },
      (error) => (this.error = error)
    );
  }
}
