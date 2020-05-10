import React from "react";
import * as Utils from "../utils.js";
import Outcomes from "./outcomes.js";


function Activity({list,type}) {


    let title = type === "actions" ? `Today, I did`: `I should but i couldn't`;
    let className = type === "actions" ? "none" : "critical";
    let activities = list.join(", ");

    return (
        <div>
            <p className={`activities tight-p`}>{title+" "}
            {list ?
                <span className={`${className} data`}>{activities}</span>
                :(
                <span>Nothing really...</span>
            )}
            </p>
        </div>
    )
}



function Activities({activities}) {
    // let [time,setTime] = React.useState(null);


    let {actions,skips,time,outcomes} = activities;
    React.useEffect(()=> {});

    let spentTime = Utils.timeToString(time);

    return (
        <div className="conditions-box text-sm mb-8">
            <p className="text-sm text-gray-600">
                {spentTime}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
                Activities
            </div>
            <Activity list={actions} type="actions" time={time} />
            <Activity list={skips} type="skips" />
        </div>
    )
}


export default Activities;