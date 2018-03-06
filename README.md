# truffle-test-utils

Utils to support Truffle's JavaScript tests for Ethereum smart contracts.

## Install

    npm install truffle-test-utils

## How to use

To use these helpers, include them at the top of your tests:

    require('truffle-test-utils').init();

## Utils

### Event testing

To make sure a smart contract call generates the expected events:

    // Regular call thanks to Truffle
    let result = await testedSmartContract.testedFunction();
    // Check event
    assert.web3Event(result, {
      event: 'TestedEvent',
      args: {
        param_1: 'Some value',
        param_2: 0x123456 // No need for toNumber hassle
      }
    }, 'The event is emitted');

You can also use `assert.web3Events` (note the plural) with an array of expected events.

If you prefer `expect`, this is the example code:

```
// Regular call thanks to Truffle
let result = await testedSmartContract.testedFunction();
// Check event
expect.web3Event(result, {
  event: 'TestedEvent',
  args: {
    param_1: 'Some value',
    param_2: 0x123456 // No need for toNumber hassle
  }
}, 'The event is emitted');
```
