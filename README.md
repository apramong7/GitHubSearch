# GitHub User Search App

This is a React Native app that allows users to search for GitHub user profiles by username. The app uses the GitHub REST API to fetch user data and display it in a user-friendly manner.

## Features

The app includes the following features:

1. **Search Bar**: Users can enter a GitHub username in the search bar to find the corresponding user profile.

2. **Profile Display**: If the entered username exists, the app presents a view with the user's profile details, including their avatar, username, name, description, follower count, and following count.

3. **Followers and Following List**: The user's followers and following list are displayed with their avatars and usernames. Tapping on a follower or following username navigates to their profile view.

4. **Pull to Refresh**: The followers and following lists can be refreshed by pulling down the list.

5. **Skeleton Screens**: Skeleton placeholders are used to provide visual feedback for loading content while data is being fetched.

6. **Profile Caching**: User profile data is cached locally to provide a smoother user experience and reduce API calls when viewing previously searched profiles.


## Getting Started

To run the app locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/apramong7/GitHubSearch.git
```

2. Install dependencies:

```
cd GitHubSearch
npm install
```

3. Run the app:

```
npx expo start
```

Make sure you have the necessary environment set up to run a React Native app on your local device or emulator.

## Technologies Used

- React Native
- React Navigation
- AsyncStorage (for profile caching)
- GitHub REST API

## Future Improvements

This app was developed as part of an assessment and has room for further improvements and enhancements. Some potential future improvements include:

- Implementing a pagination mechanism for followers and following lists to handle large numbers of users.
- Adding user authentication and account management features.
- Enhancing the user interface with more interactive elements and better styling.
- Implementing error handling and providing better feedback to the user for various scenarios.
- Adding unit tests and implementing automated testing to ensure app stability.

---

Thank you for checking out this GitHub User Search app. I look forward to discussing this project further in an interview.
