/**
 * format time
 * %Y %y %M %D %H %h %s %m
 * %w
 */
import leftPadZero from './leftPadZero';

const formatTime = format => date => {
  format
    .replace('%Y', date.getFullYear())
    .replace('%M', date.getMonth() + 1)
    .replace('%D', leftPadZero(date.getDate()))
    .replace('%H', leftPadZero(date.getHour()))
    .replace(
      '%h',
      leftPadZero(date.getHour() >= 12 ? date.getHour() - 12 : date.getHour())
    )
    .replace('%m', leftPadZero(date.getMinutes()))
    .replace('%s', leftPadZero(date.getSeconds()));
};
