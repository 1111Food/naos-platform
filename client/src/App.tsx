import { useState, useEffect } from 'react';
import { ArrowLeft, LogOut, MapPin } from 'lucide-react';
import { ChatInterface } from './components/ChatInterface';
import { LandingScreen } from './components/LandingScreen';
import { WelcomeBackView } from './pages/WelcomeBackView';
import { OnboardingForm } from './components/OnboardingForm';
import { Home } from './pages/Home';
import { SacredDock } from './components/SacredDock';
import { EvolutionView } from './pages/EvolutionView';
import { ManualsView } from './pages/ManualsView';
import { OracleSoulsView } from './pages/OracleSoulsView';
import { PWAInstallButton } from './components/PWAInstallButton';
import { EtherBackground } from './components/EtherBackground';
import { IdentityAltar } from './components/IdentityAltar';
import { Guardian } from './components/Guardian';
import { GuardianProvider } from './contexts/GuardianContext';

import { StatusBadge } from './components/StatusBadge';
import { DevPlanToggle } from './components/DevPlanToggle';
import { NaosVibrationEngine } from './components/NaosVibrationEngine';
import { AtmosphereEngine } from './components/AtmosphereEngine';
import { useEnergy } from './hooks/useEnergy';
import { useProfile } from './hooks/useProfile';
import { useAuth } from './contexts/AuthContext';
import { useSubscription } from './hooks/useSubscription';
import { LoginView } from './components/LoginView';
import { Sanctuary } from './pages/Sanctuary';
import { AnimatePresence } from 'framer-motion';
import { TempleLoading } from './components/TempleLoading';

import { RankingView } from './pages/RankingView';
import { Protocol21 } from './pages/Protocol21';
import { ElementalLaboratoryView } from './pages/ElementalLaboratoryView';
import { Tarot } from './pages/Tarot';
import { IdentityNexus } from './pages/IdentityNexus';
import { DecisionEngine } from './pages/DecisionEngine';
import { MissionYear } from './pages/MissionYear';
import { WisdomProvider, useWisdom } from './contexts/WisdomContext';
import { WisdomOverlay } from './components/WisdomOverlay';

// Global Wisdom Wrapper to access context safely
const WisdomManager = () => {
  const { wisdom, closeWisdom } = useWisdom();
  return (
    <WisdomOverlay
      isOpen={wisdom.isOpen}
      onClose={closeWisdom}
      title={wisdom.title}
      description={wisdom.description}
      accentColor={wisdom.accentColor}
    />
  );
};

// --- TYPES (v9.12) ---
type ViewState = 'LANDING' | 'ONBOARDING' | 'TEMPLE' | 'SYNASTRY' | 'CHAT' | 'LOGIN' | 'SANCTUARY' | 'WELCOME_BACK' | 'RANKING' | 'PROFILE' | 'EVOLUTION' | 'MANUALS' | 'TAROT' | 'PROTOCOL21' | 'ELEMENTAL_LAB' | 'ASTRO' | 'NUMERO' | 'FENGSHUI' | 'MAYA' | 'TRANSITS' | 'ORIENTAL' | 'INTENTION' | 'ENERGY_CODE' | 'ORACLE_SOULS' | 'IDENTITY_NEXUS' | 'DECISION_ENGINE' | 'MISSION_YEAR';



function App() {
  const { energy } = useEnergy();
  const { user, signOut } = useAuth();
  const { profile, appReady: profileReady, refreshProfile } = useProfile();
  const { status, upgrade } = useSubscription();

  const [activeView, setActiveView] = useState<ViewState>('LANDING');
  const [activeRitual, setActiveRitual] = useState<{ type: 'BREATH' | 'MEDITATION', techId: string } | undefined>(undefined);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState<{ id: string, nickname: string } | null>(null);
  const [storageReady, setStorageReady] = useState(false);
  const [headerOpacity] = useState(1);

  // 1. INITIALIZATION & PERSISTENCE CHECK
  useEffect(() => {
    const init = async () => {
      // Check Local Persistence first
      const savedUser = localStorage.getItem('naos_active_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed && parsed.nickname) {
            console.log("🏺 Memoria del Templo encontrada:", parsed.nickname);
            setWelcomeUser(parsed);
            setActiveView('WELCOME_BACK');
            setStorageReady(true);
            return;
          }
        } catch (e) {
          console.warn("Storage corrupted, clearing.");
          localStorage.removeItem('naos_active_user');
        }
      }
      setStorageReady(true);
    };
    init();
  }, []);

  const isAppFullyReady = storageReady && profileReady;

  // 2. SYNC VIEW WITH AUTH
  useEffect(() => {
    if (!isAppFullyReady) return;
    if (activeView === 'WELCOME_BACK' || activeView === 'LANDING') return;

    if (user && activeView === 'LOGIN') {
      setActiveView('TEMPLE');
    }
  }, [user, isAppFullyReady, activeView]);

  // 3. SOFT GUARD: Profile Completion
  useEffect(() => {
    if (!isAppFullyReady) return;

    // Conditions: Authenticated, but missing vital data
    const isProfileIncomplete = user && profile && (!profile.name || !profile.birthDate);

    if (isProfileIncomplete && !['ONBOARDING', 'LOGIN', 'LANDING'].includes(activeView)) {
      console.log("🛡️ App Guard: Profile incomplete. Redirecting to Onboarding.");
      setActiveView('ONBOARDING');
    }
  }, [user, profile, isAppFullyReady, activeView]);


  // --- HANDLERS ---

  const handleWelcomeContinue = async () => {
    if (!welcomeUser) return;
    console.log("🔓 Abriendo Templo para:", welcomeUser.nickname);
    // Force profile refresh to ensure context is hot (even if session existed)
    await refreshProfile();
    setActiveView('TEMPLE');
  };

  const handleWelcomeReset = async () => {
    console.log("🧹 Olvidando viajero...");
    localStorage.removeItem('naos_active_user');
    setWelcomeUser(null);
    await signOut();
    setActiveView('LOGIN');
  };

  const handleLogout = async () => {
    try {
      console.log("🔓 App: Abandonando el Templo...");
      await signOut();
      if (welcomeUser) {
        setActiveView('WELCOME_BACK');
      } else {
        setActiveView('LANDING'); // Or Login?
      }
      setShowAuthOverlay(false);
    } catch (e) {
      console.error("Error signing out", e);
    }
  };

  const handleOnboardingComplete = (data: any) => {
    console.log(`App: Ritual Completed for ${data.name}. Entering Temple.`);
    refreshProfile();
    setActiveView('TEMPLE');
  };

  const handleLoginSuccess = (targetView: ViewState) => {
    console.log(`App: Login success. Traversing to ${targetView}`);
    if (targetView === 'TEMPLE' || targetView === 'DASHBOARD' as any) {
      refreshProfile();
    }
    setActiveView(targetView === 'DASHBOARD' as any ? 'TEMPLE' : targetView);
    setShowAuthOverlay(false);
  };

  const navigateWithRitual = (view: ViewState, ritual?: { type: 'BREATH' | 'MEDITATION', techId: string }) => {
    setActiveRitual(ritual);
    setActiveView(view);
  };


  // --- RENDER CONTENT ---
  const renderContent = () => {
    // Loading State (Global SSoT)
    if (!isAppFullyReady) {
      return <TempleLoading variant="fullscreen" />;
    }

    if (activeView === 'WELCOME_BACK' && welcomeUser) {
      return (
        <WelcomeBackView
          nickname={welcomeUser.nickname}
          onContinue={handleWelcomeContinue}
          onReset={handleWelcomeReset}
        />
      );
    }

    // View Routing
    switch (activeView) {
      case 'LANDING':
        return (
          <div className="relative w-full h-full">
            <LandingScreen
              onEnter={() => setShowAuthOverlay(true)}
              availableProfiles={[]}
              onSelectProfile={() => setShowAuthOverlay(true)}
              onTemporaryAccess={() => setShowAuthOverlay(true)}
              subscriptionStatus={status}
            />
            {showAuthOverlay && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
                <div className="relative w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <LoginView onCancel={() => setShowAuthOverlay(false)} onSuccess={handleLoginSuccess} />
                </div>
              </div>
            )}
          </div>
        );
      case 'LOGIN':
        return <LoginView onSuccess={handleLoginSuccess} />;
      case 'ONBOARDING':
        return <OnboardingForm onComplete={handleOnboardingComplete} />;
      case 'TEMPLE':
        return <Home onSelectFeature={navigateWithRitual} />;

      case 'RANKING':
        return <RankingView onBack={() => setActiveView('TEMPLE')} onNavigate={setActiveView} />;

      case 'TAROT':
        return <Tarot onBack={() => setActiveView('TEMPLE')} />;
      case 'CHAT':
        return <ChatInterface />;
      case 'SANCTUARY':
        return <Sanctuary onBack={() => setActiveView('TEMPLE')} initialRitual={activeRitual} />;
      case 'PROFILE':
        return <IdentityAltar profile={profile} onEdit={() => setActiveView('ONBOARDING')} />;
      case 'IDENTITY_NEXUS':
        return <IdentityNexus onNavigate={setActiveView} onBack={() => setActiveView('TEMPLE')} />;
      case 'DECISION_ENGINE':
        return <DecisionEngine onBack={() => setActiveView('TEMPLE')} />;
      case 'MISSION_YEAR':
        return <MissionYear onBack={() => setActiveView('TEMPLE')} />;
      case 'PROTOCOL21':
        return <Protocol21 onBack={() => setActiveView('TEMPLE')} />;
      case 'ELEMENTAL_LAB':
        return <ElementalLaboratoryView onBack={() => setActiveView('TEMPLE')} onNavigate={navigateWithRitual} />;
      case 'EVOLUTION':
        return <EvolutionView onBack={() => setActiveView('TEMPLE')} />;
      case 'MANUALS':
        return <ManualsView onBack={() => setActiveView('TEMPLE')} />;
      case 'ORACLE_SOULS':
        return <OracleSoulsView onBack={() => setActiveView('TEMPLE')} onNavigate={setActiveView} />;
      case 'SYNASTRY':
        return <OracleSoulsView onBack={() => setActiveView('TEMPLE')} onNavigate={setActiveView} />;
      default:
        return <Home onSelectFeature={(feat) => setActiveView(feat as ViewState)} activeFeature={activeView} />;
    }
  };

  // --- MAIN LAYOUT ---
  return (
    <GuardianProvider>
      <WisdomProvider>
        <div className="min-h-screen text-foreground font-sans selection:bg-primary/30 overflow-x-hidden relative">
          <AtmosphereEngine />
          <EtherBackground />
          <NaosVibrationEngine />
          <Guardian view={activeView} onOpenChat={() => setActiveView('CHAT')} />
          <DevPlanToggle />

          <div className="relative z-10 min-h-screen flex flex-col animate-in fade-in duration-1000">
            {/* ... header and main content ... */}
            {/* Adding WisdomManager here at the end of the root layout */}
            <WisdomManager />

            {/* HEADER (Conditional) */}
            {activeView !== 'LANDING' && activeView !== 'WELCOME_BACK' && (
              <header
                className="fixed top-0 left-0 right-0 pt-[calc(1.5rem+env(safe-area-inset-top))] px-6 pb-6 flex justify-between items-center w-full z-50 pointer-events-none transition-opacity duration-300 pointer-events-auto"
                style={{ opacity: headerOpacity }}
              >
                <div className="flex items-center gap-4">
                  {activeView !== 'TEMPLE' ? (
                    <button
                      onClick={() => setActiveView('TEMPLE')}
                      className="p-2 text-white/40 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  )}
                  <img
                    src="/logo-naos.png?v=2"
                    alt="NAOS"
                    className="h-8 w-auto opacity-90 select-none pointer-events-none"
                  />
                </div>

                {/* USER PROFILE BUTTON (Added to replace Corner Robot) */}
                <button
                  onClick={() => setActiveView('ONBOARDING')}
                  className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                  title="Perfil de Arquitecto"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {profile?.name?.charAt(0) || 'U'}
                  </div>
                </button>



                <div className="flex items-center gap-6">
                  <StatusBadge plan={status?.plan || 'FREE'} className="hidden md:flex" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">Fase Lunar</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Luna Creciente 🌙</span>
                  </div>
                  <PWAInstallButton />
                  {status?.plan === 'FREE' && (
                    <button onClick={() => upgrade()} className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500/60 hover:text-amber-500 transition-colors">
                      Ascender
                    </button>
                  )}

                  {/* LOGOUT BUTTON */}
                  <button
                    onClick={handleLogout}
                    className="p-2 ml-2 rounded-full bg-white/5 border border-white/10 text-white/30 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all group"
                    title="Cerrar Sesión"
                  >
                    <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </header>
            )}

            {/* MAIN CONTENT WRAPPER */}
            <main className={`flex-1 w-full max-w-6xl mx-auto ${activeView !== 'WELCOME_BACK' ? 'p-4 md:p-10 md:pl-32 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-10 pt-24' : ''}`}>

              {activeView === 'WELCOME_BACK' ? (
                // Full screen for Welcome
                <AnimatePresence mode="wait">
                  {renderContent()}
                </AnimatePresence>
              ) : (
                renderContent()
              )}

            </main>

            {/* DOCK */}
            {activeView !== 'LANDING' && activeView !== 'LOGIN' && activeView !== 'WELCOME_BACK' && (
              <SacredDock activeView={activeView} onNavigate={setActiveView} onLogout={handleLogout} />
            )}

            {/* FOOTER */}
            {activeView !== 'LANDING' && activeView !== 'ONBOARDING' && activeView !== 'CHAT' && activeView !== 'WELCOME_BACK' && (
              <footer className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-40 pointer-events-none md:pl-40">
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 pointer-events-auto bg-black/20 md:bg-transparent backdrop-blur-md md:backdrop-blur-none py-2 px-6 rounded-full border border-white/5 md:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-500/80 font-medium">
                      {profile?.astrology?.planets?.find((p: any) => p.name === 'Sun')?.sign || 'Viajero'}
                    </span>
                    <div className="w-px h-2 bg-white/10" />
                    <span className="text-blue-400/80 font-bold">
                      Elemento: Agua
                    </span>
                  </div>
                  <div className="hidden md:block w-px h-3 bg-white/10" />
                  <div className="flex items-center gap-2 max-w-[200px] md:max-w-md">
                    <span className="text-emerald-400/70 flex-shrink-0">Feng Shui:</span>
                    <span className="italic truncate opacity-90" title={energy?.guidance}>
                      {energy?.guidance || 'Armonizando tu templo personal...'}
                    </span>
                  </div>
                  <div className="hidden md:block w-px h-3 bg-white/10" />
                  <div className="flex items-center gap-2 opacity-60">
                    <MapPin className="w-2.5 h-2.5 text-rose-400/50" />
                    <span>Guatemala, GT</span>
                  </div>
                </div>
              </footer>
            )}

            {/* NOTIFICACIONES */}


          </div>
        </div>
      </WisdomProvider>
    </GuardianProvider>
  );
}

export default App;
