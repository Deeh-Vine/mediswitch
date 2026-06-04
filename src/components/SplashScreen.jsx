/* MediSwitch Splash Screen Component
 * Designed for the MediSwitch Drug Affordability platform.
 * 
 * This component handles a gorgeous staggered startup animation before passing control 
 * back to the main app layout.
 */

import { motion } from "motion/react";

export default function SplashScreen({ onFinish }) {
  return (
    // The main container fills the entire screen, overlays all content, and fades out after 2 seconds
    <motion.div
      id="splash-overlay"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-[#0A6640]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      // delay: 2s is the holding time, duration: 0.5s makes it fade out smoothly
      transition={{ delay: 2.0, duration: 0.5, ease: "easeInOut" }}
      // onAnimationComplete triggers exactly when the fade-out is complete
      onAnimationComplete={() => {
        if (typeof onFinish === "function") {
          onFinish();
        }
      }}
    >
      {/* 1. White rounded square (scaling from 0 to 1, fading in at delay 0s) */}
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0, duration: 0.5, ease: "backOut" }}
>
  <img 
    src="/src/assets/logo.jpeg" 
    alt="MediSwitch logo" 
    className="w-20 h-20 object-contain"
  />
</motion.div>

      {/* 2. Brand Name Header (fading up, delay 0.3s) */}
      <motion.h1
        id="splash-title"
        className="font-fraunces font-bold text-white text-4xl tracking-tight"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        MediSwitch
      </motion.h1>

      {/* 3. Catchy Tagline (fading in, delay 0.6s) */}
      <motion.p
        id="splash-subtitle"
        className="font-dm-sans text-white/70 text-sm tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      >
        Same medicine. Smarter price.
      </motion.p>
    </motion.div>
  );
}
