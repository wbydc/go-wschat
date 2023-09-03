import Client from "./Client";
import Controller from './Controller';
import Context from './Context';

console.log("hello");

const domController: Controller = new Controller();

domController.setupHooks();

domController.onMessageHook({
  id: "MessageId",
  type: "message",
  roomId: "RoomId",
  text: "string",
  userId: "UserId",
  createdAt: "now",
})

domController.onMessageHook({
  id: "MessageId",
  type: "message",
  roomId: "RoomId",
  text: "string",
  userId: "null",
  createdAt: "after ",
})
