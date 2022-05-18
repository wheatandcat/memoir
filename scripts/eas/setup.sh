#!/bin/sh

echo $IOS_INFO_PLIST | base64 --decode > ./ios/GoogleService-Info_eas.plist
echo $ANDROID_GOOGLE_SERVICES_JSON | base64 --decode > ./android/google-services_eas.json
ls ./ios
ls ./android
pwd