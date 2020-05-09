import React from "react";
import * as Utils from "../utils.js";
import Outcomes from "./outcomes.js";


function Activity({list,type, time}) {


    let title = type === "actions" ? `Today, I did`: `I should but i couldn't`;
    let classTitle = type === "actions" ? "none" : "critical";
    let classList = type === "actions" ? "" : "disabled";
    let activities = list.map(activity=>activity.label).join(", ");

    return (
        <div>
            <p className={`${classTitle} data activities`}>{title}</p>
            {list ?
                <p className={classList}>{activities}</p>
                :(
                <p>Nothing really...</p>
            )}
        </div>
    )
}



function Activities({activities}) {


    // let [time,setTime] = React.useState(null);


    let {actions,skips,time,outcomes} = activities;
    React.useEffect(()=> {});

    let spentTime = Utils.timeToString(time);

    return (
        <div className="conditions-box text-sm mb-8"
             style={{textAlign:"right"}}>
            <p className="text-sm text-gray-600">
                {spentTime}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
                Activities
            </div>
            <Activity list={actions} type="actions" time={time} />
            <Activity list={skips} type="skips" />
            <Outcomes outcomes={outcomes}/>
        </div>
    )
}


export default Activities;