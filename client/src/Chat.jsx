import { useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";
import Logo from "./Logo";
import { UserContext } from "./userContext";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { username, id } = useContext(UserContext);
  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4044");
    setWs(ws);

    ws.addEventListener("message", handleMessage);
  }, []);

  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });

    // console.log(people);
    setOnlinePeople(people);
  }

  function handleMessage(ev) {
    // console.log("new message", ev);

    const messageData = JSON.parse(ev.data);
    // console.log(messageData);

    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else {
      console.log(messageData);
    }
  }

  function sendMessage(ev) {
    ev.preventDefault();
    ws.send(
      JSON.stringify({
        message: {
          recipient: selectedUserId,
          text: newMessageText,
        },
      })
    );
    setNewMessageText("");
  }

  const onlinePeopleExclOurUser = { ...onlinePeople };
  delete onlinePeopleExclOurUser[id];

  return (
    <div className="flex h-screen">
      <div className="bg-white w-1/4 ">
        <Logo />

        {Object.keys(onlinePeopleExclOurUser).map((userId) => (
          <div
            onClick={() => setSelectedUserId(userId)}
            className={
              "border-b border-gray-300 flex items-center gap-2 cursor-pointer " +
              (userId === selectedUserId ? "bg-green-200" : "")
            }
            key={userId}
          >
            {userId === selectedUserId && (
              <div className="w-1 bg-green-500 h-12 rounded-r-md"></div>
            )}
            <div className="flex items-center gap-2 py-2 pl-4 ">
              <Avatar username={onlinePeople[userId]} userId={userId} />
              <span className="text-gray-800 text-xl">
                {onlinePeople[userId]}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-slate-800 w-3/4  p-2">
        <div className="flex-grow">
          {!selectedUserId && (
            <div className="h-full flex items-center justify-center">
              <div className="bg-gray-900 w-1/3 h-10 opacity-20 rounded-md flex items-center justify-center">
                <div className="text-white text-xl">Welcome to WebChat.</div>
              </div>
              {/* <div>&larr;Select a person from side bar</div> */}
            </div>
          )}
        </div>

        {/* !! <-convert to boolean value  */}
        {!!selectedUserId && (
          <form className="flex gap-2" onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessageText}
              onChange={(ev) => setNewMessageText(ev.target.value)}
              placeholder="Type your message here"
              className="bg-white flex-grow boarder
            p-2 "
            />
            <button
              type="submit"
              className="bg-green-600 p-2 text-white rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chat;
