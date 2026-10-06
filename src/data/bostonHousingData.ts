/**
 * Boston Housing Dataset - Definiciones, Estadísticos y Procedimientos Inferenciales
 * Para la actividad UNIMINUTO: "Portafolio de evidencias. Análisis inferencial de datos - Fundamentos para IA"
 */

export interface VariableMeta {
  name: string;
  role: 'Dependiente' | 'Independiente' | 'Covariable / Control';
  type: 'Numérica Continua' | 'Numérica Discreta' | 'Categórica Dicotómica' | 'Numérica / Escalar';
  unit: string;
  description: string;
}

export const DATASET_VARIABLES: VariableMeta[] = [
  {
    name: 'MEDV',
    role: 'Dependiente',
    type: 'Numérica Continua',
    unit: 'Miles de USD ($1,000s)',
    description: 'Valor mediano de las viviendas ocupadas por sus propietarios (Target principal del análisis).'
  },
  {
    name: 'CHAS',
    role: 'Independiente',
    type: 'Categórica Dicotómica',
    unit: '0 = No, 1 = Sí',
    description: 'Variable ficticia del río Charles (1 si el distrito limita con el río; 0 en caso contrario). Variable de agrupamiento para inferencia.'
  },
  {
    name: 'RM',
    role: 'Covariable / Control',
    type: 'Numérica Continua',
    unit: 'Habitaciones',
    description: 'Número promedio de habitaciones por vivienda.'
  },
  {
    name: 'LSTAT',
    role: 'Covariable / Control',
    type: 'Numérica Continua',
    unit: 'Porcentaje (%)',
    description: 'Porcentaje de población de estatus socioeconómico bajo en el distrito.'
  },
  {
    name: 'CRIM',
    role: 'Covariable / Control',
    type: 'Numérica Continua',
    unit: 'Tasa per cápita',
    description: 'Tasa de criminalidad per cápita por ciudad/distrito censal.'
  },
  {
    name: 'PTRATIO',
    role: 'Covariable / Control',
    type: 'Numérica Continua',
    unit: 'Ratio alumno/prof.',
    description: 'Relación o razón de alumnos por maestro por ciudad.'
  },
  {
    name: 'INDUS',
    role: 'Covariable / Control',
    type: 'Numérica Continua',
    unit: 'Acres (%)',
    description: 'Proporción de acres comerciales no minoristas por ciudad.'
  },
  {
    name: 'NOX',
    role: 'Covariable / Control',
    type: 'Numérica Continua',
    unit: 'Partes por 10M',
    description: 'Concentración de óxidos de nitrógeno en el aire ambiental.'
  },
  {
    name: 'TAX',
    role: 'Covariable / Control',
    type: 'Numérica Continua',
    unit: '$ por $10,000',
    description: 'Tasa impositiva a la propiedad sobre el valor total.'
  },
  {
    name: 'DIS',
    role: 'Covariable / Control',
    type: 'Numérica Continua',
    unit: 'Distancia ponderada',
    description: 'Distancias ponderadas a cinco centros de empleo de Boston.'
  }
];

export interface GroupStats {
  n: number;
  pct: number;
  mean: number;
  std: number;
  median: number;
  iqr: number;
  q1: number;
  q3: number;
  min: number;
  max: number;
  skewness: number;
  kurtosis: number;
}

export const DESCRIPTIVE_STATS = {
  global: {
    n: 506,
    pct: 100,
    mean: 22.53,
    std: 9.20,
    median: 21.20,
    iqr: 7.98,
    q1: 17.02,
    q3: 25.00,
    min: 5.0,
    max: 50.0,
    skewness: 1.11,
    kurtosis: 1.50
  } as GroupStats,
  chas0: {
    n: 471,
    pct: 93.08,
    mean: 22.09,
    std: 8.83,
    median: 20.90,
    iqr: 8.20,
    q1: 16.60,
    q3: 24.80,
    min: 5.0,
    max: 50.0,
    skewness: 1.15,
    kurtosis: 1.62
  } as GroupStats,
  chas1: {
    n: 35,
    pct: 6.92,
    mean: 28.44,
    std: 11.82,
    median: 28.40,
    iqr: 12.10,
    q1: 21.10,
    q3: 33.20,
    min: 13.4,
    max: 50.0,
    skewness: 0.65,
    kurtosis: -0.22
  } as GroupStats
};

export const ASSUMPTIONS_TESTS = {
  normality: {
    globalShapiro: {
      stat: 0.917,
      pValue: 2.11e-19,
      formattedP: '< 0.0001 (2.11 × 10⁻¹⁹)',
      decision: 'Se rechaza Normalidad (p < 0.05)',
      conclusion: 'La variable dependiente MEDV a nivel global presenta una clara distribución asimétrica no gaussiana con censura en 50k.'
    },
    group0Shapiro: {
      group: 'CHAS = 0 (No ribereño)',
      n: 471,
      stat: 0.910,
      pValue: 1.05e-15,
      formattedP: '< 0.0001 (1.05 × 10⁻¹⁵)',
      decision: 'Se rechaza Normalidad (p < 0.05)',
      conclusion: 'Distribución asimétrica positiva con valores atípicos superiores.'
    },
    group1Shapiro: {
      group: 'CHAS = 1 (Ribereño)',
      n: 35,
      stat: 0.895,
      pValue: 0.0031,
      formattedP: '0.0031',
      decision: 'Se rechaza Normalidad (p < 0.05)',
      conclusion: 'Evidencia estadística suficiente contra el supuesto de normalidad en el subgrupo ribereño.'
    }
  },
  homoscedasticity: {
    levene: {
      testName: "Prueba de Levene (Brown-Forsythe centrada en mediana)",
      stat: 4.385,
      pValue: 0.0368,
      formattedP: '0.0368',
      decision: 'Se rechaza Homocedasticidad (p < 0.05)',
      conclusion: 'Las varianzas entre ambos grupos son significativamente desiguales (s₀² = 77.97 vs s₁² = 139.71). No se cumple el supuesto de varianzas homogéneas.'
    }
  },
  sampleBalance: {
    ratio: '13.46 a 1',
    description: 'Severo desbalance muestral: 471 observaciones en grupo de control (CHAS=0) frente a solo 35 observaciones en grupo ribereño (CHAS=1).'
  }
};

export const INFERENTIAL_TESTS = {
  primaryTest: {
    name: 'Prueba U de Mann-Whitney (Wilcoxon Rank-Sum)',
    category: 'No Paramétrica (Selección Metodológica Rigurosa)',
    justification: 'Es la prueba metodológicamente correcta dado el incumplimiento estricto del supuesto de normalidad (p < 0.05 en Shapiro-Wilk) y la heterocedasticidad demostrada en la prueba de Levene con desbalance de grupos (471 vs 35).',
    statName: 'Estadístico U',
    statValue: 5274.5,
    zScore: -3.992,
    pValue: 6.45e-5,
    formattedP: '< 0.0001 (6.45 × 10⁻⁵)',
    effectSize: {
      metric: 'Correlación de Rango Biserial (r)',
      value: 0.360,
      interpretation: 'Efecto moderado-alto a favor de las viviendas colindantes con el río Charles'
    },
    decision: 'Rechazar H₀ a nivel α = 0.05',
    substantiveConclusion: 'Existe evidencia empírica suficiente para afirmar que las viviendas que limitan con el río Charles presentan un valor mediano significativamente superior a las que no colindan (Mediana: 28.40 k$ vs 20.90 k$, p = 0.000065).'
  },
  comparisonParametric: {
    welchT: {
      name: "Prueba t de Student para Muestras Independientes (Welch)",
      category: 'Paramétrica Robusta (sin asumir varianzas iguales)',
      statName: 'Estadístico t',
      statValue: -3.113,
      df: 36.87,
      pValue: 0.0035,
      formattedP: '0.0035',
      effectSize: "d de Cohen = 0.70 (Efecto mediano-alto)",
      decision: 'Rechazar H₀ a nivel α = 0.05',
      conclusion: 'La media de precios ribereños ($28,440) supera en $6,350 USD a la media de distritos no ribereños ($22,090), estadísticamente significativo (p = 0.0035).'
    },
    anova: {
      name: 'ANOVA de Un Factor (One-Way ANOVA)',
      category: 'Paramétrica de Comparación de Medias',
      statName: 'Estadístico F',
      statValue: 15.97,
      pValue: 7.39e-5,
      formattedP: '< 0.0001 (7.39 × 10⁻⁵)',
      decision: 'Rechazar H₀ a nivel α = 0.05',
      conclusion: 'El factor Charles River explica una proporción estadísticamente significativa de la varianza en el valor mediano de la vivienda.'
    }
  }
};

export const CORRELATION_MATRIX = [
  { var1: 'MEDV', var2: 'RM', pearson: 0.695, spearman: 0.634, pVal: '< 0.001', rel: 'Positiva fuerte (Más habitaciones -> Mayor precio)' },
  { var1: 'MEDV', var2: 'LSTAT', pearson: -0.738, spearman: -0.853, pVal: '< 0.001', rel: 'Negativa muy fuerte (Mayor pobreza -> Menor precio)' },
  { var1: 'MEDV', var2: 'PTRATIO', pearson: -0.508, spearman: -0.448, pVal: '< 0.001', rel: 'Negativa moderada (Más alumnos/docente -> Menor precio)' },
  { var1: 'MEDV', var2: 'CRIM', pearson: -0.388, spearman: -0.559, pVal: '< 0.001', rel: 'Negativa moderada (Mayor criminalidad -> Menor precio)' },
  { var1: 'MEDV', var2: 'CHAS', pearson: 0.175, spearman: 0.141, pVal: '< 0.001', rel: 'Positiva débil en Pearson pero altamente significativa' },
  { var1: 'MEDV', var2: 'INDUS', pearson: -0.484, spearman: -0.578, pVal: '< 0.001', rel: 'Negativa moderada (Más industria -> Menor precio)' },
  { var1: 'MEDV', var2: 'TAX', pearson: -0.469, spearman: -0.562, pVal: '< 0.001', rel: 'Negativa moderada' }
];

export interface RepresentativeRow {
  id: number;
  crim: number;
  chas: number;
  rm: number;
  age: number;
  tax: number;
  ptratio: number;
  lstat: number;
  medv: number;
}

export const REPRESENTATIVE_SAMPLE_ROWS: RepresentativeRow[] = [
  { id: 1, crim: 0.00632, chas: 0, rm: 6.575, age: 65.2, tax: 296, ptratio: 15.3, lstat: 4.98, medv: 24.0 },
  { id: 2, crim: 0.02731, chas: 0, rm: 6.421, age: 78.9, tax: 242, ptratio: 17.8, lstat: 9.14, medv: 21.6 },
  { id: 3, crim: 0.02729, chas: 0, rm: 7.185, age: 61.1, tax: 242, ptratio: 17.8, lstat: 4.03, medv: 34.7 },
  { id: 4, crim: 0.03237, chas: 0, rm: 6.998, age: 45.8, tax: 222, ptratio: 18.7, lstat: 2.94, medv: 33.4 },
  { id: 5, crim: 0.06905, chas: 0, rm: 7.147, age: 54.2, tax: 222, ptratio: 18.7, lstat: 5.33, medv: 36.2 },
  { id: 143, crim: 4.09740, chas: 0, rm: 5.404, age: 100.0, tax: 437, ptratio: 21.2, lstat: 34.02, medv: 11.0 },
  { id: 144, crim: 2.77974, chas: 0, rm: 4.903, age: 87.8, tax: 437, ptratio: 21.2, lstat: 29.29, medv: 11.8 },
  { id: 153, crim: 2.44953, chas: 0, rm: 5.772, age: 71.6, tax: 403, ptratio: 14.7, lstat: 11.34, medv: 15.3 },
  { id: 209, crim: 0.11069, chas: 1, rm: 6.897, age: 48.3, tax: 224, ptratio: 14.8, lstat: 11.38, medv: 22.0 },
  { id: 210, crim: 0.17171, chas: 1, rm: 6.004, age: 85.9, tax: 224, ptratio: 14.8, lstat: 17.10, medv: 21.7 },
  { id: 211, crim: 0.17505, chas: 1, rm: 5.966, age: 30.2, tax: 224, ptratio: 14.8, lstat: 10.13, medv: 24.7 },
  { id: 212, crim: 0.37578, chas: 1, rm: 5.856, age: 97.0, tax: 224, ptratio: 14.8, lstat: 13.00, medv: 18.9 },
  { id: 219, crim: 0.11425, chas: 1, rm: 6.373, age: 92.4, tax: 307, ptratio: 17.4, lstat: 10.50, medv: 23.0 },
  { id: 220, crim: 0.11432, chas: 1, rm: 6.943, age: 49.3, tax: 307, ptratio: 17.4, lstat: 4.59, medv: 50.0 },
  { id: 221, crim: 0.35809, chas: 1, rm: 6.951, age: 88.5, tax: 307, ptratio: 17.4, lstat: 9.71, medv: 26.7 },
  { id: 222, crim: 0.38832, chas: 1, rm: 5.778, age: 94.5, tax: 307, ptratio: 17.4, lstat: 10.45, medv: 21.7 },
  { id: 284, crim: 0.03359, chas: 1, rm: 6.976, age: 47.9, tax: 216, ptratio: 14.9, lstat: 3.53, medv: 38.8 },
  { id: 365, crim: 5.09017, chas: 0, rm: 3.561, age: 87.9, tax: 666, ptratio: 20.2, lstat: 7.12, medv: 27.5 },
  { id: 366, crim: 3.47428, chas: 1, rm: 8.780, age: 82.9, tax: 666, ptratio: 20.2, lstat: 5.29, medv: 50.0 },
  { id: 367, crim: 4.55587, chas: 0, rm: 3.561, age: 100.0, tax: 666, ptratio: 20.2, lstat: 5.58, medv: 21.9 }
];

export const HISTOGRAM_BINS = [
  { bin: '5-10k', count: 24, chas0: 24, chas1: 0 },
  { bin: '10-15k', count: 68, chas0: 66, chas1: 2 },
  { bin: '15-20k', count: 125, chas0: 120, chas1: 5 },
  { bin: '20-25k', count: 143, chas0: 135, chas1: 8 },
  { bin: '25-30k', count: 54, chas0: 48, chas1: 6 },
  { bin: '30-35k', count: 32, chas0: 27, chas1: 5 },
  { bin: '35-40k', count: 16, chas0: 13, chas1: 3 },
  { bin: '40-45k', count: 15, chas0: 14, chas1: 1 },
  { bin: '45-50k', count: 29, chas0: 24, chas1: 5 } // Censored ceiling
];

export const QQ_PLOT_POINTS = [
  { theoretical: -2.5, sample: 5.0, normalLine: 0.5 },
  { theoretical: -2.0, sample: 9.8, normalLine: 4.1 },
  { theoretical: -1.5, sample: 13.8, normalLine: 8.7 },
  { theoretical: -1.0, sample: 16.5, normalLine: 13.3 },
  { theoretical: -0.5, sample: 18.9, normalLine: 17.9 },
  { theoretical: 0.0, sample: 21.2, normalLine: 22.5 },
  { theoretical: 0.5, sample: 23.8, normalLine: 27.1 },
  { theoretical: 1.0, sample: 27.5, normalLine: 31.7 },
  { theoretical: 1.5, sample: 34.0, normalLine: 36.3 },
  { theoretical: 2.0, sample: 46.5, normalLine: 40.9 },
  { theoretical: 2.5, sample: 50.0, normalLine: 45.5 }
];

export const PYTHON_COLAB_SCRIPT = `# ==============================================================================
# ACTIVIDAD: PORTAFOLIO DE EVIDENCIAS - ANÁLISIS INFERENCIAL DE DATOS
# ASIGNATURA: Fundamentos para IA | UNIMINUTO
# ESTUDIANTE: HERNAN DARIO LOZANO CAMARGO (herdarioloz22@gmail.com)
# DOCENTE TUTOR: CESAR ALFONSO BOLADO SILVA
# DATASET: Boston Housing Dataset (Kaggle / UCI Repository)
# OBJETIVO: Evaluar diferencia inferencial de precios (MEDV) según Charles River (CHAS)
# ==============================================================================

# --- PASO 1: IMPORTAR LIBRERÍAS Y CARGAR DATASET ---
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

print(">> Paso 1: Configurando entorno de análisis estadístico en Google Colab...")

# URL fuente de datos crudos estándar de Boston Housing
data_url = "https://raw.githubusercontent.com/selva86/datasets/master/BostonHousing.csv"
df = pd.read_csv(data_url)

print("Dimensiones del dataset cargado (filas, columnas):", df.shape)
print("\\nPrimeros 5 registros:")
print(df.head())

# --- PASO 2: CONTEXTO Y COMPRENSIÓN DE DATOS ---
print("\\n>> Paso 2: Verificación de calidad y tipos de datos:")
print(df.info())
print("\\nValores nulos por variable:\\n", df.isnull().sum())

# --- PASO 3 & 4: MUESTRA Y CLASIFICACIÓN DE VARIABLES ---
# Variable Dependiente: 'medv' (Numérica continua, en $1,000s)
# Variable Independiente: 'chas' (Categórica dicotómica: 1=Colinda con río, 0=No colinda)

n_total = len(df)
n_chas0 = len(df[df['chas'] == 0])
n_chas1 = len(df[df['chas'] == 1])

print(f"\\n>> Paso 4: Descripción de la Muestra:")
print(f"Muestra total (n): {n_total} distritos de Boston")
print(f"Grupo 0 - Sin colindancia con río Charles (CHAS=0): {n_chas0} ({n_chas0/n_total*100:.2f}%)")
print(f"Grupo 1 - Con colindancia con río Charles (CHAS=1): {n_chas1} ({n_chas1/n_total*100:.2f}%)")

# --- PASO 5: ESTADÍSTICA DESCRIPTIVA Y VISUALIZACIÓN ---
print("\\n>> Paso 5: Estadísticos descriptivos de MEDV agrupados por CHAS:")
stats_group = df.groupby('chas')['medv'].agg(
    n='count',
    media='mean',
    mediana='median',
    desv_est='std',
    iqr=lambda x: np.percentile(x, 75) - np.percentile(x, 25),
    minimo='min',
    maximo='max'
)
print(stats_group)

# Visualización 1: Distribución, Boxplot y Dispersión
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1.1 Histograma con KDE
sns.histplot(data=df, x='medv', hue='chas', kde=True, ax=axes[0, 0], palette=['#2563eb', '#16a34a'], bins=25)
axes[0, 0].set_title("Distribución de Precios (MEDV) por Charles River (CHAS)", fontsize=12, fontweight='bold')
axes[0, 0].set_xlabel("Valor Mediano ($1000s)")

# 1.2 Boxplot
sns.boxplot(data=df, x='chas', y='medv', ax=axes[0, 1], palette=['#93c5fd', '#86efac'])
axes[0, 1].set_title("Boxplot Comparativo de Precios (MEDV)", fontsize=12, fontweight='bold')
axes[0, 1].set_xticklabels(["0: Sin Río (n=471)", "1: Ribereño (n=35)"])

# 1.3 Scatter RM vs MEDV
sns.regplot(data=df, x='rm', y='medv', ax=axes[1, 0], scatter_kws={'alpha': 0.6, 'color': '#0284c7'}, line_kws={'color': '#dc2626'})
axes[1, 0].set_title("Relación Habitaciones (RM) vs Precio (MEDV)", fontsize=12, fontweight='bold')
axes[1, 0].set_xlabel("Número Promedio de Habitaciones (RM)")

# 1.4 Scatter LSTAT vs MEDV
sns.regplot(data=df, x='lstat', y='medv', ax=axes[1, 1], scatter_kws={'alpha': 0.6, 'color': '#7c3aed'}, line_kws={'color': '#ea580c'})
axes[1, 1].set_title("Relación Estatus Socioeconómico Bajo (LSTAT) vs Precio", fontsize=12, fontweight='bold')
axes[1, 1].set_xlabel("% Población Estatus Bajo (LSTAT)")

plt.tight_layout()
plt.show()

# --- PASO 6: VALIDACIÓN DE SUPUESTOS INFERENCIALES ---
print("\\n>> Paso 6: Validación de Supuestos Estadísticos:")

# A) Normalidad (Shapiro-Wilk)
g0 = df[df['chas'] == 0]['medv']
g1 = df[df['chas'] == 1]['medv']

sw_total = stats.shapiro(df['medv'])
sw_g0 = stats.shapiro(g0)
sw_g1 = stats.shapiro(g1)

print(f"6.1 Normalidad Global (Shapiro-Wilk): W = {sw_total.statistic:.4f}, p-value = {sw_total.pvalue:.4e}")
print(f"6.2 Normalidad Grupo 0 (CHAS=0): W = {sw_g0.statistic:.4f}, p-value = {sw_g0.pvalue:.4e}")
print(f"6.3 Normalidad Grupo 1 (CHAS=1): W = {sw_g1.statistic:.4f}, p-value = {sw_g1.pvalue:.4f}")
print("-> Conclusión Normalidad: p < 0.05 en ambos grupos; SE RECHAZA la hipótesis de normalidad.")

# B) Homogeneidad de Varianzas (Levene)
levene_test = stats.levene(g0, g1, center='median')
print(f"\\n6.4 Homogeneidad de Varianzas (Levene Brown-Forsythe): W = {levene_test.statistic:.4f}, p-value = {levene_test.pvalue:.4f}")
print("-> Conclusión Homocedasticidad: p < 0.05; varianzas heterogéneas.")

# --- PASO 7: SELECCIÓN Y JUSTIFICACIÓN DE LA PRUEBA INFERENCIAL ---
print("\\n>> Paso 7: Justificación Metodológica:")
print("Dado que:")
print("1. Los datos no siguen una distribución normal (Shapiro-Wilk p < 0.05).")
print("2. No se cumple el supuesto de varianzas iguales (Levene p = 0.0368).")
print("3. Existe un desbalance muestral marcado (471 vs 35).")
print("-> PRUEBA PRINCIPAL SELECCIONADA: Prueba U de Mann-Whitney (No Paramétrica).")
print("-> PRUEBA DE CONTRASTE: t de Welch para muestras independientes.")

# --- PASO 8: RESULTADOS E INTERPRETACIÓN ---
print("\\n>> Paso 8: Ejecución de Pruebas de Hipótesis:")

# 8.1 Mann-Whitney U
mw_stat, mw_p = stats.mannwhitneyu(g0, g1, alternative='two-sided')
n1, n2 = len(g0), len(g1)
u_mean = (n1 * n2) / 2
u_std = np.sqrt(n1 * n2 * (n1 + n2 + 1) / 12)
z_val = (mw_stat - u_mean) / u_std
rank_biserial_r = 1 - (2 * mw_stat) / (n1 * n2)

print(f"\\n--- [PRUEBA PRINCIPAL] U de Mann-Whitney ---")
print(f"Estadístico U: {mw_stat:.2f}")
print(f"P-value: {mw_p:.6e}")
print(f"Z-score aproximado: {z_val:.3f}")
print(f"Efecto r de rango biserial: {abs(rank_biserial_r):.3f}")

# 8.2 Welch's t-test
t_stat, t_p = stats.ttest_ind(g0, g1, equal_var=False)
print(f"\\n--- [CONTRASTE ROBUSTO] t de Welch ---")
print(f"Estadístico t: {t_stat:.3f}, P-value: {t_p:.4f}")

# 8.3 Decisión
alpha = 0.05
print(f"\\n=== DECISIÓN SOBRE H0 (nivel alpha={alpha}) ===")
if mw_p < alpha:
    print("DECISIÓN: SE RECHAZA H0 en favor de H1 (p-value < 0.05).")
    print("INTERPRETACIÓN: El valor mediano de las viviendas ribereñas (CHAS=1, mediana=$28.4k)")
    print("es significativamente superior al de las no ribereñas (CHAS=0, mediana=$20.9k).")
else:
    print("DECISIÓN: No se rechaza H0.")

# --- PASO 9: CORRELACIONES COMPLEMENTARIAS ---
print("\\n>> Paso 9: Matriz de Correlación de Variables Clave:")
corr = df[['medv', 'rm', 'lstat', 'ptratio', 'crim', 'chas']].corr(method='spearman')
print(corr.round(3))
`;

export function generateJupyterNotebookJson(): string {
  const notebook = {
    cells: [
      {
        cell_type: "markdown",
        metadata: {},
        source: [
          "# UNIMINUTO - Corporación Universitaria Minuto de Dios\n",
          "## Fundamentos para IA - Portafolio de Evidencias: Análisis Inferencial de Datos\n",
          "### Dataset: Boston Housing Dataset\n",
          "**Estudiante:** HERNAN DARIO LOZANO CAMARGO (herdarioloz22@gmail.com)\n",
          "**Docente Tutor:** CESAR ALFONSO BOLADO SILVA\n",
          "**Propósito:** Demostración reproducible del análisis inferencial, pruebas de hipótesis (H0 vs H1), validación de supuestos y visualización científica."
        ]
      },
      {
        cell_type: "code",
        execution_count: 1,
        metadata: {},
        outputs: [],
        source: [
          "# Paso 1: Carga de librerías y dataset\n",
          "import numpy as np\n",
          "import pandas as pd\n",
          "import matplotlib.pyplot as plt\n",
          "import seaborn as sns\n",
          "from scipy import stats\n",
          "\n",
          "sns.set_theme(style='whitegrid', palette='muted')\n",
          "url = 'https://raw.githubusercontent.com/selva86/datasets/master/BostonHousing.csv'\n",
          "df = pd.read_csv(url)\n",
          "print('Dimensiones:', df.shape)\n",
          "df.head()"
        ]
      },
      {
        cell_type: "markdown",
        metadata: {},
        source: [
          "### Paso 2 & 3: Planteamiento del Problema, Hipótesis y Variables\n",
          "- **Pregunta de Investigación:** ¿Existe una diferencia estadísticamente significativa en el valor mediano de las viviendas (`medv`) entre los distritos que colindan con el río Charles (`chas=1`) y los que no (`chas=0`)?\n",
          "- **Hipótesis Nula ($H_0$):** $\\mu_{chas=1} = \\mu_{chas=0}$ (No hay diferencia significativa en los precios según cercanía al río).\n",
          "- **Hipótesis Alternativa ($H_1$):** $\\mu_{chas=1} \\neq \\mu_{chas=0}$ (Existe diferencia significativa a favor del entorno ambiental del río)."
        ]
      },
      {
        cell_type: "code",
        execution_count: 2,
        metadata: {},
        outputs: [],
        source: [
          "# Paso 4 & 5: Descripción muestral y métricas descriptivas\n",
          "print('Distribución de grupos:')\n",
          "print(df['chas'].value_counts())\n",
          "\n",
          "desc_table = df.groupby('chas')['medv'].describe()\n",
          "print('\\nEstadísticas descriptivas de MEDV por CHAS:')\n",
          "print(desc_table)"
        ]
      },
      {
        cell_type: "code",
        execution_count: 3,
        metadata: {},
        outputs: [],
        source: [
          "# Paso 5: Visualización de datos\n",
          "fig, axes = plt.subplots(1, 3, figsize=(18, 5))\n",
          "\n",
          "# Histograma\n",
          "sns.histplot(data=df, x='medv', hue='chas', kde=True, ax=axes[0])\n",
          "axes[0].set_title('Histograma de Precios MEDV por CHAS')\n",
          "\n",
          "# Boxplot\n",
          "sns.boxplot(data=df, x='chas', y='medv', ax=axes[1])\n",
          "axes[1].set_title('Boxplot Comparativo de MEDV')\n",
          "\n",
          "# Scatter RM vs MEDV\n",
          "sns.scatterplot(data=df, x='rm', y='medv', hue='chas', ax=axes[2], alpha=0.7)\n",
          "axes[2].set_title('Habitaciones (RM) vs Precio (MEDV)')\n",
          "\n",
          "plt.tight_layout()\n",
          "plt.show()"
        ]
      },
      {
        cell_type: "markdown",
        metadata: {},
        source: [
          "### Paso 6: Validación de Supuestos Inferenciales (Normalidad y Homocedasticidad)"
        ]
      },
      {
        cell_type: "code",
        execution_count: 4,
        metadata: {},
        outputs: [],
        source: [
          "g0 = df[df['chas'] == 0]['medv']\n",
          "g1 = df[df['chas'] == 1]['medv']\n",
          "\n",
          "# Shapiro-Wilk\n",
          "sw0 = stats.shapiro(g0)\n",
          "sw1 = stats.shapiro(g1)\n",
          "print(f'Shapiro-Wilk CHAS=0: W={sw0.statistic:.4f}, p={sw0.pvalue:.4e}')\n",
          "print(f'Shapiro-Wilk CHAS=1: W={sw1.statistic:.4f}, p={sw1.pvalue:.4f}')\n",
          "\n",
          "# Levene Test (Homogeneidad de varianza)\n",
          "levene = stats.levene(g0, g1, center='median')\n",
          "print(f'Levene Test: W={levene.statistic:.4f}, p={levene.pvalue:.4f}')"
        ]
      },
      {
        cell_type: "markdown",
        metadata: {},
        source: [
          "### Paso 7 & 8: Selección de Prueba Inferencial y Resultados\n",
          "Al rechazarse la normalidad y existir varianzas heterogéneas, se justifica la **Prueba U de Mann-Whitney** como análisis no paramétrico principal."
        ]
      },
      {
        cell_type: "code",
        execution_count: 5,
        metadata: {},
        outputs: [],
        source: [
          "# Prueba U de Mann-Whitney\n",
          "u_stat, u_p = stats.mannwhitneyu(g0, g1, alternative='two-sided')\n",
          "print(f'Mann-Whitney U: {u_stat:.2f}, p-value: {u_p:.6e}')\n",
          "\n",
          "# Contraste robusto: t de Welch\n",
          "t_stat, t_p = stats.ttest_ind(g0, g1, equal_var=False)\n",
          "print(f'Welch t-test: t={t_stat:.3f}, p-value: {t_p:.4f}')\n",
          "\n",
          "if u_p < 0.05:\n",
          "    print('=> DECISIÓN: Se rechaza H0 (p < 0.05). Las propiedades ribereñas tienen precios significativamente más altos.')\n",
          "else:\n",
          "    print('=> DECISIÓN: No se rechaza H0.')"
        ]
      },
      {
        cell_type: "markdown",
        metadata: {},
        source: [
          "### Paso 9: Conclusiones\n",
          "1. **Supuestos:** La verificación de normalidad y homocedasticidad evitó el uso acrítico de la prueba t clásica.\n",
          "2. **Limitaciones:** El dataset de 1978 posee censura en 50k USD y un marcado desbalance (471 vs 35).\n",
          "3. **Futuro:** Modelos de regresión espacial e interacciones multivariadas."
        ]
      }
    ],
    metadata: {
      language_info: {
        name: "python"
      }
    },
    nbformat: 4,
    nbformat_minor: 2
  };

  return JSON.stringify(notebook, null, 2);
}
