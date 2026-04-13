import React from 'react';
import { theme } from '../theme';

// Professional logo matching favicon design
const Logo = ({ size = 'normal', variant = 'full', light = false }) => {
  const sizes = {
    small: { text: 18, icon: 32 },
    normal: { text: 24, icon: 40 },
    large: { text: 32, icon: 50 }
  };

  const s = sizes[size] || sizes.normal;
  const textColor = light ? '#ffffff' : theme.primary[800];
  const subColor = light ? 'rgba(255,255,255,0.7)' : theme.neutral[500];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Logo Mark - Building Icon matching favicon */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Building 1 - Left */}
        <rect x="4" y="20" width="12" height="24" rx="2" fill={theme.accent[500]}/>
        <rect x="6" y="23" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
        <rect x="11" y="23" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
        <rect x="6" y="29" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
        <rect x="11" y="29" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
        
        {/* Building 2 - Center (Tallest) */}
        <rect x="18" y="12" width="12" height="32" rx="2" fill={light ? 'rgba(255,255,255,0.95)' : 'white'}/>
        <rect x="20" y="15" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
        <rect x="26.5" y="15" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
        <rect x="20" y="22" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
        <rect x="26.5" y="22" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
        <rect x="20" y="29" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
        <rect x="26.5" y="29" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
        <rect x="22" y="37" width="4" height="7" fill={theme.accent[500]}/>
        
        {/* Building 3 - Right */}
        <rect x="32" y="16" width="12" height="28" rx="2" fill={theme.accent[500]}/>
        <rect x="34" y="19" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
        <rect x="39" y="19" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
        <rect x="34" y="25" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
        <rect x="39" y="25" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
        <rect x="34" y="31" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
        <rect x="39" y="31" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
      </svg>

      {/* Logo Text */}
      <div>
        <h1 style={{
          margin: 0,
          fontSize: `${s.text}px`,
          fontWeight: '700',
          color: textColor,
          letterSpacing: '-0.5px',
          lineHeight: 1.1,
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
        }}>
          get<span style={{ color: theme.accent[500] }}>your</span>stay
        </h1>
        {variant === 'full' && (
          <p style={{
            margin: '2px 0 0',
            fontSize: `${s.text * 0.4}px`,
            color: subColor,
            letterSpacing: '0.3px',
            fontWeight: '500'
          }}>
            PG Accommodations in Bangalore
          </p>
        )}
      </div>
    </div>
  );
};

export const LogoIcon = ({ size = 40, light = false }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="20" width="12" height="24" rx="2" fill={theme.accent[500]}/>
    <rect x="6" y="23" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
    <rect x="11" y="23" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
    <rect x="6" y="29" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
    <rect x="11" y="29" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
    <rect x="18" y="12" width="12" height="32" rx="2" fill={light ? 'rgba(255,255,255,0.95)' : 'white'}/>
    <rect x="20" y="15" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
    <rect x="26.5" y="15" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
    <rect x="20" y="22" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
    <rect x="26.5" y="22" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
    <rect x="20" y="29" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
    <rect x="26.5" y="29" width="3.5" height="4" fill={light ? theme.accent[500] : theme.primary[700]}/>
    <rect x="22" y="37" width="4" height="7" fill={theme.accent[500]}/>
    <rect x="32" y="16" width="12" height="28" rx="2" fill={theme.accent[500]}/>
    <rect x="34" y="19" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
    <rect x="39" y="19" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
    <rect x="34" y="25" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
    <rect x="39" y="25" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
    <rect x="34" y="31" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
    <rect x="39" y="31" width="3" height="3" fill={light ? theme.accent[500] : theme.primary[800]}/>
  </svg>
);

// Text-only logo for minimal use
export const LogoText = ({ size = 'normal', light = false }) => {
  const sizes = {
    small: 18,
    normal: 24,
    large: 32
  };
  
  return (
    <h1 style={{
      margin: 0,
      fontSize: `${sizes[size] || sizes.normal}px`,
      fontWeight: '700',
      color: light ? '#ffffff' : theme.primary[800],
      letterSpacing: '-0.5px',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    }}>
      get<span style={{ color: theme.accent[500] }}>your</span>stay
    </h1>
  );
};

export default Logo;
