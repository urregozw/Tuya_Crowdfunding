export class IdeaDto{
  id?:string;
  title: string;
  isComplete: boolean;
  description: string;
  objective: string;
  creationDate: string;
  deadline: string;
  video: string;
  pdf: string;
  fundGoal: number;
  category: string;
  status: number;
  backers: number;
  fundsCollected: number;
  entrepreneur: string;
  donations= []


}
