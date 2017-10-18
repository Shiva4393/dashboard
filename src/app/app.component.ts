import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

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

  constructor(private route: Router){
    route.events.subscribe(val => {
      if(val instanceof NavigationStart){
        if(val.url.match('user'))
          this.change('user');
      }
    })
  }

  ngOnInit() {
    this.userDetails = App.user_details;
  }

  change(param: string): void {
    switch (param) {
      case 'dashboard': {
        this.title = 'Dashboard';
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
