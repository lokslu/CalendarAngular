import { NodeWithI18n } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventModel } from 'src/app/Models/EventModel';
import { DayData } from 'src/app/Services/DayData';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public AllEvents: Array<EventModel>;

  // public CurentMonth: Array<Array<DayData>>;

  public CurentMonth: Array<DayData>;

  constructor( ) { }
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

  public InitialCurrentMonth()
  {
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

    this.AllEvents = new Array<EventModel>();//получение всех событий

    this.Now = new Date();
    this.Now.setHours(0, 0, 0, 0);
    this.InitialCurrentMonth();
    
    
    // this.AllEvents.sort((a, b) => {
    //   let t1: Date = new Date(b.Time)
    //   let t2: Date = new Date(a.Time)
    //   return t1.getTime() - t2.getTime();
    // });

    // this.CurentMonth = new Array<Array<DayData>>();

    // for (let i = 0; i < (numberDay+1)/7; i++) {
    //   this.CurentMonth[i]=new Array<DayData>();
    //   for (let j = 0; j < 7; j++) {

    //     let newDate = new Date(this.StartDate);
    //     newDate.setDate(newDate.getDate() +(i*7)+j)

    //     this.CurentMonth[i][j]=new DayData(
    //            newDate,
    //            this.AllEvents.filter(x => this.EqualityDate(x.Time, newDate))
    //          );
    //   }

    // }

   
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



}

