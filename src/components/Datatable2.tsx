import React, { useState } from 'react';

const DataTable2 = ({ datesArray, meetingSession }) => {
    const [csvData, setCsvData] = useState('');
    const convertToCSV = (e) => {
        e.preventDefault();
      const csvRows = [];
      csvRows.push("Package,Hours,Earnings"); // Header row
    
      datesArray.forEach((d_arr, index) => {
        console.log('Processing date:', d_arr);
    
        const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono' ).length : 0;
        const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'novice').length : 0;
        const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'experienced').length : 0;
    
        console.log('Counts:', probonoCount, noviceCount, experiencedCount);
    
        if (index === 0) {
          const csvRow = `probono, ${probonoCount * 0.5} hours, £ 0.0`;
          csvRows.push(csvRow);
        } 
        if (index === 1) {
          const csvRow = `novice, ${noviceCount * 0.5} hours, £ ${noviceCount * 20}`;
          csvRows.push(csvRow);
        }
        if (index === 2) {
          const csvRow = `experienced, ${experiencedCount * 0.5} hours, £ ${experiencedCount * 50}`;
          csvRows.push(csvRow);
        }
        if (index === 3) {
            const csvRow = `, Total,  £${(probonoCount * 0) + (noviceCount * 20)  + (experiencedCount * 50)}.00`;
            csvRows.push(csvRow);
          }
      });
    
      // Join rows into a single CSV string
      const csvString = csvRows.join('\n');
    
      // Set the CSV data to state
      setCsvData(csvString);
    
      // Trigger download
      console.log('Before downloadCSV');
      downloadCSV();
    };
    
    const downloadCSV = () => {
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };
    
    return (
        <>
       
       <div className="mrb-20 time-table-btn">
            <p className="text-center btn-p">
              <a href="#" className="btn btn-lightgreen" >
                view past payslip
              </a>
            </p>
            <p className="text-center btn-p">
              <a href="#" className="btn btn-chestnutred" onClick={convertToCSV}>
                query my timesheet
              </a>
            </p>
          </div>
      </>
    );
};

export default DataTable2;
