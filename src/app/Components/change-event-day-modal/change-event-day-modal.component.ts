import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventModel } from 'src/app/Models/EventModel';

@Component({
  selector: 'app-change-event-day-modal',
  templateUrl: './change-event-day-modal.component.html',
  styleUrls: ['./change-event-day-modal.component.css']
})
export class ChangeEventDayModalComponent implements OnInit {

  constructor(public modal:NgbActiveModal) { }

  @Input()ChangedEvent:EventModel;
  public validEvent:boolean;

  ngOnInit(): void {

  }
  public ValidEvent()
  {
    if (this.ChangedEvent.Data==="") {
      this.validEvent= false;
    }
    else
    {
      this.validEvent=true;
    }
  }

}
