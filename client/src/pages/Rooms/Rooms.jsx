import { useEffect, useState } from 'react';
import { BsInfoSquare } from 'react-icons/bs';
import { SlNote } from 'react-icons/sl';
import { RiDeleteBin6Line } from 'react-icons/ri';
import RoomService from '../../api/RoomService.js';
import './styles.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    RoomService.getAllRooms().then((data) => {
      console.log(data);
      setRooms(data.result);
    });
  }, []);

  return (
    <table className="table">
      <caption className="table__title">List of all hotel rooms</caption>
      <thead>
        <tr className="table__col">
          <th className="table__row table__row--title">Room No.</th>
          <th className="table__row table__row--title">Title</th>
          <th className="table__row table__row--title">Capacity</th>
          <th className="table__row table__row--title">Price</th>
          <th className="table__row table__row--title">Controls</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => {
          return (
            <tr className="table__col" key={room.id}>
              <td className="table__row" data-label="Room No.">
                {room.numbr}
              </td>
              <td className="table__row" data-label="Title">
                {room.title}
              </td>
              <td className="table__row" data-label="Capacity">
                {room.capacity}
              </td>
              <td className="table__row" data-label="Price">
                {room.price} ₽
              </td>
              <td className="table__row" data-label="Controls">
                <div className="controls">
                  <a className="control control--info" href="">
                    <BsInfoSquare />
                  </a>
                  <a className="control control--update" href="">
                    <SlNote />
                  </a>
                  <a className="control control--delete" href="">
                    <RiDeleteBin6Line style={{ color: 'red' }} />
                  </a>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Rooms;
