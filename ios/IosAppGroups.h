#import <React/RCTBridgeModule.h>

@interface IosAppGroups : NSObject <RCTBridgeModule>

- (void)setBadgeCount:(NSString *)groupIdentifier
                count:(NSNumber *)count
              resolve:(RCTPromiseResolveBlock)resolve
               reject:(RCTPromiseRejectBlock)reject;

@end
