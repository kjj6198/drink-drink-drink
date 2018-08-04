const leftPadZero = (padStr, options = { length: 2, paddedStr: '0' }) => {
  const shouldPad = padStr.toString().length < options.length;

  return shouldPad
    ? new Array(options.length - padStr.toString().length)
        .fill(options.paddedStr)
        .join('') + padStr.toString()
    : padStr.toString();
};

export default leftPadZero;
