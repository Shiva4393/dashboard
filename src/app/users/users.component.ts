import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Param } from '../custom-format/param';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  usersList: Array<any>;
  params: Param = {
    page: 1,
    perPage: 25,
    sort: 'ASC',
    search: ''
  }
  fetchingData: boolean;
  searching: boolean;
  noUsers: boolean;

  constructor(
    private router: Router,
    private userService: UsersService) { }

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
        if(response.result.data.count == 0) this.noUsersExists();
        else{
          this.usersList = response.result.data.items;
          this.selectUser();
        }
      }
      else{
        this.noUsersExists();
      }
    })
  }

  noUsersExists(): void{
    this.noUsers = true;
    this.usersList = [];
    this.router.navigateByUrl('/users/0');
  }

  selectUser(): void{
    this.router.navigateByUrl('/users/'+this.usersList[0].id);
  }

  searchUser(val: string, event?: any): void{
    this.params.search = val;
    if(val.length < 3 && event && event.keyCode !== 8) return;
    this.searching = true;
    this.getUsers(this.params, ()=>{})
  }

}
