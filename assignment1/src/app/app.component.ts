import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat';
  constructor (private router: Router) {}

  valid = JSON.parse(sessionStorage.getItem('username')!);
  role = JSON.parse(sessionStorage.getItem('role')!);
  

  //Clears the sessions storage after a user logs out.
  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl("/")
    .then(() => {
      //Reloading the window to update the navigation display.
      window.location.reload();
    });
  }
  
}

