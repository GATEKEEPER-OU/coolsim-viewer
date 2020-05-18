import React from "react";
import Simulation from "./simulation.js";
// wall with all available simulations
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import PouchDB from "pouchdb";
import "./style.css";
import Dashboard from "./dashboard.js";


function Simulations(){
    const local = "simulations";
    const remote = "http://cool:sim@localhost:5985/simulations";
    const repParams = {
        live:true,
        retry:true
    };

    let [sims,setSims] = React.useState([]);
    let db = new PouchDB(remote);
    // let db = new PouchDB(local);
    // let handler = db.replicate.from(remote,repParams);

    React.useEffect(()=> {
        db.changes({
            since: 0,
            live:true,
            include_docs: true
        }).on("change", function (results) {
            // console.log("feed",results);
            if(results.deleted){return}
            let newSim = results.doc;
            setSims(state=>state.concat(newSim));
        }).on("error",function (err) {
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
        <div className="">
            <div className="mr-8 ml-8 mt-4 mb-4 max-w-sm max-w">
                Got <span className="font-bold">{sims.length}</span> Simulations
            </div>
            <div className="flex flex-wrap">
            {sims.map(e=>(
                <Simulation key={e.simulation} doc={e} />
            ))}
            </div>
        </div>
    )
}

export default Simulations;