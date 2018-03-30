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

By omitting the `args` parameter, only the event itself is tested,
no matter what its artuments are:

    let result = await testedSmartContract.testedFunction();
    assert.web3Event(result, {
      event: 'TestedEvent'
      // Any argument is allowed
    }, 'The event is emitted');

So to make sure that an event has no arguments, pass an empty hash:

    let result = await testedSmartContract.testedFunction();
    assert.web3Event(result, {
      event: 'TestedEvent',
      args: {} // Event should have no argument at all
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
