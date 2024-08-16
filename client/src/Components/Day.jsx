function Day(props){

  if(props.activitiesByDay === undefined)
    return({})

    const totalDuration = props.activitiesByDay.reduce((sum, activity) => activity.successful === true ? sum + activity.duration : sum + activity.durationWithOvertime, 0);
    const [studiedHours, studiedMinutes] = [Math.floor(totalDuration / 60), totalDuration % 60]
    const str = studiedMinutes !== 0 ? `Total time studied: ${studiedHours} hours and ${studiedMinutes} minutes` : `Total time studied: ${studiedHours} hours`

    const _ = new Date(props.activitiesByDay[0].startedAt)
    
    const weekdayName = _.toLocaleDateString('en-US', { weekday: 'long'});
    const monthName = _.toLocaleDateString('en-US', { month: 'short'});
    const dayOfMonth = _.getDate()

    const getHoursandMins = (it) => {

      /* minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0") */
        
        const startHour = String(new Date(it.startedAt).getHours()).padStart(2,"0")
        const startMin = String(new Date(it.startedAt).getMinutes()).padStart(2,"0")
        const finishHour = String(new Date(it.finishedAt).getHours()).padStart(2,"0")
        const finishMin = String(new Date(it.finishedAt).getMinutes()).padStart(2,"0")

        return `${startHour}:${startMin}-${finishHour}:${finishMin}`
    }

    return(
    <div className="day">
        <div>
            <h2>{weekdayName} {monthName} {dayOfMonth}</h2>
            <h2>{str}</h2>
        </div>
        <div>
      <h1>Timeline</h1>
      <ul>
        {props.activitiesByDay.map(item => (
          <li style={{ listStyleType: "none"}} key={item.id}>Time: {getHoursandMins(item)} <br></br> Status: {item.successful ? "successful" : "not successful"} Set Duration: {item.duration.toString()} minutes</li>
          
        ))}
      </ul>
    </div>
    </div>
    )
}

export default Day