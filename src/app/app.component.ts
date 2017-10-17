import { Component, OnInit } from '@angular/core';

declare var App: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string = 'Dashboard';
  icon: string = 'dashboard';
  userDetails: Object;

  ngOnInit() {
    this.userDetails = App.user_details;
  }

  change(param: string): void {
    switch (param) {
      case 'dashboard': {
        this.title = 'dashboard';
        this.icon = 'dashboard';
      }
        break;
      case 'user': {
        this.title = 'User';
        this.icon = 'people';
      }
        break;
    }
  }

  logout(): void {
    window.location.href = App.base_url + 'logout';
  }
}
