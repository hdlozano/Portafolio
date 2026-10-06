/**
 * Paso 9: Conclusiones, Limitaciones y Proyecciones Futuras
 * Cumple con la reflexión argumentada exigida en la Rúbrica (Criterio 4 y Paso 9)
 */
import React from 'react';
import { 
  Lightbulb, 
  AlertOctagon, 
  Compass, 
  BookMarked, 
  CheckCircle, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ConclusionsProps {
  onNavigateToColab: () => void;
  onNavigateToRefs: () => void;
}

export const ConclusionsSection: React.FC<ConclusionsProps> = ({ 
  onNavigateToColab,
  onNavigateToRefs 
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Encabezado */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
          Discusión y Conclusiones
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Conclusiones, Limitaciones y Proyecciones Analíticas
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Reflexión argumentada sobre los aprendizajes metodológicos derivados de la validación de supuestos, análisis crítico de las limitaciones estructurales del Boston Housing Dataset y horizontes de modelado avanzado.
        </p>
      </div>

      {/* Los 3 Ejes Obligatorios de la Rúbrica en Tarjetas Estructuradas */}
      <div className="space-y-6">
        {/* Eje 1: Aprendizaje sobre Supuestos Estadísticos */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Aprendizaje Metodológico
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Aprendizaje Respecto a los Supuestos Estadísticos
              </h3>
            </div>
          </div>

          <div className="text-sm text-slate-700 space-y-2.5 leading-relaxed pl-13">
            <p>
              El principal aprendizaje metodológico radicó en comprender que <strong>los supuestos estadísticos no constituyen meros trámites formales, sino los garantes de la validez inferencial</strong>. En la práctica profesional del científico de datos, aplicar de forma refleja la prueba $t$ de Student o un modelo lineal OLS sin comprobar normalidad ni homocedasticidad conduce con frecuencia a errores Tipo I (falsos positivos) o Tipo II (falsos negativos).
            </p>
            <p>
              En el Boston Housing dataset se demostró que $MEDV$ exhibe una asimetría positiva marcada ($\gamma_1 = 1.11$) y un truncamiento superior en 50k que invalida la hipótesis gaussiana (Shapiro-Wilk $p &lt; 0.0001$). Asimismo, la prueba de Levene evidenció heterocedasticidad ($s_1^2 \approx 1.8 \cdot s_0^2$). La verificación previa de estos supuestos justificó la adopción de la <strong>Prueba U de Mann-Whitney</strong>, garantizando conclusiones científicas reproducibles e inmunes a distorsiones por valores atípicos.
            </p>
          </div>
        </div>

        {/* Eje 2: Limitaciones del Dataset */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Evaluación Crítica
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Limitaciones Estructurales y Éticas del Dataset
              </h3>
            </div>
          </div>

          <div className="text-sm text-slate-700 space-y-2.5 leading-relaxed pl-13">
            <p>
              1. <strong>Censura Artificial Superior (Ceiling Effect):</strong> La variable dependiente $MEDV$ fue truncada artificialmente en 50,000 USD por los encuestadores del censo de 1970. Esta censura genera un acumulamiento no natural en el percentil superior, truncando la varianza real de las propiedades de lujo.
            </p>
            <p>
              2. <strong>Desbalance de Grupos Fluviales:</strong> El grupo ribereño representa únicamente el 6.92% ($n_1=35$) frente al 93.08% ($n_0=471$) no ribereño, reduciendo la potencia estadística para detectar interacciones sutiles con otras covariables.
            </p>
            <p>
              3. <strong>Sesgo Histórico y Variables Cuestionadas:</strong> El dataset data de 1978 (estudio de Harrison & Rubinfeld sobre demanda de aire limpio). Incluye la variable $B = 1000(Bk - 0.63)^2$, que mide la proporción de residentes afrodescendientes con supuestos implícitos hoy reconocidos como problemáticos y éticamente desactualizados en el contexto moderno de IA ética.
            </p>
          </div>
        </div>

        {/* Eje 3: Análisis Adicionales y Mejoras Futuras */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Proyecciones Analíticas
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Líneas de Investigación y Modelos Futuros
              </h3>
            </div>
          </div>

          <div className="text-sm text-slate-700 space-y-2.5 leading-relaxed pl-13">
            <p>
              1. <strong>Modelos Econométricos Espaciales (Spatial Autoregressive Models - SAR):</strong> El precio de una vivienda depende espacialmente del precio de sus vecinos contiguos (autocorrelación espacial positiva, Moran's $I$). Modelar matrices de contigüidad geográfica permitiría aislar con mayor precisión el efecto neto del río frente al efecto de vecindario.
            </p>
            <p>
              2. <strong>Regresión Tobit para Datos Censurados:</strong> Para corregir la censura en 50k USD, un modelo Tobit de estimación por máxima verosimilitud modelaría adecuadamente la variable latente no censurada.
            </p>
            <p>
              3. <strong>Modelos de Machine Learning Interpretable (XGBoost + SHAP):</strong> Implementar modelos basados en árboles de gradiente impulsado para capturar efectos no lineales (como la fuerte curvatura de $LSTAT$) y descomponer las contribuciones marginales mediante valores de Shapley (SHAP).
            </p>
          </div>
        </div>
      </div>

      {/* Acciones de Cierre */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={onNavigateToRefs}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors"
        >
          <BookMarked className="w-4 h-4 text-blue-600" />
          <span>Consultar Referencias en Formato APA</span>
        </button>

        <button
          onClick={onNavigateToColab}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
        >
          <span>Ir al Código Reproducible en Google Colab</span>
        </button>
      </div>
    </div>
  );
};
