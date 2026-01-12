import React, { useState, useMemo, useEffect } from 'react';
import { AppView, Booking, Service, UserProfile, ServiceCategory, CustomerTab, Transaction } from './types';
import { LONDON_SERVICES, MOCK_PROVIDERS } from './constants';
import { Button, Card, Badge } from './components/UI';
import { AIConcierge } from './components/AIConcierge';

// --- Sub-View: Customer App ---
const CustomerView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CustomerTab>('DISCOVER');
  const [user, setUser] = useState<UserProfile>({
    name: 'Sarah',
    membership: 'GOLD',
    walletBalance: 245.50,
    points: 1250,
    transactions: [
      { id: 'T1', type: 'DEBIT', amount: 15.30, description: 'Cleaning Discount Applied', date: 'Today' },
      { id: 'T2', type: 'CREDIT', amount: 100.00, description: 'Wallet Top-up', date: 'Yesterday' },
    ]
  });

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'LH-9921',
      serviceId: 'c1',
      serviceName: 'Regular Cleaning',
      date: 'Today',
      time: '14:00',
      status: 'IN_PROGRESS',
      totalPrice: 15.30,
      address: '12 Sloane St, London',
      providerName: 'Maria G.',
      providerAvatar: 'https://i.pravatar.cc/150?u=p2',
      eta: '8 mins'
    }
  ]);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [step, setStep] = useState<'HOME' | 'BOOKING' | 'CONFIRMED'>('HOME');
  const [filter, setFilter] = useState<ServiceCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    let list = LONDON_SERVICES;
    if (filter !== 'ALL') list = list.filter(s => s.category === filter);
    if (searchQuery) list = list.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return list;
  }, [filter, searchQuery]);

  const handleBook = (service: Service) => {
    setSelectedService(service);
    setStep('BOOKING');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finalizeBooking = () => {
    if (!selectedService) return;
    const finalPrice = user.membership === 'GOLD' ? selectedService.price * 0.85 : selectedService.price;
    
    if (user.walletBalance < finalPrice) {
      alert("Insufficient funds in wallet. Please top up.");
      return;
    }

    const newBooking: Booking = {
      id: `LH-${Math.floor(Math.random() * 9000) + 1000}`,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: 'Tomorrow',
      time: '10:00',
      status: 'PENDING',
      totalPrice: finalPrice,
      address: '12 Sloane St, London',
    };

    const newTransaction: Transaction = {
      id: `TX-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      type: 'DEBIT',
      amount: finalPrice,
      description: `Booking: ${selectedService.name}`,
      date: 'Just now'
    };

    setUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance - finalPrice,
      points: prev.points + 50,
      transactions: [newTransaction, ...prev.transactions]
    }));

    setBookings([newBooking, ...bookings]);
    setStep('CONFIRMED');
  };

  return (
    <div className="pb-28 animate-in fade-in duration-500">
      {activeTab === 'DISCOVER' && (
        <div role="tabpanel">
          <header className={`px-6 pt-12 pb-8 sticky top-0 z-40 transition-all duration-700 ${user.membership === 'GOLD' ? 'bg-slate-950 text-white shadow-2xl' : 'bg-white text-slate-900 shadow-sm'}`}>
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tighter">LondonHome</h1>
                <div className="flex items-center gap-2">
                  <Badge variant={user.membership === 'GOLD' ? 'success' : 'info'}>
                    {user.membership === 'GOLD' ? '✨ GOLD LOUNGE' : 'BASIC'}
                  </Badge>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('WALLET')} 
                className="group flex flex-col items-end focus:outline-none"
                aria-label="View Wallet"
              >
                <div className="bg-indigo-600 px-4 py-2 rounded-2xl flex items-center gap-3 hover:bg-indigo-700 transition-colors">
                  <span className="text-sm font-black">£{user.walletBalance.toFixed(2)}</span>
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center" aria-hidden="true">💳</div>
                </div>
              </button>
            </div>
            <div className="relative group">
              <input 
                type="text"
                placeholder="Search premium services..."
                className={`w-full py-4 pl-12 pr-4 rounded-2xl text-sm font-medium transition-all border-none focus:ring-2 focus:ring-indigo-500 outline-none ${user.membership === 'GOLD' ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search services"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" aria-hidden="true">🔍</span>
            </div>
          </header>

          <div className="p-6">
            {step === 'HOME' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <nav className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar" aria-label="Service categories">
                  {['ALL', 'CLEANING', 'MAINTENANCE', 'PETS', 'CAR_CARE'].map(c => (
                    <button 
                      key={c}
                      onClick={() => setFilter(c as any)}
                      className={`px-5 py-3 rounded-2xl whitespace-nowrap font-bold text-xs transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${filter === c ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border text-slate-500'}`}
                    >
                      {c === 'ALL' ? '🌐 Discover' : c.replace('_', ' ')}
                    </button>
                  ))}
                </nav>

                <div className="grid gap-6">
                  {filteredServices.map(service => (
                    <Card 
                      key={service.id} 
                      className="p-0 border-none shadow-sm group overflow-hidden cursor-pointer" 
                      onClick={() => handleBook(service)}
                    >
                      <div className="relative h-56">
                        <img src={service.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={service.name} />
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-2xl shadow-xl">
                          <span className="text-xs font-black text-indigo-600">£{service.price} <span className="text-[10px] opacity-40">/{service.unit}</span></span>
                        </div>
                      </div>
                      <div className="p-5 flex justify-between items-center bg-white">
                        <div>
                          <h3 className="font-black text-slate-900 text-lg tracking-tight">{service.name}</h3>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{service.category}</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <span className="text-xl" aria-hidden="true">→</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {step === 'BOOKING' && selectedService && (
              <div className="animate-in slide-in-from-right-10 duration-500 space-y-8">
                <button 
                  onClick={() => setStep('HOME')} 
                  className="text-indigo-600 font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  <span aria-hidden="true">←</span> Back to Services
                </button>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Review Order</h2>
                  <Card className="p-6 bg-slate-50 border-none space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-500">{selectedService.name}</span>
                      <span className="font-black">£{selectedService.price.toFixed(2)}</span>
                    </div>
                    {user.membership === 'GOLD' && (
                      <div className="flex justify-between items-center text-emerald-600">
                        <span className="text-xs font-black italic">GOLD SAVINGS (15%)</span>
                        <span className="font-black">-£{(selectedService.price * 0.15).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-6 border-t-2 border-slate-200 flex justify-between items-center">
                      <span className="text-xl font-black">Final Amount</span>
                      <span className="text-3xl font-black text-indigo-600">£{(user.membership === 'GOLD' ? selectedService.price * 0.85 : selectedService.price).toFixed(2)}</span>
                    </div>
                  </Card>
                </div>
                <Button fullWidth size="lg" onClick={finalizeBooking} className="h-16 text-lg tracking-tighter">Confirm & Pay with Wallet</Button>
                <p className="text-[10px] text-center text-slate-400 font-bold px-8">Funds are held in secure escrow until the job is completed to your satisfaction.</p>
              </div>
            )}

            {step === 'CONFIRMED' && (
              <div className="text-center py-20 space-y-8 animate-in zoom-in-95 duration-500">
                <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <span className="text-5xl" role="img" aria-label="Success">⚡</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Order Success!</h2>
                  <p className="text-slate-400 font-bold px-10 leading-relaxed">Your payment is secured. A LondonHome partner has been notified of your request.</p>
                </div>
                <Button variant="outline" fullWidth onClick={() => { setStep('HOME'); setActiveTab('TASKS'); }}>Track Active Tasks</Button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'WALLET' && (
        <div className="p-8 animate-in slide-in-from-bottom-10 duration-500 space-y-10" role="tabpanel">
          <header className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">WALLET</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Escrow Balance & Points</p>
          </header>

          <Card className="p-10 bg-slate-950 text-white border-none relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <p className="text-[10px] font-black opacity-50 uppercase tracking-widest">Available Credit</p>
            <h2 className="text-5xl font-black mt-2 tracking-tighter">£{user.walletBalance.toFixed(2)}</h2>
            <div className="mt-10 flex gap-4">
              <Button variant="secondary" className="flex-1 py-3 text-xs uppercase font-black">Add Funds</Button>
              <Button variant="outline" className="flex-1 py-3 text-xs uppercase font-black border-white/20 text-white hover:bg-white/10">Cash Out</Button>
            </div>
          </Card>

          <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h3 className="font-black text-slate-900 uppercase text-sm tracking-tighter">Loyalty & Rewards</h3>
               <Badge variant="success">{user.points} Points</Badge>
             </div>
             <Card className="p-6 border-dashed border-2 border-slate-200 bg-slate-50/50 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-500 italic">2000 points = £20.00 credit</p>
                <button className="text-[10px] font-black text-indigo-600 uppercase border-b border-indigo-600 pb-0.5 hover:text-indigo-800 transition-colors">Redeem Now</button>
             </Card>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-slate-900 uppercase text-sm tracking-tighter">Recent Transactions</h3>
            <div className="space-y-3">
              {user.transactions.length > 0 ? user.transactions.map(t => (
                <div key={t.id} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${t.type === 'CREDIT' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`} aria-hidden="true">
                        {t.type === 'CREDIT' ? '+' : '-'}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{t.description}</p>
                        <p className="text-[10px] font-bold text-slate-400">{t.date}</p>
                      </div>
                   </div>
                   <span className={`text-sm font-black ${t.type === 'CREDIT' ? 'text-emerald-600' : 'text-slate-900'}`}>
                     {t.type === 'CREDIT' ? '+' : '-'}£{t.amount.toFixed(2)}
                   </span>
                </div>
              )) : (
                <p className="text-center text-slate-400 py-4 font-bold text-sm italic">No recent activity.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'TASKS' && (
        <div className="p-8 animate-in fade-in duration-500 space-y-10" role="tabpanel">
          <header className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">TASKS</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{bookings.length} Active Services</p>
          </header>

          <div className="space-y-6">
            {bookings.length > 0 ? bookings.map(b => (
              <Card key={b.id} className="p-6 shadow-xl border-l-8 border-indigo-600 animate-in slide-in-from-left-4">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Badge variant={b.status === 'IN_PROGRESS' ? 'success' : 'info'} className="mb-2">
                      {b.status.replace('_', ' ')}
                    </Badge>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{b.serviceName}</h3>
                    <p className="text-xs font-bold text-slate-400 mt-2">{b.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-indigo-600">£{b.totalPrice.toFixed(2)}</p>
                    <p className="text-[10px] font-bold text-slate-400"># {b.id}</p>
                  </div>
                </div>

                {b.status === 'IN_PROGRESS' && (
                  <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between mb-4 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src={b.providerAvatar} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase">Partner Arriving</p>
                        <p className="text-sm font-black text-slate-900 leading-none">{b.providerName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-emerald-600 uppercase">ETA</p>
                      <p className="text-lg font-black text-slate-900 leading-none">{b.eta}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                   <Button variant="outline" className="flex-1 py-2 text-[9px] uppercase font-black" size="sm">Get Help</Button>
                   <Button variant="primary" className="flex-1 py-2 text-[9px] uppercase font-black" size="sm">Job Details</Button>
                </div>
              </Card>
            )) : (
              <div className="text-center py-20 space-y-4">
                <p className="text-5xl opacity-20" aria-hidden="true">📋</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active tasks</p>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('DISCOVER')}>Book a service</Button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'PROFILE' && (
        <div className="p-8 animate-in fade-in duration-500 space-y-10" role="tabpanel">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-24 h-24 rounded-full border-4 border-indigo-600 p-1 shadow-lg">
              <img src="https://i.pravatar.cc/150?u=sarah" className="w-full h-full rounded-full" alt="Profile" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{user.name}</h2>
              <Badge variant="success">GOLD MEMBER</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <Card className="p-6 text-center space-y-1 border-none bg-indigo-50/50">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Value</p>
                <p className="text-2xl font-black text-indigo-600 leading-none">£1,420</p>
             </Card>
             <Card className="p-6 text-center space-y-1 border-none bg-indigo-50/50">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Completed</p>
                <p className="text-2xl font-black text-indigo-600 leading-none">42</p>
             </Card>
          </div>

          <div className="space-y-2">
            {[
              { l: 'My Residences', i: '🏠' },
              { l: 'Payment Methods', i: '💳' },
              { l: 'Notification Settings', i: '🔔' },
              { l: 'Support & FAQ', i: '💬' },
              { l: 'Invite Friends', i: '🎁' },
              { l: 'Partner Mode', i: '🔄' },
            ].map(item => (
              <button key={item.l} className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                 <div className="flex items-center gap-4">
                   <span className="text-xl" aria-hidden="true">{item.i}</span>
                   <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">{item.l}</span>
                 </div>
                 <span className="text-slate-300" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          
          <Button variant="outline" fullWidth className="text-rose-600 border-rose-100 hover:bg-rose-50 uppercase font-black text-xs tracking-[0.2em] h-14">Log Out</Button>
        </div>
      )}

      {/* Persistent Bottom Nav */}
      <nav 
        className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/95 backdrop-blur-2xl border-t-2 border-slate-100 px-10 py-6 flex justify-between items-center z-40 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)]"
        aria-label="Main navigation"
      >
        {[
          { label: 'DISCOVER', icon: '🌐', id: 'DISCOVER' },
          { label: 'WALLET', icon: '💳', id: 'WALLET' },
          { label: 'TASKS', icon: '📋', id: 'TASKS' },
          { label: 'PROFILE', icon: '👤', id: 'PROFILE' }
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={() => { setActiveTab(tab.id as CustomerTab); setStep('HOME'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`flex flex-col items-center gap-1.5 transition-all focus:outline-none ${activeTab === tab.id ? 'scale-110' : 'opacity-40 grayscale hover:opacity-100'}`}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            <span className="text-2xl" aria-hidden="true">{tab.icon}</span>
            <span className={`text-[9px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
      
      <AIConcierge />
    </div>
  );
};

// --- Sub-View: Provider App ---
const ProviderView: React.FC = () => {
  return (
    <div className="p-8 animate-in fade-in duration-500 space-y-10">
       <header className="flex justify-between items-start">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Partner Hub</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Live in West London</span>
            </div>
         </div>
         <div className="w-14 h-14 rounded-full border-4 border-indigo-600 p-0.5 shadow-lg">
           <img src="https://i.pravatar.cc/150?u=p1" className="w-full h-full rounded-full" alt="Partner Profile" />
         </div>
       </header>

       <div className="grid grid-cols-2 gap-4">
         <Card className="p-6 bg-slate-950 text-white border-none space-y-1">
           <p className="text-[10px] font-black opacity-50 uppercase tracking-widest">Earnings/Day</p>
           <h3 className="text-3xl font-black tracking-tighter">£242.00</h3>
         </Card>
         <Card className="p-6 space-y-1 border-none bg-indigo-50">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Rating</p>
           <h3 className="text-3xl font-black text-indigo-600 tracking-tighter">4.98 ★</h3>
         </Card>
       </div>

       <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter">New Offers</h2>
            <Badge variant="success">3 NEW</Badge>
          </div>
          <Card className="p-6 border-l-8 border-indigo-600 space-y-4 shadow-xl">
             <div className="flex justify-between items-start">
               <div>
                 <Badge variant="info" className="mb-2">CONCIERGE</Badge>
                 <h4 className="font-black text-xl text-slate-900 tracking-tight leading-none">Shopping Pickup</h4>
                 <p className="text-xs font-bold text-slate-400 mt-2">High St Kensington • 0.8 mi</p>
               </div>
               <span className="text-xl font-black text-indigo-600">£22/h</span>
             </div>
             <div className="flex gap-2 pt-2">
               <Button className="flex-1 py-3" variant="outline" size="sm">Ignore</Button>
               <Button className="flex-1 py-3" size="sm">Accept Job</Button>
             </div>
          </Card>
       </div>

       <div className="space-y-4">
         <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Today's Schedule</h2>
         <div className="space-y-3">
            {[
              { t: '14:00', j: 'House Cleaning', a: 'SW1 2X, Sloane St' },
              { t: '17:30', j: 'Laundry Pickup', a: 'W11 4E, Notting Hill' },
            ].map(item => (
              <div key={item.t} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                 <span className="text-sm font-black text-indigo-600 w-12">{item.t}</span>
                 <div className="h-8 w-px bg-slate-100"></div>
                 <div>
                   <p className="text-sm font-black text-slate-800 uppercase leading-none">{item.j}</p>
                   <p className="text-[10px] font-bold text-slate-400 mt-1">{item.a}</p>
                 </div>
              </div>
            ))}
         </div>
       </div>
    </div>
  );
};

// --- Sub-View: Admin Dashboard ---
const AdminView: React.FC = () => {
  return (
    <div className="p-10 space-y-12 bg-slate-50 min-h-screen">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Global Control</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Ecosystem Monitoring: London Core</p>
        </div>
        <div className="flex gap-4">
           <Card className="px-6 py-3 border-none shadow-sm flex items-center gap-4 bg-white">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-black text-slate-700 uppercase tracking-tighter">System Health: 100%</span>
           </Card>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-8">
        {[
          { l: 'Daily Revenue', v: '£1.2M', t: '+42%', c: 'text-indigo-600' },
          { l: 'Escrow Float', v: '£450k', t: '+12%', c: 'text-slate-800' },
          { l: 'LTV Rate', v: '88%', t: '+5%', c: 'text-emerald-600' },
          { l: 'Node Latency', v: '45ms', t: '-2ms', c: 'text-emerald-600' },
        ].map(s => (
          <Card key={s.l} className="p-8 border-none shadow-sm hover:shadow-xl transition-all cursor-default">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.l}</p>
            <div className="flex justify-between items-end mt-4">
              <h3 className={`text-4xl font-black tracking-tighter leading-none ${s.c}`}>{s.v}</h3>
              <span className="text-xs font-bold text-emerald-600">{s.t}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        <Card className="col-span-2 p-8 border-none shadow-sm space-y-8 bg-white">
           <div className="flex justify-between items-center">
             <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Live Transaction Log</h2>
             <button className="text-[10px] font-black text-indigo-600 uppercase border-b-2 border-indigo-600 pb-0.5 hover:text-indigo-800 transition-colors">Export Ledger</button>
           </div>
           <div className="space-y-4">
              {[
                { u: 'Sarah L.', s: 'Cleaning', a: '£18.00', st: 'ESCROWED' },
                { u: 'James W.', s: 'Boiler Check', a: '£85.00', st: 'PAID' },
                { u: 'Emma R.', s: 'Nail Art', a: '£45.00', st: 'SETTLED' },
                { u: 'Oliver T.', s: 'Dog Walk', a: '£22.50', st: 'HOLD' },
              ].map((tx, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-black text-indigo-600 text-lg shadow-inner">{tx.u[0]}</div>
                      <div>
                        <p className="text-sm font-black text-slate-900 leading-none">{tx.u}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{tx.s}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-black text-slate-900">£{tx.a}</p>
                      <span className="text-[10px] font-black text-emerald-600 tracking-widest">{tx.st}</span>
                   </div>
                </div>
              ))}
           </div>
        </Card>
        
        <div className="space-y-8">
          <Card className="p-8 border-none shadow-sm space-y-6 bg-white">
             <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Ops Monitor</h2>
             <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-xl flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                   <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Gateway: Online</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                   <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Maps API: Healthy</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                   <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Vetting: 12 Queue</p>
                </div>
             </div>
          </Card>
          <Button fullWidth className="h-20 text-xs font-black uppercase tracking-[0.2em] shadow-2xl bg-slate-900">Open Systems Console</Button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Entry ---
const App: React.FC = () => {
  const [view, setView] = useState<AppView>('USER');

  // Handle mobile view orientation and scaling
  useEffect(() => {
    const setAppHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setAppHeight);
    setAppHeight();
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-700 ${view === 'ADMIN' ? 'bg-slate-100' : 'mobile-container'}`}>
      {/* Simulation Switcher - High Contrast HUD */}
      <div className="sticky top-0 z-[100] bg-slate-900 p-3 flex justify-center gap-8 shadow-2xl border-b border-white/10">
        {['USER', 'PROVIDER', 'ADMIN'].map((v) => (
          <button 
            key={v}
            onClick={() => setView(v as AppView)}
            className={`px-5 py-2 text-[9px] font-black rounded-full transition-all tracking-[0.2em] uppercase focus:outline-none ${view === v ? 'bg-white text-slate-950 scale-110 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            aria-pressed={view === v}
          >
            {v} Mode
          </button>
        ))}
      </div>

      <main className="relative" role="main">
        {view === 'USER' && <CustomerView />}
        {view === 'PROVIDER' && <ProviderView />}
        {view === 'ADMIN' && <AdminView />}
      </main>
    </div>
  );
};

export default App;