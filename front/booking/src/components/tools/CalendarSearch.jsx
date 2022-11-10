import DatePicker, {registerLocale} from "react-datepicker";
import React from "react";
import useWindowDimensions from '../../customHooks/useWindowDimensions'
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/calendarSearch.css";
import es from 'date-fns/locale/es';
registerLocale("es", es);

const CalendarSearch = ({values, inlineProp, productCalendar, onParentDateChange, startDate, endDate}) => {
    const { width } = useWindowDimensions();

    const onLocalDateChange = (dates) => {
        onParentDateChange(dates);
        values(dates);
    }

    return (
        <div className={productCalendar} id="calendarSearch">
            <DatePicker 
                placeholderText="Check In - Check Out"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                dateFormat="dd 'de' MMM"
                onChange={onLocalDateChange}

                isClearable={true}
                locale="es"
                monthsShown={width > 550 ? 2 : 1}
                inline={inlineProp}
            />
        </div>


    );


    };

export default React.memo(CalendarSearch);