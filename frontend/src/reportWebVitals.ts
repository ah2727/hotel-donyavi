type ReportHandler = (metric: {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: PerformanceEntry[];
  navigationType?: string;
}) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then((webVitals: any) => {
      webVitals.getCLS(onPerfEntry);
      webVitals.getFID(onPerfEntry);
      webVitals.getFCP(onPerfEntry);
      webVitals.getLCP(onPerfEntry);
      webVitals.getTTFB(onPerfEntry);
    }).catch((err) => {
      console.error('Error loading web-vitals:', err);
    });
  }
};

export default reportWebVitals;