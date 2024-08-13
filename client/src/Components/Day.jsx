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
        
        const startHour = new Date(it.startedAt).getHours()
        const startMin = new Date(it.startedAt).getMinutes()
        const finishHour = new Date(it.finishedAt).getHours()
        const finishMin = new Date(it.finishedAt).getMinutes()

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
          <li style={{ listStyleType: "none"}} key={item.id}>Time: {getHoursandMins(item)} <br></br> Status: {item.successful ? "successful" : "not successful"} Duration: {item.duration.toString()} minutes</li>
          
        ))}
      </ul>
    </div>
    </div>
    )
}

export default Day