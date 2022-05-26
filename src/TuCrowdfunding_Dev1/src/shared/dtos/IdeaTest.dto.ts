export class IdeaTestDto{
goal:number;
usd_goal_real:number;
deadline_year:number;
deadline_month:number;
launched_year:number;
launched_month:number;
cat:string;
min_cat:string;
curr_USD:number=1;
country_US:number=1;
pledged:number;
backers:number ;
usd_pledged:number;
usd_pledged_real:number;
constructor(idea){
  var date=idea['creationDate'].split('T')[0]
  var launched=date.split('-')
  var f = new Date(launched[0], launched[1] - 1, launched[2])
  const DeadDate = new Date();
  DeadDate.setDate(f.getDay() + idea['duration']);
  var launchedDate = f.getFullYear()+'-'+(f.getMonth()+1)+'-'+f.getDate();
  var deadline = DeadDate.getFullYear()+'-'+(DeadDate.getMonth()+1)+'-'+DeadDate.getDate();
  console.log(launchedDate);
  console.log(deadline);

  this.goal=idea['fundGoal']/4000;
  this.usd_goal_real=idea['fundGoal']/4000;
  this.deadline_year=parseInt(deadline.split('-')[0])
  this.deadline_month=parseInt(deadline.split('-')[1])
  this.launched_year=parseInt(launchedDate.split('-')[0])
  this.launched_month=parseInt(launchedDate.split('-')[1])
  this.cat= idea['category'];
  this.min_cat= idea['subCategory'];
  this.curr_USD=1;
  this.country_US=1;
  this.pledged=idea['fundsCollected']/4000;
  this.backers=idea['donations'].length;
  this.usd_pledged=idea['fundsCollected']/4000;
  this.usd_pledged_real=idea['fundsCollected']/4000;
}
}
