import React from "react";
import * as Utils from "../utils.js";
import Outcomes from "./outcomes.js";

function Events({events}) {

    let {time,list,outcomes} = events;


    let intro = <span>I got involved in</span>;

    let spentTime = Utils.timeToString(time);


    return (
        <div className="conditions-box text-sm mb-8">
            <p className="text-sm text-gray-600">
                {spentTime}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
                Events
            </div>
            <div>
                {intro}
            <div>
            {Utils.isGood(list) ? list.map(event=><div className="data" key={event.label}>{Utils.capitalize(event.label)}</div>) :
                "Nothing really..."
            }
            </div>
            <Outcomes outcomes={outcomes}/>
            </div>
        </div>
    )
}


export default Events;