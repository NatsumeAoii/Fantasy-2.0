// ============================================================
// Analysis Engines — Pure functions for character evaluation.
// ============================================================
// These modules operate on Character objects without any state
// management dependency. They belong in the logic layer, not
// the store layer, because they are pure computation.
// ============================================================

export {
  selectEffectivePowerRating,
  selectCombatStyle,
  selectBuildArchetype,
  type BuildArchetype,
} from './sharedSelectors'

export {
  analyzeCharacter,
  compareCharacters,
  type CharacterAnalysis,
  type StatAnalysis,
  type BuildStrength,
  type BuildWeakness,
  type EquipmentGap,
} from './characterAnalyzer'

export {
  optimizeEquipment,
  getItemScore,
  getLoadoutScore,
  type EquipmentSuggestion,
  type OptimizationResult,
} from './equipmentOptimizer'

export {
  projectLevelCurve,
  evaluateBuildProfiles,
  simulateStatChange,
  getClosestBuild,
  PROJECTION_MILESTONES,
  type LevelProjection,
  type BuildComparison,
  type IdealBuildProfile,
} from './buildPlanner'
