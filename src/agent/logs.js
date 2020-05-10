import React from "react";
import Agent from "./agent.js";
import State from "./state.js";
import Events from "./events.js"
import Activities from "./activities.js";
import Stats from "./stats.js";
import * as Utils from "../utils.js";



function isGood(l){
    return (Array.isArray(l) && l.length > 0)
}

function Log({log}) {

    let {activities, date, day, events, state} = log;
    let stats = state.stats;


    return (
        <div className="grid grid-cols-12 gap-4 p-6 log">
            <div className="col-span-5 text-right">
                <Events events={events}/>
            </div>
            <div className="col-span-2 text-center">
                <p className="text-sm text-gray-600">
                    Status
                </p>
                {state ? (<div className={`${state.status.label} data text-gray-900 font-bold text-xl mb-2`}>
                    {Utils.capitalize(state.status.label)}
                </div>) : ""}
                <Stats className="text-sm" stats={stats}/>
            </div>
            <div className="col-span-5 text-left">
                <Activities activities={activities}/>
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