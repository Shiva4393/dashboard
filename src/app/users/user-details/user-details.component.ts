import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailValidator } from '@angular/forms';

import { Ng4FilesStatus, Ng4FilesSelected } from 'angular4-files-upload';

import { UsersService } from '../../services/users.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const permissions = {
  "result": {
    "success": true,
    "data": {
      "global_divisions": "",
      "global_system_permissions": [
        {
          "id": 25,
          "name": "Admin Access",
          "code": "admin_access",
          "parent_id": 0,
          "type": "label",
          "level": 1,
          "options": [
            {
              "id": 1,
              "name": ""
            }
          ],
          "children": [
            {
              "id": 36,
              "name": "Superadmin",
              "code": "super_admin",
              "parent_id": 25,
              "type": "check",
              "level": 2,
              "options": [
                {
                  "id": 1,
                  "name": ""
                }
              ]
            },
            {
              "id": 55,
              "name": "Login As User",
              "code": "login_as_user",
              "parent_id": 25,
              "type": "check",
              "level": 2,
              "options": [
                {
                  "id": 1,
                  "name": ""
                }
              ]
            },
            {
              "id": 56,
              "name": "Email Notification",
              "code": "email_notification",
              "parent_id": 25,
              "type": "check",
              "level": 2,
              "options": [
                {
                  "id": 1,
                  "name": ""
                }
              ]
            }
          ]
        },
        {
          "id": 53,
          "name": "Admin Group Access",
          "code": "admin_group_access",
          "parent_id": 0,
          "type": "check",
          "level": 2,
          "options": [
            {
              "id": 1,
              "name": ""
            }
          ],
          "children": [
            {
              "id": 44,
              "name": "Divisions Settings",
              "code": "master_table_15",
              "parent_id": 53,
              "type": "check",
              "level": 3,
              "options": [
                {
                  "id": 1,
                  "name": ""
                }
              ]
            },
            {
              "id": 57,
              "name": "File Categories",
              "code": "master_table_16",
              "parent_id": 53,
              "type": "check",
              "level": 3,
              "options": [
                {
                  "id": 1,
                  "name": ""
                }
              ]
            }
          ]
        }
      ]
    },
    "message": "You have accessed successfully",
    "status_code": 200
  }
}

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
  selectedUser: any;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.createForm();
    //this.getGlobalPermissions();
    this.globalPermissions = permissions.result.data.global_system_permissions;
    this.activeRoute.params.subscribe((params: Params) => {
      this.userService
        .getSelectedUser(params)
        .then(response => {
          this.fetchingData = false;
          if(response.result.success){
            this.selectedUser = response.result.data;
            this.setForm(this.selectedUser);
          }
        })
        .catch(error => console.log(error));
    });
  }

  createForm(): void {
    this.userForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      status: [null, Validators.required]
    })
  }

  getGlobalPermissions() {
    this.userService
      .getGlobalPermissions()
      .then(response => {
        let permissionFormGroup: FormGroup = new FormGroup({});
        for(let parent of this.globalPermissions){
          let control: FormControl = new FormControl(parent.id, Validators.required);
          permissionFormGroup.addControl(parent.id, control);
          if(parent.children){
            for(var child of parent.children){
              let control: FormControl = new FormControl(child.id, Validators.required);
              permissionFormGroup.addControl(child.id, control);
            }
          }
        }
        console.log(response)
      })
      .catch(error => console.log(error));
  }

  setForm(data: any): void {
    this.userForm.setValue({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      status: data.status
    })
  }

  filesSelect(selectedFiles: Ng4FilesSelected): void {
    console.log(selectedFiles)
  }

  submitUser(form: any): void {
    if (!form.valid) return;
    console.log(form.value)
  }

}
