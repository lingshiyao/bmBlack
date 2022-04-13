import Event from "../Event.js";

export default class TouchEvent extends Event {
  constructor(type) {
    super(type);

    this.touches = [];
    this.targetTouches = [];
    this.changedTouches = [];

    this.target = null;
    this.currentTarget = null;
  }
}

export class Touch {
  constructor(touch) {
    // CanvasTouch{identifier, x, y}
    // Touch{identifier, pageX, pageY, clientX, clientY, force}
    this.identifier = touch.identifier;

    this.force = touch.force === undefined ? 1 : touch.force;
    this.pageX = touch.pageX || touch.x;
    this.pageY = touch.pageY || touch.y;
    this.clientX = touch.clientX || touch.x;
    this.clientY = touch.clientY || touch.y;

    this.screenX = this.pageX;
    this.screenY = this.pageY;
  }
}
