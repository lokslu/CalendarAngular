import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { EventModel } from 'src/app/Models/EventModel';
import { DayData } from 'src/app/Services/DayData';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChangeEventDayModalComponent } from '../change-event-day-modal/change-event-day-modal.component';
import { NewEventDayModalComponent } from '../new-event-day-modal/new-event-day-modal.component';
import { EventService } from 'src/Api/EventServise';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  public DisplayMore: boolean = false;
  @Output() addEvent = new EventEmitter();
  @Output() changeEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Input() Day: DayData;
  constructor(private modalService: NgbModal, private eventS: EventService) { }

  ngOnInit(): void {

    this.chekedDisplayMore();


  }
  chekedDisplayMore() {
    if (this.Day.Events.length > 4) {
      this.DisplayMore = true;
    }
    else {
      this.DisplayMore = false;

    }
  }

  public AddEvent() {
    const modalRef = this.modalService.open(NewEventDayModalComponent);
    let NewEvent = new EventModel();
    NewEvent.Time = this.Day.Time;
    modalRef.componentInstance.NewEvent = NewEvent;
    modalRef.result.then(
      () => {
        this.addEvent.emit(NewEvent);
        this.Day.Events.unshift(NewEvent);
        this.chekedDisplayMore();
      },
      () => { }
    )

  }
  public ChangeEvent(event: EventModel, index: number) {

    const modalRef = this.modalService.open(ChangeEventDayModalComponent);
    const ChangedEvent = Object.assign({}, event);
    modalRef.componentInstance.ChangedEvent = ChangedEvent;


    modalRef.closed.subscribe((state) => {
      if (state === "Delete") {
        this.deleteEvent.emit(ChangedEvent.Id)
        this.Day.Events.splice(index, 1);
        this.chekedDisplayMore();

      }
      if (state === "Change") {
        this.Day.Events[index] = ChangedEvent;
        this.changeEvent.emit(ChangedEvent);
      }

    })
  }
}
