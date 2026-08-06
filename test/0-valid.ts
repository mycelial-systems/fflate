import { testSuites, workers, bClone } from './util.js';

// Name is to ensure that this runs first
// Note that workers are not used here to optimize performance but rather
// to prevent infinite loops from hanging the process.
testSuites({
  async compression(file, _name, _resetTimer, t) {
    const fileClone = bClone(file);
    const cProm = workers.fflate.deflate(fileClone, [fileClone.buffer]);
    cProm.timeout(10000);
    const buf = await cProm;
    t.ok(
      file.equals(await workers.zlib.inflate(buf, [buf.buffer])),
      'fflate deflate output should inflate back to the original'
    );
  },
  async decompression(file, _name, _resetTimer, t) {
    const fileClone = bClone(file);
    const data = await workers.zlib.deflate(fileClone, [fileClone.buffer]);
    const dProm = workers.fflate.inflate(data, [data.buffer]);
    dProm.timeout(5000);
    t.ok(
      file.equals(await dProm),
      'fflate should inflate zlib output back to the original'
    );
  }
});
