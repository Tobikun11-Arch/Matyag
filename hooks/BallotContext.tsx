// ─────────────────────────────────────────────────────────────────────────────
// BallotContext — single source of truth for ballot state across all tabs
// Wrap your root layout with <BallotProvider> so every screen shares the same state
// ─────────────────────────────────────────────────────────────────────────────

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {type Position} from '@/constants/dataset';

const STORAGE_KEY = 'matyag_ballot_v1';

export const BALLOT_LIMITS: Record<Position, number> = {
  'President':      1,
  'Vice President': 1,
  'Senator':        12,
  'Party-list':     1,
};

export interface BallotEntry {
  id: string;
  position: Position;
  fullName: string;
  honorific: string;
  party: string;
  region: string;
  profileSrc: number | null;
  netWorthLabel: string;
  addedAt: number;
}

export interface Ballot {
  President:        BallotEntry[];
  'Vice President': BallotEntry[];
  Senator:          BallotEntry[];
  'Party-list':     BallotEntry[];
}

const EMPTY_BALLOT: Ballot = {
  President:        [],
  'Vice President': [],
  Senator:          [],
  'Party-list':     [],
};

interface BallotContextValue {
  ballot: Ballot;
  loading: boolean;
  isOnBallot: (id: string) => boolean;
  addToBallot: (entry: BallotEntry) => 'added' | 'already_added' | 'slot_full';
  removeFromBallot: (id: string) => void;
  clearBallot: () => void;
  filledSlots: number;
  totalSlots: number;
  completionPct: number;
}

const BallotContext = createContext<BallotContextValue | null>(null);

export function BallotProvider({children}: {children: ReactNode}) {
  const [ballot, setBallot]   = useState<Ballot>(EMPTY_BALLOT);
  const [loading, setLoading] = useState(true);

  // Load from AsyncStorage once on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try { setBallot(JSON.parse(raw)); } catch {}
      }
      setLoading(false);
    });
  }, []);

  const persist = useCallback((next: Ballot) => {
    setBallot(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const isOnBallot = useCallback(
    (id: string) =>
      Object.values(ballot).some(entries =>
        entries.some((e: BallotEntry) => e.id === id),
      ),
    [ballot],
  );

  const addToBallot = useCallback(
    (entry: BallotEntry): 'added' | 'already_added' | 'slot_full' => {
      const slot    = entry.position;
      const current = ballot[slot];
      if (current.some(e => e.id === entry.id)) return 'already_added';
      if (current.length >= BALLOT_LIMITS[slot])  return 'slot_full';
      persist({...ballot, [slot]: [...current, {...entry, addedAt: Date.now()}]});
      return 'added';
    },
    [ballot, persist],
  );

  const removeFromBallot = useCallback(
    (id: string) => {
      persist({
        President:        ballot.President.filter(e => e.id !== id),
        'Vice President': ballot['Vice President'].filter(e => e.id !== id),
        Senator:          ballot.Senator.filter(e => e.id !== id),
        'Party-list':     ballot['Party-list'].filter(e => e.id !== id),
      });
    },
    [ballot, persist],
  );

  const clearBallot = useCallback(() => persist(EMPTY_BALLOT), [persist]);

  const totalSlots   = Object.values(BALLOT_LIMITS).reduce((a, b) => a + b, 0);
  const filledSlots  = Object.values(ballot).reduce((a, e) => a + e.length, 0);
  const completionPct = Math.round((filledSlots / totalSlots) * 100);

  return (
    <BallotContext.Provider
      value={{
        ballot, loading,
        isOnBallot, addToBallot, removeFromBallot, clearBallot,
        filledSlots, totalSlots, completionPct,
      }}
    >
      {children}
    </BallotContext.Provider>
  );
}

/** Use this everywhere instead of useBallot() */
export function useBallot(): BallotContextValue {
  const ctx = useContext(BallotContext);
  if (!ctx) throw new Error('useBallot must be used inside <BallotProvider>');
  return ctx;
}