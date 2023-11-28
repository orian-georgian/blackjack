import { Statuses } from "../constants";

const getMessageByStatus = (status) => {
  let message = "";

  switch (status) {
    case Statuses.Playing:
      message = "Hit the road, Jack! It's time for you to win some real money.";
      break;
    case Statuses.Busted:
      message = "Sorry, but you've busted! Anna won this one.";
      break;
    case Statuses.Waiting:
      message = "Now it's Anna's turn. Fingers crossed!";
      break;
    case Statuses.Lost:
      message = "It wasn't your best day, my friend. You lost!";
      break;
    case Statuses.Winner:
      message = "Congrats! Today is your lucky day. You won!";
      break;
    case Statuses.Tie:
      message = "Hooray! It's a tie. We're all winners!";
      break;
    default:
      message = "Nothing to see here!";
  }

  return message;
};

export default getMessageByStatus;
