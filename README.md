# truffle-test-helpers

Helpers to support Truffle's JavaScript tests for Ethereum smart contracts.

## Install

    npm install truffle-test-helpers

## How to use

To use these helpers, include them at the top of your tests:

    require('truffle-test-helpers').init();

## Helpers

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
