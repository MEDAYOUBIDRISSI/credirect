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
    events: [
      { title: 'Event 1', date: '2025-01-01' },
      { title: 'Event 2', date: '2025-01-02' },
      { title: 'Oum Kell', date: '2025-01-02' },

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
