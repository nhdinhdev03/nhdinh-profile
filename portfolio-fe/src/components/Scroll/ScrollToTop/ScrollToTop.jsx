import React, { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import { useScrollProgress, useSmoothScrollToTop } from '../../../hooks/useScrollOptimization'
import './ScrollToTop.scss'

const ScrollToTop = memo(() => {
  // Use optimized scroll hooks
  const { isVisible, scrollProgress } = useScrollProgress()
  const scrollToTop = useSmoothScrollToTop()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
          aria-label="Cuộn lên đầu trang"
        >
          <FiArrowUp />
          <div className="scroll-to-top__progress">
            <div
              className="scroll-to-top__progress-bar"
              style={{
                transform: `scaleY(${scrollProgress})`
              }}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
})

ScrollToTop.displayName = 'ScrollToTop'

export default ScrollToTop
