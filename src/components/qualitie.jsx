import React from "react";
const MakeQuality = ({color, name})=>{
    return <span className={"badge m-1 bg-" + color}>{name}</span>;
}

export default MakeQuality;