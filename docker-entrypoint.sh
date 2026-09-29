#!/bin/sh
set -eu

node -e "const fs = require('fs'); const config = { primeUiLicenseKey: process.env.PRIMEUI_LICENSE_KEY || undefined }; fs.writeFileSync('/app/public/runtime-config.js', 'window.__DEVHUB_RUNTIME_CONFIGURATION__ = ' + JSON.stringify(config) + ';\n');"

exec "$@"
