/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Bell, 
  Settings, 
  Search, 
  UserPlus, 
  FileEdit, 
  History, 
  ArrowRight, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2,
  ChevronRight,
  Plus,
  Save,
  Check,
  FileText,
  Clock,
  Paperclip,
  X,
  Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-low flex flex-col py-8 px-4 z-50">
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
          <FileText className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-primary tracking-tight">Clinical Atelier</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Therapeutic Center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group",
              activeTab === item.id 
                ? "text-primary font-bold bg-white/50 after:content-[''] after:absolute after:right-0 after:h-6 after:w-1 after:bg-primary after:rounded-l-full" 
                : "text-on-surface-variant font-medium hover:bg-white/30"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-primary" : "text-on-surface-variant")} />
            <span className="text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-surface-container-lowest rounded-xl flex items-center gap-3 shadow-sm">
        <img 
          className="w-10 h-10 rounded-full object-cover" 
          src="https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=100" 
          alt="Dr. Elena Rostova"
          referrerPolicy="no-referrer"
        />
        <div className="overflow-hidden">
          <p className="text-xs font-bold truncate">Dr. Elena Rostova</p>
          <p className="text-[10px] text-on-surface-variant">Clinical Director</p>
        </div>
      </div>
    </aside>
  );
};

const TopBar = ({ title }: { title: string }) => {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-surface/80 backdrop-blur-md z-40 flex items-center justify-between px-8">
      <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-96 border border-outline-variant/20">
        <Search className="text-on-surface-variant w-4 h-4" />
        <input 
          className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 placeholder:text-on-surface-variant/60" 
          placeholder="Search patients, records or dates..." 
          type="text"
        />
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-on-surface-variant hover:text-primary transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-primary">Elena Rostova</span>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
             <Users className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

const Dashboard = ({ onNewEvolution }: { onNewEvolution: () => void }) => {
  return (
    <div className="space-y-10">
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Panel del Profesional</h2>
          <p className="text-on-surface-variant mt-1">Bienvenida de nuevo, Elena. Tienes 6 pacientes programados para hoy.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-low text-primary font-semibold rounded-lg hover:bg-outline-variant/20 transition-all">
            <UserPlus className="w-4 h-4" />
            <span className="text-sm">Nuevo Paciente</span>
          </button>
          <button 
            onClick={onNewEvolution}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/10"
          >
            <FileEdit className="w-4 h-4" />
            <span className="text-sm">Registrar Evolución</span>
          </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6">
        {/* Today's Schedule */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-primary">Pacientes de Hoy</h3>
            <span className="text-xs font-bold px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full uppercase tracking-wider">Martes, 24 Oct</span>
          </div>
          <div className="space-y-1">
            {[
              { time: '09:00', name: 'Mateo Rodriguez', type: 'Terapia Cognitiva', room: 'SALA 04', initial: 'MR', color: 'bg-primary/10' },
              { time: '10:30', name: 'Sofía Mendez', type: 'Evaluación Inicial', room: 'SALA 02', active: true, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100' },
              { time: '12:00', name: 'Julian Alcaraz', type: 'Seguimiento Post-operatorio', room: 'SALA 01', initial: 'JA', color: 'bg-secondary-container' },
            ].map((patient, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "grid grid-cols-12 items-center p-4 rounded-xl transition-all group",
                  patient.active ? "bg-primary/5 border-l-4 border-primary" : "hover:bg-surface-container-low"
                )}
              >
                <div className={cn("col-span-1 text-xs font-bold", patient.active ? "text-primary" : "text-on-surface-variant/50")}>
                  {patient.time}
                </div>
                <div className="col-span-5 flex items-center gap-4">
                  {patient.img ? (
                    <img className="w-10 h-10 rounded-full object-cover" src={patient.img} alt={patient.name} referrerPolicy="no-referrer" />
                  ) : (
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold", patient.color)}>
                      {patient.initial}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-sm">{patient.name}</p>
                    <p className="text-xs text-on-surface-variant">{patient.type}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit",
                    patient.active ? "bg-error-container text-error" : "bg-tertiary-fixed text-on-tertiary-fixed"
                  )}>
                    {patient.active && <Clock className="w-3 h-3" />}
                    {patient.active ? "EN CURSO" : patient.room}
                  </span>
                </div>
                <div className="col-span-3 flex justify-end gap-2">
                  {patient.active ? (
                    <button className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all">Ver Ficha</button>
                  ) : (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white rounded-lg text-primary"><History className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-white rounded-lg text-primary"><ArrowRight className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant/20 flex justify-between items-center">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <img 
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-surface object-cover" 
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="patient"
                  referrerPolicy="no-referrer"
                />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-low flex items-center justify-center text-[10px] font-bold text-on-surface-variant">+3</div>
            </div>
            <button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
              Ver agenda completa <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Alerts & Status */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10 shadow-sm flex-1">
            <div className="flex items-center gap-2 mb-6 text-error">
              <AlertTriangle className="w-5 h-5 fill-error/20" />
              <h3 className="text-lg font-bold">Alertas Pendientes</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-error-container/20 rounded-xl border border-error-container/30">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-error uppercase tracking-wider">Vencimiento</span>
                  <span className="text-[10px] font-medium text-on-surface-variant">Hace 2h</span>
                </div>
                <p className="text-sm font-bold">Certificado Discapacidad</p>
                <p className="text-xs text-on-surface-variant mb-3">Paciente: Elena Torres</p>
                <button className="w-full py-2 bg-white text-error text-xs font-bold rounded-lg border border-error/20 hover:bg-error/5 transition-colors">Notificar Familia</button>
              </div>
              <div className="p-4 bg-tertiary-fixed/20 rounded-xl border border-tertiary-fixed/30">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-on-tertiary-fixed uppercase tracking-wider">Autorización</span>
                  <span className="text-[10px] font-medium text-on-surface-variant">En 3 días</span>
                </div>
                <p className="text-sm font-bold">Renovación de Sesiones</p>
                <p className="text-xs text-on-surface-variant">Paciente: Juan Carlos Paz</p>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-2xl p-6 text-white relative overflow-hidden shadow-xl shadow-primary/20">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-70">Estado del Centro</h4>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-extrabold">84%</span>
                <TrendingUp className="text-green-300 w-6 h-6 mb-1" />
              </div>
              <p className="text-xs opacity-70">Ocupación de salas hoy</p>
              <div className="mt-6 flex gap-3">
                <div className="flex-1 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                  <p className="text-[10px] opacity-60 uppercase font-bold">Consultas</p>
                  <p className="text-xl font-bold">24</p>
                </div>
                <div className="flex-1 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                  <p className="text-[10px] opacity-60 uppercase font-bold">Canceladas</p>
                  <p className="text-xl font-bold">2</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between shadow-sm border border-outline-variant/10">
          <div>
            <CheckCircle2 className="text-primary w-8 h-8 mb-4" />
            <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Evoluciones</h4>
            <p className="text-4xl font-extrabold text-primary">12 / 18</p>
            <p className="text-xs text-on-surface-variant mt-2">Registradas esta semana</p>
          </div>
          <div className="mt-8 h-1.5 w-full bg-outline-variant/30 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '66%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-primary">Resumen de Actividad Mensual</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-[10px] font-bold text-primary">
                <span className="w-2 h-2 rounded-full bg-primary"></span> SESIONES
              </span>
              <span className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/40">
                <span className="w-2 h-2 rounded-full bg-outline-variant"></span> ALTAS
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between h-32 gap-4 px-2">
            {[60, 80, 95, 70, 55, 85, 40].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={cn(
                  "flex-1 rounded-t-lg transition-all cursor-pointer relative group",
                  i === 2 ? "bg-primary" : "bg-primary/20 hover:bg-primary/30"
                )}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {h + 50} sesiones
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest px-2">
            <span>Sem 1</span>
            <span>Sem 2</span>
            <span>Sem 3</span>
            <span>Sem 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClinicalNote = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <nav className="flex items-center gap-2 text-xs font-medium text-on-surface-variant/60">
        <button onClick={onBack} className="hover:text-primary">Patients</button>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-primary cursor-pointer">Julianne V. Smith</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-primary font-bold">New Clinical Evolution</span>
      </nav>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary">Clinical Evolution Note</h2>
          <p className="text-on-surface-variant mt-1">Document the therapeutic progress and key observations for the current session.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-outline-variant text-primary font-bold rounded-lg hover:bg-surface-container-low transition-all">Save as Draft</button>
          <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/10">Complete Registration</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm flex items-center gap-4">
            <img 
              className="w-16 h-16 rounded-xl object-cover border-2 border-primary/10" 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" 
              alt="Julianne V. Smith"
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="font-bold text-lg">Julianne V. Smith</h4>
              <p className="text-xs text-on-surface-variant font-medium">ID: 492-001-A2</p>
              <div className="mt-2 space-y-1">
                <p className="text-[10px] text-on-surface-variant/60 uppercase font-bold">Diagnosis</p>
                <p className="text-xs font-semibold">Generalized Anxiety (F41.1)</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Session Type</label>
              <select className="w-full bg-white border-none rounded-lg py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20">
                <option>Therapeutic Individual</option>
                <option>Group Therapy</option>
                <option>Family Counseling</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Lead Professional</label>
              <div className="bg-white rounded-lg py-3 px-4 flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Dr. Elena Rostova
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Duration</label>
                <div className="bg-white rounded-lg py-3 text-center text-sm font-bold text-primary">50 min</div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Timezone</label>
                <div className="bg-surface-container-highest/50 rounded-lg py-3 text-center text-sm font-medium text-on-surface-variant/40">GMT-3</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="font-bold text-primary">Therapeutic Narrative</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded">AUTO-SAVING</span>
                <span className="text-[10px] text-on-surface-variant/40">Last saved 3m ago</span>
              </div>
            </div>
            <textarea 
              className="flex-1 p-8 text-sm leading-relaxed border-none focus:ring-0 placeholder:text-on-surface-variant/30 italic"
              placeholder="Start typing the clinical evolution here... Use a narrative style to describe the patient's state, response to interventions, and future plan."
            />
            <div className="p-4 bg-surface-container-low flex justify-end gap-2">
              <button className="p-2 hover:bg-white rounded-lg text-on-surface-variant/40"><History className="w-4 h-4" /></button>
              <button className="p-2 hover:bg-white rounded-lg text-on-surface-variant/40"><Mic className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Supporting Documents & Assets</h4>
            <div className="grid grid-cols-2 gap-4">
              <button className="border-2 border-dashed border-outline-variant/40 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-surface-container-low transition-all group">
                <Plus className="w-6 h-6 text-on-surface-variant/40 group-hover:text-primary" />
                <span className="text-xs font-bold text-on-surface-variant/60 group-hover:text-primary">Add clinical files</span>
              </button>
              <div className="bg-surface-container-low rounded-2xl p-4 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-error-container/40 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-error" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Anxiety_Score_Oct.pdf</p>
                    <p className="text-[10px] text-on-surface-variant/40">1.2 MB</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-white rounded-full text-on-surface-variant/40 opacity-0 group-hover:opacity-100 transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [view, setView] = useState<'dashboard' | 'evolution'>('dashboard');

  return (
    <div className="min-h-screen flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 ml-64">
        <TopBar title={activeTab} />
        
        <main className="mt-16 p-8 w-full max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {view === 'dashboard' ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Dashboard onNewEvolution={() => setView('evolution')} />
              </motion.div>
            ) : (
              <motion.div
                key="evolution"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ClinicalNote onBack={() => setView('dashboard')} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action Button for Mobile (Simplified) */}
      <button className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}