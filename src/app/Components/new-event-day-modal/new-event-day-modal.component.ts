import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventModel } from 'src/app/Models/EventModel';

@Component({
  selector: 'app-new-event-day-modal',
  templateUrl: './new-event-day-modal.component.html',
  styleUrls: ['./new-event-day-modal.component.css']
})
export class NewEventDayModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  @Input() NewEvent: EventModel;
  public validEvent:boolean;
  ngOnInit(): void {
    
  }

  public ValidEvent()
  {
    if (this.NewEvent.Data==="") {
      this.validEvent= false;
    }
    else
    {
      this.validEvent=true;
    }
  }
  public Create() {

    
    // this.modal.close(this.NewEvent);
    this.modal.close();
  }
}
