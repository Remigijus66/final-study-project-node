let onlineUsers = []

module.exports = io => {
  io.on("connection", socket => {



    // socket.on('login', (data) => {
    //   console.log('data', data)

    //   const user = {
    //     name: data,
    //     id: socket.id
    //   }
    //   console.log('user', user)
    //   onlineUsers.push(user)

    //   io.emit('log', onlineUsers)
    // }),

    // socket.on('logout', (data) => {
    //   console.log('data', data)
    //   const index = onlineUsers.findIndex(object => {
    //     return object.name === data;
    //   });

    //   console.log('index', index)
    //   onlineUsers.splice(index, 1)
    //   io.emit('log', onlineUsers)
    // }),

    // socket.on('disconnect', () => {
    //   const index = onlineUsers.findIndex(object => {
    //     return object.id === socket.id;
    //   });
    //   console.log('index', index)
    //   onlineUsers.splice(index, 1)
    //   io.emit('log', onlineUsers);

    // }),

    socket.on('dummy', () => {
      console.log('ping')
    })
  })
}