import {useState,useEffect} from 'react'

const StopWatch = () => {
    // useState for Holding the Time, IntervalId etc
    const [time,setTime]=useState(0)    // holds the timer values
    const [isRunning,setIsRunning]=useState(false)   // it checking weather timer is running or stoped
    const [intervalId,setIntervalId]=useState(null)     // it creates ids for  timers 

    // useEffect for Handling SideEffects like Creating timer and removing timers 
    useEffect(()=>{
        // mouting phase
        if(isRunning){
        const id=setInterval(()=>{
            setTime(prevTime=>prevTime+10)
        },10)
        setIntervalId(id)
        }else if(intervalId){
            clearInterval(intervalId)
            setIntervalId(null)
        }

        return ()=>intervalId && clearInterval(intervalId)      //[unmounting]cleanup function to remove the intervals once user reset the Timer

    },[isRunning])      //updation-start/stop /reset

    // function for Formatting the Time
    const FormatTime=(time)=>{
        let milliseconds=(`0${(time%1000)/10}`).slice(-2)
        let seconds=(`0${Math.floor((time/1000)%60)}`).slice(-2)
        let minutes=(`0${Math.floor((time/60000)%60)}`).slice(-2)

        return `${minutes}:${seconds}:${milliseconds}`
    }

    // function for handling the start time
    let handleStart=()=>setIsRunning(true)

    // function for handling the stop time
    let handleStop=()=>setIsRunning(false)

    // function for handling the Reset time
    let handleReset=()=>{
        setIsRunning(false)
        setTime(0)
    }

  return (
    <>
    <h3 className='text-success fw-bold fs-1 text-center my-2 '>STOP WATCH</h3>
       <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
            <div className='card p-4 '>
                <p className='fw-bold text-danger text-uppercase fs-2 text-center'>{FormatTime(time)}</p>
                {/* buttons start */}
                <div className='btns'>
                    <button className='btn btn-success' disabled={isRunning} onClick={handleStart}>start</button>
                    <button className='btn btn-success mx-3' disabled={!isRunning}  onClick={handleStop}>stop</button>
                    <button className='btn btn-success' onClick={handleReset}>Reset</button>
                </div>
                {/* buttons end */}
            </div>
        </div>
    </>
  )
}

export default StopWatch