#!/bin/sh

cp -r ./env/.env.production .env
cp -f ./platform/ios/prod/GoogleService-Info.plist ./GoogleService-Info.plist
cp -f ./platform/android/prod/google-services.json ./google-services.json 