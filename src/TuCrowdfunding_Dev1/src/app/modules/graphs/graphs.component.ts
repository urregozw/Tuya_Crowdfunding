import { Component, OnInit,Input } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})

export class GraphsComponent implements OnInit {
  @Input() goal:any;
  @Input() collected:any;
  data:any[]=[]
  color=[{name:"data",value: '#000068'}]
  showXAxis: boolean = true;


  constructor() {

  }

  ngOnInit(): void {

    this.processData()
  }
  processData(){
    const persentage=(this.collected*100)/this.goal
    this.data=[  {
      "name": "data",
      "value": persentage
    }]
    if(persentage<=33){
      this.color=[{name:"data",value: '#bf0a0a'}]
    }
    if(persentage>33 && persentage<=67){
      this.color=[{name:"data",value: '#e6da21'}]
    }
    if(persentage>67){
      this.color=[{name:"data",value: '#05d700'}]
    }
  }
}
