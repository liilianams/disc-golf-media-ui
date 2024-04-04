import React from 'react';
import { SvgIcon } from '@mui/material';
import { useSmallBreakpoint } from '../utils/hooks';

const BasketIcon: React.FC = () => {
  const isSmallScreen = useSmallBreakpoint();
  return (
    <SvgIcon sx={{
      marginRight: 0,
      fontSize: isSmallScreen ? '3rem' : '4rem',
      px: isSmallScreen ? 0 : 1,
    }}>
      {/* Disc Golf Basket icon by Kevin from Noun Project: https://thenounproject.com/browse/icons/term/disc-golf-basket/ */}
      <svg version="1.0"
           xmlns="http://www.w3.org/2000/svg"
           width="645.000000pt"
           height="645.000000pt"
           viewBox="0 0 645.000000 645.000000"
           preserveAspectRatio="xMidYMid meet">
        <g
          transform="translate(0.000000,645.000000) scale(0.100000,-0.100000)"
          fill="#fff"
          stroke="#fff"
          strokeWidth="40"
        >
          <path
            d="M1657 6353 c-4 -3 -7 -86 -7 -184 0 -159 2 -179 18 -188 15 -8 18 -35 24 -228 22 -731 195 -1474 461 -1978 l42 -80 48 -3 c26 -2 47 -2 47 0 0 2 -31 64 -68 138 -266 526 -416 1189 -448 1978 l-7 172 215 0 215 0 6 -267 c11 -457 54 -866 133 -1278 44 -227 129 -547 184 -692 18 -47 19 -48 65 -51 42 -3 47 -1 41 15 -28 72 -90 267 -115 358 -145 541 -214 1116 -231 1908 0 4 97 7 215 7 l215 0 0 -202 c0 -655 76 -1617 161 -2035 10 -53 11 -53 48 -53 21 0 40 2 43 5 2 3 -3 49 -13 102 -80 450 -135 1135 -146 1801 l-6 382 116 0 117 0 0 -1145 0 -1145 190 0 190 0 0 1145 0 1145 115 0 115 0 0 -247 c0 -625 -65 -1459 -149 -1936 -10 -53 -15 -99 -13 -102 3 -3 22 -5 43 -5 37 0 38 0 48 53 85 428 161 1379 161 2035 l0 202 215 0 c118 0 215 -3 215 -7 -17 -820 -93 -1418 -249 -1968 -22 -77 -53 -177 -70 -223 -17 -46 -31 -86 -31 -88 0 -3 21 -4 47 -2 l46 3 34 100 c176 518 283 1204 300 1918 l6 267 215 0 215 0 -7 -172 c-32 -788 -182 -1452 -448 -1978 -37 -74 -68 -136 -68 -138 0 -2 21 -2 48 0 l47 3 42 80 c54 103 152 331 197 462 154 446 248 982 265 1515 6 190 9 219 24 230 16 12 17 32 15 193 l-3 180 -1561 3 c-858 1 -1564 -1 -1567 -5z"/>
          <path
            d="M1610 3595 c0 -8 63 -253 140 -545 77 -291 140 -532 140 -535 0 -3 599 -5 1330 -5 732 0 1330 2 1330 5 0 3 63 244 140 535 77 292 140 537 140 545 0 13 -194 15 -1610 15 -1416 0 -1610 -2 -1610 -15z m430 -84 c0 -5 23 -129 51 -276 29 -158 47 -271 41 -277 -5 -5 -67 -7 -137 -6 l-129 3 -68 255 c-37 140 -70 267 -73 283 l-7 27 161 0 c90 0 161 -4 161 -9z m454 -13 c8 -39 56 -481 56 -515 l0 -33 -154 0 c-85 0 -157 4 -160 8 -5 9 -106 531 -106 550 0 9 50 12 180 12 178 0 180 0 184 -22z m461 -155 c3 -98 7 -225 8 -283 l2 -105 -160 0 -160 0 -31 275 c-17 151 -29 278 -27 283 2 4 84 7 183 7 l178 0 7 -177z m441 -55 c-4 -128 -9 -257 -13 -285 l-5 -53 -158 0 -158 0 -5 53 c-4 28 -9 157 -13 285 l-7 232 183 0 183 0 -7 -232z m457 225 c2 -5 -10 -132 -27 -283 l-31 -275 -160 0 -160 0 2 105 c1 58 5 185 8 283 l7 177 178 0 c99 0 181 -3 183 -7z m457 -5 c0 -18 -101 -541 -106 -550 -3 -4 -75 -8 -160 -8 l-154 0 0 33 c0 34 48 476 56 515 4 22 6 22 184 22 130 0 180 -3 180 -12z m405 -15 c-3 -16 -36 -143 -73 -283 l-68 -255 -132 -3 c-100 -2 -134 1 -137 10 -3 7 17 132 45 277 27 145 50 268 50 273 0 4 72 8 161 8 l161 0 -7 -27z m-2559 -634 c12 -20 52 -244 45 -252 -4 -4 -61 -6 -126 -5 l-118 3 -33 125 c-18 68 -30 128 -28 132 8 13 252 10 260 -3z m409 -1 c8 -22 32 -248 26 -253 -2 -3 -69 -5 -147 -5 -141 0 -144 0 -149 23 -19 87 -43 232 -39 239 3 4 73 8 155 8 111 0 151 -3 154 -12z m402 0 c4 -7 9 -68 11 -136 l4 -123 -148 3 -149 3 -14 117 c-7 64 -11 124 -8 132 5 14 29 16 151 16 105 0 147 -3 153 -12z m408 2 c3 -5 3 -66 -1 -135 l-7 -125 -147 0 -147 0 -7 125 c-4 69 -4 130 -1 135 8 13 302 13 310 0z m402 -6 c3 -8 -1 -68 -8 -132 l-14 -117 -149 -3 -148 -3 4 123 c2 68 7 129 11 136 6 9 48 12 153 12 122 0 146 -2 151 -16z m407 8 c4 -7 -20 -152 -39 -239 -5 -23 -8 -23 -149 -23 -78 0 -145 2 -147 5 -6 5 18 231 26 253 3 9 43 12 154 12 82 0 152 -4 155 -8z m360 0 c2 -4 -10 -64 -28 -132 l-33 -125 -118 -3 c-65 -1 -122 1 -126 5 -7 8 32 230 45 251 8 14 251 18 260 4z"/>
          <path d="M2379 3412 c5 -10 17 -24 25 -32 14 -11 16 -8 16 19 0 27 -4 31 -25 31 -22 0 -24 -3 -16 -18z"/>
          <path
            d="M2680 3408 c1 -47 90 -198 169 -288 l31 -35 -6 75 c-5 61 -12 84 -39 125 -17 28 -44 71 -59 98 -25 41 -32 47 -62 47 -29 0 -34 -4 -34 -22z"/>
          <path
            d="M2710 3160 c0 -88 32 -120 119 -120 44 0 51 3 51 20 0 11 -10 25 -22 32 -12 7 -50 32 -85 55 l-63 41 0 -28z"/>
          <path d="M3130 3372 c0 -33 3 -120 7 -195 l6 -137 77 0 77 0 6 137 c4 75 7 162 7 195 l0 58 -90 0 -90 0 0 -58z"/>
          <path
            d="M3664 3383 c-15 -27 -42 -70 -59 -98 -26 -40 -34 -65 -40 -124 -8 -89 -5 -88 77 26 69 95 118 187 118 219 0 21 -5 24 -34 24 -30 0 -37 -6 -62 -47z"/>
          <path
            d="M3673 3151 c-28 -20 -65 -44 -82 -53 -19 -10 -31 -25 -31 -38 0 -17 6 -20 51 -20 72 0 107 23 115 76 10 70 5 74 -53 35z"/>
          <path d="M4020 3399 c0 -27 2 -30 16 -19 8 8 20 22 25 32 8 15 6 18 -16 18 -21 0 -25 -4 -25 -31z"/>
          <path d="M3150 2735 l0 -45 70 0 70 0 0 45 0 45 -70 0 -70 0 0 -45z"/>
          <path d="M3030 1240 l0 -1180 190 0 190 0 0 1180 0 1180 -190 0 -190 0 0 -1180z"/>
        </g>
      </svg>
    </SvgIcon>
  );
};

export default BasketIcon;