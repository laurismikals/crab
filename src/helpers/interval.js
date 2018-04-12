export default function (callback, interval) {
  let timerId, startTime, remaining = 0;
  let state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed, 4= cleared

  this.pause = ()=>{
    if (state !== 1) return;

    remaining = interval - (new Date() - startTime);
    clearInterval(timerId);
    state = 2;
  };

  this.resume = () => {
    if (state !== 2 || state === 4) return;

    state = 3;
    setTimeout(this.timeoutCallback, remaining);
  };

  this.timeoutCallback = ()=>{
    if (state !== 3) return;

    callback();

    startTime = new Date();
    timerId = setInterval(callback, interval);
    state = 1;
  };

  this.clear = ()=>{
    state = 4;
    clearInterval(timerId);
  };

  startTime = new Date();
  timerId = setInterval(callback, interval);
  state = 1;
}
