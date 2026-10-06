/**
 * Paso 2, 3 y 4: Planteamiento del Problema, Hipótesis, Variables y Muestra
 */
import React, { useState } from 'react';
import { DATASET_VARIABLES, DESCRIPTIVE_STATS } from '../data/bostonHousingData';
import { HelpCircle, CheckCircle, Database, Split, Filter, Scale } from 'lucide-react';

interface ProblemProps {
  onNext: () => void;
}

export const ProblemHypothesisSection: React.FC<ProblemProps> = ({ onNext }) => {
  const [filterRole, setFilterRole] = useState<'Todos' | 'Dependiente' | 'Independiente' | 'Covariable / Control'>('Todos');

  const filteredVars = filterRole === 'Todos' 
    ? DATASET_VARIABLES 
    : DATASET_VARIABLES.filter(v => v.role === filterRole);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Encabezado */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
          Metodología & Operacionalización
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Formulación del Problema, Hipótesis y Caracterización Muestral
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Definición formal de la pregunta investigable, formulación rigurosa de las hipótesis estadísticas (H₀ y H₁), taxonomía de variables y estructura de los grupos bajo contraste.
        </p>
      </div>

      {/* Tarjeta de Pregunta Investigable e Hipótesis */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Pregunta Central de Investigación</span>
          </div>
          <p className="text-base sm:text-lg font-semibold text-slate-900 bg-blue-50/60 p-4 rounded-lg border-l-4 border-blue-600">
            ¿Existe una diferencia estadísticamente significativa en el valor mediano de las viviendas de propietarios (MEDV) entre los distritos que limitan con el río Charles (CHAS = 1) y aquellos que no limitan con él (CHAS = 0)?
          </p>
        </div>

        {/* Estructura formal de Hipótesis H0 y H1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Hipótesis Nula H0 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                Hipótesis Nula (H₀)
              </span>
              <span className="text-xs font-mono text-slate-500">μ₁ = μ₀ o F₁(x) = F₀(x)</span>
            </div>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              <strong>H₀:</strong> No existe diferencia estadísticamente significativa en el valor mediano de las viviendas entre las propiedades colindantes con el río Charles y aquellas alejadas del río. Cualquier variación observada es atribuible al azar muestral.
            </p>
            <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
              Formulación no paramétrica: Las funciones de distribución de precios en ambos subgrupos son estocásticamente idénticas.
            </div>
          </div>

          {/* Hipótesis Alternativa H1 */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-200 px-2 py-0.5 rounded">
                Hipótesis Alternativa (H₁)
              </span>
              <span className="text-xs font-mono text-blue-600">μ₁ ≠ μ₀ o F₁(x) ≠ F₀(x)</span>
            </div>
            <p className="text-sm text-slate-800 font-medium leading-relaxed">
              <strong>H₁:</strong> Existe una diferencia estadísticamente significativa en el valor mediano de las viviendas entre las zonas con proximidad paisajística al río Charles y aquellas sin colindancia ribereña.
            </p>
            <div className="text-[11px] text-blue-700 pt-1 border-t border-blue-200">
              Direccionalidad empírica: Se espera un sobreprecio en los distritos con amenidad ambiental (Charles River dummy = 1).
            </div>
          </div>
        </div>
      </div>

      {/* Clasificación de Variables */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
              <Scale className="w-4 h-4 text-blue-600" />
              <span>Taxonomía y Clasificación de Variables</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Identificación precisa de la variable dependiente (target continuo), variable independiente (factor dicotómico) y covariables.
            </p>
          </div>

          {/* Controles de filtro interactivos (functional tabs) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            {(['Todos', 'Dependiente', 'Independiente', 'Covariable / Control'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterRole(tab)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  filterRole === tab
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla descriptiva de variables */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Variable</th>
                <th className="py-2.5 px-3">Rol Metodológico</th>
                <th className="py-2.5 px-3">Tipo de Variable</th>
                <th className="py-2.5 px-3">Unidad de Medida</th>
                <th className="py-2.5 px-3">Definición Operacional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-600">
              {filteredVars.map(v => (
                <tr key={v.name} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{v.name}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      v.role === 'Dependiente' 
                        ? 'bg-blue-100 text-blue-800' 
                        : v.role === 'Independiente' 
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {v.role}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">{v.type}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">{v.unit}</td>
                  <td className="py-2.5 px-3">{v.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Muestra y Tamaño de Grupos */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
          <Split className="w-4 h-4 text-emerald-600" />
          <span>Caracterización de la Muestra y Estructura Grupal</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs text-slate-500 font-medium block">Muestra Total Validada (n)</span>
            <div className="text-3xl font-extrabold text-slate-900 font-mono mt-1">506</div>
            <p className="text-xs text-slate-500 mt-1">
              Distritos censales en la zona metropolitana de Boston (0 valores nulos o vacíos en el dataset).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs text-slate-500 font-medium block">Grupo 0: Sin Río (CHAS = 0)</span>
            <div className="text-3xl font-extrabold text-blue-600 font-mono mt-1">
              471 <span className="text-sm font-normal text-slate-500 font-sans">(93.08%)</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Distritos de control sin ribera fluvial directa. Gran representatividad territorial.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs text-slate-500 font-medium block">Grupo 1: Ribereño (CHAS = 1)</span>
            <div className="text-3xl font-extrabold text-emerald-600 font-mono mt-1">
              35 <span className="text-sm font-normal text-slate-500 font-sans">(6.92%)</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Distritos con lindero sobre el río Charles. Subgrupo minoritario de alto valor ambiental.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
          <Filter className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Criterio de Inclusión y Tratamiento Muestral:</strong> Se incluyen la totalidad de los 506 registros originales tras verificar integridad en tipos de dato (`float64` / `int64`) y ausencia de valores perdidos. El desbalance de tamaños muestrales (471 frente a 35, ratio 13.5:1) es considerado en la posterior justificación del test estadístico.
          </div>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
        >
          <span>Continuar: Estadística Descriptiva y Visualización</span>
        </button>
      </div>
    </div>
  );
};
