#!/bin/sh

echo $IOS_INFO_PLIST | base64 --decode -i > ./ios/GoogleService-Info.plist
echo $ANDROID_GOOGLE_SERVICES_JSON | base64 --decode -i > ./android/google-services.json