/**
 * Google Sites Academic Navigation Header
 * Conforming to Universal Frontend Design Top Bar Contract (3 zones)
 */
import React from 'react';
import { ExternalLink, FileText, Download, Code2, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDeliveryDoc: () => void;
  onDownloadNotebook: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDeliveryDoc,
  onDownloadNotebook
}) => {
  const navItems = [
    { id: 'portada', label: 'Portada' },
    { id: 'intro', label: 'Introducción' },
    { id: 'problema', label: 'Hipótesis' },
    { id: 'descriptiva', label: 'Descriptiva' },
    { id: 'supuestos', label: 'Supuestos' },
    { id: 'inferencia', label: 'Inferencia' },
    { id: 'conclusiones', label: 'Conclusiones' },
    { id: 'colab', label: 'Google Colab' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('portada')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-blue-700 transition-colors">
              U
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 tracking-tight block leading-tight">
                Portafolio Inferencial
              </span>
              <span className="text-[11px] text-slate-500 font-medium block leading-tight">
                UNIMINUTO · Fundamentos para IA
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('colab')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              title="Ver Notebook y Código Colab"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Notebook</span> Colab
            </button>
            <button
              onClick={onOpenDeliveryDoc}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ficha de Entrega</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation bar */}
        <div className="lg:hidden flex overflow-x-auto py-2 gap-1 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full shrink-0 transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
