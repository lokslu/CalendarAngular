import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { UserModel } from 'src/app/Models/UserModel';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/Models/EventModel';
@Injectable()
export class EventService {
    public readonly apiString = environment.apiUrl;
    constructor(private router: Router,
        private httpClient: HttpClient
    ) { }



    //все события
    public GetAll() {
        return this.httpClient.get(this.apiString + '/api/Event/getall');
    }

    //добавление события
    public AddEvent(NewEvent: EventModel) {
        const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post(this.apiString + '/api/Event/add', NewEvent);
    }
    //изменение события
    public ChangeEvent(ChangeEvent: EventModel) {
        const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.put(this.apiString + '/api/Event/update', ChangeEvent);
    }
    //удаление события
    public DelateEvent(IdDeletedEvent: string) {
        const params = new HttpParams()
      .set("EventId", IdDeletedEvent);
        const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.delete(this.apiString + '/api/Event/delete',{params} );
    }


}
