import React from 'react';
import MakeBookmark from './bookmark';
import MakeQuality from './qualitie';
const MakeUser = ()=>{
    return (
        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map((item) => (
                                    <MakeQuality/>
                                ))}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate} /5</td>
                            <td><button> 
                                <MakeBookmark/>
                                </button></td>
                            <td>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="btn btn-danger"
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
    )
};
export default MakeUser;