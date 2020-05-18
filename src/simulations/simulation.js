import React from "react";
import { Link } from "react-router-dom";
import * as Utils from "../utils.js";
import "./style.css";
// import {useParams} from "react-router-dom";

// dashboard of a simulation

function Simulation(params){

    // let {simulationID} = useParams();
    let {agents,save,simulation,speed,sync} = params.doc;

    // console.log("params",params);
    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 max-w-sm rounded overflow-hidden shadow-lg px-6 py-4 bg-white ml-6 mb-6">
            <div className="mb-4">
                <Link className="text-teal-700 font-bold hover:underline" to={`/dashboard/:${simulation}`}>
                    {simulation}
                </Link>
            </div>
            <ul className="text-sm">
                <li>Agents: <span className="font-bold text-teal-700">{agents}</span></li>
                <li>Save: <span className={`font-bold ${save ? "text-green-700":"text-red-700" }`}>{save.toString()}</span></li>
                <li>Speed: <span className="font-bold text-teal-700">{Utils.capitalize(speed)}</span> x Second</li>
                <li>Sync: <span className={`font-bold ${sync ? "text-green-700":"text-red-700" }`}>{sync.toString()}</span></li>
            </ul>
        </div>
    )
}

export default Simulation;