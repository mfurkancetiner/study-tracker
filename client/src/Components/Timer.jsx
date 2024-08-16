import { useState, useRef, useEffect } from "react"
import axios from 'axios'

export default function Timer(){

    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [duration, setDuration] = useState(90)
    const [showWarning, setShowWarning] = useState(false);
    const currentActivityId = useRef()

    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(0)
    var activityId
    

    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10)

        return () => {
            clearInterval(intervalIdRef.current)
        }
    }
    }, [isRunning])

    async function start(){
        setIsRunning(true)
        const now = new Date()
        startTimeRef.current = now - elapsedTime;

        try{
            const res = await axios.post(
                'http://localhost:3000/api/v1/activity',
                {
                    startedAt: now.toISOString(),
                    duration: parseInt(duration)
                },
                {
                    headers: {
                        authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            );
            
            currentActivityId.current = res.data.id
        }
        catch(error){
            console.log(error)
        }
  
    }

    function formatTime(){

        let minutes =  Math.floor(duration - (elapsedTime / (1000 * 60) % 60))
        let seconds = isRunning ? Math.floor(60 - (elapsedTime / (1000) % 60)) : 0
        
        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")

        if(minutes === "-1" ){
            handleSetRunningFalse()
            endSuccess()
        }


        return `${minutes}:${seconds}`
    }

    async function endSuccess(){

        try{
            const res = await axios.patch(`http://localhost:3000/api/v1/activity/${currentActivityId.current}`, 
                {
                    finishedAt: new Date(),
                    successful: true,
                    durationWithOvertime: parseInt(duration),
                },
                {
                    headers: {
                        authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
            console.log(res.data)
        }
        catch(error){
            console.log(error)
        }
    }

    function handleSetRunningFalse(){
        setElapsedTime(0)
        setIsRunning(false)
    }

    function handleDuration(a){
        setDuration(a)
    }

    const confirmCancel = async () => {
        setShowWarning(false);
        setElapsedTime(0)
        setIsRunning(false)

        try{
            const res = await axios.patch(`http://localhost:3000/api/v1/activity/${currentActivityId.current}`, 
                {
                    successful: false,
                    finishedAt: new Date(),
                    durationWithOvertime: Math.floor(elapsedTime / (1000 * 60) % 60)},
                {
                    headers: {
                        authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
        }
        catch(error){
            console.log(error)
        }
    };

    const noCancel = () => {
        setShowWarning(false)
    }

    const handleCancel = () => {
        setShowWarning(true);;
    };

    return(
    <div className="stopwatch">
        <div className="display">{formatTime()}</div>

        <div className="set-time">
            <input name="Set time" step={5} type="range" min={1} max={240} onChange={(event)=> handleDuration(event.target.value)}></input>
        </div>

        <div className="controls">
            <button onClick={start} className="start-button">Start</button>
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
            
            {showWarning && isRunning && (
            <div className="warning-modal">
                <p>Are you sure you want to cancel this session?</p>
            <button onClick={confirmCancel} className="warning-button">Yes</button>
            <button onClick={noCancel} className="warning-button">No</button>
        </div>
      )}
        </div>

    </div>)
}


