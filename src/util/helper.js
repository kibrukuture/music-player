export function formatTime(ct) {
  let min, sec;
  min = Math.floor(ct / 60);
  // if (min < 10) min = "0" + min;
  sec = Math.floor(ct - min * 60);
  if (sec < 10) sec = 0 + '' + sec;
  return { min, sec };
}
export function findIndex(arr, id) {
  return arr.findIndex((item) => item.id === id);
}
