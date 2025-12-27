// Path: src/components/organisms/sentinel/ModelInsights/ModelInsights.tsx
import { useState } from 'react';
import {
  Brain,
  Layers,
  Target,
  Clock,
  ChevronRight,
  Info,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import styles from './ModelInsights.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   MODEL INSIGHTS - Level 4 Depth Component
   Technical details about the analysis model, its inputs, and methodology
   ═══════════════════════════════════════════════════════════════════════════════ */

export interface ModelInput {
  id: string;
  name: string;
  category: string;
  weight: number;
  status: 'active' | 'degraded' | 'unavailable';
  lastUpdate?: string;
  description?: string;
}

export interface ModelOutput {
  id: string;
  name: string;
  value: string | number;
  confidence: number;
  trend?: 'improving' | 'stable' | 'declining';
}

export interface ModelVersion {
  version: string;
  releaseDate: string;
  changes?: string[];
}

export interface ModelMetadata {
  name: string;
  version: ModelVersion;
  accuracy: number;
  lastTrainedDate: string;
  dataPoints: number;
  updateFrequency: string;
}

export interface ModelInsightsProps {
  metadata: ModelMetadata;
  inputs: ModelInput[];
  outputs?: ModelOutput[];
  methodology?: string;
  limitations?: string[];
  showTechnicalDetails?: boolean;
  expandedByDefault?: boolean;
}

export function ModelInsights({
  metadata,
  inputs,
  outputs = [],
  methodology,
  limitations = [],
  showTechnicalDetails = true,
  expandedByDefault = false,
}: ModelInsightsProps) {
  const [activeTab, setActiveTab] = useState<'inputs' | 'outputs' | 'methodology'>('inputs');
  const [expandedInput, setExpandedInput] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(expandedByDefault);

  const getStatusIcon = (status: ModelInput['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={12} />;
      case 'degraded':
        return <AlertTriangle size={12} />;
      case 'unavailable':
        return <Info size={12} />;
    }
  };

  const groupInputsByCategory = () => {
    const groups: Record<string, ModelInput[]> = {};
    inputs.forEach((input) => {
      if (!groups[input.category]) {
        groups[input.category] = [];
      }
      groups[input.category].push(input);
    });
    return groups;
  };

  const inputGroups = groupInputsByCategory();
  const activeInputs = inputs.filter((i) => i.status === 'active').length;
  const totalWeight = inputs.reduce((sum, i) => sum + i.weight, 0);

  const tabs = [
    { id: 'inputs' as const, label: 'Data Inputs', count: inputs.length },
    { id: 'outputs' as const, label: 'Model Outputs', count: outputs.length },
    { id: 'methodology' as const, label: 'Methodology', count: null },
  ];

  return (
    <div className={styles.container} role="region" aria-label="Model Insights">
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.modelInfo}>
          <div className={styles.modelIcon}>
            <Brain size={20} />
          </div>
          <div className={styles.modelMeta}>
            <h2 className={styles.modelName}>{metadata.name}</h2>
            <span className={styles.modelVersion}>v{metadata.version.version}</span>
          </div>
        </div>

        <div className={styles.modelStats}>
          <div className={styles.statItem}>
            <Target size={14} />
            <span className={styles.statValue}>{metadata.accuracy}%</span>
            <span className={styles.statLabel}>Accuracy</span>
          </div>
          <div className={styles.statItem}>
            <Layers size={14} />
            <span className={styles.statValue}>{metadata.dataPoints.toLocaleString()}</span>
            <span className={styles.statLabel}>Data Points</span>
          </div>
          <div className={styles.statItem}>
            <Clock size={14} />
            <span className={styles.statValue}>{metadata.updateFrequency}</span>
            <span className={styles.statLabel}>Updates</span>
          </div>
        </div>
      </header>

      {/* Quick Status */}
      <div className={styles.statusBar}>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Active Inputs:</span>
          <span className={styles.statusValue}>
            {activeInputs}/{inputs.length}
          </span>
        </div>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Last Trained:</span>
          <span className={styles.statusValue}>{metadata.lastTrainedDate}</span>
        </div>
        <button
          type="button"
          className={styles.detailsToggle}
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
          <ChevronRight
            size={14}
            className={`${styles.toggleIcon} ${showDetails ? styles.expanded : ''}`}
          />
        </button>
      </div>

      {/* Tabs */}
      {showDetails && (
        <div className={styles.content}>
          <div className={styles.tabs} role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={styles.tabCount}>{tab.count}</span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {/* Inputs Tab */}
            {activeTab === 'inputs' && (
              <div className={styles.inputsPanel}>
                {Object.entries(inputGroups).map(([category, categoryInputs]) => (
                  <div key={category} className={styles.inputCategory}>
                    <h3 className={styles.categoryTitle}>{category}</h3>
                    <div className={styles.inputsList}>
                      {categoryInputs.map((input) => (
                        <div
                          key={input.id}
                          className={`${styles.inputItem} ${
                            expandedInput === input.id ? styles.expanded : ''
                          }`}
                          data-status={input.status}
                        >
                          <button
                            type="button"
                            className={styles.inputHeader}
                            onClick={() =>
                              setExpandedInput(
                                expandedInput === input.id ? null : input.id
                              )
                            }
                            aria-expanded={expandedInput === input.id}
                          >
                            <span className={styles.inputStatus}>
                              {getStatusIcon(input.status)}
                            </span>
                            <span className={styles.inputName}>{input.name}</span>
                            <div className={styles.inputWeight}>
                              <div
                                className={styles.weightBar}
                                style={{
                                  width: `${(input.weight / totalWeight) * 100}%`,
                                }}
                              />
                              <span className={styles.weightValue}>
                                {((input.weight / totalWeight) * 100).toFixed(1)}%
                              </span>
                            </div>
                          </button>

                          {expandedInput === input.id && input.description && (
                            <div className={styles.inputDetails}>
                              <p className={styles.inputDescription}>
                                {input.description}
                              </p>
                              {input.lastUpdate && (
                                <span className={styles.lastUpdate}>
                                  Last updated: {input.lastUpdate}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Outputs Tab */}
            {activeTab === 'outputs' && (
              <div className={styles.outputsPanel}>
                {outputs.length > 0 ? (
                  <div className={styles.outputsList}>
                    {outputs.map((output) => (
                      <div key={output.id} className={styles.outputItem}>
                        <div className={styles.outputHeader}>
                          <span className={styles.outputName}>{output.name}</span>
                          {output.trend && (
                            <span
                              className={styles.outputTrend}
                              data-trend={output.trend}
                            >
                              {output.trend}
                            </span>
                          )}
                        </div>
                        <div className={styles.outputValue}>{output.value}</div>
                        <div className={styles.outputConfidence}>
                          <span className={styles.confidenceLabel}>Confidence:</span>
                          <div className={styles.confidenceBar}>
                            <div
                              className={styles.confidenceFill}
                              style={{ width: `${output.confidence}%` }}
                            />
                          </div>
                          <span className={styles.confidenceValue}>
                            {output.confidence}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.emptyMessage}>No outputs available</p>
                )}
              </div>
            )}

            {/* Methodology Tab */}
            {activeTab === 'methodology' && (
              <div className={styles.methodologyPanel}>
                {methodology && (
                  <div className={styles.methodologySection}>
                    <h3 className={styles.sectionTitle}>Approach</h3>
                    <p className={styles.methodologyText}>{methodology}</p>
                  </div>
                )}

                {limitations.length > 0 && (
                  <div className={styles.limitationsSection}>
                    <h3 className={styles.sectionTitle}>Known Limitations</h3>
                    <ul className={styles.limitationsList}>
                      {limitations.map((limitation, index) => (
                        <li key={index} className={styles.limitationItem}>
                          <AlertTriangle size={12} />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {showTechnicalDetails && (
                  <div className={styles.technicalSection}>
                    <h3 className={styles.sectionTitle}>Version History</h3>
                    <div className={styles.versionInfo}>
                      <span className={styles.versionLabel}>
                        Current: v{metadata.version.version}
                      </span>
                      <span className={styles.versionDate}>
                        Released: {metadata.version.releaseDate}
                      </span>
                    </div>
                    {metadata.version.changes && (
                      <ul className={styles.changesList}>
                        {metadata.version.changes.map((change, index) => (
                          <li key={index}>{change}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelInsights;
