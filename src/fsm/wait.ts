export default function wait(ms: number) {
  return new Promise((resolve: Function) => {
    setTimeout(() => resolve(), ms);
  });
}
