export function capitalize(str){
    return str.replace(/\w\S*/g, function(txt){return capitalizeFirst(txt.substr(0));});
}
export function capitalizeFirst(str){
    return str.toString().charAt(0).toUpperCase() + str.slice(1);
}


export function isGood(l){
    return (Array.isArray(l) && l.length > 0)
}


export function timeToString(time) {
    if(!time){
        return "No sweat...";
    }
    let spentH = Math.floor(time);
    let spentM = Math.floor((time - Math.floor(time))*60);
    return `${spentH} h and ${spentM} min`;
}


export function levelToLabel(level) {
    if(level>0.66666666){return "light"}
    if(level>0.33333333){return "mild"}
    if(level>0){return "critical"}
    return "none";
}