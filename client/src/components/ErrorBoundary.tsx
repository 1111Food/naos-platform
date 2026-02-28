import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-4 font-sans">
                    <div className="max-w-lg w-full bg-red-950/30 border border-red-500/30 rounded-xl p-8 backdrop-blur-md shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                            <h1 className="text-2xl font-serif text-red-200">La Realidad se ha Fracturado</h1>
                        </div>

                        <div className="mb-6 space-y-2">
                            <p className="text-gray-400 text-sm">El sistema ha encontrado una anomalía crítica.</p>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-red-300 overflow-auto max-h-60 mb-6 border border-white/5">
                            {this.state.error?.toString()}
                            {this.state.error?.stack && (
                                <div className="mt-2 text-gray-500 opacity-50">
                                    {this.state.error.stack.split('\n').slice(0, 3).join('\n')}...
                                </div>
                            )}
                        </div>

                        <button
                            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-all duration-300 uppercase tracking-widest hover:border-white/30"
                            onClick={() => {
                                localStorage.clear(); // Opción nuclear por si es data corrupta
                                window.location.reload();
                            }}
                        >
                            Reiniciar Sistema (Clear Data)
                        </button>
                        <p className="text-center text-[10px] text-gray-600 mt-4">
                            Intentando limpiar LocalStorage al reiniciar.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
