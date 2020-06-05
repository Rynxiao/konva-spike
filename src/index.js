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

const canvas1 = document.createElement('canvas');
const canvas2 = document.createElement('canvas');

function gifToCanvas(path, canvas, layer) {
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
}

gifToCanvas('https://media1.tenor.com/images/d377e76efd51b36e1461003ce4f2913e/tenor.gif?itemid=10480536', canvas1, layer);
gifToCanvas('http://img.rynxiao.cn/test/flutter.gif', canvas2, layer);

// draw resulted canvas into the stage as Konva.Image
var image1 = new Konva.Image({ image: canvas1 });
var image2 = new Konva.Image({ image: canvas2 });
layer.add(image2);
layer.add(image1);
