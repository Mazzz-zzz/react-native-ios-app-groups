import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-ios-app-groups' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const IosAppGroups = NativeModules.IosAppGroup
  ? NativeModules.IosAppGroup
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function getContainerURL(groupIdentifier: string): Promise<string> {
  if (Platform.OS !== 'ios') {
    throw new Error('IosAppGroups is only available on iOS');
  }
  return IosAppGroups.getContainerURL(groupIdentifier);
}

// Keep the multiply method for backwards compatibility if needed
export function multiply(a: number, b: number): Promise<number> {
  return IosAppGroups.multiply(a, b);
}
