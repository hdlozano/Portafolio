/**
 * Paso 7 y 8: Selección, Justificación e Interpretación del Análisis Inferencial
 * Cumple exhaustivamente con la justificación según los 4 criterios de la guía y reporte de p-value y H0
 */
import React, { useState } from 'react';
import { INFERENTIAL_TESTS, DESCRIPTIVE_STATS } from '../data/bostonHousingData';
import { 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  Scale, 
  ShieldCheck, 
  FileCheck2, 
  Calculator,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface InferentialProps {
  onNext: () => void;
}

export const InferentialSection: React.FC<InferentialProps> = ({ onNext }) => {
  const [alphaLevel, setAlphaLevel] = useState<number>(0.05);

  const primary = INFERENTIAL_TESTS.primaryTest;
  const isRejected = primary.pValue < alphaLevel;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Encabezado */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-purple-600 mb-1">
          Inferencia Estadística
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Selección, Justificación y Resultados del Análisis Inferencial
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Fundamentación metodológica de la prueba de contraste, ejecución matemática, cálculo del tamaño del efecto e interpretación sustantiva sobre el impacto del río Charles en el precio de la vivienda.
        </p>
      </div>

      {/* Paso 7: Justificación Metodológica según los 4 criterios de la guía */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
          <Scale className="w-4 h-4 text-purple-600" />
          <span>Criterios Metodológicos para la Selección de la Prueba</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Criterio 1 */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
            <span className="font-bold text-slate-900 block mb-1">1. Tipo de Variables</span>
            <p className="text-slate-600 leading-normal">
              Target continuo (<code className="text-blue-700">MEDV</code>) frente a factor independiente dicotómico de dos muestras no apareadas (<code className="text-emerald-700">CHAS</code>: 0 vs 1).
            </p>
          </div>

          {/* Criterio 2 */}
          <div className="p-3.5 rounded-lg border border-rose-200 bg-rose-50/40">
            <span className="font-bold text-rose-900 block mb-1">2. Supuesto Normalidad</span>
            <p className="text-rose-800 leading-normal">
              <strong>Violado severamente</strong> en ambos grupos (Shapiro-Wilk $p &lt; 0.05$, asimetría positiva y truncamiento en 50k).
            </p>
          </div>

          {/* Criterio 3 */}
          <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/40">
            <span className="font-bold text-amber-900 block mb-1">3. Homogeneidad de Varianzas</span>
            <p className="text-amber-800 leading-normal">
              <strong>Violado</strong> (Levene $p = 0.0368 &lt; 0.05$). Varianzas desiguales ($s_0^2 = 77.97$ vs $s_1^2 = 139.71$).
            </p>
          </div>

          {/* Criterio 4 */}
          <div className="p-3.5 rounded-lg border border-purple-200 bg-purple-50/40">
            <span className="font-bold text-purple-900 block mb-1">4. Tamaño Muestral</span>
            <p className="text-purple-800 leading-normal">
              Severo desbalance ($471$ vs $35$). La prueba debe ser invariante ante escalas ordinales o colas pesadas.
            </p>
          </div>
        </div>

        {/* Veredicto de selección */}
        <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-xl text-xs text-purple-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold uppercase tracking-wide block mb-0.5">
              Decisión Metodológica Adoptada:
            </span>
            Se selecciona como estadístico principal la <strong>Prueba U de Mann-Whitney (Wilcoxon Rank-Sum)</strong>. Es el contraste no paramétrico óptimo para comparar medianas y rangos estocásticos entre dos muestras independientes sin asumir distribución normal ni igualdad estricta de varianzas.
          </div>
        </div>
      </div>

      {/* Paso 8: Resultados e Interpretación Formal */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Resultados de la Prueba U de Mann-Whitney</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Contraste bilateral de dos colas con corrección de continuidad
            </p>
          </div>

          {/* Selector interactivo de nivel alfa */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg text-xs">
            <span className="text-slate-600 font-medium pl-1.5 flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5" /> Umbral α:
            </span>
            {[0.05, 0.01, 0.001].map((val) => (
              <button
                key={val}
                onClick={() => setAlphaLevel(val)}
                className={`px-2 py-0.5 rounded font-mono font-medium transition-colors ${
                  alphaLevel === val
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjetas de Métricas Estadísticas de la Prueba */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* U-Stat */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs text-slate-500 font-medium block">Estadístico U de Mann-Whitney</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
              {primary.statValue.toFixed(1)}
            </div>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Suma de rangos observados
            </span>
          </div>

          {/* Z-Score */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs text-slate-500 font-medium block">Puntuación Tipificada (Z-Score)</span>
            <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">
              {primary.zScore.toFixed(3)}
            </div>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              |Z| &gt; 1.96 (Zona crítica superada)
            </span>
          </div>

          {/* P-Value */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
            <span className="text-xs text-emerald-800 font-medium block">p-value Bilateral</span>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">
              6.45 × 10⁻⁵
            </div>
            <span className="text-[11px] text-emerald-800 block mt-0.5">
              p = 0.000065 &lt; {alphaLevel}
            </span>
          </div>

          {/* Tamaño del efecto */}
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40">
            <span className="text-xs text-purple-800 font-medium block">Tamaño del Efecto (r biserial)</span>
            <div className="text-2xl font-extrabold text-purple-700 font-mono mt-1">
              0.360
            </div>
            <span className="text-[11px] text-purple-800 block mt-0.5">
              Magnitud de efecto moderada-alta
            </span>
          </div>
        </div>

        {/* Declaración Formal sobre la Decisión de H0 */}
        <div className={`p-5 rounded-xl border ${
          isRejected 
            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
            : 'bg-rose-50 border-rose-300 text-rose-950'
        } space-y-2`}>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h4 className="text-sm font-bold uppercase tracking-wide">
              Decisión Formal sobre la Hipótesis Nula (H₀): {isRejected ? 'SE RECHAZA H₀' : 'NO SE RECHAZA H₀'}
            </h4>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">
            Dado que el valor probabilístico observado ($p = 6.45 \times 10^{-5}$) es sustancialmente menor que el nivel de significancia prefijado ($\alpha = {alphaLevel}$), <strong>existe evidencia estadística suficiente y concluyente para rechazar la hipótesis nula ($H_0$) en favor de la hipótesis alternativa ($H_1$)</strong>.
          </p>
        </div>

        {/* Interpretación Sustantiva en función del problema planteado */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-2 text-xs text-slate-700 leading-relaxed">
          <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Interpretación Sustantiva en el Contexto del Problema:
          </div>
          <p>
            1. <strong>Efecto de la Amenidad Fluvial:</strong> Las zonas censales contiguas al río Charles (CHAS = 1) no solo presentan una cotización media más alta, sino que su distribución completa de precios se halla sistemáticamente desplazada hacia valores superiores (Mediana: <strong>$28,400 USD</strong> frente a <strong>$20,900 USD</strong> en distritos no ribereños).
          </p>
          <p>
            2. <strong>Prima Económica Mediana:</strong> La diferencia mediano-observada es de <strong>+$7,500 USD (+35.8%)</strong>. Esto confirma que el mercado inmobiliario de Boston en los años 70 valoraba significativamente las ventajas recreativas, visuales y ambientales que proporciona la colindancia fluvial directa.
          </p>
          <p>
            3. <strong>Robustez Estadística:</strong> La probabilidad de que esta disparidad se deba a simple fluctuación aleatoria de muestreo es inferior a 1 en 15,000 observaciones ($p &lt; 0.0001$).
          </p>
        </div>
      </div>

      {/* Tabla Comparativa de Robustez: Contraste Paramétrico vs No Paramétrico */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Tabla de Robustez Metodológica: Contraste entre Modelos
        </h4>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[11px] font-sans">
              <tr>
                <th className="py-2.5 px-3">Prueba Estadística</th>
                <th className="py-2.5 px-3">Clasificación</th>
                <th className="py-2.5 px-3">Estadístico</th>
                <th className="py-2.5 px-3">p-value</th>
                <th className="py-2.5 px-3">Decisión sobre H₀</th>
                <th className="py-2.5 px-3">Concordancia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="bg-purple-50/40 font-semibold">
                <td className="py-2.5 px-3 font-sans text-purple-950 font-bold">U de Mann-Whitney (Principal)</td>
                <td className="py-2.5 px-3 font-sans text-purple-700">No Paramétrica</td>
                <td className="py-2.5 px-3">U = 5274.5 (Z = -3.99)</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">6.45 × 10⁻⁵</td>
                <td className="py-2.5 px-3 font-sans text-emerald-800 font-bold">Rechazar H₀</td>
                <td className="py-2.5 px-3 font-sans text-emerald-700 font-semibold">Óptima (Válida)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans text-slate-900">t de Welch (Varianzas desiguales)</td>
                <td className="py-2.5 px-3 font-sans text-slate-600">Paramétrica Robusta</td>
                <td className="py-2.5 px-3">t = -3.113 (df = 36.8)</td>
                <td className="py-2.5 px-3">0.0035</td>
                <td className="py-2.5 px-3 font-sans text-emerald-800">Rechazar H₀</td>
                <td className="py-2.5 px-3 font-sans text-blue-600">Concordante</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans text-slate-900">ANOVA de un factor (F-test)</td>
                <td className="py-2.5 px-3 font-sans text-slate-600">Paramétrica Clásica</td>
                <td className="py-2.5 px-3">F = 15.97</td>
                <td className="py-2.5 px-3">7.39 × 10⁻⁵</td>
                <td className="py-2.5 px-3 font-sans text-emerald-800">Rechazar H₀</td>
                <td className="py-2.5 px-3 font-sans text-blue-600">Concordante</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navegación al paso de Conclusiones */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
        >
          <span>Continuar: Discusión Crítica y Proyecciones</span>
        </button>
      </div>
    </div>
  );
};
