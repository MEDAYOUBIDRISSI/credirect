import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { of } from 'rxjs';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,interactionPlugin,timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    events : [
      { title: 'Demande de crédit immobilier - Ahmed El Amrani', date: '2025-02-05' },
      { title: 'Demande de crédit à la consommation - Fatima Zahra', date: '2025-02-05' },
      { title: 'Demande de Mourabaha - Mohamed Kettani', date: '2025-02-05' },
      { title: 'Demande de crédit hypothécaire - Samira El Fassi', date: '2025-02-14' },
      { title: 'Demande de crédit automobile - Hassan El Mansouri', date: '2025-02-17' },
      { title: 'Demande de crédit révolving - Amina Belhaj', date: '2025-02-20' },
      { title: 'Demande de crédit d’investissement - Omar El Khattabi', date: '2025-02-23' },
      { title: 'Demande de crédit à la promotion immobilière - Zineb El Idrissi', date: '2025-02-25' },
      { title: 'Demande de crédit-bail immobilier - Youssef Benchekroun', date: '2025-02-25' },
      { title: 'Demande de crédit-bail mobilier - Nadia El Amraoui', date: '2025-02-28' },
    ]
  };

  fetchEvents(dateInfo) {
    return this.get(dateInfo.start, dateInfo.end).toPromise();
  }
  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  get(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // below we create some random events but in a real application
    // one could use the HTTP service to query a backend service

    /* in ms */
    const span = endDate.valueOf() - startDate.valueOf();
    const nbEventsToCreate = this.randomInteger(1, 5);
    const events = [];
    const subSpan = span / nbEventsToCreate / this.randomInteger(1, 5);
    while (events.length < nbEventsToCreate) {
      events.push({
        title: `Event ${events.length + 1}`,
        start: new Date(startDate.valueOf() + subSpan * events.length),
        end: new Date(startDate.valueOf() + subSpan * (events.length + 1))
      });
    }
    return of(events);
  }

}
