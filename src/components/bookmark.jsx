import React from 'react';
const MakeBookmark = ({onHandleToggleBookmark1,status,id})=>{
    return(
    <button onClick={()=> onHandleToggleBookmark1(id)}>
     <i className={"bi bi-0-circle" + (status ? "-fill" : "")}></i>
    </button>
    )
};
export default MakeBookmark;




