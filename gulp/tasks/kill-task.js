export const killTask = (done) => {
  console.log("The process will exit when done");
  done();
  process.exit(0);
};
