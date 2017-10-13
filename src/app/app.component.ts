import { Component, OnInit } from '@angular/core';

declare var App: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  userDetails: Object;

  ngOnInit() {
    this.userDetails = App.user_details;
  }

  logout(): void{
    window.location.href = App.base_url + 'logout';
  }
}
