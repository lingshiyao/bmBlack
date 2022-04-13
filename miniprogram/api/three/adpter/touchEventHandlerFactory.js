import { TouchEvent, Touch } from './EventIniter/index.js'

function touchEventHandlerFactory(rawEvent) {
  let event = new TouchEvent(rawEvent.type)
  event.changedTouches = rawEvent.changedTouches.map(touch => new Touch(touch))
  event.touches = rawEvent.touches.map(touch => new Touch(touch))
  event.targetTouches = Array.prototype.slice.call(rawEvent.touches.map(touch => new Touch(touch)))
  event.timeStamp = rawEvent.timeStamp
  event.pointerType = 'touch'
  event = {...event, ...event.targetTouches[rawEvent.touches.length - 1]}
  event.pointerId = rawEvent.changedTouches[rawEvent.changedTouches.length - 1].identifier

  return event
}

export default touchEventHandlerFactory