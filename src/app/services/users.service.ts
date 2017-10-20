import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { Param } from '../custom-format/param';

declare var App: any;

@Injectable()
export class UsersService {

  private getUsersApi = App.base_url + 'getUsersDropdown';
  private getSelectedUserApi = App.base_url + 'userDetails';
  private getUserPermissionsApi = App.base_url + 'getPermissions';
  private getGlobalPermissionsApi = App.base_url + 'getGlobalData';

  constructor(private http: HttpClient) { }

  getUsersList(param: Param): Promise<any> {
    return this.http
      .post(this.getUsersApi, param)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getSelectedUser(param: any): Promise<any> {
    return this.http
      .post(this.getSelectedUserApi, param)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPermissions(param: any): Promise<any> {
    return this.http
      .post(this.getUserPermissionsApi, param)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getGlobalPermissions(): Promise<any> {
    return this.http
      .get(this.getGlobalPermissionsApi)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /* For Demo Purpose */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
