import leftPadZero from './leftPadZero';

export default function getRemainTime(date, now = Date.now()) {
  const endTime = date.getTime();
  const diff = endTime - now;

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 - hours * 60 * 60) / 60);
  const secs = Math.floor(diff / 1000) % 60;
  return {
    hours: leftPadZero(hours),
    minutes: leftPadZero(minutes),
    secs: leftPadZero(secs),
  };
}
