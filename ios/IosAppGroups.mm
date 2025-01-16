#import "IosAppGroups.h"

@implementation IosAppGroups

RCT_EXPORT_MODULE(IosAppGroup)

RCT_EXPORT_METHOD(getContainerURL:(NSString *)groupIdentifier
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSURL *containerURL = [[NSFileManager defaultManager] containerURLForSecurityApplicationGroupIdentifier:groupIdentifier];
    
    if (containerURL) {
        resolve(containerURL.absoluteString);
    } else {
        reject(@"APP_GROUP_ERROR", @"Could not get container URL for app group", nil);
    }
}

RCT_EXPORT_METHOD(setBadgeCount:(NSString *)groupIdentifier
                  count:(nonnull NSNumber *)count
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSURL *containerURL = [[NSFileManager defaultManager] containerURLForSecurityApplicationGroupIdentifier:groupIdentifier];
    if (!containerURL) {
        reject(@"APP_GROUP_ERROR", @"Could not get container URL for app group", nil);
        return;
    }
    
    NSURL *badgeURL = [containerURL URLByAppendingPathComponent:@"RCTAsyncLocalStorage/badge_count"];
    NSError *error;
    NSString *countString = [count stringValue];
    [countString writeToURL:badgeURL atomically:YES encoding:NSUTF8StringEncoding error:&error];
    
    if (error) {
        reject(@"WRITE_ERROR", @"Could not write badge count", error);
    } else {
        resolve(countString);
    }
}

@end
