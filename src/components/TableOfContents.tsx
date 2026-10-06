/**
 * Tabla de Contenido Académica
 * Cumple con el criterio del numeral 2 de la rúbrica y las indicaciones del Anexo
 */
import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  BarChart3, 
  Layers, 
  Sparkles, 
  Compass, 
  FileCode, 
  FileText,
  ArrowRight
} from 'lucide-react';

interface TOCProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenDeliveryDoc: () => void;
}

export const TableOfContents: React.FC<TOCProps> = ({
  activeTab,
  onSelectTab,
  onOpenDeliveryDoc
}) => {
  const sections = [
    {
      id: 'portada',
      num: '01',
      title: 'Portada y Ficha del Estudio',
      desc: 'Identificación académica, resumen del estudio sobre el Boston Housing y acceso rápido.',
      icon: BookOpen,
      badge: 'Inicio'
    },
    {
      id: 'intro',
      num: '02',
      title: 'Introducción y Contexto del Análisis',
      desc: 'Propósito de la investigación, relevancia de la inferencia en decisiones y contexto socioeconómico.',
      icon: HelpCircle,
      badge: 'Contexto'
    },
    {
      id: 'problema',
      num: '03',
      title: 'Formulación del Problema, Hipótesis y Variables',
      desc: 'Definición de H0 y H1, clasificación operacional de variables y caracterización de la muestra (n=506).',
      icon: Layers,
      badge: 'Hipótesis'
    },
    {
      id: 'descriptiva',
      num: '04',
      title: 'Estadística Descriptiva y Visualización',
      desc: 'Distribución de MEDV con KDE, boxplots comparativos, relaciones bivariadas con OLS y correlaciones.',
      icon: BarChart3,
      badge: 'Exploración'
    },
    {
      id: 'supuestos',
      num: '05',
      title: 'Diagnóstico de Supuestos Estadísticos',
      desc: 'Pruebas de normalidad de Shapiro-Wilk, gráfico Q-Q plot y prueba de homogeneidad de varianzas de Levene.',
      icon: Layers,
      badge: 'Supuestos'
    },
    {
      id: 'inferencia',
      num: '06',
      title: 'Análisis Inferencial y Contraste de Hipótesis',
      desc: 'Prueba U de Mann-Whitney (U=5274.5, p=6.45e-5), contraste con t de Welch y decisión formal sobre H0.',
      icon: Sparkles,
      badge: 'Inferencia'
    },
    {
      id: 'conclusiones',
      num: '07',
      title: 'Discusión Crítica, Limitaciones y Proyecciones',
      desc: 'Reflexión metodológica sobre supuestos, censura en 50k, desbalance muestral y modelado futuro.',
      icon: Compass,
      badge: 'Discusión'
    },
    {
      id: 'colab',
      num: '08',
      title: 'Cuaderno Reproducible en Google Colab',
      desc: 'Código modular en Python con salidas numéricas, botón de ejecución directa y descarga del archivo .ipynb.',
      icon: FileCode,
      badge: 'Python'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            Tabla de Contenido
          </h3>
          <p className="text-xs text-slate-500">
            Estructura temática y secuencia analítica del estudio de valoración inmobiliaria
          </p>
        </div>

        <button
          onClick={onOpenDeliveryDoc}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors self-start sm:self-auto"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Ficha de Entrega (Word / PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isCurrent = activeTab === sec.id;

          return (
            <div
              key={sec.id}
              onClick={() => onSelectTab(sec.id)}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 group ${
                isCurrent
                  ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700'
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    {sec.num}. {sec.title}
                  </span>
                  <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                    {sec.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {sec.desc}
                </p>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
