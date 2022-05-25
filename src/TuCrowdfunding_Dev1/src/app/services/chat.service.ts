import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Server } from "socket.io";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()
export class ChatService {

  constructor( private httpClient: HttpClient) { }

  async getUserChats(id:string):Promise<any>{
     return await this.httpClient.get<any>(environment.back+`api/Chat/chatsByUser/${id}`).toPromise()
  }

  async getMessage(id:string):Promise<any>{
     return await this.httpClient.get<any>(environment.back+`api/Message/${id}`).toPromise()
  }

  async sendMessage(request:any):Promise<any>{
    return await new Promise((resolve,reject)=>{
      resolve(
        this.httpClient.post<any>((environment.back + 'api/Message'), request,{ headers: { 'Content-Type': 'application/json;odata=verbose' } }).subscribe()

      )
    })
  }
}
