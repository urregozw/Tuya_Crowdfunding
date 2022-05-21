import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user=localStorage.getItem("userId")
  constructor(
    private httpClient:HttpClient
  ) { }

  async getFavProjects():Promise<Observable<any[]>> {
    return await this.httpClient.get<any[]>(environment.back + 'api/Contributor/'+this.user)
  }
  addToFavs(data):Promise<any>{
    return new Promise((resolve,reject)=>{
      resolve(
        this.httpClient.post<any>((environment.back + 'api/Contributor/project/add'), data,{ headers: { 'Content-Type': 'application/json;odata=verbose' } }).subscribe()

      )
    })
  }
  getProjectById(id):Observable<any>{
    return this.httpClient.get<any>(environment.back + `api/Project/${id}`)
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
        this.httpClient.put<any>((environment.back + 'api/Project/'+ project.id), data,{ headers: { 'Content-Type': 'application/json;odata=verbose' } }).subscribe((data)=>{console.log(data)}
        )

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
  getEntrepreneur(id:string):Observable<any>{
    console.log(id);

    return this.httpClient.get<any>(environment.back + `api/Entrepreneur/${id}`)
  }

  getDonation(id:string):Observable<any>{
    console.log(id);

    return this.httpClient.get<any>(environment.back + `api/Donation/list/project/${id}`)
  }

  donate(data):Promise<any>{
    return new Promise((resolve,reject)=>{
      resolve(
        this.httpClient.post<any>((environment.back + 'api/Donation'), data,{ headers: { 'Content-Type': 'application/json;odata=verbose' } }).subscribe()

      )
    })


  }
}






