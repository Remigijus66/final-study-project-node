let onlineUsers = []

module.exports = io => {
  io.on("connection", socket => {



    socket.on('login', (data) => {
      console.log('data', data)

      const user = {
        name: data,
        id: socket.id
      }
      console.log('user', user)
      onlineUsers.push(user)
      console.log('onlineusers', onlineUsers)

      io.emit('log', onlineUsers)
    }),

      socket.on('logout', (data) => {
        console.log('data', data)
        const index = onlineUsers.findIndex(object => {
          return object.name === data;
        });

        console.log('index', index)
        if (index > -1) { onlineUsers.splice(index, 1) }
        console.log('onlineusers', onlineUsers)
        io.emit('log', onlineUsers)
      }),

      socket.on('disconnect', () => {
        const index = onlineUsers.findIndex(object => {
          return object.id === socket.id;
        });
        console.log('index', index)
        if (index > -1) { onlineUsers.splice(index, 1) }
        console.log('onlineusers', onlineUsers)
        io.emit('log', onlineUsers);

      }),

      socket.on('like', (data) => {

        const index = onlineUsers.findIndex(object => {
          return object.name === data.to;
        });
        if (index > -1) {
          io.to(onlineUsers[index].id).emit('like', data);
        }
      }),

      socket.on('dislike', (data) => {
        // console.log(' socket from', data.from)
        // console.log(' socket to', data.to)

        const index = onlineUsers.findIndex(object => {
          return object.name === data.to;
        });
        if (index > -1) {
          io.to(onlineUsers[index].id).emit('iWasDisliked', data.to);
        }
        socket.emit('iDisliked', data.from)
      }),

      socket.on('message', (data) => {

        const index = onlineUsers.findIndex(object => {
          return object.name === data.to;
        });
        if (index > -1) {
          io.to(onlineUsers[index].id).emit('messageReceived', data.from);
        }
        socket.emit('messageSent', data)

      })

  })
}
