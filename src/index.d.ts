declare module 'react-native-ios-app-groups' {
  /**
   * Gets the container URL for the specified app group
   * @param groupIdentifier The identifier of your app group (e.g., "group.com.your.app")
   * @returns A promise that resolves with the absolute string URL of the app group container
   * @throws Error if the app group is not found or if called on a non-iOS platform
   */
  export function getContainerURL(groupIdentifier: string): Promise<string>;

  /**
   * Multiplies two numbers (legacy method)
   * @param a First number
   * @param b Second number
   * @returns Promise that resolves with the product of a and b
   */
  export function multiply(a: number, b: number): Promise<number>;
} 