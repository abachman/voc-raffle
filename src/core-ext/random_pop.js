Array.prototype.random_pop = function () {
  const length = this.length
  const base = getRandom(0, length)

  const item = this.splice(base, 1)
  return item[0]
}

function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor) + floor)
}

