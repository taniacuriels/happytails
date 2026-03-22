/**
 * Placeholder for conflict detection
 */

export interface ConflictService {
  detectConflicts(startTime: Date, endTime: Date): Promise<any[]>;
  resolveConflict(conflictId: string): Promise<void>;
}
