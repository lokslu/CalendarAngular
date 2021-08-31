import { EventModel } from "../Models/EventModel";

export class DayData {
    constructor(time: Date, events: Array<EventModel>) {
      this.Time = time;
      this.Events = events;
    }
    public Events: Array<EventModel>;
    public Time: Date;
  }