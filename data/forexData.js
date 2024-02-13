const forex_data = {
    value: 0.0,
    setValue: function(value) {
        const finalValue = parseFloat(value)
        this.value = finalValue
    }
}

module.exports = forex_data