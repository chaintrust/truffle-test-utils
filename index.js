
module.exports = {
  init: function() {
    if (assert !== undefined) {
      assert.web3Events = function(observedTransactionResult, expectedEvents, message) {
        let entries = observedTransactionResult.logs.map(function(logEntry) {
          return {
            event: logEntry.event,
            args: Object.keys(logEntry.args).reduce(function(previous, current) {
              previous[current] =
                (typeof logEntry.args[current].toNumber === 'function')
                  ? logEntry.args[current].toNumber()
                  : logEntry.args[current];
              return previous;
            }, {})
          }
        });
        assert.deepEqual(entries, expectedEvents, message);
      };

      assert.web3Event = function(observedTransactionResult, expectedEvent, message) {
        assert.web3Events(observedTransactionResult, [expectedEvent], message);
      };
    }
  }
}
