import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RoutineMode = 'notification' | 'ring' | 'both';

export type Routine = {
  id: number;
  title: string;
  time: number; // timestamp
  active: boolean;
  mode: RoutineMode;
};

type RoutineContextType = {
  routines: Routine[];
  addRoutine: (routine: Routine) => void;
  updateRoutine: (routine: Routine) => void;
  deleteRoutine: (id: number) => void;
  toggleRoutine: (id: number) => void;
};

const STORAGE_KEY = '@MYPA_ROUTINES';

const RoutineContext = createContext<RoutineContextType | null>(null);

export const useRoutines = () => {
  const ctx = useContext(RoutineContext);
  if (!ctx) throw new Error('useRoutines must be used inside RoutineProvider');
  return ctx;
};

export function RoutineProvider({ children }: { children: React.ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from storage
  useEffect(() => {
    (async () => {
        try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);

            // 🔧 Normalize old routines (add missing mode)
            const normalized = parsed.map((r: any) => ({
            ...r,
            mode: r.mode ?? 'both',
            }));

            setRoutines(normalized);
        }
        } catch (e) {
        console.error('Failed to load routines', e);
        } finally {
        setLoaded(true);
        }
    })();
  }, []);


  // Save on change
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
    }
  }, [routines, loaded]);

  const addRoutine = (routine: Routine) =>
    setRoutines(prev => [...prev, routine]);

  const updateRoutine = (routine: Routine) =>
    setRoutines(prev =>
      prev.map(r => (r.id === routine.id ? routine : r))
    );

  const deleteRoutine = (id: number) =>
    setRoutines(prev => prev.filter(r => r.id !== id));

  const toggleRoutine = (id: number) =>
    setRoutines(prev =>
      prev.map(r =>
        r.id === id ? { ...r, active: !r.active } : r
      )
    );

  return (
    <RoutineContext.Provider
      value={{
        routines,
        addRoutine,
        updateRoutine,
        deleteRoutine,
        toggleRoutine,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
}
