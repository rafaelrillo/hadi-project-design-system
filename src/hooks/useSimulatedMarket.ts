// Path: src/hooks/useSimulatedMarket.ts
import { useEffect, useCallback, useRef, useMemo } from "react";
import { useMarketStore } from "../store/marketStore";
import { usePortfolioStore } from "../store/portfolioStore";

export interface UseSimulatedMarketOptions {
  updateInterval?: number;
  autoStart?: boolean;
  syncPortfolio?: boolean;
}

export interface UseSimulatedMarketReturn {
  isLive: boolean;
  lastUpdate: Date;
  start: () => void;
  stop: () => void;
  toggle: () => void;
  setInterval: (ms: number) => void;
  refresh: () => void;
}

export function useSimulatedMarket(
  options: UseSimulatedMarketOptions = {}
): UseSimulatedMarketReturn {
  const { updateInterval = 15000, autoStart = true, syncPortfolio = true } = options;

  const isLive = useMarketStore((state) => state.isLive);
  const lastUpdate = useMarketStore((state) => state.lastUpdate);
  const startLiveUpdates = useMarketStore((state) => state.startLiveUpdates);
  const stopLiveUpdates = useMarketStore((state) => state.stopLiveUpdates);
  const setUpdateInterval = useMarketStore((state) => state.setUpdateInterval);
  const refreshData = useMarketStore((state) => state.refreshData);
  const fetchStocks = useMarketStore((state) => state.fetchStocks);
  const updateHoldingsWithMarketData = usePortfolioStore(
    (state) => state.updateHoldingsWithMarketData
  );

  const syncCounterRef = useRef(0);

  // Sync portfolio with market data periodically
  useEffect(() => {
    if (!isLive || !syncPortfolio) return;

    const syncInterval = setInterval(() => {
      syncCounterRef.current += 1;
      // Sync every 2 updates
      if (syncCounterRef.current % 2 === 0) {
        updateHoldingsWithMarketData();
      }
    }, updateInterval);

    return () => clearInterval(syncInterval);
  }, [isLive, syncPortfolio, updateInterval, updateHoldingsWithMarketData]);

  // Auto-start on mount
  useEffect(() => {
    if (autoStart) {
      setUpdateInterval(updateInterval);
      fetchStocks().then(() => {
        startLiveUpdates();
      });
    }

    // Cleanup on unmount
    return () => {
      stopLiveUpdates();
    };
  }, [autoStart, updateInterval, setUpdateInterval, fetchStocks, startLiveUpdates, stopLiveUpdates]);

  const start = useCallback(() => {
    startLiveUpdates();
  }, [startLiveUpdates]);

  const stop = useCallback(() => {
    stopLiveUpdates();
  }, [stopLiveUpdates]);

  const toggle = useCallback(() => {
    if (isLive) {
      stopLiveUpdates();
    } else {
      startLiveUpdates();
    }
  }, [isLive, startLiveUpdates, stopLiveUpdates]);

  const setIntervalMs = useCallback(
    (ms: number) => {
      setUpdateInterval(ms);
    },
    [setUpdateInterval]
  );

  const refresh = useCallback(() => {
    refreshData();
  }, [refreshData]);

  return {
    isLive,
    lastUpdate,
    start,
    stop,
    toggle,
    setInterval: setIntervalMs,
    refresh,
  };
}

// Additional hooks for convenience
export function useMarketStatus() {
  const isLive = useMarketStore((state) => state.isLive);
  const lastUpdate = useMarketStore((state) => state.lastUpdate);
  const indicators = useMarketStore((state) => state.indicators);
  const dataSource = useMarketStore((state) => state.dataSource);

  return {
    isLive,
    lastUpdate,
    dataSource,
    marketState: indicators.state,
    riskLevel: indicators.riskLevel,
    riskValue: indicators.riskValue,
    confidenceLevel: indicators.confidenceLevel,
    confidencePercent: indicators.confidencePercent,
    systemStatus: indicators.systemStatus,
  };
}

export function useLastUpdateString(): string {
  const lastUpdate = useMarketStore((state) => state.lastUpdate);

  return useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - lastUpdate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);

    if (seconds < 5) return "Just now";
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    return lastUpdate.toLocaleTimeString();
  }, [lastUpdate]);
}
