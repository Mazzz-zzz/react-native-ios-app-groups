declare module 'react-native-ios-app-groups' {
  /**
   * Gets the container URL for the specified app group
   * @param groupIdentifier The identifier of your app group (e.g., "group.com.your.app")
   * @returns A promise that resolves with the absolute string URL of the app group container
   * @throws Error if the app group is not found or if called on a non-iOS platform
   */
  export function getContainerURL(groupIdentifier: string): Promise<string>;

  /**
   * Sets the badge count in the app group container
   * @param groupIdentifier The identifier of your app group (e.g., "group.com.your.app")
   * @param count The badge count number to set
   * @returns Promise that resolves with the string representation of the count that was set
   * @throws Error if the app group is not found or if called on a non-iOS platform
   */
  export function setBadgeCount(groupIdentifier: string, count: number): Promise<string>;
} 