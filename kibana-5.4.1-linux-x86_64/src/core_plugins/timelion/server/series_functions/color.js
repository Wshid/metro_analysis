'use strict';

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

var _tinygradient = require('tinygradient');

var _tinygradient2 = _interopRequireDefault(_tinygradient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = new _chainable2.default('color', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'color',
    types: ['string'],
    help: 'Color of series, as hex, eg #c6c6c6 is a lovely light grey. If you specify multiple colors, and have ' + 'multiple series, you will get a gradient, eg "#00B1CC:#00FF94:#FF3A39:#CC1A6F"'
  }],
  help: 'Change the color of the series',
  fn: function colorFn(args) {
    let colors = args.byName.color.split(':');

    if (colors.length > 1 && args.byName.inputSeries.list.length > 1) {
      colors = (0, _tinygradient2.default)(colors).rgb(args.byName.inputSeries.list.length);
    }

    let i = 0;
    return (0, _alter2.default)(args, function (eachSeries) {
      if (colors.length === 1 || args.byName.inputSeries.list.length === 1) {
        eachSeries.color = colors[0];
      } else if (colors.length > 1) {
        eachSeries.color = colors[i].toHexString();
        i++;
      } else {
        throw new Error('Hey, I need at least one color to work with');
      }

      return eachSeries;
    });
  }
});
