import React from 'react';
import { MicrophoneIcon } from '@heroicons/react/24/outline';

export default function Microphone(props) {
  return (
    <span className="cursor-pointer" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="96"
        height="97"
        viewBox="0 0 96 97"
        fill="none"
      >
        <circle
          opacity="0.2"
          cx="48"
          cy="49"
          r="34"
          fill="url(#paint0_radial_1164_8129)"
        />
        <g filter="url(#filter0_bd_1164_8129)">
          <ellipse
            cx="47.8"
            cy="48.3667"
            rx="23.8"
            ry="24.3667"
            fill="#F54769"
          />
        </g>
        <defs>
          <filter
            id="filter0_bd_1164_8129"
            x="-87.22"
            y="-87.22"
            width="270.042"
            height="271.172"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="55.61" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_1164_8129"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="12" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_backgroundBlur_1164_8129"
              result="effect2_dropShadow_1164_8129"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_1164_8129"
              result="shape"
            />
          </filter>
          <radialGradient
            id="paint0_radial_1164_8129"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(48 15) rotate(90.5004) scale(74.8029 62.2879)"
          >
            <stop offset="0.0142729" stopColor="white" stop-opacity="0" />
            <stop offset="0.653193" stopColor="#FF7FD8" stop-opacity="0" />
            <stop offset="0.910159" stopColor="#C263F5" stop-opacity="0.51" />
          </radialGradient>
        </defs>
      </svg>
      {/* <FontAwesomeIcon icon={faMicrophone} color="#000" /> */}
    </span>
  );
}
