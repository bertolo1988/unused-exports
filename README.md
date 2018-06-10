[![Build Status](https://travis-ci.org/bertolo1988/unused-exports.svg?branch=master)](https://travis-ci.org/bertolo1988/unused-exports)
[![npm version](https://badge.fury.io/js/unused-exports.svg)](https://badge.fury.io/js/unused-exports)

# unused-exports

Tries to find unused javascript module exports. 

## How it works and how you should use it

Tries to find where a given module exported methods are being used by reading the code.

This method is not 100% reliable but still might help you finding dead or unnecessary code in big projects.

You should manually confirm the results before removing any potential dead code. 

## Install

`npm i -g unused-exports`

## How to use

There are only 2 options, path and ignore.

`unused-exports --path ./src --ignore node_modules/`

## Troubleshooting basics

If you have weird/weak results please try it with `DEBUG=unused-exports:* unused-exports ... etc`.

## Testing

`npm run test` or `npm run demo`

## Contributing

Contributions will be highly appreciated.

Feel free to open any issues on any related matter.

## LICENSE

Code released under the [MIT license](./LICENSE).