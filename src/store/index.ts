// ============================================================
// Store Layer — Barrel Export
// ============================================================
// All state management, derived selectors, analysis engines,
// and cross-store infrastructure in one import path.
// ============================================================

// Core stores
export { useCharacterStore } from './characterStore'
export { useHistoryStore, type CharacterSnapshot, type ComparisonPair } from './historyStore'
export { usePreferencesStore, type Theme, type VisualDensity, type VisualMotion, type PanelScale, type GenerationPreferences } from './preferencesStore'
export { useActionLog, type ActionLogEntry, type ActionCategory } from './actionLog'

// Event bus
export { eventBus, type CharacterEvent } from './eventBus'

// Selectors (pure functions, use with useCharacterStore(selector))
export {
  selectTopStats,
  selectStatBalance,
  selectTotalStatPoints,
  selectEffectivePowerRating,
  selectCombatStyle,
  selectInventoryValue,
  selectEquipmentCompleteness,
  selectRarityDistribution,
  selectWeightUtilization,
  selectIdentityRichness,
  selectSkillsByRank,
  selectHighestRankSkills,
  selectBuildArchetype,
  selectCharacterSummary,
  type BuildArchetype,
} from './selectors'

// Analysis engines (pure functions, no state — canonical location: src/logic/analysis/)
export { analyzeCharacter, compareCharacters, type CharacterAnalysis, type StatAnalysis, type BuildStrength, type BuildWeakness, type EquipmentGap } from '../logic/analysis/characterAnalyzer'
export { optimizeEquipment, getItemScore, getLoadoutScore, type EquipmentSuggestion, type OptimizationResult } from '../logic/analysis/equipmentOptimizer'
export { projectLevelCurve, evaluateBuildProfiles, simulateStatChange, getClosestBuild, PROJECTION_MILESTONES, type LevelProjection, type BuildComparison, type IdealBuildProfile } from '../logic/analysis/buildPlanner'

// Page-level hooks (moved from src/hooks/)
export { useCharacterPage } from './useCharacterPage'
