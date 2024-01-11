const { WebSocketServer } = require("ws");

const server = new WebSocketServer({
  port: 5000,
});

server.on("connection", (socket) => {
  console.log(`client connected`);

  socket.on("message", (data) => {
    const sent_data = JSON.parse(data);
    console.log(sent_data.chat_message);

    setInterval(() => {
      // i placed the id of the element i want the data to be shown
      //in the frontend and used hx-oob-swap to achieve this
      socket.send(`
        <div id="chat_box" hx-swap-oob="beforeend"> 
            <h3>${sent_data.chat_message}</h3>
        </div>
    `);
    }, 1000);
  });
});
