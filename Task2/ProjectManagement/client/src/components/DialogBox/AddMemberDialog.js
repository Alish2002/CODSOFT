import React from 'react'

const AddMemberDialog = ({handleAddMemberSubmit,newMemberEmail,setNewMemberEmail,newMemberRole,setNewMemberRole,setShowAddMemberDialog}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Add New Member</h3>
            <form onSubmit={handleAddMemberSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Member Email
                </label>
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Member Role
                </label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="member">Member</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddMemberDialog(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default AddMemberDialog
