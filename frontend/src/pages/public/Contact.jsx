import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, HelpCircle, Send, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import './public.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', pnr: '', category: 'ETA Feedback', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page-wrapper animate-fade-in-up">
      {/* Contact Hero Banner */}
      <div className="search-header-hero">
        <div className="search-header-inner text-center">
          <div className="badge badge-purple mb-2 inline-flex items-center gap-1">
            <HelpCircle size={12} /> Passenger Assistance & Railway Helplines
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Contact & Support
          </h1>
          <p className="text-sm text-slate-200 max-w-xl mx-auto">
            Official Indian Railways 24x7 passenger helplines, TrainCast ETA support, and grievance redressal portals.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="home-container" style={{ padding: '36px 24px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* 1. Official Railway Helpline Strip */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-primary-navy mb-3 flex items-center gap-2">
            <Phone size={18} className="text-primary-navy" /> Indian Railways Universal Emergency Helplines
          </h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div className="card p-4" style={{ borderLeft: '4px solid #0056B3' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-2xl text-primary-navy font-mono">139</span>
                <span className="badge badge-green">24x7 Toll-Free</span>
              </div>
              <h4 className="font-bold text-sm text-main mb-1">Rail Madad Helpline</h4>
              <p className="text-xs text-muted">
                Single universal helpline for all railway queries: PNR status, live train inquiry, medical emergency, and complaints.
              </p>
            </div>

            <div className="card p-4" style={{ borderLeft: '4px solid #DC2626' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-2xl text-red-600 font-mono">182</span>
                <span className="badge badge-red">Security / Police</span>
              </div>
              <h4 className="font-bold text-sm text-main mb-1">RPF Security Helpline</h4>
              <p className="text-xs text-muted">
                Railway Protection Force round-the-clock emergency response for passenger safety and on-board assistance.
              </p>
            </div>

            <div className="card p-4" style={{ borderLeft: '4px solid #16A34A' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-2xl text-green-600 font-mono">138</span>
                <span className="badge badge-green">On-Board Services</span>
              </div>
              <h4 className="font-bold text-sm text-main mb-1">General Amenities & Medical</h4>
              <p className="text-xs text-muted">
                Immediate assistance for cleanliness, on-board catering, linen issues, and emergency doctor attendance.
              </p>
            </div>
          </div>
        </section>

        {/* 2. TrainCast Problem Statement & FAQ */}
        <div className="grid mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* FAQ Column */}
          <div>
            <h2 className="text-lg font-bold text-primary-navy mb-3 flex items-center gap-2">
              <HelpCircle size={18} /> Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-3">
              <div className="card p-4">
                <h4 className="font-bold text-sm text-primary-navy mb-1">
                  Why is TrainCast's ETA different from the official timetable?
                </h4>
                <p className="text-xs text-muted">
                  Official timetables show static schedules. TrainCast calculates actual locomotive speeds, section block headway, and historical recovery stretches to predict when your train will realistically arrive.
                </p>
              </div>

              <div className="card p-4">
                <h4 className="font-bold text-sm text-primary-navy mb-1">
                  How often are predictions updated?
                </h4>
                <p className="text-xs text-muted">
                  Predictions update in real-time as the train crosses track circuits, departs intermediate stations, or encounters signal speed restrictions.
                </p>
              </div>

              <div className="card p-4">
                <h4 className="font-bold text-sm text-primary-navy mb-1">
                  Which corridor is covered by this prototype?
                </h4>
                <p className="text-xs text-muted">
                  The prototype covers the Southern Railway high-density trunk lines connecting Chennai Central (MAS), Salem (SA), Erode (ED), Coimbatore (CBE), and Bengaluru (SBC).
                </p>
              </div>
            </div>
          </div>

          {/* Feedback Form Column */}
          <div>
            <h2 className="text-lg font-bold text-primary-navy mb-3 flex items-center gap-2">
              <Mail size={18} /> TrainCast Passenger Feedback
            </h2>
            <div className="card p-4">
              {submitted ? (
                <div className="text-center p-6">
                  <CheckCircle2 size={40} className="text-green mx-auto mb-2" />
                  <h3 className="font-bold text-base text-main mb-1">Thank You!</h3>
                  <p className="text-xs text-muted">
                    Your feedback regarding Southern Railway corridor ETA has been logged into the TrainCast validation repository.
                  </p>
                  <button 
                    className="btn btn-secondary text-xs mt-3"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Feedback
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-bold text-muted block mb-1">Passenger Name / Contact:</label>
                    <input 
                      type="text" 
                      className="form-input text-xs w-full"
                      placeholder="e.g. Ramesh Kumar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted block mb-1">Train Number or PNR:</label>
                    <input 
                      type="text" 
                      className="form-input text-xs w-full"
                      placeholder="e.g. 12675 or 10-digit PNR"
                      value={form.pnr}
                      onChange={(e) => setForm({ ...form, pnr: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted block mb-1">Category:</label>
                    <select 
                      className="form-input text-xs w-full"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="ETA Feedback">ETA Precision Feedback</option>
                      <option value="Delay Reporting">Unscheduled Delay Reporting</option>
                      <option value="General Inquiry">General Question / Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted block mb-1">Message / Observations:</label>
                    <textarea 
                      className="form-input text-xs w-full" 
                      rows={3}
                      placeholder="Share your travel experience or ETA feedback..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary text-xs flex items-center justify-center gap-2 mt-1">
                    <Send size={14} /> Submit Feedback
                  </button>
                </form>
              )}
            </div>

            {/* Divisional Office Reference */}
            <div className="card p-3 mt-3 bg-main text-xs text-muted flex items-start gap-2">
              <MapPin size={16} className="text-primary-navy flex-shrink-0 mt-0.5" />
              <div>
                <strong>Southern Railway Headquarters:</strong><br />
                General Manager's Office, Park Town, Chennai, Tamil Nadu – 600003
              </div>
            </div>
          </div>
        </div>

        {/* Prototype Accreditation */}
        <div className="p-3 bg-main rounded border text-center text-xs text-muted">
          Smart India Hackathon 2026 • Problem Statement SIH26028 (Ministry of Railways) • Dynamic ETA Forecasting Platform
        </div>
      </div>
    </div>
  );
};

export default Contact;
