import { NodeWithI18n } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/Api/EventServise';
import { EventModel } from 'src/app/Models/EventModel';
import { DayData } from 'src/app/Services/DayData';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public AllEvents: Array<EventModel>;

  // public CurentMonth: Array<Array<DayData>>;

  public CurentMonth: Array<DayData>;

  constructor(private EventS: EventService, private snackBar: MatSnackBar) { }
  // @ViewChild('nav', { read: ElementRef }) nav:ElementRef|undefined;

  private StartDate: Date;
  private EndDate: Date;
  public Now: Date;

  public numberRow: number;

  private IntiStartDate() {
    this.StartDate = new Date(this.Now);
    this.StartDate.setDate(1);
    let shiftDays = this.StartDate.getDay()
    switch (shiftDays) {

      case 0:
        this.StartDate.setDate(-5);
        break;

      case 1:
        break;

      default:
        shiftDays = shiftDays - 2;
        this.StartDate.setDate(-shiftDays);
        break;
    }
  }
  private InitEndDate() {

    let Month = this.Now.getMonth();
    let year = this.Now.getFullYear();
    let day = new Date(year, Month + 1, 0).getDate();//+1 чтобы узнать количество дней в месяце

    this.EndDate = new Date(year, Month, day);

    let shiftDays = this.EndDate.getDay()
    switch (shiftDays) {

      case 0:
        break;

      default:
        shiftDays = day + (7 - shiftDays);
        this.EndDate.setDate(shiftDays);

        break;

    }
  }


  // ngAfterViewInit() {

  //   console.log(this.nav.nativeElement.offsetHeight);
  //   console.log(window.innerHeight, this.nav.nativeElement.firstChild.offsetHeight);
  // }

  // public Heith()
  // {
  //   if (this.nav?.nativeElement?.firstChild?.offsetHeight==undefined) {
  //     return null;
  //   }
  //   return window.innerHeight-this.nav.nativeElement.firstChild.offsetHeight;

  // }

  public InitialCurrentMonth() {
    this.IntiStartDate();
    this.InitEndDate();

    let milliseconds = this.EndDate.getTime() - this.StartDate.getTime();
    let numberDay = milliseconds / 1000 / 60 / 60 / 24;

    this.numberRow = (numberDay + 1) / 7;


    this.CurentMonth = new Array<DayData>();

    for (let i = 0; i < numberDay + 1; i++) {

      let newDate = new Date(this.StartDate);
      newDate.setDate(newDate.getDate() + i)

      this.CurentMonth.push(new DayData(
        newDate,
        this.AllEvents.filter(x => this.EqualityDate(x.Time, newDate))
      ));

    }
  }

  ngOnInit(): void {

    this.Now = new Date();
    this.Now.setHours(12, 0, 0, 0);

    this.EventS.GetAll().subscribe(
      (Data: Array<EventModel>) => {
        this.AllEvents = Data.map(x => {
          x.Time = new Date(x.Time);
          return x;
        });
        this.InitialCurrentMonth();
      }
    )


  }


  private BetweenDate(TimeStart: Date, TimeEnd: Date, CurentTime: Date) {
    let Y: boolean = TimeStart.getFullYear() <= CurentTime.getFullYear() && CurentTime.getFullYear() <= TimeEnd.getFullYear();
    let M: boolean = TimeStart.getMonth() <= CurentTime.getMonth() && CurentTime.getMonth() <= TimeEnd.getMonth();
    let D: boolean = TimeStart.getDate() <= CurentTime.getDate() && CurentTime.getDate() <= TimeEnd.getDate();
    return Y && M && D;
  }
  private EqualityDate(Time1: Date, Time2: Date) {
    let Y: boolean = Time1.getFullYear() == Time2.getFullYear();
    let M: boolean = Time1.getMonth() == Time2.getMonth();
    let D: boolean = Time1.getDate() == Time2.getDate();
    return Y && M && D;
  }

  public AddEvent(newEvent: EventModel) {
    this.EventS.AddEvent(newEvent).subscribe(
      (Id: string) => {
        newEvent.Id = Id;
        this.snackBar.open("Event created", "okey",{
          duration: 6000,
        });

      },
      (error) => { }
    )
    this.AllEvents.unshift(newEvent);
  }
  public DeleteEvent(Id: string) {
    let index = this.AllEvents.indexOf(this.AllEvents.filter(x => x.Id == Id)[0])
    this.AllEvents.splice(index, 1);
    this.EventS.DelateEvent(Id).subscribe(
      (ok) => {
        this.snackBar.open("Event deleted", "okey",{
          duration: 6000,
        });
        
       },
      (error) => { }
    )
  }

  public ChangeEvent(ChangedEvent: EventModel) {
    this.AllEvents.filter(x => x.Id == ChangedEvent.Id)[0].Data = ChangedEvent.Data;
    this.EventS.ChangeEvent(ChangedEvent).subscribe(
      (ok) => {
        this.snackBar.open("Event changed", "okey",{
          duration: 6000,
        });

      },
      (error) => {

       }
    )
  }


}

