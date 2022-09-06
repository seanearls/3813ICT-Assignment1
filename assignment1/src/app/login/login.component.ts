import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const serverURL = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router, private httpClient:HttpClient) {

  }

  username:string="";
  upwd:string = "";
  role: string="";


  ngOnInit(): void {
  }

  onLogin() {
    let user = {username: this.username, upwd: this.upwd};
    if (this.username === "" && this.upwd === "") {
      alert("Please enter a username and password.");
      return;
    }
    this.httpClient.post(serverURL + '/api/auth', user, httpOptions).subscribe((data: any) => {
      if (data.valid){
        sessionStorage.setItem('username', JSON.stringify(data.username));
        sessionStorage.setItem('email', JSON.stringify(data.email));
        sessionStorage.setItem('id', JSON.stringify(data.id));
        sessionStorage.setItem('role', JSON.stringify(data.id));
        this.router.navigateByUrl('groups');
      }
    });
  }

}
