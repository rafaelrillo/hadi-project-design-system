// Path: src/components/organisms/settings/MaterialSelector/MaterialSelector.tsx
// FING Material Selector Component

import { useThemeStore } from '@/stores/themeStore';
import { MATERIALS, MATERIAL_CATEGORIES, TEXTURES } from '@/config/materials';
import styles from './MaterialSelector.module.css';

export function MaterialSelector() {
  const {
    materialId,
    texture,
    textureOpacity,
    setMaterial,
    setTexture,
    setTextureOpacity,
    resetToDefaults,
    getCurrentMaterial,
  } = useThemeStore();

  const currentMaterial = getCurrentMaterial();
  const materialsByCategory = MATERIAL_CATEGORIES.map((cat) => ({
    ...cat,
    materials: Object.values(MATERIALS).filter((m) => m.category === cat.id),
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Material de Superficie</h3>
        <p className={styles.description}>Personaliza el aspecto visual de la interfaz</p>
      </div>

      {/* Current Material Info */}
      <div className={styles.currentInfo}>
        <div className={styles.currentHeader}>
          <span className={styles.currentName}>{currentMaterial.name}</span>
          <span className={styles.currentOrigin}>{currentMaterial.origin}</span>
        </div>
        <div className={styles.colorTokens}>
          <div className={styles.token}>
            <div className={styles.tokenSwatch} style={{ background: currentMaterial.base }} />
            <span className={styles.tokenLabel}>Base</span>
            <span className={styles.tokenHex}>{currentMaterial.base}</span>
          </div>
          <div className={styles.token}>
            <div className={styles.tokenSwatch} style={{ background: currentMaterial.light }} />
            <span className={styles.tokenLabel}>Light</span>
            <span className={styles.tokenHex}>{currentMaterial.light}</span>
          </div>
          <div className={styles.token}>
            <div className={styles.tokenSwatch} style={{ background: currentMaterial.dark }} />
            <span className={styles.tokenLabel}>Dark</span>
            <span className={styles.tokenHex}>{currentMaterial.dark}</span>
          </div>
        </div>
      </div>

      {/* Material Selection */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Material</div>
        {materialsByCategory.map((category) => (
          <div key={category.id} className={styles.category}>
            <div className={styles.categoryLabel}>
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </div>
            <div className={styles.materialGrid}>
              {category.materials.map((material) => (
                <button
                  key={material.id}
                  className={`${styles.materialChip} ${materialId === material.id ? styles.active : ''}`}
                  onClick={() => setMaterial(material.id)}
                >
                  <div className={styles.chipSwatch} style={{ background: material.base }} />
                  <span className={styles.chipName}>{material.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Texture Selection */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Textura</div>
        <div className={styles.textureGrid}>
          {TEXTURES.map((t) => (
            <button
              key={t.id}
              className={`${styles.textureChip} ${texture === t.id ? styles.active : ''}`}
              onClick={() => setTexture(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Opacity Slider */}
        {texture !== 'none' && (
          <div className={styles.sliderContainer}>
            <span className={styles.sliderLabel}>Opacidad</span>
            <input
              type="range"
              min="0"
              max="0.1"
              step="0.005"
              value={textureOpacity}
              onChange={(e) => setTextureOpacity(parseFloat(e.target.value))}
              className={styles.slider}
            />
            <span className={styles.sliderValue}>{Math.round(textureOpacity * 100)}%</span>
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button className={styles.resetButton} onClick={resetToDefaults}>
        Restaurar valores predeterminados
      </button>
    </div>
  );
}

export default MaterialSelector;
