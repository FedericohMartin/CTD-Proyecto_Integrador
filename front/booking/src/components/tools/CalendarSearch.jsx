import DatePicker, {registerLocale} from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/calendarSearch.css";
import es from 'date-fns/locale/es';
registerLocale("es", es);

const CalendarSearch = ({values}) => {

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    console.log(dateRange);

    return (
        <div className="calendarSearch" id="calendarSearch">
            <DatePicker 
                placeholderText="Check In - Check Out"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                dateFormat="dd 'de' MMM"
                onChange={(update) => {
                    setDateRange(update);
                    values(update);
                }}

                isClearable={true}
                locale="es"
            />
        </div>


    );


    };

export default CalendarSearch;