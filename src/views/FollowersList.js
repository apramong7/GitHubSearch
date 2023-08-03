/**
 * FollowersList.js
 * This component displays a list of followers for a given GitHub user.
 * It renders the list of followers using the UserList component by passing the endpoint and title as props.
 * It fetches the list of followers using the GitHub API by calling the UserList component.
 */

import React from 'react';
import UserList from './UserList';

export default function FollowersList({ route }) {
  return (
    <UserList
      route={route}
      endpoint="followers"
      title="Followers"
    />
  );
}