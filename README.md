# react-native-ios-app-groups

A React Native module to interact with iOS App Groups, enabling shared storage access between your main app and app extensions (like notification services).

## Why This Package?

I created this package while building an iOS app that needed to maintain consistent badge counts between the main app and its notification service extension. The main challenge was accessing shared storage (App Groups) from both React Native and native iOS code. This package provides a clean interface to:

1. Access App Group container URLs from React Native
2. Manage badge counts in a way that's accessible to both the main app and notification service extensions
3. Maintain state consistency across app components using shared storage

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
   - Repeat this process for your notification service extension if you have one

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

## Badge Count Storage

The `setBadgeCount` method stores the badge count in a specific location within your app group container: `RCTAsyncLocalStorage/badge_count`. This location is deliberately chosen to be easily accessible from your notification service extension.

### Integration with Notification Service Extension

If you're using this package with a notification service extension, you can read the badge count like this:

```objc
// In your NotificationService.m
NSURL *containerURL = [[NSFileManager defaultManager] 
    containerURLForSecurityApplicationGroupIdentifier:@"group.com.your.app"];
NSURL *badgeURL = [containerURL URLByAppendingPathComponent:@"RCTAsyncLocalStorage/badge_count"];

NSError *error;
NSString *badgeString = [NSString stringWithContentsOfURL:badgeURL 
                                               encoding:NSUTF8StringEncoding 
                                                  error:&error];
NSInteger count = badgeString ? [badgeString integerValue] : 0;

// Update badge count
count += 1;
self.bestAttemptContent.badge = @(count);

// Save back to shared storage
NSString *newCountString = [NSString stringWithFormat:@"%ld", (long)count];
[newCountString writeToURL:badgeURL 
                atomically:YES 
                  encoding:NSUTF8StringEncoding 
                     error:&error];
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
