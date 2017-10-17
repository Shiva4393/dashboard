import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

declare var App: any;

@Injectable()
export class UsersService {

  private getUsers = App.base_url + 'getUsersDropdown';

  constructor(private http: HttpClient) { }

  getUsersList(): Promise<any> {
    return this.http
      .get(this.getUsers)
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
