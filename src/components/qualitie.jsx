import React from "react";
const MakeQuality = ()=>{
    return (
        <span className={"badge m-1 bg-" + item.color} key={item._id}>
        {item.name}
    </span>
    )
}

export default MakeQuality;