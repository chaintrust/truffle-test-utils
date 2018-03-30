
function buildObservedEventsForComparison(observedTransactionResult, expectedEvents) {
  return observedTransactionResult.logs.map(function(logEntry) {
    // Event name
    let event = {
      event: logEntry.event
    };

    // Event arguments
    let expectedEntry = expectedEvents.find(function(evt) {
      return (evt.event === logEntry.event)
    });
    // Ignore the arguments when they are not tested
    // (ie. expectedEntry.args is undefined)
    if ((! expectedEntry) || (expectedEntry && expectedEntry.args)) {
      event.args = Object.keys(logEntry.args).reduce(function(previous, current) {
        previous[current] =
          (typeof logEntry.args[current].toNumber === 'function')
            ? logEntry.args[current].toNumber()
            : logEntry.args[current];
        return previous;
      }, {});
    }

    return event;
  });
}

module.exports = {
  init: function() {
    if (typeof assert !== 'undefined') {
      assert.web3Events = function(observedTransactionResult, expectedEvents, message) {
        let entries = buildObservedEventsForComparison(observedTransactionResult, expectedEvents);
        assert.deepEqual(entries, expectedEvents, message);
      };

      assert.web3Event = function(observedTransactionResult, expectedEvent, message) {
        assert.web3Events(observedTransactionResult, [expectedEvent], message);
      };
    }

    if (typeof expect !== 'undefined') {
      expect.web3Events = function(observedTransactionResult, expectedEvents, message) {
        let entries = buildObservedEventsForComparison(observedTransactionResult, expectedEvents);
        expect(entries).to.deep.equal(expectedEvents);
      };

      expect.web3Event = function(observedTransactionResult, expectedEvent, message) {
        expect.web3Events(observedTransactionResult, [expectedEvent], message);
      };
    }
  }
}
