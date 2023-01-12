import React from 'react';
const MakeBookmark = (id)=>{
const updatedUsers=users.map((user)=>{
    if(user._id===id){
        user.bookmark=!user.bookmark;
    }
    return user;
});
setUsers(updatedUsers);
};
export default MakeBookmark;