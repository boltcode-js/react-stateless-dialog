#!/bin/sh
SCRIPT_DIR="$( dirname -- "$0" )"
cd $SCRIPT_DIR

cd packages/core && yarn build && cd -
cd packages/native && yarn build && cd -
