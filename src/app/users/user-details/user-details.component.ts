import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '@angular/forms';

import * as _ from "lodash";

import { Ng4FilesStatus, Ng4FilesSelected } from 'angular4-files-upload';

import { UsersService } from '../../services/users.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [UsersService]
})
export class UserDetailsComponent implements OnInit {

  userForm: FormGroup;
  status: Array<object> = [
    { id: 1, value: 'Active', param: true },
    { id: 0, value: 'Inactive', param: false }
  ];
  fetchingData: boolean = true;
  globalPermissions: any;
  userPermissions: Array<any> = [];
  systemPermissions: Array<any> = [];
  selectedUser: any;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getGlobalPermissions();
    this.activeRoute.params.subscribe((params: Params) => {
      this.userForm.markAsPristine(); // default form prisnstine
      this.fetchingData = true;
      if(params.id == 0){
        this.fetchingData = false;
        this.newUser();
        return;
      }
      this.userService
        .getSelectedUser(params)
        .then(response => {
          this.fetchingData = false;
          if (response.result.success) {
            this.selectedUser = response.result.data;
            this.setForm(this.selectedUser);
          }
        })
        .catch(error => console.log(error));

      this.userService
        .getPermissions({ users_id: params.id })
        .then(response => {
          if (response.result.success) {
            this.userPermissions = response.result.data.system_permissions;
            this.loadInitials(this.globalPermissions);
          }
        })
        .catch(error => console.log(error));
    });
  }

  newUser(): void{
    this.userForm.reset();
    this.selectedUser = {};
    this.userPermissions = [];
    this.loadInitials(this.globalPermissions);
  }

  createForm(): void {
    this.userForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      status: [null, Validators.required]
    })
  }

  setForm(data: any): void {
    this.userForm.setValue({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      status: data.status
    })
  }

  getGlobalPermissions() {
    this.userService
      .getGlobalPermissions()
      .then(response => {
        if (response.result.success) {
          this.globalPermissions = response.result.data.global_system_permissions;
        }
      })
      .catch(error => console.log(error));
  }

  loadPermissions(data: any): void {
    data.map(value => {
      if (_.findIndex(this.systemPermissions, { id: value.id }) === -1 && value.permission) {
        if (value.permission.length) {
          this.systemPermissions.push({ id: value.id, permission: value.permission });
        }
      }
      if (value.children) {
        this.loadPermissions(value.children);
      }
    });
  }

  loadInitials(data: any): void {
    data.map(child => {
      delete child.permission;
      delete child.checked;
      delete child.selectedValue;
      this.userPermissions.map(getpermission => {
        if (getpermission.id === child.id) {
          child.checked = _.indexOf(getpermission.permission, 1) > -1 ? true : false;
          child.selectedValue = getpermission.permission[0];
          child.permission = getpermission.permission;
        }
      });
      if (child.children) {
        this.loadInitials(child.children);
      }
    })
  }

  filesSelect(selectedFiles: Ng4FilesSelected): void {
    console.log(selectedFiles)
  }

  setDirty(): void{
    this.userForm.markAsDirty();
  }

  cancel(form: any): void {
    form.markAsPristine();
    this.setForm(this.selectedUser);
    this.loadInitials(this.globalPermissions);
  }

  submitUser(form: any): void {
    if (!form.valid) return;
    console.log(form.value)
    this.systemPermissions = [];
    this.loadPermissions(this.globalPermissions);
    console.log(this.systemPermissions);
  }

}
