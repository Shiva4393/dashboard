import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [UsersService]
})
export class UserDetailsComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userService: UsersService 
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.userService
        .getSelectedUser(params)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    });
    this.createForm();
  }

  createForm(): void{
    this.userForm = this.fb.group({
      
    })
  }

}
