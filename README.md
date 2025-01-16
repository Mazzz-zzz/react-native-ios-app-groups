# react-native-ios-app-groups

Fetch app group path from iOS so you can access them in React Native.

## Installation

```sh
npm install react-native-ios-app-groups
```

## iOS Setup

1. Enable App Groups in your Xcode project:
   - Select your target
   - Go to "Signing & Capabilities"
   - Click "+" and add "App Groups"
   - Add your app group identifier (e.g., "group.com.your.app")

## Usage

```typescript
import { getContainerURL, setBadgeCount } from 'react-native-ios-app-groups';

// Get the container URL for your app group
try {
  const url = await getContainerURL('group.com.your.app');
  console.log('Container URL:', url);
} catch (error) {
  console.error('Error:', error);
}

// Set badge count in app group container
try {
  await setBadgeCount('group.com.your.app', 5);
  console.log('Badge count set successfully');
} catch (error) {
  console.error('Error setting badge count:', error);
}
```

## API

### getContainerURL(groupIdentifier: string): Promise<string>

Returns a promise that resolves with the container URL for the specified app group.

- `groupIdentifier`: The identifier of your app group (e.g., "group.com.your.app")
- Returns: A promise that resolves with the absolute string URL of the app group container
- Throws: An error if the app group is not found or if called on a non-iOS platform

### setBadgeCount(groupIdentifier: string, count: number): Promise<string>

Sets a badge count value in the app group container that can be accessed by other apps in the same group.

- `groupIdentifier`: The identifier of your app group (e.g., "group.com.your.app")
- `count`: The badge count number to set
- Returns: A promise that resolves with the string representation of the count that was set
- Throws: An error if the app group is not found or if called on a non-iOS platform

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
