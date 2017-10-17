import { Component, OnInit } from '@angular/core';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  usersList: Array<object>;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsersList()
    .then(response => {
      if(response.result.success)
        this.usersList = response.result.data.items;
      else
        this.usersList = [];
    })
  }

}
