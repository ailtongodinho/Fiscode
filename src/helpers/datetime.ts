import React from "react";
import { format, subDays } from "date-fns";

export class DateTime extends React.Component {
    static GetDate = () => {
        var now = new Date(Date.now());
        return now;
    }
    static formatDate = (date: Date, dateFormat: string = "dd.MM.yyyy") => {
        return format(date, dateFormat);
    }
    static subtract = (firstDate: Date = null, days: number) => {
        if(firstDate == null) firstDate = DateTime.GetDate();
        return subDays(firstDate, days);
    }
}