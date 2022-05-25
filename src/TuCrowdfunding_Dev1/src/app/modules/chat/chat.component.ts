import { ChangeDetectionStrategy } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Editor } from 'ngx-editor';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  connection: any;
  messages: any[]=[];
  messagesS: any[]=[];
  chat: any[]=[];
  userChats:any[]=[]
  userName: any;
  hideJoin: boolean;
  userId:any=localStorage.getItem('userId')
  currentChatId:any;
  chatForm: FormGroup;
  editor: Editor;
  html: '';
  chatName:any
  constructor(    private formBuilder: FormBuilder,   private changeDetection: ChangeDetectorRef,private chatService:ChatService,private route:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.editor = new Editor();
    if(!this.userId){
      this.route.navigate(['/login'])
    }
    this.getChats();
    this.initWebSocket();

    this.chatForm=this.formBuilder.group({
      content: ['', Validators.required],
    })

  }
  async getChats(){
    await this.chatService.getUserChats(this.userId).then((data)=>{

      this.getmsjs(data)
    })

  }
  currentChat(currentChat){
    this.chatName=currentChat.contributorName
    this.currentChatId=currentChat.id

    var x:any=this.userChats.filter((chat)=>chat.id==currentChat.id)

    this.messages=x[0]['messages']
    this.autoScroll()
    this.changeDetection.detectChanges()

  }

  initWebSocket() {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://localhost:44386/hub/chat')
      .build();
    this.connection
    .start()
    .then(() => console.log('Connection started'))

    this.connection.on('messageReceived', (chat,message) => {
      var tempR:any[]=[]
      var tempS:any[]=[]
      message.forEach((msj)=>{
        if(msj.sender==this.userId)
        {
          tempR.push(msj)
        }
        else{
          tempS.push(msj)

        }

      })
      this.messages=message;
      this.messagesS=tempS;
      this.chat=chat

      this.autoScroll()
      this.html=''
      this.chatForm.value.content=''
      var currentChat=this.userChats.filter((currentChat)=>currentChat.id==chat.id)

      this.getmsjs(currentChat[0])
      //currentChat[0]=chat
    });

  }
  getmsjs(data){
    data.forEach(async( chat)=>{
      await this.userService.getContributor(chat.contributor).subscribe((user)=>{

          chat.contributorName=user.name
          var tempChatMessages:any[]=[]
          chat.messages.forEach(async (msj)=>{
            await this.chatService.getMessage(msj).then((msj)=>{

              tempChatMessages.push(msj)
              chat.messages=tempChatMessages

              this.messages=data[0]['messages']
              this.currentChatId=data[0]['id']
              this.chatName=data[0]['contributorName']

              this.autoScroll()
            })

          })

        })


    })


    this.userChats=data
  }
  onSubmit(){

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const Request={
      "content": this.chatForm.value.content,
      "date": date,
      "sender": this.userId,
      "chat": this.currentChatId
    }
    this.chatService.sendMessage(Request).then((data)=>{
      this.autoScroll()
    })
    var chat=this.userChats.filter((chat)=>chat.id==this.currentChatId)

    chat[0]['messages'].push(Request)
    this.html=''
    this.chatForm.value.content=''

  }
  autoScroll(){
    let elemnt=document.getElementsByClassName('msjs');
    let last:any=elemnt[elemnt.length-1]
    let toppos =last.offsetTop;

    //@ts-ignore
    document.getElementById('msjs')?.scrollTop=toppos
  }
}
