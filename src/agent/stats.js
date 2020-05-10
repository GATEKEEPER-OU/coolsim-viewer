import React from "react";
import * as Utils from "../utils.js";




function Stats({stats = []}){

    // console.log("stats",stats);

    return (
        <div>
            {Utils.isGood(stats) ? stats.map(s=><div className="tight-p" key={s.label}>
                {Utils.capitalize(s.label)} <span className={`data ${Utils.levelToLabel(s.level)}`}>
                {s.level.toFixed(2)*100}%
            </span>
            </div>) : ""}
        </div>
    );
}


export default Stats;