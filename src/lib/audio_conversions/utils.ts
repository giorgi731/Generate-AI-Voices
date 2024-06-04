import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
export async function convertWebmToMp3(webmBlob: Blob): Promise<Blob> {
  const ffmpeg = createFFmpeg({
    mainName: 'main',
    corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
  });
  await ffmpeg.load();
  const inputName = 'input.webm';
  const outputName = 'output.mp3';
  ffmpeg.FS('writeFile', inputName, await fetchFile(webmBlob));
  await ffmpeg.run('-i', inputName, outputName);
  const outputData = ffmpeg.FS('readFile', outputName);
  const outputBlob = new Blob([outputData.buffer], { type: 'audio/mp3' });
  return outputBlob;
}
