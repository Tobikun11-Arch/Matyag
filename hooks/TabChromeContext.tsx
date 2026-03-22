import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';

type TabChromeContextValue = {
  chromeVisible: boolean;
  setChromeVisible: (visible: boolean) => void;
};

const TabChromeContext = createContext<TabChromeContextValue | undefined>(
  undefined
);

export function TabChromeProvider({children}: {children: React.ReactNode}) {
  const [chromeVisible, setChromeVisibleState] = useState(true);

  const setChromeVisible = useCallback((visible: boolean) => {
    setChromeVisibleState(prev => (prev === visible ? prev : visible));
  }, []);

  const value = useMemo(
    () => ({chromeVisible, setChromeVisible}),
    [chromeVisible, setChromeVisible]
  );

  return (
    <TabChromeContext.Provider value={value}>
      {children}
    </TabChromeContext.Provider>
  );
}

export function useTabChrome() {
  const context = useContext(TabChromeContext);
  if (!context) {
    throw new Error('useTabChrome must be used within a TabChromeProvider');
  }
  return context;
}
