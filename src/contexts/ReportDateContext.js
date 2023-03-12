import React, {createContext, useState} from 'react';

export const ReportDateContext = createContext();

export const ReportDateProvider = props => {
    const [lastReportTimestamp, setLastReportTimestamp] = useState(null);

    return (
        <ReportDateContext.Provider value={{lastReportTimestamp, setLastReportTimestamp}}>
            {props.children}
        </ReportDateContext.Provider>
    );
};