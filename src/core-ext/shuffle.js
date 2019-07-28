Array.prototype.shuffle = function () {
    var length = this.length,
        temp,
        base,
        i;

    for (i = 0; i < length; i++) {
        base = getRandom(i, length);
        temp = this[i];
        this[i] = this[base];
        this[base] = temp;
    }
}

function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor) + floor);
}

