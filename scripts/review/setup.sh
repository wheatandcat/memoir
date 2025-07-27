#!/bin/sh

cp -r ./env/.env.review .env
cp -f ./platform/ios/review/GoogleService-Info.plist ./GoogleService-Info.plist
cp -f ./platform/android/review/google-services.json ./google-services.json 