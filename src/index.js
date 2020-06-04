import * as Konva from "konva";
const gifler = require("./gifler");
console.log(gifler);

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "app",
  width: width,
  height: height
});

const layer = new Konva.Layer();
stage.add(layer);

const canvas = document.createElement("canvas");
// use external library to parse and draw gif animation
function onDrawFrame(ctx, frame) {
  // update canvas size
  canvas.width = frame.width;
  canvas.height = frame.height;
  console.log(frame);
  // update canvas that we are using for Konva.Image
  ctx.drawImage(frame.buffer, 0, 0);
  // redraw the layer
  layer.draw();
}

gifler("../assets/fun1.gif").frames(canvas, onDrawFrame);

// draw resulted canvas into the stage as Konva.Image
const image = new Konva.Image({
  image: canvas
});
layer.add(image);
