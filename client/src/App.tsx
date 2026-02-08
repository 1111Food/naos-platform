import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ChatInterface } from './components/ChatInterface';
import { LandingScreen } from './components/LandingScreen';
import { OnboardingForm } from './components/OnboardingForm';
import { Home } from './pages/Home';
import { Tarot } from './pages/Tarot';
import { AstrologyView } from './components/AstrologyView';
import { NumerologyView } from './components/NumerologyView';
import { FengShuiView } from './components/FengShuiView';
import { SynastryModule } from './components/SynastryModule';
import { SacredDock } from './components/SacredDock';
import { NawalView } from './components/NawalView';
import { EnergiaDelDia } from './pages/EnergiaDelDia';
import { SigilWidget } from './components/SigilWidget';
import { SabiduriaOriental } from './components/SabiduriaOriental';
import { PWAInstallButton } from './components/PWAInstallButton';
import { EtherBackground } from './components/EtherBackground';
import { Guardian } from './components/Guardian';
import { GuardianProvider } from './contexts/GuardianContext';

import { useEnergy } from './hooks/useEnergy';
import { useProfile } from './hooks/useProfile';
import { useSubscription } from './hooks/useSubscription';

type ViewState = 'LANDING' | 'ONBOARDING' | 'TEMPLE' | 'ASTRO' | 'NUMERO' | 'TAROT' | 'FENGSHUI' | 'CHAT' | 'SYNASTRY' | 'MAYA' | 'TRANSITS' | 'ORIENTAL';

function App() {
  const { energy } = useEnergy();
  const { profile, updateProfile } = useProfile();
  const { status, upgrade } = useSubscription();

  const [activeView, setActiveView] = useState<ViewState>('LANDING');
  const [sigilNotification, setSigilNotification] = useState<string | null>(null);
  const [headerOpacity, setHeaderOpacity] = useState(1);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    console.log("App: Root component mounted. ActiveView:", activeView);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 150);
      setHeaderOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (profile) {
      console.log("App: Profile update detected:", profile.name, "| Has Astro:", !!profile.astrology);
    }
  }, [profile]);

  const handleOnboardingComplete = async (data: any) => {
    console.log("App: Ritual Initiated. Data Received:", data.name);
    try {
      setSigilNotification(`Iniciando ritual para ${data.name}...`);
      await updateProfile(data);
      console.log("App: Profile update finished. Navigating to Temple.");
      setActiveView('TEMPLE');

      setSigilNotification(`¡Saludos, ${data.name}! He guardado tu esencia en el cosmos. Tu Pináculo Cotidiano y tu Carta Astral están listos.`);
      setTimeout(() => setSigilNotification(null), 10000);
    } catch (e) {
      console.error("Ritual profile update failed", e);
      setSigilNotification("Hubo un error guardando tus datos. Revisa la conexión.");
      setActiveView('TEMPLE');
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'LANDING':
        return <LandingScreen onEnter={() => setActiveView('ONBOARDING')} />;
      case 'ONBOARDING':
        return <OnboardingForm onComplete={handleOnboardingComplete} />;
      case 'TEMPLE':
        return <Home onSelectFeature={setActiveView} activeFeature={activeView} />;
      case 'ASTRO':
        return <AstrologyView data={profile?.astrology} profile={profile} />;
      case 'NUMERO':
        return <NumerologyView data={profile?.numerology} />;
      case 'TAROT':
        return <Tarot onBack={() => setActiveView('TEMPLE')} />;
      case 'FENGSHUI':
        return <FengShuiView data={profile?.fengShui} />;
      case 'MAYA':
        return <NawalView onBack={() => setActiveView('TEMPLE')} />;
      case 'SYNASTRY':
        return <SynastryModule />;
      case 'CHAT':
        return <ChatInterface />;
      case 'TRANSITS':
        return <EnergiaDelDia onOpenRitual={() => setActiveView('ONBOARDING')} />;
      case 'ORIENTAL':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-12">
            <SabiduriaOriental profile={profile} />
          </div>
        );
      default:
        return <Home onSelectFeature={setActiveView} activeFeature={activeView} />;
    }
  };

  return (
    <GuardianProvider>
      <div className="min-h-screen text-foreground font-sans selection:bg-primary/30 overflow-x-hidden relative">
        <EtherBackground />
        <Guardian view={activeView} />

        <div className="relative z-10 min-h-screen flex flex-col animate-in fade-in duration-1000">

          {activeView !== 'LANDING' && activeView !== 'ONBOARDING' && (
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
                <h1 className="text-xl font-serif font-light tracking-[0.2em] text-white/80 select-none">NAOS</h1>
              </div>

              <div className="hidden lg:flex items-center gap-8 ml-12">
                <button onClick={() => setActiveView('ASTRO')} className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white/80 transition-all font-light">Carta Astral</button>
                <button onClick={() => setActiveView('NUMERO')} className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white/80 transition-all font-light">Pináculo</button>
                <button onClick={() => setActiveView('MAYA')} className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white/80 transition-all font-light">Nahual Maya</button>
              </div>

              <div className="flex items-center gap-6">
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
              </div>
            </header>
          )}

          <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-10 md:pl-32 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-10 pt-24">
            {renderContent()}
          </main>

          {activeView !== 'LANDING' && activeView !== 'ONBOARDING' && (
            <SacredDock activeView={activeView} onNavigate={setActiveView} />
          )}

          {activeView !== 'LANDING' && activeView !== 'ONBOARDING' && activeView !== 'CHAT' && energy && (
            <footer className="p-8 mt-auto text-center border-t border-white/5">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
                  Tránsito: {energy.transitScore}/10
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Elemento: {energy.dominantElement}
                </div>
                {profile?.birthCity && (
                  <div className="hidden md:block">
                    Ubicación: {profile.birthCity}, {profile.birthCountry}
                  </div>
                )}
              </div>
            </footer>
          )}
          {activeView !== 'CHAT' && (
            <SigilWidget onNavigate={setActiveView} externalMessage={sigilNotification} />
          )}
        </div>
      </div>
    </GuardianProvider>
  );
}

export default App;
