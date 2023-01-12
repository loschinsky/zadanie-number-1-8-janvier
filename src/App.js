import React, {useState} from 'react';
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api"
import MakeUsers from './components/users';


function App (){
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    //нужно разработать еще этот переключатель
    const handleToggleBookmark = (id) =>{
    }
    // в ретюрн тоже надо еще придумать код какой перенсти
    return (
        <>
        <SearchStatus/>
        <div>
            <MakeUsers/>
        </div>
        </>
    )
}


export default App;