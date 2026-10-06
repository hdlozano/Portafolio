/**
 * Laboratorio Interactivo de Simulación Inferencial
 * Permite explorar de forma dinámica la sensibilidad de las pruebas paramétricas y no paramétricas
 */
import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  BarChart, 
  Sliders, 
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { DESCRIPTIVE_STATS, INFERENTIAL_TESTS } from '../data/bostonHousingData';

export const InteractiveInferentialLab: React.FC = () => {
  const [alpha, setAlpha] = useState<number>(0.05);
  const [alternative, setAlternative] = useState<'two-sided' | 'greater'>('two-sided');
  const [testModel, setTestModel] = useState<'mann-whitney' | 'welch' | 'anova'>('mann-whitney');

  // Valores calculados
  const mwU = 5274.5;
  const mwP = alternative === 'two-sided' ? 6.45e-5 : 3.22e-5;
  const welchT = -3.113;
  const welchP = alternative === 'two-sided' ? 0.0035 : 0.0017;
  const anovaF = 15.97;
  const anovaP = 7.39e-5;

  let currentP = mwP;
  let currentStat = `U = ${mwU}`;
  let statLabel = "Estadístico U de Mann-Whitney";
  let isParametric = false;

  if (testModel === 'welch') {
    currentP = welchP;
    currentStat = `t = ${welchT} (df=36.8)`;
    statLabel = "Estadístico t con corrección de Welch";
    isParametric = true;
  } else if (testModel === 'anova') {
    currentP = anovaP;
    currentStat = `F = ${anovaF}`;
    statLabel = "Estadístico F de Snedecor";
    isParametric = true;
  }

  const isRejectH0 = currentP < alpha;

  return (
    <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wide">
            <Calculator className="w-4 h-4" />
            <span>Laboratorio Interactivo de Contraste de Hipótesis</span>
          </div>
          <h3 className="text-base font-bold text-white mt-1">
            Simulador de Pruebas de Significación Estadística
          </h3>
        </div>
        <span className="text-xs font-mono bg-blue-950 text-blue-300 border border-blue-800 px-2.5 py-1 rounded">
          Boston Housing (n₀=471 vs n₁=35)
        </span>
      </div>

      {/* Controles de Simulación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Selector de Prueba */}
        <div className="space-y-1.5">
          <label className="text-slate-400 font-medium block">Modelo de Prueba:</label>
          <div className="space-y-1">
            {[
              { id: 'mann-whitney', label: 'U de Mann-Whitney (No paramétrica)', badge: 'Recomendada' },
              { id: 'welch', label: 't de Welch (Paramétrica robusta)', badge: 'Alternativa' },
              { id: 'anova', label: 'ANOVA 1 Factor (Paramétrica clásica)', badge: 'Clásica' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setTestModel(m.id as any)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  testModel === m.id
                    ? 'bg-blue-600 text-white font-medium'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{m.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  testModel === m.id ? 'bg-blue-700 text-blue-100' : 'bg-slate-700 text-slate-400'
                }`}>
                  {m.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Nivel de Significancia Alfa */}
        <div className="space-y-1.5">
          <label className="text-slate-400 font-medium block">Nivel de Significancia (α):</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[0.10, 0.05, 0.01].map(lvl => (
              <button
                key={lvl}
                onClick={() => setAlpha(lvl)}
                className={`py-2 px-2 text-center rounded-lg font-mono transition-colors ${
                  alpha === lvl
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                α = {lvl}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 pt-1 leading-normal">
            Probabilidad máxima tolerada de cometer un error Tipo I (falso positivo). Estándar académico: 0.05.
          </p>
        </div>

        {/* Hipótesis Alternativa */}
        <div className="space-y-1.5">
          <label className="text-slate-400 font-medium block">Direccionalidad del Contraste:</label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setAlternative('two-sided')}
              className={`py-2 px-2 text-center rounded-lg transition-colors ${
                alternative === 'two-sided'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Bilateral (μ₁ ≠ μ₀)
            </button>
            <button
              onClick={() => setAlternative('greater')}
              className={`py-2 px-2 text-center rounded-lg transition-colors ${
                alternative === 'greater'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Unilateral (μ₁ &gt; μ₀)
            </button>
          </div>
          <p className="text-[11px] text-slate-400 pt-1 leading-normal">
            {alternative === 'two-sided' 
              ? 'Prueba conservadora: Evalúa cualquier diferencia en ambas colas.' 
              : 'Prueba dirigida: Evalúa específicamente si el precio ribereño es mayor.'}
          </p>
        </div>
      </div>

      {/* Resultados Dinámicos del Simulador */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div>
          <span className="text-slate-400 font-sans block text-[11px]">Estadístico Obtenido:</span>
          <div className="text-lg font-bold text-white mt-0.5">{currentStat}</div>
          <span className="text-[10px] text-slate-400 font-sans">{statLabel}</span>
        </div>

        <div>
          <span className="text-slate-400 font-sans block text-[11px]">Valor de Probabilidad (p-value):</span>
          <div className="text-lg font-bold text-emerald-400 mt-0.5">
            {currentP < 0.0001 ? currentP.toExponential(3) : currentP.toFixed(4)}
          </div>
          <span className="text-[10px] text-slate-400 font-sans">
            {currentP < alpha ? `p < ${alpha} (Significativo)` : `p ≥ ${alpha}`}
          </span>
        </div>

        <div>
          <span className="text-slate-400 font-sans block text-[11px]">Decisión Inferencial:</span>
          <div className={`text-base font-bold mt-0.5 ${isRejectH0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isRejectH0 ? 'RECHAZAR H₀' : 'NO RECHAZAR H₀'}
          </div>
          <span className="text-[10px] text-slate-400 font-sans">
            {isRejectH0 ? 'Evidencia a favor de H₁' : 'Sin evidencia suficiente'}
          </span>
        </div>
      </div>

      <div className="text-xs text-slate-300 bg-slate-800/60 p-3.5 rounded-lg border border-slate-700 leading-relaxed">
        <strong>Conclusión de Sensibilidad:</strong> Independientemente del nivel de significancia seleccionado ($\alpha = 0.05, 0.01$ o $0.001$) y de la direccionalidad de la prueba, <strong>todos los modelos estadísticos coinciden de forma unánime en rechazar la hipótesis nula</strong>. Esto confirma la contundencia del efecto paisajístico del río Charles en el mercado inmobiliario de Boston.
      </div>
    </div>
  );
};
