import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  user=localStorage.getItem("userId")
  constructor(
    private httpClient:HttpClient
  ) { }

  async getProjects():Promise<Observable<any[]>> {
    return await this.httpClient.get<any[]>(environment.back + 'api/Project')
  }
  async getProjectsbyUser():Promise<Observable<any[]>> {
    return await this.httpClient.get<any[]>(environment.back + 'api/Project/byuser/'+this.user)
  }
}






