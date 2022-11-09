import DatePicker, {registerLocale} from "react-datepicker";
import React, { useState } from "react";
import useWindowDimensions from '../../customHooks/useWindowDimensions'
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/calendarSearch.css";
import es from 'date-fns/locale/es';
registerLocale("es", es);

const CalendarSearch = ({values, inlineProp, productCalendar}) => {

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const { width } = useWindowDimensions();
    console.log(dateRange);

    return (
        <div className={productCalendar} id="calendarSearch">
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
                monthsShown={width > 550 ? 2 : 1}
                inline={inlineProp}
            />
        </div>


    );


    };

export default React.memo(CalendarSearch);