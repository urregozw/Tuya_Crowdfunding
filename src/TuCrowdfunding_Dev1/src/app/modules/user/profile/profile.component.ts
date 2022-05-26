import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { IdeaTestDto } from 'src/shared/dtos/IdeaTest.dto';
import { User } from 'src/shared/dtos/user.dto';
import { ObjectMethod } from 'src/shared/ObjectMethod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any
  userId=localStorage.getItem('userId')
  userType=localStorage.getItem('userType')
  entrepreneur:boolean=this.isEntrepreneur
  myDonations:any[]=[]
  Historic:any[]=[]
  myProyects:any[]=[]
  constructor(private userService:UserService,private projectsService:ProjectService,
    private changeDetection: ChangeDetectorRef,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.getUser()
    if(this.entrepreneur){
    this.getProjects()
    }
    console.log(this.entrepreneur);


  }
  get isEntrepreneur(){
    if(this.userType=='entrepreneur'){
      return true
    }
    else{
      return false
    }
  }
  mensajes(){
    this.router.navigate(['user/chats'])
  }
  misIdeas(){
    console.log('s');

    this.router.navigate(['ideas/misideas'])
  }
  getUser(){
    this.userService.getUser(this.userId).subscribe((data)=>{
      console.log(data);

      this.user=data
      this.user['donations'].forEach(element => {
        this.projectsService.getContributorDonation(element).then((data)=>{
          this.projectsService.getProjectById(data.project).subscribe((project)=>{
            data['project']=project.title
            data['date']=data['date'].split('T')[0]
            this.myDonations.push(data)
          })
        })
      });
    }
    )
  }
  seeIdea(idea){
    console.log(idea);
    localStorage.setItem('IDidea',idea.id)
    this.router.navigate([`ideas/${idea.title}`])

  }
  getProjects(){
    var Data:any[]=[]
    var DataInfo:any={}
    this.projectsService.getProjectsbyUser().then((data)=>{


      data.subscribe(async (response)=>{
        console.log(response);
        this.myProyects=response
        var tempresponse:any[]=[]
        response.forEach(async project=>{


          DataInfo[project['title']]=[]
          project['donations'].forEach((async donation=>{
            var value:any=0
            await this.projectsService.getContributorDonation(donation).then((data)=>{
              value={
                "name": project['donations'].indexOf(donation),
                "value": data['donatedFunds']
              }
            })
            DataInfo[project['title']].push(value)
            this.projectsService.historic=DataInfo
            this.projectsService.historiChange.next(true);
            this.changeDetection.detectChanges()
          }))
        })
      })
    })

  }
  logOut(){
    this.authService.logout();
    this.router.navigate([''])
  }
}
