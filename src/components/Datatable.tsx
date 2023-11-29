import React, { useState } from 'react';


function isSameMonth(date, targetMonth, targetYear) {
  const meetingDate = new Date(date);
  return (
    meetingDate.getMonth() === targetMonth &&
    meetingDate.getFullYear() === targetYear
  );
}


const DataTable = ({ datesArray, meetingSession }) => {
    const [csvData, setCsvData] = useState('');
    const convertToCSV = () => {
      const csvRows = [];
      csvRows.push("Package,Hours,Earnings"); // Header row
    
      datesArray.forEach((d_arr, index) => {
        console.log('Processing date:', d_arr);
    
        const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono' ).length : 0;
        const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'novice').length : 0;
        const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'experienced').length : 0;
    
        console.log('Counts:', probonoCount, noviceCount, experiencedCount);
    
        if (index === 0) {
          const csvRow = `probono, ${probonoCount * 0.5} hours,£ 0.0`;
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


         // Calculate and add the Total row if index is 3
  if (index === 3) {
    const totalAmount = (probonoCount * 0) + (noviceCount * 20) + (experiencedCount * 50);
    const formattedTotal = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(totalAmount);
    const csvRow = `,Total,${formattedTotal}`;
    csvRows.push(csvRow);
  }
      });
    
      // Join rows into a single CSV string
      const csvString = csvRows.join('\n');
    
      // Set the CSV data to state
      setCsvData(csvString);
    
      // Trigger download
      console.log('Before downloadCSV');
      downloadCSV(csvString);
    };
    
    // const downloadCSV = () => {
    //   const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = 'data.csv';
    //   document.body.appendChild(a);
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    // };

 
const downloadCSV = (csvData) => {
  // Convert CSV string to Blob with UTF-8 encoding
  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvData], { type: 'text/csv;charset=utf-8;' });

  // Create a download link
  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = 'data.csv';

  // Append the link to the document and trigger a click event
  document.body.appendChild(a);
  a.click();

  // Remove the link from the document
  document.body.removeChild(a);
  window.URL.revokeObjectURL(a.href);
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

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono' && isSameMonth(meet.meeting_start_time, currentMonth, currentYear)).length : 0;
const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'novice' && isSameMonth(meet.meeting_start_time, currentMonth, currentYear)).length : 0;
const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'experienced' && isSameMonth(meet.meeting_start_time, currentMonth, currentYear)).length : 0;


// const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono').length : 0;
// const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'novice').length : 0;
// const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'experienced').length : 0;

return (
  index === 0 ? (
      <>
          <tr>
              <td className='bundle'>probono </td>
              <td>{probonoCount} hours</td>
              <td>£00.00</td>
          </tr>
          <tr>
              <td className='pay'>novice</td>
              <td>{noviceCount * 0.5} hours</td>
              <td>£{noviceCount * 20}.00</td>
          </tr>
          <tr>
              <td className='probono'>experienced</td>
              <td>{experiencedCount * 0.5} hours</td>
              <td>£{experiencedCount * 50}.00</td>
          </tr>
          <tr>
              <td colSpan={2}></td>
              <td><strong>Total</strong> <span>£{(probonoCount * 0) + (noviceCount * 20)  + (experiencedCount * 50)}.00</span></td>
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
            <button className='btn btn-five' >view past payslips</button>
            <button className='btn btn-four' onClick={convertToCSV}>query my timesheet</button>
          </div>
        </div>
      </div>
      </>
    );
};

export default DataTable;
