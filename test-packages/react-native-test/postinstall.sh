#!/bin/sh
echo PROJECT_ROOT="\$THIS_DIR/../../../test-packages/react-native-test" > ../../node_modules/react-native/scripts/.packager.env
cd ios && pod install && cd -
