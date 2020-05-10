import React from "react";
import * as Utils from "../utils.js";
import Outcomes from "./outcomes.js";

function Events({events}) {

    // console.log("events",events);

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
                {Utils.isGood(list) ? list.map(event=><div className="data" key={event}>{Utils.capitalize(event)}</div>) :
                    "Nothing really..."
                }
                </div>
            </div>
        </div>
    )
}


export default Events;