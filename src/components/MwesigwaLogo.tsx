import React from 'react';

interface LogoProps {
  className?: string;
  size?: number; // Optional height & width in px
}

export default function MwesigwaLogo({ className = '', size = 48 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="120 60 830 750"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Main 3D ribbon 'M' and Rocket gradient */}
        <linearGradient id="main-m-grad" x1="180" y1="720" x2="880" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0b1e36" /> {/* Deep dark navy */}
          <stop offset="20%" stopColor="#0e3a6c" /> {/* Deep ocean blue */}
          <stop offset="50%" stopColor="#0284c7" /> {/* Sky blue */}
          <stop offset="80%" stopColor="#0ea5e9" /> {/* Vibrant cyan */}
          <stop offset="100%" stopColor="#38bdf8" /> {/* Light azure */}
        </linearGradient>

        {/* Circular orbit track and connector lines gradient */}
        <linearGradient id="orbit-grad" x1="200" y1="800" x2="800" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e293b" /> {/* Slate dark */}
          <stop offset="45%" stopColor="#0f766e" /> {/* Deep teal */}
          <stop offset="80%" stopColor="#0d9488" /> {/* Medium teal */}
          <stop offset="100%" stopColor="#06b6d4" /> {/* Cyan */}
        </linearGradient>

        {/* Rocket head special gradient */}
        <linearGradient id="rocket-head-grad" x1="780" y1="340" x2="930" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284c7" /> {/* Ocean Blue */}
          <stop offset="60%" stopColor="#38bdf8" /> {/* Light Blue */}
          <stop offset="100%" stopColor="#e0f2fe" /> {/* White-blue glow */}
        </linearGradient>

        {/* Silver metallic inner ring gradient */}
        <linearGradient id="silver-grad" x1="450" y1="700" x2="750" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        
        {/* Glow drop-shadow for the star and rocket tip */}
        <filter id="star-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Orbit Arc - Outer circular loop representing connectivity and networks */}
      {/* Starting point shifted and adjusted for a smoother, circular sweep */}
      <path
        d="M 390 770 
           C 260 740, 160 610, 160 460 
           C 160 260, 310 110, 510 110 
           C 620 110, 720 170, 780 260"
        stroke="url(#orbit-grad)"
        strokeWidth="34"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Network connector line: Connected point to internal node */}
      <path
        d="M 510 120 L 490 240 L 350 330"
        stroke="url(#orbit-grad)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Network connector line 2: Outer circle lower-right extension */}
      <path
        d="M 710 520 L 750 650"
        stroke="url(#orbit-grad)"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />

      {/* Network nodes */}
      <circle cx="510" cy="120" r="18" fill="#06b6d4" stroke="#ffffff" strokeWidth="6" />
      <circle cx="490" cy="240" r="22" fill="#0d9488" stroke="#ffffff" strokeWidth="6" />
      <circle cx="350" cy="330" r="18" fill="#38bdf8" stroke="#ffffff" strokeWidth="6" />
      <circle cx="750" cy="650" r="18" fill="#0284c7" stroke="#ffffff" strokeWidth="6" />

      {/* Circular back-shadow silver metallic ring accent */}
      <path
        d="M 480 730 
           C 600 720, 685 640, 700 520"
        stroke="url(#silver-grad)"
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
      />

      {/* 2. Main Stylized Letter 'M' / 'N' into Rocket Launch Curve */}
      <path
        d="M 195 670 
           C 185 500, 275 390, 415 440 
           C 485 465, 515 570, 555 610 
           C 595 650, 655 630, 685 555 
           L 845 190"
        stroke="url(#main-m-grad)"
        strokeWidth="62"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* High-contrast sheen overlay for a glossy ribbon feel */}
      <path
        d="M 195 670 
           C 185 500, 275 390, 415 440 
           C 485 465, 515 570, 555 610 
           C 595 650, 655 630, 685 555 
           L 845 190"
        stroke="#ffffff"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.22"
      />

      {/* Rocket sleek body head overlay */}
      <path
        d="M 785 320 L 870 120 C 883 90, 915 90, 923 120 L 930 160 C 938 190, 920 220, 890 240 L 820 400 Z"
        fill="url(#rocket-head-grad)"
      />

      {/* Circular cockpit windows representing human interface/tech */}
      <circle cx="870" cy="195" r="16" fill="#ffffff" />
      <circle cx="870" cy="195" r="9" fill="#0f172a" />
      
      {/* Thruster exhaust backing trail */}
      <path 
        d="M 785 360 C 745 390, 715 440, 745 475 C 775 510, 835 480, 855 425" 
        fill="#06b6d4" 
        opacity="0.15"
      />

      {/* 3. Rocket Tip Sparkle */}
      <g filter="url(#star-glow)">
        <path
          d="M 920 60 
             C 920 90, 935 105, 965 105 
             C 935 105, 920 120, 920 150 
             C 920 120, 905 105, 875 105 
             C 905 105, 920 90, 920 60 Z"
          fill="#38bdf8"
        />
        <circle cx="920" cy="105" r="6" fill="#ffffff" />
      </g>
    </svg>
  );
}
