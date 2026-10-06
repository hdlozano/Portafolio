/**
 * Portada Creativa e Institucional UNIMINUTO
 * Cumple con el criterio de la Rúbrica: "Diseñen una portada creativa y llamativa con elementos gráficos pertinentes"
 */
import React from 'react';
import { 
  BarChart3, 
  ExternalLink, 
  FileCode, 
  Sparkles, 
  CheckCircle2, 
  Database, 
  Layers, 
  GraduationCap,
  Calendar,
  User,
  ArrowRight
} from 'lucide-react';

interface PortadaProps {
  onNavigate: (tab: string) => void;
  onOpenDeliveryDoc: () => void;
  studentName: string;
  setStudentName: (val: string) => void;
  studentEmail: string;
  teacherName: string;
  setTeacherName: (val: string) => void;
  courseName: string;
  deliveryDate: string;
}

export const PortadaSection: React.FC<PortadaProps> = ({
  onNavigate,
  onOpenDeliveryDoc,
  studentName,
  setStudentName,
  studentEmail,
  teacherName,
  setTeacherName,
  courseName,
  deliveryDate
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner institucional estilo Google Sites de vanguardia */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-blue-800/40">
        {/* Gráfico de fondo representativo: curvas de densidad y red neuronal matemática */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
            <path
              d="M0,350 C150,330 250,120 400,20 C550,120 650,330 800,350 L800,400 L0,400 Z"
              fill="rgba(59, 130, 246, 0.4)"
            />
            <path
              d="M0,370 C200,350 320,240 400,100 C480,240 600,350 800,370 L800,400 L0,400 Z"
              fill="rgba(147, 51, 234, 0.3)"
            />
            <circle cx="400" cy="20" r="6" fill="#60a5fa" />
            <line x1="400" y1="20" x2="400" y2="380" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="relative z-10 px-6 sm:px-10 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              {/* Unboxed institutional kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-300 uppercase">
                <span>UNIMINUTO</span>
                <span>·</span>
                <span>Corporación Universitaria Minuto de Dios</span>
                <span>·</span>
                <span>Fundamentos para IA</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Portafolio de Evidencias
                <span className="block text-blue-400 font-semibold text-2xl sm:text-3xl mt-1">
                  Análisis Inferencial de Datos & Visualización
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Estudio inferencial riguroso sobre el <strong className="text-white">Boston Housing Dataset</strong>. 
                Evaluación empírica de hipótesis ($H_0$ vs $H_1$), validación de supuestos de normalidad y homocedasticidad, 
                justificación de pruebas no paramétricas (Mann-Whitney U) y código reproducible integrado con Google Colab.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('intro')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5"
                >
                  <span>Explorar Portafolio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('colab')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800/90 hover:bg-slate-700/90 text-white font-medium text-sm rounded-lg border border-slate-700 transition-all"
                >
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span>Google Colab Reproducible</span>
                </button>
                <button
                  onClick={onOpenDeliveryDoc}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-slate-200 font-medium text-sm rounded-lg transition-all"
                >
                  <span>Ficha de Entrega Word/PDF</span>
                </button>
              </div>
            </div>

            {/* Tarjeta de identificación institucional editable */}
            <div className="w-full lg:w-80 bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-slate-700/70 text-slate-200 space-y-3.5 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs uppercase font-semibold text-blue-400 tracking-wider">
                  Ficha Académica
                </span>
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verificado
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-400 block text-[11px] font-medium">Estudiante:</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-white text-xs focus:outline-none focus:border-blue-500 font-medium"
                    placeholder="Nombre del estudiante"
                  />
                  <div className="text-[10px] text-slate-400 mt-0.5">{studentEmail}</div>
                </div>

                <div>
                  <label className="text-slate-400 block text-[11px] font-medium">Docente Tutor:</label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-white text-xs focus:outline-none focus:border-blue-500 font-medium"
                    placeholder="Nombre del docente tutor"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Asignatura:</span>
                    <span className="text-white font-medium">{courseName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Periodo:</span>
                    <span className="text-white font-medium">2026-2</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Fecha: {deliveryDate}</span>
                  <span className="text-blue-300 font-medium">Boston Housing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas resumen con los componentes centrales del estudio */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigate('problema')}
          className="bg-white p-5 rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Hipótesis & Variables</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Formulación de H₀ y H₁, caracterización operacional de MEDV y CHAS con muestra n=506.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('descriptiva')}
          className="bg-white p-5 rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Estadística Descriptiva</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Histograma KDE, boxplots de grupos, correlaciones lineales y análisis bivariado.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('supuestos')}
          className="bg-white p-5 rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Diagnóstico de Supuestos</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pruebas de normalidad de Shapiro-Wilk, homocedasticidad de Levene y gráfico Q-Q plot.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('inferencia')}
          className="bg-white p-5 rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Contraste Inferencial</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Prueba U de Mann-Whitney (p = 6.45 × 10⁻⁵), t de Welch y conclusiones en APA.
          </p>
        </div>
      </div>
    </div>
  );
};
