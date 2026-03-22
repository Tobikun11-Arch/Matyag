// ─────────────────────────────────────────────────────────────────────────────
// useBallot — AsyncStorage-backed ballot hook
// Slots: President ×1, VP ×1, Senator ×12, Party-list ×1
// ─────────────────────────────────────────────────────────────────────────────

import {useState, useEffect, useCallback} from 'react';
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
  addedAt: number; // timestamp
}

export interface Ballot {
  President:      BallotEntry[];
  'Vice President': BallotEntry[];
  Senator:        BallotEntry[];
  'Party-list':   BallotEntry[];
}

const EMPTY_BALLOT: Ballot = {
  President:        [],
  'Vice President': [],
  Senator:          [],
  'Party-list':     [],
};

export function useBallot() {
  const [ballot, setBallot] = useState<Ballot>(EMPTY_BALLOT);
  const [loading, setLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try {
          setBallot(JSON.parse(raw));
        } catch {}
      }
      setLoading(false);
    });
  }, []);

  // Persist whenever ballot changes
  const persist = useCallback((next: Ballot) => {
    setBallot(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  // Check if a politician is already on the ballot
  const isOnBallot = useCallback(
    (id: string) =>
      Object.values(ballot).some(entries =>
        entries.some((e: BallotEntry) => e.id === id)
      ),
    [ballot],
  );

  // Add a politician to the ballot
  // Returns: 'added' | 'already_added' | 'slot_full'
  const addToBallot = useCallback(
    (entry: BallotEntry): 'added' | 'already_added' | 'slot_full' => {
      const slot = entry.position;
      const current = ballot[slot];

      if (current.some(e => e.id === entry.id)) return 'already_added';
      if (current.length >= BALLOT_LIMITS[slot]) return 'slot_full';

      const next: Ballot = {
        ...ballot,
        [slot]: [...current, {...entry, addedAt: Date.now()}],
      };
      persist(next);
      return 'added';
    },
    [ballot, persist],
  );

  // Remove a politician from the ballot
  const removeFromBallot = useCallback(
    (id: string) => {
      const next: Ballot = {
        President:        ballot.President.filter(e => e.id !== id),
        'Vice President': ballot['Vice President'].filter(e => e.id !== id),
        Senator:          ballot.Senator.filter(e => e.id !== id),
        'Party-list':     ballot['Party-list'].filter(e => e.id !== id),
      };
      persist(next);
    },
    [ballot, persist],
  );

  // Clear entire ballot
  const clearBallot = useCallback(() => {
    persist(EMPTY_BALLOT);
  }, [persist]);

  // Completion stats
  const totalSlots = Object.values(BALLOT_LIMITS).reduce((a, b) => a + b, 0); // 15
  const filledSlots = Object.values(ballot).reduce(
    (a, entries) => a + entries.length,
    0,
  );
  const completionPct = Math.round((filledSlots / totalSlots) * 100);

  return {
    ballot,
    loading,
    isOnBallot,
    addToBallot,
    removeFromBallot,
    clearBallot,
    filledSlots,
    totalSlots,
    completionPct,
  };
}