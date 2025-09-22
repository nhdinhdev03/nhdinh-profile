import { AnimatePresence, motion } from 'framer-motion'
import { memo } from 'react'
import { FiArrowUp } from 'react-icons/fi'

import { useScrollProgress, useSmoothScrollToTop } from '../../../hooks/useScrollOptimization'
import './ScrollToTop.scss'

const ScrollToTop = memo(() => {
  // Use optimized scroll hooks with custom duration for smoother animation
  const { isVisible, scrollProgress } = useScrollProgress()
  const scrollToTop = useSmoothScrollToTop(600) // Reduced duration for faster, smoother scroll

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94] // Custom bezier for smoother transition
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
