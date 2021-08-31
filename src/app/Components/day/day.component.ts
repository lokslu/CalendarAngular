import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from 'src/app/Models/EventModel';
import { DayData } from 'src/app/Services/DayData';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() Day:DayData;
  constructor() { }

  ngOnInit(): void {
    this.Day.Events=new Array<EventModel>();
for (let i = 0; i < 6; i++) {
  this.Day.Events[i]=new EventModel();
  this.Day.Events[i].Data="sfgdf,lgf sdgd fgd hrh dfgfd "

}
    
  }

}
