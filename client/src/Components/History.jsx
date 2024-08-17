import React, { act, useEffect, useState } from 'react'
import axios from 'axios'
import Day from './Day';
import '../App.css'

function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [latestRenderIndex, setLatestRenderIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/v1/activity`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if(data.length === 0){
    return(<p className='no-sessions-message'>No history yet. Click on 'Study' to start a study session and when you're finished it will show up here. Or if you want 
    to check out how this would've looked with data, log in as guest.</p>)
  }

  const recordWithEarliestDate = data.reduce((earliest, current) => {
    return new Date(current.startedAt) < new Date(earliest.startedAt) ? current : earliest;
  });

  const day = new Date()
  var startOfDay = new Date(day.setHours(0, 0, 0, 0));
  var endOfDay = new Date(day.setHours(23, 59, 59, 999));

  const seperateByDay = (data) => {
    const arr = []
    for(var i = 0; endOfDay > new Date(recordWithEarliestDate.startedAt); i++){
      var resultData = data.filter(a => {
        var date = new Date(a.startedAt)
        if(date >= startOfDay && date <= endOfDay)
          return date
      })
      if(Object.keys(resultData).length !== 0)
        arr.push(resultData)
      startOfDay.setDate(startOfDay.getDate() - 1)
      endOfDay.setDate(endOfDay.getDate() - 1)
    }
    return arr
  }

  const activitiesSeperatedByDay = seperateByDay(data)

  function handleBack(){
    const target =  latestRenderIndex + 6
    setLatestRenderIndex(activitiesSeperatedByDay.length > target ? target : latestRenderIndex)
  }
  
  function handleForward(){
    setLatestRenderIndex(Math.max(0, latestRenderIndex - 6))
  }

  return (
    <>
      <div className='days'>
        {activitiesSeperatedByDay[latestRenderIndex] && <Day activitiesByDay={activitiesSeperatedByDay[latestRenderIndex]} />}
        {activitiesSeperatedByDay[latestRenderIndex+1] && <Day activitiesByDay={activitiesSeperatedByDay[latestRenderIndex+1]} />}
        {activitiesSeperatedByDay[latestRenderIndex+2] && <Day activitiesByDay={activitiesSeperatedByDay[latestRenderIndex+2]} />}
      </div>
    <div className='days'>
        {activitiesSeperatedByDay[latestRenderIndex+3] && <Day activitiesByDay={activitiesSeperatedByDay[latestRenderIndex+3]} />}
        {activitiesSeperatedByDay[latestRenderIndex+4] && <Day activitiesByDay={activitiesSeperatedByDay[latestRenderIndex+4]} />}
        {activitiesSeperatedByDay[latestRenderIndex+5] && <Day activitiesByDay={activitiesSeperatedByDay[latestRenderIndex+5]} />}
    </div>
    <div className='button-container'>
      <button className='button' onClick={handleBack}>Go back</button>
      <button className='button' onClick={handleForward}>Go forward</button>
    </div>
  </>

    
  )
}

export default History
