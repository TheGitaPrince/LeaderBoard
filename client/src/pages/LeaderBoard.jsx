import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createUser, getLeaderboard, claimPoints, getHistory } from "../store/leaderboard";
import { toast } from "react-hot-toast";
import { FaCrown } from "react-icons/fa";


function Leaderboard() {
  const dispatch = useDispatch();
  const { users, history, loading, error } = useSelector(state => state.leaderboard);

  const [selectedUser, setSelectedUser] = useState('');
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    dispatch(getLeaderboard());
    dispatch(getHistory());
  }, [dispatch]);

  const handleClaim = async () => {
    if (!selectedUser) return toast.error("Please select a user.");
    try {
      const result = await dispatch(claimPoints(selectedUser)).unwrap();
      toast.success(`${result.name} claimed ${result.newPoints}} points!`);
      dispatch(getLeaderboard());
      dispatch(getHistory());
    } catch (error) {
      toast.error(error?.message || "Failed to claim points.");
    }
  };

  const handleAddUser = async () => {
    if (!newUser.trim()) return toast.error("User name cannot be empty.");
    try {
      await dispatch(createUser({ name: newUser })).unwrap();
      toast.success("User added successfully!");
      setNewUser('');
      dispatch(getLeaderboard());
    } catch (error) {
      toast.error(error?.message || "Failed to add user.");
    }
  };

  return (
    <div className="md:p-6 px-4 py-6 max-w-5xl mx-auto">
      <h1 className="flex items-center justify-center gap-2 text-3xl text-center font-bold text-blue-800 mb-10">
        <FaCrown className="text-yellow-500"/>
        <span>Leaderboard</span>
      </h1>

      <div className="mb-10 flex md:flex-row flex-col gap-5 justify-between">
        <div className="flex justify-between md:gap-10">
           <select
           value={selectedUser}
           onChange={(e) => setSelectedUser(e.target.value)}
           className="ring-1 md:px-4 px-2 md:py-2 py-1 rounded outline-none w-50 md:w-70 focus-within:ring-blue-500 cursor-pointer focus:ring-1"
           > 
             <option value="">-- Select a User --</option>
             {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
             ))}
           </select>

          <button
          onClick={handleClaim}
          disabled={loading}
          className="bg-blue-600 text-white md:px-4 px-2 md:py-2 py-1 rounded hover:bg-blue-700 cursor-pointer transition duration-300"
          >
           Claim Points
          </button>
        </div>

        <div className="flex justify-between md:gap-10">
           <input
           value={newUser}
           onChange={(e) => setNewUser(e.target.value)}
           placeholder="Add user name"
           className="ring-1 md:px-4 px-2 md:py-2 py-1 rounded outline-none w-50 md:w-70 focus-within:ring-blue-500 focus:ring-1"
          />

          <button
          onClick={handleAddUser}
          disabled={loading}
          className="bg-green-600 w-26 text-white md:px-4 px-2 md:py-2 py-1 rounded hover:bg-green-700 cursor-pointer transition duration-300 "
          >
           Add User
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center text-blue-600 font-medium mb-4">
          Loading data...
        </div>
      )}

      <div>
          <table className="table-auto w-full mb-10 ">
            <thead className="bg-gray-100">
             <tr>
               <th className="p-3 md:px-8 text-left">Rank</th>
               <th className="text-left">Name</th>
               <th className="text-left">Points</th>
              </tr>
            </thead>
          <tbody>
          {users && users.length>0 ? (
             users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                 <td className="p-3 md:px-8 text-left">{user.rank}</td>
                 <td className="uppercase">{user.name}</td>
                 <td>{user.points}</td>
                </tr>
             ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
          </tbody>
      </table>
      </div>

      <h2 className="text-xl font-bold mb-2 text-gray-800">Claim History</h2>
      <ul className="bg-gray-50 border rounded-lg p-4 max-h-64 overflow-y-auto no-scrollbar text-sm space-y-2">
        { history &&  history.length >0 ? (history.map((his, index) => (
          <li key={index} className="bg-gray-200 p-2 rounded font-sm">
            <span className="text-blue-700 uppercase">{his.userId.name}</span> Claimed
            <span className="font text-green-500 font-bold mx-1">{his.pointsClamed}</span> points
            at <span className="text-gray-600 font-semibold">{new Date(his.createdAt).toLocaleString().toLocaleString().replace(/\//g, "-")}</span>
          </li>
        ))):( <p className="text-gray-500 text-sm">No claims yet.</p> )}
      </ul>
    </div>
  );
}


export default Leaderboard;