import { Component, OnInit } from '@angular/core';

import { Param } from '../custom-format/param';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  usersList: Array<object>;
  params: Param = {
    page: 1,
    perPage: 25,
    sort: 'ASC',
    search: ''
  }
  fetchingData: boolean;
  searching: boolean;
  noUsers: boolean;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getUsers(this.params);
  }

  getUsers(params, cb?): void{
    this.fetchingData = true;
    this.noUsers = false;
    this.userService.getUsersList(params)
    .then(response => {
      this.fetchingData = false;
      this.searching = false;
      if(response.result.success){
        if(cb) this.usersList = [];
        this.usersList = response.result.data.items;
      }
      else{
        this.noUsers = true;
        this.usersList = [];
      }
    })
  }

  searchUser(val: string, event?: any): void{
    this.params.search = val;
    if(val.length < 3 && event && event.keyCode !== 8) return;
    this.searching = true;
    this.getUsers(this.params, ()=>{})
  }

}
