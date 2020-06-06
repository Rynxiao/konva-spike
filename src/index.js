import * as Konva from "konva";
import gifler from './gifler';

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "app",
  width: width,
  height: height
});

const layer = new Konva.Layer();
stage.add(layer);

function getRandomPoint() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
  }
}

function gifToCanvas(path, layer) {
  const canvas = document.createElement('canvas');

  // use external library to parse and draw gif animation
  function onDrawFrame(ctx, frame) {
    // update canvas size
    canvas.width = frame.width;
    canvas.height = frame.height;
    // update canvas that we are using for Konva.Image
    ctx.drawImage(frame.buffer, 0, 0);
    // redraw the layer
    layer.draw();
  }

  gifler(path).frames(canvas, onDrawFrame);

  return canvas;
}

const canvas1 = gifToCanvas('https://media1.tenor.com/images/d377e76efd51b36e1461003ce4f2913e/tenor.gif?itemid=10480536', layer);
const canvas2 = gifToCanvas('http://img.rynxiao.cn/test/flutter.gif', layer);

const canvasList = Array(80).fill(canvas1);
canvasList.push(canvas2);
canvasList.forEach(canvas => {
  const image = new Konva.Image({ image: canvas, ...getRandomPoint() });
  layer.add(image);
});
