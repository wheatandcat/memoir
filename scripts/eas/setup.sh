#!/bin/sh

echo $IOS_INFO_PLIST | base64 --decode > ./ios/GoogleService-Info.plist
echo $ANDROID_GOOGLE_SERVICES_JSON | base64 --decode > ./android/google-services.json
echo ls ./ios
echo ls ./android
echo pwd