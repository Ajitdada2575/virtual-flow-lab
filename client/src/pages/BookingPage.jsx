import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const navigate = useNavigate();

  const handleBooking = (e) => {
    e.preventDefault();
    alert('Slot booked successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-blue-500 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">Book a Lab Session</h1>
            <p className="mt-2 text-blue-100">Select an available time slot to reserve the hardware.</p>
          </div>
          <form className="p-6 md:p-8 space-y-8" onSubmit={handleBooking}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-slate-400" /> Select Date
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            
            {selectedDate && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-slate-400" /> Available Time Slots
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-4 rounded-lg font-medium border text-center transition ${
                        selectedSlot === slot 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedDate || !selectedSlot}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-md transition"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
