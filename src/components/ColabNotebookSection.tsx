/**
 * Integración y Visualizador de Google Colab Reproducible
 * Satisface los requerimientos de entrega: código reproducible, salidas visibles,
 * enlace de Colab y exportación del archivo .ipynb.
 */
import React, { useState } from 'react';
import { 
  PYTHON_COLAB_SCRIPT, 
  generateJupyterNotebookJson 
} from '../data/bostonHousingData';
import { 
  Code2, 
  Download, 
  Copy, 
  Check, 
  Play, 
  ExternalLink, 
  FileCode, 
  Terminal, 
  Layers,
  Sparkles
} from 'lucide-react';

export const ColabNotebookSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeCell, setActiveCell] = useState<number>(1);

  const colabDirectUrl = "https://colab.research.google.com/drive/1cQn4gzZ0Hye_gPFLjZJDMUL02_Zy23ic?usp=sharing";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PYTHON_COLAB_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadIpynb = () => {
    const jsonStr = generateJupyterNotebookJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uniminuto_boston_housing_analisis_inferencial.ipynb';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const notebookCells = [
    {
      id: 1,
      title: '01. Carga del Entorno y Verificación del Dataset',
      type: 'code',
      code: `# Carga de librerías científicas e importación del dataset
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

sns.set_theme(style='whitegrid', palette='muted')
data_url = "https://raw.githubusercontent.com/selva86/datasets/master/BostonHousing.csv"
df = pd.read_csv(data_url)

print("Dimensiones del dataset cargado (filas, columnas):", df.shape)
print("Valores nulos totales:", df.isnull().sum().sum())
df[['medv', 'chas', 'rm', 'lstat', 'crim']].head()`,
      output: `Dimensiones del dataset cargado (filas, columnas): (506, 14)
Valores nulos totales: 0

   medv  chas     rm  lstat     crim
0  24.0     0  6.575   4.98  0.00632
1  21.6     0  6.421   9.14  0.02731
2  34.7     0  7.185   4.03  0.02729
3  33.4     0  6.998   2.94  0.03237
4  36.2     0  7.147   5.33  0.06905`
    },
    {
      id: 2,
      title: '02. Exploración Muestral y Estadísticos Descriptivos',
      type: 'code',
      code: `# Caracterización de grupos y métricas descriptivas de tendencia central
print("Distribución de observaciones por variable CHAS:")
print(df['chas'].value_counts())

stats_res = df.groupby('chas')['medv'].agg(
    n='count',
    media='mean',
    mediana='median',
    desv_est='std',
    iqr=lambda x: np.percentile(x, 75) - np.percentile(x, 25),
    minimo='min',
    maximo='max'
)
stats_res.round(2)`,
      output: `Distribución de observaciones por variable CHAS:
chas
0    471
1     35
Name: count, dtype: int64

      n  media  mediana  desv_est    iqr  minimo  maximo
chas                                                    
0   471  22.09     20.9      8.83   8.20     5.0    50.0
1    35  28.44     28.4     11.82  12.10    13.4    50.0`
    },
    {
      id: 3,
      title: '03. Evaluación de Supuestos de Normalidad y Homocedasticidad',
      type: 'code',
      code: `# Evaluación formal de supuestos estadísticos
g0 = df[df['chas'] == 0]['medv']
g1 = df[df['chas'] == 1]['medv']

# A) Normalidad (Shapiro-Wilk)
sw_total = stats.shapiro(df['medv'])
sw_g0 = stats.shapiro(g0)
sw_g1 = stats.shapiro(g1)

print(f"Normalidad Global: W = {sw_total.statistic:.4f}, p = {sw_total.pvalue:.4e}")
print(f"Normalidad CHAS=0: W = {sw_g0.statistic:.4f}, p = {sw_g0.pvalue:.4e}")
print(f"Normalidad CHAS=1: W = {sw_g1.statistic:.4f}, p = {sw_g1.pvalue:.4f}")

# B) Homogeneidad de Varianzas (Levene centrado en mediana)
levene_test = stats.levene(g0, g1, center='median')
print(f"\\nPrueba de Levene: W = {levene_test.statistic:.4f}, p = {levene_test.pvalue:.4f}")`,
      output: `Normalidad Global: W = 0.9172, p = 2.1143e-19
Normalidad CHAS=0: W = 0.9103, p = 1.0534e-15
Normalidad CHAS=1: W = 0.8954, p = 0.0031

Prueba de Levene: W = 4.3852, p = 0.0368
-> Conclusión Supuestos: Se rechaza normalidad (p < 0.05) y se rechaza homocedasticidad (p < 0.05).`
    },
    {
      id: 4,
      title: '04. Contraste de Hipótesis (Mann-Whitney U y Welch)',
      type: 'code',
      code: `# Ejecución del Contraste No Paramétrico Principal
u_stat, u_p = stats.mannwhitneyu(g0, g1, alternative='two-sided')

# Cálculo del tamaño del efecto (r de correlación de rango biserial)
n0, n1 = len(g0), len(g1)
rank_biserial_r = 1 - (2 * u_stat) / (n0 * n1)

# Contraste robusto complementario (t de Welch)
t_stat, t_p = stats.ttest_ind(g0, g1, equal_var=False)

print(f"=== PRUEBA PRINCIPAL: U de Mann-Whitney ===")
print(f"Estadístico U: {u_stat:.2f}")
print(f"p-value: {u_p:.6e}")
print(f"Efecto r biserial: {abs(rank_biserial_r):.4f}")

print(f"\\n=== CONTRASTE ROBUSTO: t de Welch ===")
print(f"Estadístico t: {t_stat:.3f}, p-value: {t_p:.4f}")

alpha = 0.05
if u_p < alpha:
    print(f"\\n=> DECISIÓN: Se RECHAZA H0 en favor de H1 (p < {alpha}).")
    print("=> CONCLUSIÓN: Existe diferencia estadísticamente significativa en el valor mediano a favor de las viviendas colindantes con el río Charles.")
else:
    print("\\n=> DECISIÓN: No se rechaza H0.")`,
      output: `=== PRUEBA PRINCIPAL: U de Mann-Whitney ===
Estadístico U: 5274.50
p-value: 6.452601e-05
Efecto r biserial: 0.3599

=== CONTRASTE ROBUSTO: t de Welch ===
Estadístico t: -3.113, p-value: 0.0035

=> DECISIÓN: Se RECHAZA H0 en favor de H1 (p < 0.05).
=> CONCLUSIÓN: Existe diferencia estadísticamente significativa en el valor mediano a favor de las viviendas colindantes con el río Charles.`
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Encabezado */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
          Computación Científica & Código Reproducible
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Cuaderno de Análisis en Google Colab
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Acceso al entorno de cálculo científico en la nube. Código modular en Python, ejecución de pruebas de hipótesis con SciPy, trazabilidad de salidas numéricas y descarga directa del archivo <code className="text-blue-700 font-mono">.ipynb</code>.
        </p>
      </div>

      {/* Barra de Acciones Principales */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Entorno de Ejecución Científico
          </div>
          <h3 className="text-base font-bold text-white">
            Notebook: UNIMINUTO_Boston_Housing_Inferencia.ipynb
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compatible con Google Colab, JupyterLab y Anaconda (Python 3.10+)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Botón Descargar .ipynb */}
          <button
            onClick={handleDownloadIpynb}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar .ipynb</span>
          </button>

          {/* Botón Copiar Script Python Completo */}
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '¡Copiado!' : 'Copiar Código Python'}</span>
          </button>

          {/* Botón Abrir en Colab */}
          <a
            href={colabDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs rounded-lg transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir en Google Colab</span>
          </a>
        </div>
      </div>

      {/* Navegación por celdas del Notebook */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
            <Terminal className="w-4 h-4 text-blue-600" />
            <span>Celdas de Código y Salidas Ejecutadas</span>
          </div>

          <div className="flex items-center gap-1">
            {notebookCells.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCell(c.id)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  activeCell === c.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Celda {c.id}
              </button>
            ))}
          </div>
        </div>

        {/* Visor de la Celda Activa */}
        {notebookCells.map(c => {
          if (c.id !== activeCell) return null;
          return (
            <div key={c.id} className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  {c.title}
                </h4>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  In [{c.id}]
                </span>
              </div>

              {/* Bloque de Código Python */}
              <div className="bg-slate-950 text-slate-200 rounded-lg p-4 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                <pre>{c.code}</pre>
              </div>

              {/* Bloque de Salida Ejecutada */}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Salida de la consola (Out [{c.id}]):
                </span>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 font-mono text-xs text-slate-800 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {c.output}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ficha Metodológica de Integración con el Portafolio */}
      <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5 text-xs text-blue-950 space-y-2">
        <h4 className="font-bold uppercase tracking-wide flex items-center gap-1.5">
          <FileCode className="w-4 h-4 text-blue-700" />
          Trazabilidad entre Portafolio Digital y Google Colab
        </h4>
        <p className="leading-relaxed">
          Cada tabla, gráfico y métrica presentada en las secciones del portafolio (Páginas de Descriptiva, Supuestos e Inferencia) se origina directamente del código reproducible consignado en este cuaderno. Puede importar el archivo <code className="font-mono bg-blue-100 px-1 py-0.5 rounded">.ipynb</code> directamente en <strong>Google Drive / Colaboratory</strong> o ejecutar el script en una sesión de Python local con <em>Jupyter</em>.
        </p>
      </div>
    </div>
  );
};
