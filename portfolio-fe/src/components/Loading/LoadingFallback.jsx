import React, { memo, useMemo } from "react";
import styled from "styled-components";

/**
 * Optimized Loading Fallback component with dark mode support
 * @param {Object} props
 * @param {'dark' | 'light'} props.theme - Theme mode for styling
 */
// eslint-disable-next-line react/prop-types
const LoadingFallback = memo(({ theme = 'dark' }) => {
  // Định nghĩa theme colors tối ưu cho performance
  const themeColors = useMemo(() => {
    const isDark = theme === 'dark';
    return {
      background: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: isDark ? 'blur(3px) brightness(0.7)' : 'blur(3px) brightness(1.1)',
      truckBodyPrimary: isDark ? '#F83D3D' : '#E63946',
      truckBodySecondary: isDark ? '#7D7C7C' : '#6C757D',
      truckElements: isDark ? '#282828' : '#343A40',
      truckDetails: isDark ? '#DFDFDF' : '#F8F9FA',
      highlight: isDark ? '#FFFCAB' : '#FFF3CD',
      road: isDark ? '#282828' : '#343A40',
      roadLines: isDark ? 'white' : '#F8F9FA',
    };
  }, [theme]);

  // Tối ưu SVG content với theme colors
  const truckSVG = useMemo(() => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 198 93"
      className="trucksvg"
    >
      <path
        strokeWidth={3}
        stroke={themeColors.truckElements}
        fill={themeColors.truckBodyPrimary}
        d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
      />
      <path
        strokeWidth={3}
        stroke={themeColors.truckElements}
        fill={themeColors.truckBodySecondary}
        d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
      />
      <path
        strokeWidth={2}
        stroke={themeColors.truckElements}
        fill={themeColors.truckElements}
        d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
      />
      <rect
        strokeWidth={2}
        stroke={themeColors.truckElements}
        fill={themeColors.highlight}
        rx={1}
        height={7}
        width={5}
        y={63}
        x={187}
      />
      <rect
        strokeWidth={2}
        stroke={themeColors.truckElements}
        fill={themeColors.truckElements}
        rx={1}
        height={11}
        width={4}
        y={81}
        x={193}
      />
      <rect
        strokeWidth={3}
        stroke={themeColors.truckElements}
        fill={themeColors.truckDetails}
        rx="2.5"
        height={90}
        width={121}
        y="1.5"
        x="6.5"
      />
      <rect
        strokeWidth={2}
        stroke={themeColors.truckElements}
        fill={themeColors.truckDetails}
        rx={2}
        height={4}
        width={6}
        y={84}
        x={1}
      />
    </svg>
  ), [themeColors]);

  const tireSVG = useMemo(() => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 30 30"
      className="tiresvg"
    >
      <circle
        strokeWidth={3}
        stroke={themeColors.truckElements}
        fill={themeColors.truckElements}
        r="13.5"
        cy={15}
        cx={15}
      />
      <circle fill={themeColors.truckDetails} r={7} cy={15} cx={15} />
    </svg>
  ), [themeColors]);

  const lampPostSVG = useMemo(() => (
    <svg
      xmlSpace="preserve"
      viewBox="0 0 453.459 453.459"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      id="Capa_1"
      version="1.1"
      fill={themeColors.truckElements}
      className="lampPost"
    >
      <path
        d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
      />
    </svg>
  ), [themeColors]);

  return (
    <LoadingContainer $themeColors={themeColors}>
      <TruckLoader $themeColors={themeColors}>
        <div className="truckWrapper">
          <div className="truckBody">{truckSVG}</div>
          <div className="truckTires">
            {tireSVG}
            {tireSVG}
          </div>
          <div className="road" />
          {lampPostSVG}
        </div>
      </TruckLoader>
    </LoadingContainer>
  );
});

// Styled Components tối ưu với dark mode support và performance optimizations
const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.$themeColors.background};
  backdrop-filter: ${props => props.$themeColors.backdropFilter};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
  
  /* Mobile optimizations - đảm bảo center hoàn hảo */
  @media (max-width: 767px) {
    backdrop-filter: ${props => props.$themeColors.backdropFilter.replace('blur(3px)', 'blur(1px)')};
    /* Đảm bảo không bị ảnh hưởng bởi address bar mobile */
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
  
  /* Ultra small mobile devices */
  @media (max-width: 374px) {
    backdrop-filter: none; /* Disable backdrop-filter for better performance */
  }
  
  /* Handle safe areas for mobile devices with notches */
  padding: max(env(safe-area-inset-top), 0px) 
           max(env(safe-area-inset-right), 0px) 
           max(env(safe-area-inset-bottom), 0px) 
           max(env(safe-area-inset-left), 0px);
           
  /* iOS Safari viewport fix */
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
  
  /* Landscape mode mobile optimization */
  @media (max-width: 767px) and (orientation: landscape) {
    height: 100vh;
    min-height: 100vh;
  }
`;

const TruckLoader = styled.div`
  /* Container chính tối ưu cho mobile */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .truckWrapper {
    width: 200px;
    height: 100px;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    overflow-x: hidden;
    
    /* Mobile responsive sizes - giảm dần theo breakpoint */
    @media (max-width: 767px) {
      width: 160px;
      height: 80px;
    }
    
    @media (max-width: 479px) {
      width: 140px;
      height: 70px;
    }
    
    @media (max-width: 374px) {
      width: 120px;
      height: 60px;
    }
    
    /* Landscape mode optimization */
    @media (max-width: 767px) and (orientation: landscape) {
      width: 140px;
      height: 70px;
    }
  }

  .truckBody {
    width: 130px;
    height: fit-content;
    margin-bottom: 6px;
    animation: motion 1s linear infinite;
    will-change: transform;
    transition: filter 0.3s ease;
    
    /* Mobile responsive sizes với tỷ lệ phù hợp */
    @media (max-width: 767px) {
      width: 104px; /* 80% of 130px */
      margin-bottom: 5px;
    }
    
    @media (max-width: 479px) {
      width: 91px; /* 70% of 130px */
      margin-bottom: 4px;
    }
    
    @media (max-width: 374px) {
      width: 78px; /* 60% of 130px */
      margin-bottom: 3px;
    }
    
    /* Landscape mode optimization */
    @media (max-width: 767px) and (orientation: landscape) {
      width: 91px;
      margin-bottom: 4px;
    }
  }

  @keyframes motion {
    0% { transform: translateY(0px); }
    50% { transform: translateY(3px); }
    100% { transform: translateY(0px); }
  }

  .truckTires {
    width: 130px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px 0px 15px;
    position: absolute;
    bottom: 0;
    
    svg {
      width: 24px;
      transition: filter 0.3s ease;
    }
    
    /* Mobile responsive sizes */
    @media (max-width: 767px) {
      width: 104px;
      padding: 0px 8px 0px 12px;
      
      svg {
        width: 19px;
      }
    }
    
    @media (max-width: 479px) {
      width: 91px;
      padding: 0px 7px 0px 10px;
      
      svg {
        width: 17px;
      }
    }
    
    @media (max-width: 374px) {
      width: 78px;
      padding: 0px 6px 0px 9px;
      
      svg {
        width: 14px;
      }
    }
    
    /* Landscape mode optimization */
    @media (max-width: 767px) and (orientation: landscape) {
      width: 91px;
      padding: 0px 7px 0px 10px;
      
      svg {
        width: 17px;
      }
    }
  }

  .road {
    width: 100%;
    height: 1.5px;
    background-color: ${props => props.$themeColors.road};
    position: relative;
    bottom: 0;
    align-self: flex-end;
    border-radius: 3px;
    transition: background-color 0.3s ease;
    
    /* Mobile responsive height */
    @media (max-width: 479px) {
      height: 1px;
    }
    
    @media (max-width: 374px) {
      height: 1px;
      border-radius: 2px;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 100%;
      background-color: ${props => props.$themeColors.road};
      border-radius: 3px;
      animation: roadAnimation 1.4s linear infinite;
      will-change: transform; /* GPU acceleration hint */
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    &::before {
      width: 20px;
      right: -50%;
      border-left: 10px solid ${props => props.$themeColors.roadLines};
      
      /* Mobile responsive sizes */
      @media (max-width: 479px) {
        width: 16px;
        border-left-width: 8px;
      }
      
      @media (max-width: 374px) {
        width: 14px;
        border-left-width: 6px;
      }
    }

    &::after {
      width: 10px;
      right: -65%;
      border-left: 4px solid ${props => props.$themeColors.roadLines};
      
      /* Mobile responsive sizes */
      @media (max-width: 479px) {
        width: 8px;
        border-left-width: 3px;
      }
      
      @media (max-width: 374px) {
        width: 6px;
        border-left-width: 2px;
      }
    }
  }

  .lampPost {
    position: absolute;
    bottom: 0;
    right: -90%;
    height: 90px;
    animation: roadAnimation 1.4s linear infinite;
    will-change: transform;
    transition: fill 0.3s ease, filter 0.3s ease;
    
    /* Mobile responsive sizes */
    @media (max-width: 767px) {
      height: 72px; /* 80% of 90px */
    }
    
    @media (max-width: 479px) {
      height: 63px; /* 70% of 90px */
    }
    
    @media (max-width: 374px) {
      height: 54px; /* 60% of 90px */
      right: -95%; /* Adjust position for smaller screens */
    }
    
    /* Landscape mode optimization */
    @media (max-width: 767px) and (orientation: landscape) {
      height: 63px;
    }
    
    /* Add subtle glow effect for dark mode */
    ${props => props.$themeColors.background.includes('0, 0, 0') && `
      filter: drop-shadow(0 0 2px rgba(248, 61, 61, 0.3));
      
      /* Reduce glow on mobile for performance */
      @media (max-width: 767px) {
        filter: drop-shadow(0 0 1px rgba(248, 61, 61, 0.2));
      }
      
      @media (max-width: 374px) {
        filter: none; /* Remove glow on very small screens */
      }
    `}
  }

  @keyframes roadAnimation {
    0% { transform: translateX(0px); }
    100% { transform: translateX(-350px); }
  }
  
  /* Mobile optimized road animation với khoảng cách phù hợp */
  @media (max-width: 767px) {
    @keyframes roadAnimation {
      0% { transform: translateX(0px); }
      100% { transform: translateX(-280px); }
    }
  }
  
  @media (max-width: 479px) {
    @keyframes roadAnimation {
      0% { transform: translateX(0px); }
      100% { transform: translateX(-245px); }
    }
  }
  
  @media (max-width: 374px) {
    @keyframes roadAnimation {
      0% { transform: translateX(0px); }
      100% { transform: translateX(-210px); }
    }
  }

  /* Performance optimizations */
  * {
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
  
  /* Mobile performance optimizations */
  @media (max-width: 767px) {
    * {
      /* Reduce transform complexity on mobile */
      transform-style: flat;
    }
  }
  
  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    /* Disable hover effects on touch devices */
    .truckBody,
    .truckTires svg,
    .lampPost {
      transition: none;
    }
  }
  
  /* Preload animations for smoother performance */
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    animation: none;
  }
`;

LoadingFallback.displayName = "LoadingFallback";

export default LoadingFallback;
