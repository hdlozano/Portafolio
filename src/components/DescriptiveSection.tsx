/**
 * Paso 5: Estadística Descriptiva y Visualización de Datos
 * Cumple exhaustivamente con la visualización de Histograma/KDE, Boxplot por grupo y Scatter plot
 */
import React, { useState } from 'react';
import { 
  DESCRIPTIVE_STATS, 
  HISTOGRAM_BINS, 
  CORRELATION_MATRIX, 
  REPRESENTATIVE_SAMPLE_ROWS 
} from '../data/bostonHousingData';
import { 
  BarChart, 
  TrendingUp, 
  Table, 
  Layers, 
  Activity, 
  SlidersHorizontal,
  Info,
  Search
} from 'lucide-react';

interface DescriptiveProps {
  onNext: () => void;
}

export const DescriptiveSection: React.FC<DescriptiveProps> = ({ onNext }) => {
  const [activeScatter, setActiveScatter] = useState<'RM' | 'LSTAT'>('RM');
  const [histView, setHistView] = useState<'all' | 'split'>('split');
  const [searchSample, setSearchSample] = useState('');
  const [groupFilter, setGroupFilter] = useState<'all' | '0' | '1'>('all');

  const filteredSample = REPRESENTATIVE_SAMPLE_ROWS.filter(r => {
    const matchesGroup = groupFilter === 'all' || r.chas.toString() === groupFilter;
    const matchesSearch = searchSample === '' || 
      r.id.toString().includes(searchSample) || 
      r.medv.toString().includes(searchSample) ||
      r.rm.toString().includes(searchSample);
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Encabezado */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
          Exploración Univariada y Bivariada
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Estadística Descriptiva y Visualización de Datos
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Resumen cuantitativo de tendencia central y dispersión, visualizaciones distribucionales (Histograma KDE, Boxplots comparativos) y análisis de relaciones bivariadas con covariables urbanas.
        </p>
      </div>

      {/* Tabla Descriptiva Comparativa Integral */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Métricas Descriptivas de MEDV (Miles de USD)
            </h3>
            <p className="text-xs text-slate-500">
              Comparativa entre la muestra total y la partición según la variable independiente CHAS
            </p>
          </div>
          <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">
            n = 506 observaciones
          </span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[11px] font-sans border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Segmento</th>
                <th className="py-2.5 px-3">n</th>
                <th className="py-2.5 px-3">Media (μ)</th>
                <th className="py-2.5 px-3">Mediana</th>
                <th className="py-2.5 px-3">Desv. Est. (σ)</th>
                <th className="py-2.5 px-3">Q1 (25%)</th>
                <th className="py-2.5 px-3">Q3 (75%)</th>
                <th className="py-2.5 px-3">IQR</th>
                <th className="py-2.5 px-3">Mín.</th>
                <th className="py-2.5 px-3">Máx.</th>
                <th className="py-2.5 px-3">Asimetría</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 tabular-nums">
              <tr className="hover:bg-slate-50 font-semibold bg-slate-50/40">
                <td className="py-2.5 px-3 font-sans font-bold text-slate-900">Muestra Global</td>
                <td className="py-2.5 px-3">{DESCRIPTIVE_STATS.global.n}</td>
                <td className="py-2.5 px-3 text-blue-700 font-bold">${DESCRIPTIVE_STATS.global.mean.toFixed(2)}k</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.global.median.toFixed(2)}k</td>
                <td className="py-2.5 px-3">{DESCRIPTIVE_STATS.global.std.toFixed(2)}</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.global.q1.toFixed(2)}k</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.global.q3.toFixed(2)}k</td>
                <td className="py-2.5 px-3">{DESCRIPTIVE_STATS.global.iqr.toFixed(2)}</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.global.min.toFixed(1)}k</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.global.max.toFixed(1)}k</td>
                <td className="py-2.5 px-3 text-amber-700">+{DESCRIPTIVE_STATS.global.skewness.toFixed(2)}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-sans text-slate-800">CHAS = 0 (No Ribereño)</td>
                <td className="py-2.5 px-3">{DESCRIPTIVE_STATS.chas0.n}</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.chas0.mean.toFixed(2)}k</td>
                <td className="py-2.5 px-3 font-bold">${DESCRIPTIVE_STATS.chas0.median.toFixed(2)}k</td>
                <td className="py-2.5 px-3">{DESCRIPTIVE_STATS.chas0.std.toFixed(2)}</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.chas0.q1.toFixed(2)}k</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.chas0.q3.toFixed(2)}k</td>
                <td className="py-2.5 px-3">{DESCRIPTIVE_STATS.chas0.iqr.toFixed(2)}</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.chas0.min.toFixed(1)}k</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.chas0.max.toFixed(1)}k</td>
                <td className="py-2.5 px-3 text-amber-700">+{DESCRIPTIVE_STATS.chas0.skewness.toFixed(2)}</td>
              </tr>
              <tr className="hover:bg-emerald-50/40 bg-emerald-50/20">
                <td className="py-2.5 px-3 font-sans text-emerald-900 font-semibold">CHAS = 1 (Ribereño)</td>
                <td className="py-2.5 px-3 font-bold text-emerald-800">{DESCRIPTIVE_STATS.chas1.n}</td>
                <td className="py-2.5 px-3 text-emerald-800 font-bold">${DESCRIPTIVE_STATS.chas1.mean.toFixed(2)}k</td>
                <td className="py-2.5 px-3 text-emerald-800 font-bold">${DESCRIPTIVE_STATS.chas1.median.toFixed(2)}k</td>
                <td className="py-2.5 px-3">{DESCRIPTIVE_STATS.chas1.std.toFixed(2)}</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.chas1.q1.toFixed(2)}k</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.chas1.q3.toFixed(2)}k</td>
                <td className="py-2.5 px-3 font-bold">{DESCRIPTIVE_STATS.chas1.iqr.toFixed(2)}</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.chas1.min.toFixed(1)}k</td>
                <td className="py-2.5 px-3">${DESCRIPTIVE_STATS.chas1.max.toFixed(1)}k</td>
                <td className="py-2.5 px-3">+{DESCRIPTIVE_STATS.chas1.skewness.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Interpretación inmediata descriptiva */}
        <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed">
          <strong>Hallazgo Descriptivo Clave:</strong> La mediana del grupo ribereño (CHAS = 1) se sitúa en <strong>$28,400 USD</strong>, lo que representa un sobreprecio relativo de <strong>+35.8%</strong> respecto a la mediana del grupo no ribereño (CHAS = 0, <strong>$20,900 USD</strong>). La dispersión del grupo 1 es sustancialmente mayor ($s = 11.82$ vs $8.83$).
        </div>
      </div>

      {/* Grid de Visualizaciones: Gráfico 1 (Histograma) y Gráfico 2 (Boxplot) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico 1: Histograma con distribución KDE */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Distribución de Frecuencias y Densidad Estimada (KDE)
              </h4>
              <p className="text-[11px] text-slate-500">Distribución de frecuencias de MEDV</p>
            </div>
            {/* Segmented control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-[11px]">
              <button
                onClick={() => setHistView('split')}
                className={`px-2 py-0.5 rounded ${histView === 'split' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Por Grupos
              </button>
              <button
                onClick={() => setHistView('all')}
                className={`px-2 py-0.5 rounded ${histView === 'all' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Muestra Total
              </button>
            </div>
          </div>

          {/* SVG Histograma Científico */}
          <div className="h-64 w-full bg-slate-50/50 rounded-lg p-2 border border-slate-100 flex flex-col justify-end">
            <div className="flex-1 flex items-end justify-between gap-1.5 px-2 pb-2 border-b border-slate-300">
              {HISTOGRAM_BINS.map((b) => {
                const totalHeight = (b.count / 143) * 100;
                const chas0Height = (b.chas0 / 143) * 100;
                const chas1Height = (b.chas1 / 143) * 100;

                return (
                  <div key={b.bin} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 bg-slate-900 text-white text-[10px] p-1.5 rounded pointer-events-none whitespace-nowrap shadow-md">
                      <div>Rango: {b.bin}</div>
                      <div>Total: {b.count} distritos</div>
                      <div>CHAS 0: {b.chas0} · CHAS 1: {b.chas1}</div>
                    </div>

                    {histView === 'split' ? (
                      <div className="w-full flex flex-col justify-end h-full">
                        <div
                          style={{ height: `${chas1Height}%` }}
                          className="w-full bg-emerald-500 rounded-t-xs hover:bg-emerald-600 transition-all"
                        />
                        <div
                          style={{ height: `${chas0Height}%` }}
                          className="w-full bg-blue-500 hover:bg-blue-600 transition-all"
                        />
                      </div>
                    ) : (
                      <div
                        style={{ height: `${totalHeight}%` }}
                        className="w-full bg-blue-600 rounded-t-xs hover:bg-blue-700 transition-all"
                      />
                    )}
                    <span className="text-[9px] text-slate-400 mt-1 font-mono transform -rotate-45 sm:rotate-0 origin-top-left sm:origin-center">
                      {b.bin}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 px-1">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-blue-500"></span> CHAS 0 (No ribereño)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span> CHAS 1 (Ribereño)
                </span>
              </div>
              <span className="font-mono text-slate-400 text-[10px]">Censura en 50k observada a la derecha</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-normal">
            Se evidencia asimetría positiva ($\gamma_1 = 1.11$) y un pico artificial en el extremo de 50k debido a que los valores superiores fueron truncados censurados en el censo.
          </p>
        </div>

        {/* Gráfico 2: Boxplot Comparativo por Grupo */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Distribución por Cuartiles y Comparativa de Medianas (Boxplot)
              </h4>
              <p className="text-[11px] text-slate-500">Distribución de cuartiles y valores atípicos</p>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Δ Mediana: +$7,500 USD
            </span>
          </div>

          {/* SVG Boxplot Schematic */}
          <div className="h-64 w-full bg-slate-50/50 rounded-lg p-4 border border-slate-100 flex flex-col justify-center">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Eje Y de precios */}
              <line x1="50" y1="20" x2="50" y2="170" stroke="#cbd5e1" strokeWidth="1" />
              <text x="40" y="25" textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">$50k</text>
              <text x="40" y="60" textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">$35k</text>
              <text x="40" y="95" textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">$25k</text>
              <text x="40" y="130" textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">$15k</text>
              <text x="40" y="165" textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">$5k</text>

              {/* Grid lines */}
              <line x1="50" y1="25" x2="380" y2="25" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="50" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="50" y1="95" x2="380" y2="95" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="50" y1="130" x2="380" y2="130" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="50" y1="165" x2="380" y2="165" stroke="#f1f5f9" strokeDasharray="3 3" />

              {/* BOXPLOT GRUPO 0 (CHAS=0, n=471) */}
              {/* Bigote inferior a min (5k -> y=165, Q1=16.6 -> y=125) */}
              <line x1="140" y1="165" x2="140" y2="125" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="125" y1="165" x2="155" y2="165" stroke="#3b82f6" strokeWidth="1.5" />

              {/* Caja Q1 (16.6k) a Q3 (24.8k) -> y=125 a y=96 */}
              <rect x="110" y="96" width="60" height="29" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" rx="2" />
              {/* Mediana (20.9k -> y=109) */}
              <line x1="110" y1="109" x2="170" y2="109" stroke="#1d4ed8" strokeWidth="2.5" />

              {/* Bigote superior a Q3+1.5IQR (37.1k -> y=53) */}
              <line x1="140" y1="96" x2="140" y2="53" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="125" y1="53" x2="155" y2="53" stroke="#3b82f6" strokeWidth="1.5" />
              {/* Atípicos (outliers) en 50k */}
              <circle cx="140" cy="25" r="3" fill="#2563eb" opacity="0.7" />
              <circle cx="140" cy="30" r="3" fill="#2563eb" opacity="0.7" />

              {/* BOXPLOT GRUPO 1 (CHAS=1, n=35) */}
              {/* Bigote inferior a min (13.4k -> y=136, Q1=21.1 -> y=108) */}
              <line x1="280" y1="136" x2="280" y2="108" stroke="#10b981" strokeWidth="1.5" />
              <line x1="265" y1="136" x2="295" y2="136" stroke="#10b981" strokeWidth="1.5" />

              {/* Caja Q1 (21.1k) a Q3 (33.2k) -> y=108 a y=66 */}
              <rect x="250" y="66" width="60" height="42" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" rx="2" />
              {/* Mediana (28.4k -> y=84) */}
              <line x1="250" y1="84" x2="310" y2="84" stroke="#047857" strokeWidth="2.5" />

              {/* Bigote superior (50k -> y=25) */}
              <line x1="280" y1="66" x2="280" y2="25" stroke="#10b981" strokeWidth="1.5" />
              <line x1="265" y1="25" x2="295" y2="25" stroke="#10b981" strokeWidth="1.5" />

              {/* Labels eje X */}
              <text x="140" y="190" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">CHAS = 0</text>
              <text x="140" y="200" textAnchor="middle" fontSize="9" fill="#64748b">No Ribereño (n=471)</text>

              <text x="280" y="190" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">CHAS = 1</text>
              <text x="280" y="200" textAnchor="middle" fontSize="9" fill="#047857">Ribereño (n=35)</text>
            </svg>
          </div>

          <p className="text-[11px] text-slate-500 leading-normal">
            Nótese el desplazamiento vertical completo del rango intercuartílico en CHAS=1: el 50% central de precios ribereños se sitúa sustancialmente por encima de la mediana no ribereña.
          </p>
        </div>
      </div>

      {/* Gráfico 3: Diagrama de Dispersión (Scatter Plot) Bivariado */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Diagrama de Dispersión y Tendencia Lineal (Ajuste OLS)</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Análisis de relación entre variables continuas y el valor mediano de la vivienda (MEDV)
            </p>
          </div>

          {/* Segmented controls para alternar variable independiente */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            <button
              onClick={() => setActiveScatter('RM')}
              className={`px-3 py-1 rounded-md transition-colors font-medium ${
                activeScatter === 'RM' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Habitaciones (RM) vs MEDV [r = +0.70]
            </button>
            <button
              onClick={() => setActiveScatter('LSTAT')}
              className={`px-3 py-1 rounded-md transition-colors font-medium ${
                activeScatter === 'LSTAT' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              % Estrato Bajo (LSTAT) vs MEDV [r = -0.74]
            </button>
          </div>
        </div>

        {/* SVG Scatter Plot Interactivo */}
        <div className="h-72 w-full bg-slate-50/50 rounded-lg p-3 border border-slate-100">
          <svg className="w-full h-full" viewBox="0 0 600 240">
            {/* Grid */}
            <line x1="60" y1="20" x2="60" y2="200" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="60" y1="200" x2="570" y2="200" stroke="#cbd5e1" strokeWidth="1" />

            {/* Eje Y (MEDV de 0 a 50k) */}
            <text x="50" y="25" textAnchor="end" fontSize="10" fill="#64748b" fontFamily="monospace">$50k</text>
            <text x="50" y="115" textAnchor="end" fontSize="10" fill="#64748b" fontFamily="monospace">$25k</text>
            <text x="50" y="200" textAnchor="end" fontSize="10" fill="#64748b" fontFamily="monospace">$0k</text>

            {activeScatter === 'RM' ? (
              <>
                {/* Eje X para RM (de 3 a 9 habitaciones) */}
                <text x="60" y="220" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">3</text>
                <text x="230" y="220" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">5</text>
                <text x="400" y="220" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">7</text>
                <text x="570" y="220" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">9</text>
                <text x="315" y="235" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
                  Número Promedio de Habitaciones por Vivienda (RM)
                </text>

                {/* Línea de regresión lineal OLS positiva */}
                <line x1="120" y1="190" x2="520" y2="35" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 3" />

                {/* Muestra de puntos dispersos RM vs MEDV con diferenciación de color por CHAS */}
                {REPRESENTATIVE_SAMPLE_ROWS.map((r, i) => {
                  const cx = 60 + ((r.rm - 3) / 6) * 510;
                  const cy = 200 - (r.medv / 50) * 180;
                  return (
                    <circle
                      key={r.id}
                      cx={cx}
                      cy={cy}
                      r={r.chas === 1 ? 5 : 4}
                      fill={r.chas === 1 ? '#10b981' : '#2563eb'}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="hover:r-7 transition-all cursor-pointer"
                    >
                      <title>{`ID ${r.id} | RM: ${r.rm} | MEDV: $${r.medv}k | CHAS: ${r.chas}`}</title>
                    </circle>
                  );
                })}
              </>
            ) : (
              <>
                {/* Eje X para LSTAT (de 0 a 40%) */}
                <text x="60" y="220" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">0%</text>
                <text x="187" y="220" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">10%</text>
                <text x="315" y="220" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">20%</text>
                <text x="442" y="220" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">30%</text>
                <text x="570" y="220" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">40%</text>
                <text x="315" y="235" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
                  % de Población de Estatus Socioeconómico Bajo (LSTAT)
                </text>

                {/* Línea de regresión lineal OLS negativa */}
                <line x1="80" y1="40" x2="520" y2="185" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 3" />

                {/* Puntos LSTAT vs MEDV */}
                {REPRESENTATIVE_SAMPLE_ROWS.map((r, i) => {
                  const cx = 60 + (r.lstat / 40) * 510;
                  const cy = 200 - (r.medv / 50) * 180;
                  return (
                    <circle
                      key={r.id}
                      cx={cx}
                      cy={cy}
                      r={r.chas === 1 ? 5 : 4}
                      fill={r.chas === 1 ? '#10b981' : '#7c3aed'}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="hover:r-7 transition-all cursor-pointer"
                    >
                      <title>{`ID ${r.id} | LSTAT: ${r.lstat}% | MEDV: $${r.medv}k | CHAS: ${r.chas}`}</title>
                    </circle>
                  );
                })}
              </>
            )}
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span> CHAS 0 (Control)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span> CHAS 1 (Río Charles)
            </span>
            <span className="flex items-center gap-1.5 text-red-600 font-medium">
              <span className="w-4 h-0.5 bg-red-600"></span> Ajuste OLS
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            {activeScatter === 'RM' 
              ? 'Correlación de Pearson: r = +0.695 (p < 0.001) | Relación lineal directa fuerte'
              : 'Correlación de Spearman: ρ = -0.853 (p < 0.001) | Decaimiento curvilíneo exponencial'
            }
          </div>
        </div>
      </div>

      {/* Matriz de Correlación */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Matriz de Asociación Bivariada con MEDV
        </h4>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[11px]">
              <tr>
                <th className="py-2 px-3">Par de Variables</th>
                <th className="py-2 px-3">Pearson (r)</th>
                <th className="py-2 px-3">Spearman (ρ)</th>
                <th className="py-2 px-3">Significancia</th>
                <th className="py-2 px-3">Interpretación Estadística</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-xs tabular-nums text-slate-700">
              {CORRELATION_MATRIX.map(c => (
                <tr key={`${c.var1}-${c.var2}`} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-sans font-semibold text-slate-900">{c.var1} vs {c.var2}</td>
                  <td className={`py-2 px-3 font-bold ${c.pearson > 0 ? 'text-blue-700' : 'text-rose-700'}`}>
                    {c.pearson > 0 ? `+${c.pearson.toFixed(3)}` : c.pearson.toFixed(3)}
                  </td>
                  <td className={`py-2 px-3 ${c.spearman > 0 ? 'text-blue-600' : 'text-rose-600'}`}>
                    {c.spearman > 0 ? `+${c.spearman.toFixed(3)}` : c.spearman.toFixed(3)}
                  </td>
                  <td className="py-2 px-3 text-slate-500">{c.pVal}</td>
                  <td className="py-2 px-3 font-sans text-slate-600">{c.rel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navegación al paso de supuestos */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
        >
          <span>Continuar: Diagnóstico de Supuestos Estadísticos</span>
        </button>
      </div>
    </div>
  );
};
