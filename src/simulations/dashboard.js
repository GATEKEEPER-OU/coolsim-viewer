import React from "react";
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import "./style.css";
import PouchDB from "pouchdb";

import Day from "./day.js";

function Dashboard() {
    const local = "diary";
    const remote = "http://cool:sim@localhost:5985/diary";
    const repParams = {
        live:true,
        retry:true
    };
    const { simulationID } = useParams();
    let [id,setId] = React.useState(simulationID.substr(1));
    let [diary,setDiary] = React.useState([]);
    let [agents,setAgents] = React.useState(0);
    let db = new PouchDB(remote+"-"+id,repParams);
    // let db = new PouchDB(local+"-"+id);
    // let handler = db.replicate.from(remote+"-"+id,repParams);
    let sims = new PouchDB("http://cool:sim@localhost:5985/simulations");


    // console.log("simulation id",id);
    // console.log("remote db",remote+"-"+id);

    React.useEffect(()=> {

        if(!id){return}
        sims.allDocs({
            include_docs: true,
            startkey: id
        }).then(res => {
            // console.log("description of sim", id, res);
            if (res.rows.length > 0) {
                let doc = res.rows[0].doc;
                setAgents(doc.agents);
            }

        }).catch(err => console.error(err));
        return async ()=>{

        }
    },[id]);

    React.useEffect(()=> {
          db.changes({
            since: 0,
            live:true,
            include_docs: true
        }).on("change",(results) => {
            // console.log("docs",results);
            if(results.deleted){return}
            let entry = results.doc;
            // console.log("entry",entry);
            setDiary(diary=>diary.concat(entry));
        }).on("error", (err) => {
            // handle errors
            console.error("Error!",err)
        });

        return async ()=>{
            // cleanup
            // await handler.cancel();
            // await db.destroy();
        }
    },[]);

    return (
        <div className="overflow-hidden p-6 w-full">
            <div className="mb-6">
                Simulation <span className="font-bold text-teal-700">{id}</span> including <span className="font-bold text-teal-700">{agents}</span> Agents and a Diary of <span className="font-bold text-teal-700">{diary.length}</span> days.
            </div>
            <div className="flex flex-wrap -mx-2">
                {diary.sort((a,b)=>(parseInt(a.day)>parseInt(b.day)) ? -1 : 1 ).map(d=>(
                    <Day key={d.day} value={d}/>
                ))}
            </div>
        </div>
    )
}


export default Dashboard;