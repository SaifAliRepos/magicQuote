/* eslint-disable no-magic-numbers */
// userSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Dummy data for initial state
const initialUsers = [
  {
    id: 6,
    firstName: 'Jack',
    lastName: 'Smith',
    userName: 'jacksmith',
    gender: 'Male',
    email: 'jack@example.com',
    password: 'password789',
    wishlist: ['lifestyle', 'inpiration'],
    connections: [7, 6, 8]
  },
  {
    id: 7,
    firstName: 'Emily',
    lastName: 'Johnson',
    userName: 'emilyjohnson',
    gender: 'Female',
    email: 'emily@example.com',
    password: 'password101',
    wishlist: ['lifestyle'],
    connections: [6]
  },
  {
    id: 8,
    firstName: 'Michael',
    lastName: 'Brown',
    userName: 'michaelbrown',
    gender: 'Male',
    email: 'michael@example.com',
    password: 'password111',
    wishlist: [],
    connections: [6]
  },
  {
    id: 9,
    firstName: 'Sophia',
    lastName: 'Miller',
    userName: 'sophiamiller',
    gender: 'Female',
    email: 'sophia@example.com',
    password: 'password222',
    wishlist: [],
    connections: []
  },
  {
    id: 10,
    firstName: 'Liam',
    lastName: 'Davis',
    userName: 'liamdavis',
    gender: 'Male',
    email: 'liam@example.com',
    password: 'password333',
    wishlist: [],
    connections: []
  }
]

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: initialUsers
  },
  reducers: {
    getUsers: state => {
      return state
    },

    followRequest: (state, action) => {
      const { userId, followedUserId } = action.payload
      const currentUser = state.users.find(user => user.id === userId)
      const followedUser = state.users.find(user => user.id === followedUserId)

      if (currentUser && followedUser) {
        if (!currentUser.connections.includes(followedUserId)) {
          currentUser.connections.push(followedUserId)
        }

        if (!followedUser.connections.includes(userId)) {
          followedUser.connections.push(userId)
        }
      }
    },

    unfollowRequest: (state, action) => {
      const { userId, unfollowedUserId } = action.payload
      const currentUser = state.users.find(user => user.id === userId)
      const unfollowedUser = state.users.find(user => user.id === unfollowedUserId)

      if (currentUser && unfollowedUser) {
        currentUser.connections = currentUser.connections.filter(
          connectionId => connectionId !== unfollowedUserId
        )
        unfollowedUser.connections = unfollowedUser.connections.filter(
          connectionId => connectionId !== userId
        )
      }
    },
    addTags: (state, action) => {
      const { userId, tag } = action.payload
      const user = state.users.find(user => user.id === userId)
      if (!user.wishlist.includes(tag)) {
        user.wishlist.push(tag)
      }
    }
  }
})

export const { getUsers, followRequest, unfollowRequest, addTags } = userSlice.actions
export default userSlice.reducer
