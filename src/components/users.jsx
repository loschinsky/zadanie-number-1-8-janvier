import React,{useState} from "react";
import api from "../api"

const Users =()=>{
    const[users,setUsers]= useState(api.users.fetchAll());
    
    const handleDelete =(userId)=>{
        setUsers((prevState)=>
        prevState.filter(user=>user._id !==userId))
    };
    const RenderPhrase = () => {
        const person = () => {
            if (
              (users.length % 10 === 2 && users.length !== 12) 
              (users.length % 10 === 3 && users.length !== 13) 
              (users.length % 10 === 4 && users.length !== 14)
            ) {
              return "человека";
            } else {
              return "человек";
            }
          };
        
          return users.length !== 0
            ? (<span className="badge bg-primary"> {" "} {users.length + " " + person() + " тусанет с тобой сегодня"}</span>)
            : (<span className="badge bg-danger">Никто с тобой не тусанет</span>);
        }
    return (
        <>
        <RenderPhrase/>
                
                    <table>
                    <thead>
                            <tr>
                                <td>Имя</td>
                                <td>Качества</td>
                                <td>Профессия</td>
                                <td>Встретился,раз</td>
                                <td>Оценка</td>
                                <td></td>
                            </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>{
                            return (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.qualities.map((qualitie)=>{return <span className ={"badge bg-"+ qualitie.color + " m-1"} key={qualitie._id}>{qualitie.name}</span>})}</td>
                                    <td>{user.profession.name}</td>
                                    <td>{user.completedMeetings}</td>
                                    <td>{user.rate}</td>
                                    <td><button className="btn btn-danger" onClick={()=>handleDelete(user._id)}>Delete</button></td>
                                </tr>
                            )
                        }
                        )}

                    </tbody>
            </table>




        </>
    )
}

export default Users;