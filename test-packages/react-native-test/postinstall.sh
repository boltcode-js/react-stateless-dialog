#!/bin/sh
echo PROJECT_ROOT="\$THIS_DIR/../../../packages/mobile" > ../../node_modules/react-native/scripts/.packager.env
cd ios && pod install && cd -
