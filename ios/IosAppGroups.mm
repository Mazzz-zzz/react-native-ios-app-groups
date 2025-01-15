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

@end
