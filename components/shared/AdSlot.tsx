
import React, { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

interface AdSlotProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
}

const AdSlot: React.FC<AdSlotProps> = ({ client, slot, format = 'auto', responsive = true }) => {
  useEffect(() => {
    // The "No slot size for availableWidth=0" error occurs when the AdSense script
    // executes before its container element has been rendered with a non-zero width.
    // This is a common race condition in single-page applications with page transitions
    // and animations. By increasing the delay, we give the layout more time to stabilize.
    const timeoutId = setTimeout(() => {
        try {
          if (window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (e) {
          console.error("AdSense push error:", e);
        }
    }, 1200); // Increased delay to 1.2s to more reliably wait for animations to finish.

    return () => clearTimeout(timeoutId);
  }, [client, slot]); // Re-run if the ad unit changes.

  return (
    <div className="min-h-[100px] w-full bg-slate-200/50 dark:bg-slate-800/50 flex items-center justify-center text-slate-500/50 rounded-md my-4 overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
        aria-label="Advertisement"
      ></ins>
    </div>
  );
};

export default AdSlot;
