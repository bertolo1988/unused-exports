[![Build Status](https://travis-ci.org/bertolo1988/unused-exports.svg?branch=master)](https://travis-ci.org/bertolo1988/unused-exports)
[![npm version](https://badge.fury.io/js/unused-exports.svg)](https://badge.fury.io/js/unused-exports)

# unused-exports

Tries to find javascript module named exports that are not being used by other javascript modules.

## How it works and how you should use it

Tries to find where a given module named exports are being used by reading the code without interpreting it.

This method has several limitations but still might help you finding dead or unnecessary code in big projects.

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