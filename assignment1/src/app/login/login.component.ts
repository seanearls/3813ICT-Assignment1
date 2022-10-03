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

  username:string = "";
  role: string;
  upwd: string = "";


  ngOnInit(): void {
  }

  onLogin() {
    if (this.username === "" || this.upwd === "") {
      alert("Please enter a username and password.");
      return;
    }
    
    this.httpClient.post(serverURL + '/auth', {username: this.username, upwd: this.upwd}, httpOptions).subscribe((data: any) => {
      if (data.valid){
        sessionStorage.setItem('username', JSON.stringify(data.username));
        sessionStorage.setItem('email', JSON.stringify(data.email));
        sessionStorage.setItem('role', JSON.stringify(data.role));
        sessionStorage.setItem('valid', "true");
        this.router.navigateByUrl('groups')
        .then(() => {
          window.location.reload();
        })
      } else {
        this.username ="";
        this.upwd="";
        alert("Incorrect username or password.");
      }
    });
  }

}
