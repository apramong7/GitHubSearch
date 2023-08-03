/**
 * FollowingsList.js
 * This component displays a list of followings for a given GitHub user.
 * It renders the list of followings using the UserList component by passing the endpoint and title as props.
 * It fetches the list of followings using the GitHub API by calling the UserList component.
 */

import React from 'react';
import UserList from './UserList';

export default function FollowingList({ route }) {
  return (
    <UserList
      route={route}
      endpoint="following"
      title="Following"
    />
  );
}