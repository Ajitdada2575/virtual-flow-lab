let activeControllerId = null;

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User requests to take control
    socket.on('requestControl', (data) => {
      // In a real app, verify they have an active booking right now
      if (!activeControllerId) {
        activeControllerId = socket.id;
        socket.emit('controlGranted', { message: 'You have control of the lab.' });
        socket.broadcast.emit('systemMessage', { message: 'Someone else has taken control.' });
      } else {
        socket.emit('controlDenied', { message: 'Lab is currently in use.' });
      }
    });

    // Control parameters (e.g., valve opening, flow rate)
    socket.on('sendControlParam', (data) => {
      if (socket.id === activeControllerId) {
        // Forward this to LabVIEW service or mock it
        console.log(`Control param received: `, data);
        
        // Mock responding with live sensor data based on control
        const mockResponse = {
          flowRate: data.valveOpen * 0.8, // Fake math
          pressure: data.pumpSpeed * 1.2,
          timestamp: new Date()
        };
        io.emit('sensorData', mockResponse);
      } else {
        socket.emit('error', { message: 'You do not have control.' });
      }
    });

    socket.on('releaseControl', () => {
      if (socket.id === activeControllerId) {
        activeControllerId = null;
        io.emit('systemMessage', { message: 'Lab is now available for control.' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      if (socket.id === activeControllerId) {
        activeControllerId = null;
        io.emit('systemMessage', { message: 'Controller disconnected. Lab is available.' });
      }
    });
  });
};
