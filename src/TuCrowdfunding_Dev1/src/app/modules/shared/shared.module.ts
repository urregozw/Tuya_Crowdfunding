import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import { GraphsComponent } from '../graphs/graphs.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [GraphsComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    NgChartsModule,
  ],
  exports: [GraphsComponent]
})
export class SharedModule { }
