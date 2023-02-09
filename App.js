import React from 'react';
import './style.css';

function CalendarVisual(props) {

  let date = props.data;
  let todayDate = props.now;
  let month = props.month;
  month = date.toLocaleString('en', {month: 'long'});
  let today = date.toLocaleString("en", {weekday: "long"});
  
  let year = date.getFullYear();

  let calendarArray = [];
  let difference, difference2;
  let putTR;
  let week = [];

  date.setDate(1);

  if (date.getDay() === 0) {
      difference = 6;
      difference2 = -5
  } else {
      difference = date.getDay() - 1;
      difference2 = 2 - date.getDay();
  }

  date.setDate(difference2);

  let i;
  putTR = 7 - difference;

  for (i=0; i<difference; i++) {
      week.push({"date": date.getDate(), "month": 1});
      date.setDate(date.getDate() + 1);
  }

  date.setMonth(date.getMonth() + 1);
  let monthAfter = date.getMonth();
  date.setDate(0);
  let daysInMonth = date.getDate();

  date.setDate(date.getDate() + 1);

  for (i=1; i<=daysInMonth; i++) {
    if (week.length === 7) {
      calendarArray.push(week);
      week = [];
    }
    week.push({"date": i, "month": 2});
  }

  if (date.getDay() === 0) {
      difference2 = 1;
  } else {
      difference2 = 8 - date.getDay();
  }

  for (i=0; i<difference2; i++) {
      week.push({"date": date.getDate(), "month": 1});
      date.setDate(date.getDate() + 1);
  }

  calendarArray.push(week);

  return (
    <>
    <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{today}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{todayDate}</div>
          <div className="ui-datepicker-material-month">{month}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{month}</span>&nbsp;
          <span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      <table class="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col class="ui-datepicker-week-end" />
          <col class="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Monday">
              Mo
            </th>
            <th scope="col" title="Tuesday">
              Tu
            </th>
            <th scope="col" title="Wednesday">
              We
            </th>
            <th scope="col" title="Thursday">
              Th
            </th>
            <th scope="col" title="Friday">
              Fr
            </th>
            <th scope="col" title="Saturday">
              Sa
            </th>
            <th scope="col" title="Sunday">
              Su
            </th>
          </tr>
        </thead>
        <tbody>
          {calendarArray.map((week)=>(
            <tr>
              {week.map((day) => (
                day.month === 1 ? <td className="ui-datepicker-other-month">{day.date}</td> : todayDate === day.date ?<td className="ui-datepicker-today">{day.date}</td> : <td>{day.date}</td>
              ))}
            
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default function App() {
  let dateClass = new Date();
  let today = dateClass.getDate();
  let month = dateClass.getMonth();

  return (
    <div className="ui-datepicker">
          <CalendarVisual data={dateClass} now={today} month={month} />
    </div>
  );
}
