import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Power, Settings2, AlertTriangle, Video } from 'lucide-react';

const SOCKET_URL = 'http://localhost:5000';

const LiveExperiment = () => {
  const [socket, setSocket] = useState(null);
  const [hasControl, setHasControl] = useState(false);
  const [valveOpen, setValveOpen] = useState(0);
  const [pumpSpeed, setPumpSpeed] = useState(0);
  const [sensorData, setSensorData] = useState({ flowRate: 0, pressure: 0 });
  const [cameraView, setCameraView] = useState('cam1');
  const [systemMessage, setSystemMessage] = useState('');

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to lab server');
    });

    newSocket.on('controlGranted', (data) => {
      setHasControl(true);
      setSystemMessage(data.message);
    });

    newSocket.on('controlDenied', (data) => {
      setHasControl(false);
      setSystemMessage(data.message);
    });

    newSocket.on('systemMessage', (data) => {
      setSystemMessage(data.message);
    });

    newSocket.on('sensorData', (data) => {
      setSensorData(data);
    });

    return () => newSocket.close();
  }, []);

  const requestControl = () => {
    if (socket) {
      socket.emit('requestControl');
    }
  };

  const releaseControl = () => {
    if (socket) {
      socket.emit('releaseControl');
      setHasControl(false);
    }
  };

  const handleControlChange = (type, value) => {
    if (!hasControl) return;

    if (type === 'valve') setValveOpen(value);
    if (type === 'pump') setPumpSpeed(value);

    socket.emit('sendControlParam', {
      valveOpen: type === 'valve' ? value : valveOpen,
      pumpSpeed: type === 'pump' ? value : pumpSpeed,
    });
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* LEFT PANEL: Camera & Data */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        {/* Camera Feed Mock */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Video className="h-5 w-5 text-blue-400" /> Lab Camera Feed
            </h2>
            <select 
              value={cameraView} 
              onChange={(e) => setCameraView(e.target.value)}
              className="bg-slate-800 border pl-2 pr-4 border-slate-700 text-sm rounded-lg p-2 focus:ring focus:ring-blue-500"
            >
              <option value="cam1">Camera 1 (Main Rig)</option>
              <option value="cam2">Camera 2 (Valve Closeup)</option>
              <option value="cam3">Camera 3 (Tank Level)</option>
            </select>
          </div>
          <div className="flex-1 bg-black rounded-xl overflow-hidden relative border border-slate-800 flex items-center justify-center">
            <div className="text-slate-600 flex flex-col items-center">
              <Video className="h-12 w-12 mb-2 opacity-50" />
              <p className="font-medium tracking-widest text-sm">LIVE FEED : {cameraView.toUpperCase()}</p>
            </div>
            {/* Overlay recording indicator */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg font-bold">REC</span>
            </div>
          </div>
        </div>

        {/* Live Graphs Mock */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col">
           <h2 className="text-lg font-bold mb-4">Real-time Telemetry</h2>
           <div className="flex-1 border border-slate-700 bg-slate-800/50 rounded-xl flex items-end p-4 relative overflow-hidden">
               {/* Extremely simple mocked chart visualization */}
               <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end h-32 space-x-1">
                  {[...Array(40)].map((_, i) => {
                     const h = Math.random() * (sensorData.flowRate > 0 ? sensorData.flowRate * 2 : 10);
                     return (
                      <div key={i} className="w-full bg-emerald-500/80 rounded-t-sm transition-all duration-300" style={{ height: `${Math.max(2, h)}%` }}></div>
                     )
                  })}
               </div>
               <div className="absolute top-4 right-4 flex gap-4">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs font-bold font-mono">FLOW</p>
                    <p className="text-2xl font-bold text-emerald-400 font-mono">{sensorData.flowRate.toFixed(1)} L/m</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs font-bold font-mono">PRESSURE</p>
                    <p className="text-2xl font-bold text-blue-400 font-mono">{sensorData.pressure.toFixed(1)} atm</p>
                  </div>
               </div>
           </div>
        </div>

      </div>

      {/* RIGHT PANEL: Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-purple-400"/> Control Panel
          </h2>
          {hasControl ? (
            <button onClick={releaseControl} className="text-xs bg-red-500/20 text-red-400 border border-red-500/50 px-3 py-1.5 rounded-full font-bold hover:bg-red-500/30 transition">
              Release Control
            </button>
          ) : (
            <button onClick={requestControl} className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-3 py-1.5 rounded-full font-bold hover:bg-emerald-500/30 transition flex items-center gap-1">
              <Power className="h-3 w-3" /> Request Control
            </button>
          )}
        </div>

        {systemMessage && (
          <div className="mb-6 bg-slate-800 border border-slate-700 p-3 rounded-lg flex items-start gap-3">
             <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
             <p className="text-sm text-slate-300">{systemMessage}</p>
          </div>
        )}

        <div className={`space-y-8 flex-1 transition-opacity ${hasControl ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          {/* Valve Control */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <label>Proportional Valve</label>
              <span className="text-emerald-400 font-mono">{valveOpen}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={valveOpen}
              onChange={(e) => handleControlChange('valve', parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>CLOSED</span>
              <span>FULLY OPEN</span>
            </div>
          </div>

          {/* Pump Control */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <label>Main Pump Speed</label>
              <span className="text-blue-400 font-mono">{pumpSpeed} RPM</span>
            </div>
            <input
              type="range"
              min="0"
              max="1500"
              value={pumpSpeed}
              onChange={(e) => handleControlChange('pump', parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>OFF</span>
              <span>MAX POWER</span>
            </div>
          </div>
        </div>

        {!hasControl && (
          <div className="mt-8 text-center p-4 bg-slate-800/50 rounded-xl border border-slate-800 flex flex-col items-center">
            <Settings2 className="h-8 w-8 text-slate-500 mb-2 opacity-50" />
            <p className="text-sm text-slate-400 font-medium">Controls locked.<br/>Request control to interact with the lab equipment.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default LiveExperiment;
