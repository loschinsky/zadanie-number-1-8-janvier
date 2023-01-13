import React from 'react';
import MakeBookmark from './bookmark';
import MakeQuality from './qualitie';
const MakeUser = ({
    name,
    completedMeetings,
    profession,
    qualities,
    rate,
    _id,
    bookmark,
    onHandleDelete1,
    onHandleToggleBookmark1
})=>{
    return (
                        <tr>
                            <td>{name}</td>
                            <td>
                                {qualities.map((item) => (
                                    <MakeQuality
                                    key={item._id}
                                    {...item}/>
                                ))}
                            </td>
                            <td>{profession.name}</td>
                            <td>{completedMeetings}</td>
                            <td>{rate} /5</td>
                            <td> 
                                <MakeBookmark
                                id={_id}
                                status={bookmark}
                                onHandleToggleBookmark1={onHandleToggleBookmark1}
                                />
                            </td>
                            <td>
                                <button
                                    onClick={() => onHandleDelete1(_id)}
                                    className="btn btn-danger"
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
    )
};
export default MakeUser;