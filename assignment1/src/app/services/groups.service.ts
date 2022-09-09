import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Group } from '../model/group';

const serverURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private router: Router, private http: HttpClient) { }

  groups: Group[];

  getGroups() {
    return this.http.post<any>(serverURL + '/getGroups', this.groups)
  }
}
