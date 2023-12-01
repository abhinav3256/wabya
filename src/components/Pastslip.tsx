import React, { useState } from 'react';

const Pastslip = ({ datesArray, meetingSession }) => {
    const [csvData, setCsvData] = useState('');
    const convertToCSV = (e) => {
        e.preventDefault();
      const csvRows = [];

      csvRows.push("Employee name:, abhinav, , , job title:, coach"); // Header row

      csvRows.push("Employee id:, 1234, , , job type:, fulltime"); // Header row
    
      csvRows.push("Date,Number of Hours,RateSssion,Vages,Amount,Deduction,Balance"); // Header row
    
      meetingSession.forEach((meet, index) => {
        const csvRow = `probono, ${meet.meeting_start_time} hours, £ 0.0`;
        //         csvRows.push(csvRow);

        //console.log('Processing date:', d_arr);
    
  //       const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono' ).length : 0;
  //       const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'novice').length : 0;
  //       const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'experienced').length : 0;
    
  //       console.log('Counts:', probonoCount, noviceCount, experiencedCount);
    
  //       if (index === 0) {
  //         const csvRow = `probono, ${probonoCount * 0.5} hours, £ 0.0`;
  //         csvRows.push(csvRow);
  //       } 
  //       if (index === 1) {
  //         const csvRow = `novice, ${noviceCount * 0.5} hours, £ ${noviceCount * 20}`;
  //         csvRows.push(csvRow);
  //       }
  //       if (index === 2) {
  //         const csvRow = `experienced, ${experiencedCount * 0.5} hours, £ ${experiencedCount * 50}`;
  //         csvRows.push(csvRow);
  //       }
  //        // Calculate and add the Total row if index is 3
  // if (index === 3) {
  //   const totalAmount = (probonoCount * 0) + (noviceCount * 20) + (experiencedCount * 50);
  //   const formattedTotal = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(totalAmount);
  //   const csvRow = `,Total,${formattedTotal}`;
  //   csvRows.push(csvRow);
  // }
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

export default Pastslip;
