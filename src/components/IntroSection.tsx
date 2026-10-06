/**
 * Introducción del Estudio
 * Presentación conceptual y justificación metodológica del análisis
 */
import React from 'react';
import { Target, Compass, BrainCircuit, ArrowRight } from 'lucide-react';

interface IntroProps {
  onNext: () => void;
}

export const IntroSection: React.FC<IntroProps> = ({ onNext }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Encabezado editorial natural */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
          Fundamentos Metodológicos
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Introducción y Contexto del Análisis
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Marco conceptual del estudio, fundamentos de la inferencia estadística para la toma de decisiones y contextualización del mercado residencial en el área metropolitana de Boston.
        </p>
      </div>

      {/* Tarjetas articuladas de fundamentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Propósito */}
        <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-600 block uppercase tracking-wide">
                Enfoque del Estudio
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Propósito de la Investigación
              </h3>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            El propósito fundamental de esta investigación es <strong>analizar de manera cuantitativa y rigurosa el impacto del entorno paisajístico fluvial en la valoración de la vivienda</strong>. Mediante la integración de estadística descriptiva univariada y bivariada con pruebas inferenciales de contraste de hipótesis, se determina si la proximidad al río Charles genera una prima de precio real y estadísticamente significativa frente a los distritos interiores.
          </p>
          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            Todo el procedimiento analítico se acompaña de código reproducible en Python, garantizando trazabilidad completa desde la carga del conjunto de datos hasta las conclusiones finales.
          </p>
        </div>

        {/* Relevancia de la Inferencia */}
        <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-600 block uppercase tracking-wide">
                Rigor Epistemológico
              </span>
              <h3 className="text-base font-bold text-slate-900">
                La Inferencia en la Toma de Decisiones
              </h3>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Mientras que el resumen descriptivo se limita a sintetizar los valores registrados en una muestra específica, <strong>el análisis inferencial cuantifica la incertidumbre probabilística</strong> asociada a los datos y permite extrapolar conclusiones confiables hacia la población de referencia.
          </p>
          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            En el ámbito del diseño de políticas urbanas, la valuación catastral y el desarrollo de sistemas predictivos de inteligencia artificial, la inferencia asegura que las decisiones se sustenten en diferencias sistemáticas reales y no en simples artefactos o fluctuaciones aleatorias del muestreo.
          </p>
        </div>
      </div>

      {/* Contexto del Dataset y Problema */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4 text-blue-600" />
          <span>El Conjunto de Datos & Contexto Urbano</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Boston Housing Dataset: Amenidades Ambientales y Precios Residenciales
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          El conjunto de datos <strong>Boston Housing</strong> recopila información socioeconómica, estructural y ambiental de 506 distritos censales de Boston (Harrison & Rubinfeld, 1978). En este estudio se analiza si la condición geográfica de limitar directamente con el río Charles constituye un factor determinante en el valor mediano de los inmuebles:
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-900 block mb-1">Premisa Económica:</span>
            Los inmuebles ubicados en la ribera del río Charles disfrutan de ventajas escénicas, menor densidad y amenidades de esparcimiento que deberían reflejarse en precios superiores.
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-900 block mb-1">Estructura Muestral:</span>
            El subgrupo ribereño comprende solo el 6.9% ($n_1=35$) frente al 93.1% ($n_0=471$) del grupo interior, con marcada asimetría de precios y censura superior en 50,000 USD.
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-900 block mb-1">Enfoque Metodológico:</span>
            Verificación empírica de supuestos de normalidad y homocedasticidad para seleccionar de manera justificada la prueba estadística de contraste más robusta.
          </div>
        </div>
      </div>

      {/* Botón de navegación */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
        >
          <span>Continuar: Formulación del Problema e Hipótesis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
