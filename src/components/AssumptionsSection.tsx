/**
 * Paso 6: Validación de Supuestos Inferenciales (Normalidad y Homocedasticidad)
 * Cumple obligatoriamente con Shapiro-Wilk por muestra y grupos, Q-Q Plot y Levene Test
 */
import React, { useState } from 'react';
import { ASSUMPTIONS_TESTS, QQ_PLOT_POINTS } from '../data/bostonHousingData';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  Activity, 
  BarChart2, 
  GitCompare,
  FileQuestion
} from 'lucide-react';

interface AssumptionsProps {
  onNext: () => void;
}

export const AssumptionsSection: React.FC<AssumptionsProps> = ({ onNext }) => {
  const [selectedAssump, setSelectedAssump] = useState<'normality' | 'homoscedasticity' | 'balance'>('normality');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Encabezado */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
          Diagnóstico de Supuestos
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Evaluación y Validación de Supuestos Estadísticos
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Comprobación matemática obligatoria de la normalidad gaussiana (Shapiro-Wilk y Q-Q Plot) e igualdad de varianzas (Prueba de Levene) para determinar la validez de modelos paramétricos versus no paramétricos.
        </p>
      </div>

      {/* Regla de Oro / Marco de Interpretación de la Guía */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-amber-950 font-bold uppercase tracking-wide">
            Regla de Decisión Estadística (Nivel α = 0.05):
          </strong>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono">
            <span className="bg-white/80 px-2.5 py-1 rounded border border-amber-200 block">
              • Si p-value &lt; 0.05: Evidencia estadística CONTRA normalidad (Se rechaza H₀)
            </span>
            <span className="bg-white/80 px-2.5 py-1 rounded border border-amber-200 block">
              • Si p-value &ge; 0.05: No se rechaza normalidad (con cautela)
            </span>
          </div>
        </div>
      </div>

      {/* Selector de Supuesto Interactivo */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl max-w-xl text-xs font-medium">
        <button
          onClick={() => setSelectedAssump('normality')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
            selectedAssump === 'normality'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-rose-500" />
          <span>A) Supuesto de Normalidad</span>
        </button>
        <button
          onClick={() => setSelectedAssump('homoscedasticity')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
            selectedAssump === 'homoscedasticity'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GitCompare className="w-3.5 h-3.5 text-amber-500" />
          <span>B) Homogeneidad de Varianzas</span>
        </button>
        <button
          onClick={() => setSelectedAssump('balance')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
            selectedAssump === 'balance'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5 text-blue-500" />
          <span>C) Balance Muestral</span>
        </button>
      </div>

      {/* Contenido Condicional según supuesto seleccionado */}
      {selectedAssump === 'normality' && (
        <div className="space-y-6">
          {/* Resultados de Shapiro-Wilk */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Prueba de Shapiro-Wilk sobre la Variable Dependiente (MEDV)
                </h3>
                <p className="text-xs text-slate-500">
                  Evaluada a nivel global ($n=506$) y desglosada por cada subgrupo ($n_0=471$ y $n_1=35$)
                </p>
              </div>
              <span className="text-xs font-mono bg-rose-50 text-rose-700 px-2.5 py-1 rounded font-semibold flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> No Normal
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Global */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Muestra Completa</span>
                <div className="text-xs text-slate-500">n = 506</div>
                <div className="space-y-1 font-mono text-xs pt-1">
                  <div>Estadístico W: <span className="font-bold text-slate-900">{ASSUMPTIONS_TESTS.normality.globalShapiro.stat}</span></div>
                  <div>p-value: <span className="font-bold text-rose-700">{ASSUMPTIONS_TESTS.normality.globalShapiro.formattedP}</span></div>
                </div>
                <div className="text-[11px] font-semibold text-rose-800 pt-1 border-t border-rose-200">
                  {ASSUMPTIONS_TESTS.normality.globalShapiro.decision}
                </div>
              </div>

              {/* Grupo 0 */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">CHAS = 0 (No ribereño)</span>
                <div className="text-xs text-slate-500">n = 471</div>
                <div className="space-y-1 font-mono text-xs pt-1">
                  <div>Estadístico W: <span className="font-bold text-slate-900">{ASSUMPTIONS_TESTS.normality.group0Shapiro.stat}</span></div>
                  <div>p-value: <span className="font-bold text-rose-700">{ASSUMPTIONS_TESTS.normality.group0Shapiro.formattedP}</span></div>
                </div>
                <div className="text-[11px] font-semibold text-rose-800 pt-1 border-t border-rose-200">
                  {ASSUMPTIONS_TESTS.normality.group0Shapiro.decision}
                </div>
              </div>

              {/* Grupo 1 */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">CHAS = 1 (Ribereño)</span>
                <div className="text-xs text-slate-500">n = 35</div>
                <div className="space-y-1 font-mono text-xs pt-1">
                  <div>Estadístico W: <span className="font-bold text-slate-900">{ASSUMPTIONS_TESTS.normality.group1Shapiro.stat}</span></div>
                  <div>p-value: <span className="font-bold text-rose-700">{ASSUMPTIONS_TESTS.normality.group1Shapiro.formattedP}</span></div>
                </div>
                <div className="text-[11px] font-semibold text-rose-800 pt-1 border-t border-rose-200">
                  {ASSUMPTIONS_TESTS.normality.group1Shapiro.decision}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <strong>Dictamen Estadístico:</strong> Debido a que en todos los escenarios el p-value &lt; 0.05, existe <strong>evidencia estadística abrumadora contra el supuesto de normalidad</strong>. Los precios inmobiliarios presentan colas pesadas, asimetría a la derecha (asimetría = +1.11) y un truncamiento superior en 50,000 USD.
            </div>
          </div>

          {/* Gráfico Q-Q Plot (Quantile-Quantile Plot) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Gráfico Cuantil-Cuantil (Q-Q Plot) Teórico vs Muestral
                </h4>
                <p className="text-xs text-slate-500">
                  Diagnóstico visual del desvío de la diagonal normal teórica
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500">Curvatura sigmoidea característica</span>
            </div>

            <div className="h-64 w-full bg-slate-50/50 rounded-lg p-3 border border-slate-100">
              <svg className="w-full h-full" viewBox="0 0 500 220">
                {/* Cuadrícula */}
                <line x1="50" y1="20" x2="50" y2="180" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="50" y1="180" x2="480" y2="180" stroke="#cbd5e1" strokeWidth="1" />

                {/* Ejes */}
                <text x="40" y="25" textAnchor="end" fontSize="9" fill="#64748b" fontFamily="monospace">$50k</text>
                <text x="40" y="100" textAnchor="end" fontSize="9" fill="#64748b" fontFamily="monospace">$25k</text>
                <text x="40" y="180" textAnchor="end" fontSize="9" fill="#64748b" fontFamily="monospace">$0k</text>

                <text x="50" y="195" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="monospace">-2.5σ</text>
                <text x="157" y="195" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="monospace">-1σ</text>
                <text x="265" y="195" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="monospace">0 (μ)</text>
                <text x="372" y="195" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="monospace">+1σ</text>
                <text x="480" y="195" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="monospace">+2.5σ</text>

                <text x="265" y="210" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
                  Cuantiles Teóricos Normales (Z-Score Estándar)
                </text>

                {/* Diagonal de referencia normal perfecta (roja punteada) */}
                <line x1="50" y1="175" x2="480" y2="25" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />

                {/* Puntos de cuantiles reales de Boston Housing */}
                {QQ_PLOT_POINTS.map((pt, i) => {
                  const cx = 50 + ((pt.theoretical + 2.5) / 5) * 430;
                  const cy = 180 - (pt.sample / 50) * 160;
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r="4.5"
                      fill="#2563eb"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="hover:r-6 transition-all"
                    >
                      <title>{`Z: ${pt.theoretical} | MEDV Real: $${pt.sample}k`}</title>
                    </circle>
                  );
                })}
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-red-500"></span> Línea Gaussiana Ideal (Normal)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Cuantiles Empíricos Boston Housing
              </span>
              <span className="text-amber-700 font-medium">Despegue severo en colas superiores</span>
            </div>
          </div>
        </div>
      )}

      {selectedAssump === 'homoscedasticity' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Prueba de Homogeneidad de Varianzas (Test de Levene)
              </h3>
              <p className="text-xs text-slate-500">
                Variante Brown-Forsythe centrada en la mediana (robusta a la asimetría)
              </p>
            </div>
            <span className="text-xs font-mono bg-amber-50 text-amber-700 px-2.5 py-1 rounded font-semibold">
              Varianzas Heterogéneas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Estadístico y P-Value</span>
              <div className="font-mono text-xs space-y-1">
                <div>Estadístico W de Levene: <span className="font-bold text-slate-900">{ASSUMPTIONS_TESTS.homoscedasticity.levene.stat}</span></div>
                <div>p-value obtenido: <span className="font-bold text-amber-700">{ASSUMPTIONS_TESTS.homoscedasticity.levene.formattedP}</span></div>
                <div>Nivel de significancia (α): <span className="font-bold">0.05</span></div>
              </div>
              <div className="text-[11px] font-semibold text-amber-800 pt-2 border-t border-slate-200">
                Decisión: Se rechaza H₀ de igualdad de varianzas (p = 0.0368 &lt; 0.05)
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Comparación de Varianzas Muestrales (s²)</span>
              <div className="font-mono text-xs space-y-1">
                <div>Varianza CHAS = 0: <span className="font-bold text-slate-900">77.97</span> (Desv: 8.83)</div>
                <div>Varianza CHAS = 1: <span className="font-bold text-emerald-800">139.71</span> (Desv: 11.82)</div>
                <div>Razón de varianzas (F-ratio empírico): <span className="font-bold text-blue-700">1.79</span></div>
              </div>
              <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200">
                La dispersión en las propiedades ribereñas es 79% superior a la del grupo de control.
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed">
            <strong>Impacto Metodológico:</strong> La violación de la homocedasticidad desaconseja de manera categórica el uso de la prueba <em>t de Student clásica</em> de varianzas iguales (Student's t-test). Si se empleara una aproximación paramétrica, obligatoriamente requeriría la corrección por grados de libertad de <strong>Welch-Satterthwaite</strong>.
          </div>
        </div>
      )}

      {selectedAssump === 'balance' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Evaluación del Desbalance Muestral (n₀ vs n₁)
              </h3>
              <p className="text-xs text-slate-500">
                Condiciones de tamaño y potencia estadística
              </p>
            </div>
            <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded font-semibold">
              Ratio 13.5 : 1
            </span>
          </div>

          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/30 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p>
              El conjunto de datos presenta un <strong>desbalance severo de clases</strong>: 471 distritos no colindan con el río Charles mientras que únicamente 35 distritos gozan de esta condición geográfica.
            </p>
            <p>
              Aunque $n_1 = 35$ satisface el umbral tradicional del Teorema del Límite Central ($n \ge 30$), la combinación simultánea de <strong>desbalance extremo + no normalidad asimétrica + heterocedasticidad</strong> hace que las pruebas basadas en medias sean altamente sensibles a valores atípicos.
            </p>
          </div>
        </div>
      )}

      {/* Matriz de Conclusión Metodológica Integrada */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-3">
        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Conclusión del Diagnóstico de Supuestos</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Ante la evidencia matemática irrefutable de que los datos no son gaussianos (Shapiro-Wilk $p &lt; 0.001$) y poseen varianzas desiguales (Levene $p = 0.0368$), la <strong>Prueba U de Mann-Whitney</strong> queda formalmente seleccionada y justificada como el estadístico inferencial primario en la siguiente sección.
        </p>
      </div>

      {/* Navegación al paso de Inferencia */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
        >
          <span>Continuar: Análisis Inferencial y Contraste de Hipótesis</span>
        </button>
      </div>
    </div>
  );
};
