import React, { useState } from 'react';

const DataTable = ({ datesArray, meetingSession }) => {
    const [csvData, setCsvData] = useState('');

    const convertToCSV = () => {
        const csvRows = [];
        csvRows.push("Package,Hours,Earnings"); // Header row
    
        datesArray.forEach((d_arr, index) => {
            const dateObject = new Date(d_arr);
            const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono' ).length : 0;
            const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'novice').length : 0;
            const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'experienced').length : 0;
    
            if (index === 0) {
                const csvRow = `probono, ${probonoCount},$0.00`;
                csvRows.push(csvRow);
            }
            if (index === 1) {
                const csvRow = `novice, ${noviceCount},$0.00`;
                csvRows.push(csvRow);
            }

            if (index === 2) {
                const csvRow = `experienced, ${experiencedCount},$0.00`;
                csvRows.push(csvRow);
            }
        });
    
        // Join rows into a single CSV string
        const csvString = csvRows.join('\n');
    
        // Set the CSV data to state
        setCsvData(csvString);
    
        // Trigger download
        downloadCSV();
    };
    

    const downloadCSV = () => {
        const blob = new Blob([csvData], { type: 'text/csv' });
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
        <div className="month-overview">
        <div className="row">
          <div className="col-sm-12">
            <h2>Month overview</h2>
          </div>
          <div className="col-sm-8">
          <div className="month-overview-table">
            <div className="table-responsive">
              <table className="table table-month">
                <thead>
                  <tr>
                    <th>package</th>
                    <th>hours</th>
                    <th>earnings</th>
                  </tr>
                </thead>
                <tbody>

                  
                {datesArray.map((d_arr, index) => {
const dateObject = new Date(d_arr);
const dateString = dateObject.getDate();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthString = monthNames[dateObject.getMonth()];
const timestampToMatch = dateObject.getTime() / 1000;

const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono').length : 0;
const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'novice').length : 0;
const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'experienced').length : 0;

return (
  index === 0 ? (
      <>
          <tr>
              <td className='bundle'>bundle </td>
              <td>{probonoCount} hours</td>
              <td>$000.00</td>
          </tr>
          <tr>
              <td className='pay'>pay as you go</td>
              <td>{noviceCount} hours</td>
              <td>$000.00</td>
          </tr>
          <tr>
              <td className='probono'>Probono</td>
              <td>{experiencedCount} hours</td>
              <td>$000.00</td>
          </tr>
          <tr>
              <td colSpan={2}></td>
              <td><strong>Total</strong> <span>$000.00</span></td>
          </tr>
      </>
  ) : null
);
})}

                </tbody>
              </table>
            </div>
            {/* <div className="row">
              <div className="col-sm-4">
                <h5>package</h5>
              </div>
              <div className="col-sm-4"><h5>hours</h5></div>
              <div className="col-sm-4"><h5>earnings</h5></div>
            </div>
            <div className="row">
              <div className="col-sm-4"><p><span className='bundle'></span> bundle</p></div>
              <div className="col-sm-4"><p>9 hours</p></div>
              <div className="col-sm-4"><p>$000.00</p></div>
            </div>
            <div className="row">
              <div className="col-sm-4"><p><span className='pay'></span> pay as you go</p></div>
              <div className="col-sm-4"><p>18 hours</p></div>
              <div className="col-sm-4"><p>$000.00</p></div>
            </div>
            <div className="row">
              <div className="col-sm-4"><p><span className='probono'></span> Probono</p></div>
              <div className="col-sm-4"><p>9 hours</p></div>
              <div className="col-sm-4"><p>$000.00</p></div>
            </div> */}
           </div>

          </div>
        </div>
      </div>
      <div className='timesheet-buttons'>
        <div className='row'>
          <div className='col-sm-12'>
            <button className='btn btn-five'>view past payslips</button>
            <button className='btn btn-four' onClick={convertToCSV}>query my timesheet</button>
          </div>
        </div>
      </div>
      </>
    );
};

export default DataTable;
