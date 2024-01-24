import { useState, useRef} from "react"
import Result from '../components/Result.jsx';

export default function TimerChallenge ({ tittle , targetTime }) {
    const timer =useRef();
    const dialog=useRef();
    const [remaningTime , setRemaningTime] =useState(targetTime*1000);
    
    const timerActive = remaningTime>0 && remaningTime<targetTime*1000;

    if(remaningTime<=0)
    {
        
        clearInterval(timer.current);
        dialog.current.open();
        
    }
    function handleRest(){
        setRemaningTime(targetTime*1000);
    }
    const handleStart=()=>{
        timer.current=setInterval(() => {
            setRemaningTime(prevTimeRemaining => prevTimeRemaining-10);
        }, 10);

    }

    const handleStop=()=>{
        dialog.current.open();
        clearInterval(timer.current);
        
       
    }
    return(

        <>
         <Result  ref={dialog} 
         timeRemaninig={remaningTime} 
         onRest={handleRest}
         targetTime={targetTime}/>
        <section className="challenge">
            <h2>{tittle}</h2>
        
            <p className="challenge-time">  {targetTime}second{targetTime >1 ?'s':' '}</p>
            <p>
                <button onClick={timerActive ? handleStop : handleStart}>{timerActive? 'stop' :'Start'} Challenge</button>
            </p>
            <p className={timerActive ? 'active': ' '}>
                {timerActive ? 'Time is running..': 'Timer inactive'}
            </p>
        </section>
        </>
    )
}