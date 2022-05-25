import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthService } from 'src/app/services/auth.service';

import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-historic-graph',
  templateUrl: './historic-graph.component.html',
  styleUrls: ['./historic-graph.component.css']
})
export class HistoricGraphComponent implements OnInit {
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  timeline: boolean = true;

  historic: any;
  _asideSubscription: any;
  constructor(private projectsService: ProjectService,
    private changeDetection: ChangeDetectorRef,
) { }

  ngOnInit(): void {

    this._asideSubscription = this.projectsService.historiChange.subscribe((value) => {
      this.historic = this.projectsService.historic
      this.reload()

    })
  }

  reload() {
    var dataset: any[] = []
    for (var key in this.historic) {

      var tempData = {
        name: key,
        series: this.historic[key]

      }
      dataset.push(tempData)
    }


    this.historic = dataset
    this.changeDetection.detectChanges()
  }
}
