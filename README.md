# eosSignValidator

[![Build Status](https://travis-ci.org/bagaking/eosSignValidator.svg?branch=master)](https://travis-ci.org/bagaking/eosSignValidator)

# Usage 

## install

`npm i -g eos-sign-validator`

## start validator

eosSignValidator -P 11601

```
Options:
  -V, --version      output the version number
  -d, --development  (default env setting) similar to set NODE_ENV=development, and will read login.development.json at executing position as config by default
  -p, --production   similar to set NODE_ENV=production, and will read login.production.json at executing position as config by default
  -P, --port <port>  the port to serve api, 11601 by default
  -h, --help         output usage information
```

## request

request:
```bash
curl -X POST \
  http://127.0.0.1:11601/validate \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"validatorIdentity": "eos",
    "userIdentity": "kingh.x",
    "loginToken": "111",
    "secret": "SIG_K1_K7xXFHH1fnmP8CUiwBaHL6kvw2xAYB4gUwmLbQCsidk6VoYbmexPSH4A1igRWuD28GmKCds1sJmrT2343ZPRsSc3nwihuW",
    "algorithm": ""
}'
```

result
```json
{"statusCode":200,"result":true,"data":"EOS7DCLUEVp6ifeeKbJTu8geKrLHRRwbND3TH2xcX96ZhkDag6zBX"}
```




