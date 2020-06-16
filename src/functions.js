function getRandomIntInclusive(min, max) {
  const from = Math.ceil(min);
  const to = Math.floor(max);
  return Math.floor(Math.random() * (to - from + 1)) + from;
  // The maximum is inclusive and the minimum is inclusive
}

function generateСurrent(min, max, downtime = false) {
  if (((typeof min === 'undefined') || (min === null)) || ((typeof max === 'undefined') || (max === null))) {
    return { error: true, message: 'getVoltage(), min and max values are undefined or null!' };
  }

  if (!downtime) {
    return {
      w1: Math.random() * (max - min) + min,
      w2: Math.random() * (max - min) + min,
      w3: Math.random() * (max - min) + min,

    };
  }

  return {
    w1: Math.random() * (max - min) + min - 10,
    w2: Math.random() * (max - min) + min - 10,
    w3: Math.random() * (max - min) + min - 10,

  };
}

module.exports = {
  getRandomIntInclusive,
  generateСurrent,
}