Object.extend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }

  return out;
};

Object.bind = function(out, data) {
  	out = out || {};

	for (var key in data) {
	  if (out.hasOwnProperty(key))
			out[key] = data[key];
	}

  	return out;
};
