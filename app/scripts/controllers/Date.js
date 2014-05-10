Date.prototype.toYYYYMMDD = function () {
  function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  };

  return this.getFullYear() +
    '-' + pad(this.getMonth() + 1) +
    '-' + pad(this.getDate());
};