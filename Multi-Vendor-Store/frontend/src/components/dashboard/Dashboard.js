import React, { useState } from 'react';
import SalesCard from './SalesCard';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const salesData = {
    '2020': [2000, 3000, 4000, 3000, 2000, 1000, 5000, 6000, 7000, 8000, 9000, 10000],
    '2021': [2100, 3200, 4100, 3200, 2200, 1100, 5100, 6100, 7100, 8100, 9100, 10100],
    '2022': [2200, 3300, 4200, 3300, 2300, 1200, 5200, 6200, 7200, 8200, 9200, 10200],
    '2024': [2300, 3400, 4300, 3400, 2400, 1300, 5300, 6300, 7300, 8300, 9300, 10300],
  };

  const todaySalesData = [12, 19, 3, 5, 2, 3, 10];
  const monthlySalesData = [400, 300, 500, 700, 200, 100, 900, 800, 700, 600, 500, 400];
  const yearlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="dashboard">
      <h1>Sales Performance Dashboard</h1>
      <div className="year-selector">
        <label htmlFor="year">Select Year: </label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <div className="card-container">
        {selectedYear === '2024' && (
          <>
            <SalesCard
              title="Today's Sales"
              data={todaySalesData}
              labels={['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM']}
            />
            <SalesCard
              title="This Month's Sales"
              data={monthlySalesData}
              labels={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
            />
          </>
        )}
        <SalesCard
          title={`Sales in ${selectedYear}`}
          data={salesData[selectedYear]}
          labels={yearlyLabels}
        />
      </div>
    </div>
  );
};

export default Dashboard;
