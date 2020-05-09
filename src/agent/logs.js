import React from "react";
import Agent from "./agent.js";
import State from "./state.js";
import Events from "./events.js"
import Activities from "./activities.js";



function isGood(l){
    return (Array.isArray(l) && l.length > 0)
}

function Log({log}) {

    let {activities, date, day, events, state} = log;
    return (
        <div className="grid grid-cols-12 gap-4 p-6 log">
            <div className="col-span-5">
                <Activities activities={activities}/>
            </div>
            <div className="col-span-2 text-center">
                <Events events={events}/>
            </div>
            <div className="col-span-5">
                <State day={day} state={state}></State>
            </div>
        </div>
    );
}


function Logs(){

    let [logs,setLogs] = React.useState(false);
    let [error,setError] = React.useState(false);

    React.useEffect(()=> {
        let a = new Agent();
        if(!logs) {
            a.logs().then(response => {
                if (!response) {
                    return
                }
                console.log("Logs", response);
                setLogs(response);
                // console.log("description",description);
            }).catch(
                err => {
                    console.error(err);
                    setError(err);
                }
            );
        }
    });


    return (
        <div>
            {isGood(logs)?(
                logs.sort((a,b)=>{
                    if(parseInt(a.day)<parseInt(b.day) ){
                        return 1;
                    }
                    return -1;
                }).map(log => <Log key={log.date+"-"+log.agent} log={log}></Log>
                )
            ):"Nothing to show"}
        </div>
    )
}


export default Logs;