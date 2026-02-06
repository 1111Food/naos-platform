import { useState, useEffect } from 'react';
import { Download, Smartphone } from 'lucide-react';

export function PWAInstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // 1. Check if already installed via display-mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
        }

        // 2. Listen for the install prompt
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        // 3. Listen for successful installation
        const handleAppInstalled = () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
            console.log('NAOS: App installed successfully.');
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    // Do not show anything if already installed or prompt not available
    if (isInstalled || !deferredPrompt) return null;

    return (
        <button
            onClick={handleInstallClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 hover:bg-primary/20 transition-all group animate-in slide-in-from-top-2 duration-500"
        >
            <Smartphone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/80">Instalar App</span>
            <Download className="w-3 h-3 text-primary/60" />
        </button>
    );
}
