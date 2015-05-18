#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

if [ "$1" == "" ]; then
  BRANCH="master"
  DESTINATION_FILE="libphonenumber.js"
else
  BRANCH="libphonenumber-$1"
  DESTINATION_FILE="$BRANCH.js"
fi

CLOSURE_SERVICE="http://closure-compiler.appspot.com/compile"
BASE_URL="https://raw.githubusercontent.com/googlei18n/libphonenumber/$BRANCH/javascript/i18n/phonenumbers"

output=$(
    curl                                                \
    -d output_format=text                               \
    -d output_info=compiled_code                        \
    -d language=ECMASCRIPT5                             \
    -d compilation_level=ADVANCED_OPTIMIZATIONS         \
    -d use_closure_library=true                         \
    -d use_types_for_optimization=true                  \
    -d disable_property_renaming=false                  \
    -d code_url="$BASE_URL/asyoutypeformatter.js"       \
    -d code_url="$BASE_URL/phonenumberutil.js"          \
    -d code_url="$BASE_URL/phonemetadata.pb.js"         \
    -d code_url="$BASE_URL/metadata.js"                 \
    -d code_url="$BASE_URL/phonenumber.pb.js"           \
    -d js_externs="exports"                             \
    --data-urlencode "js_code@$DIR/bootstrap.js"        \
    "$CLOSURE_SERVICE"
)

lines=`echo "$output" | wc -l`
if [ $lines -lt 10 ]; then
    echo "*WARNING* Some times the Closure compiler service might not be able"
    echo "to fetch the required files from GitHub. Please try again to solve"
    echo "the issue."
    echo ""
    echo "$output"
    exit 1
fi

cat << EOF > "$DESTINATION_FILE"
(function (exports) {
$output
})(typeof exports === 'undefined' ? this : exports);
EOF

node "$DIR/test.js" "$DESTINATION_FILE"
