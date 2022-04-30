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
  editProject(project:any):Promise<any>{
    const data=JSON.stringify(project)
    console.log(data);
    var url:string = (environment.back + 'api/Project/'+ project.id);

    
    return new Promise((resolve,reject)=>{
      resolve(
        this.httpClient.put<any>((environment.back + 'api/Project/'+ project.id), data,{ headers: { 'Content-Type': 'application/json;odata=verbose' } }).subscribe()
      
      )
    })
    
  }
  createProject(project:any):Promise<any>{
    const data=JSON.stringify(project)
    console.log(data);
    var url:string = (environment.back + 'api/Project/'+ project.id);

    
    return new Promise((resolve,reject)=>{
      resolve(
        this.httpClient.post<any>((environment.back + 'api/Project'), data,{ headers: { 'Content-Type': 'application/json;odata=verbose' } }).subscribe()
      
      )
    })
    
  }
}






