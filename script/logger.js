// Thanks to https://gist.github.com/garth/2570757

var winston = require('winston');

// level and color list
var _cust = {
  levels: {
    info: 0,
    warn: 1,
    error: 2,
    debug: 3,
    create: 4,
    success: 5,
  },
  colors: {
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    debug: 'white',
    create: 'yellow',
    success: 'green',
  }
};

// create custom logging
var _logger = new (winston.Logger)({
  level: 'info',
  levels: _cust.levels,
  colors: _cust.colors,

  transports: [
    new winston.transports.Console({
      level: 'info',
      levels: _cust.levels,
      colorize: true,
      prettyPrint: true,
      humanReadableUnhandledException: true,
    }),
  ],
});

// try all logging levels
_logger['all'] = function() {
  for(var lvl in _cust.levels) {
    if(_cust.levels.hasOwnProperty(lvl) ) {
      this[lvl]('hello world');
    }
  }
}

module.exports = _logger;
