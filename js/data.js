/**
 * data.js — Coco Case
 * Central data store: phone models, pricing tiers, gradient presets.
 * Edit this file to add/remove models or update prices without
 * touching the business logic in customizer.js.
 */

const PHONE_MODELS = {
  apple: [
    { name: 'iPhone 16 Pro Max', price: '34.99 $' },
    { name: 'iPhone 16 Pro',     price: '34.99 $' },
    { name: 'iPhone 16 / Plus',  price: '34.99 $' },
    { name: 'iPhone 15 Pro Max', price: '34.99 $' },
    { name: 'iPhone 15 / Plus',  price: '34.99 $' },
    { name: 'iPhone 14 Pro Max', price: '34.99 $' },
    { name: 'iPhone 14 / Plus',  price: '34.99 $' },
    { name: 'iPhone 13 series',  price: '34.99 $' },
    { name: 'iPhone 12 series',  price: '34.99 $' },
  ],
  samsung: [
    { name: 'Galaxy S25 Ultra',  price: '34.99 $' },
    { name: 'Galaxy S25 / Plus', price: '34.99 $' },
    { name: 'Galaxy S24 Ultra',  price: '34.99 $' },
    { name: 'Galaxy S24 / Plus', price: '34.99 $' },
    { name: 'Galaxy A54 / A55',  price: '34.99 $' },
    { name: 'Galaxy Z Fold 6',   price: '34.99 $' },
    { name: 'Galaxy Z Flip 6',   price: '34.99 $' },
  ],
  pixel: [
    { name: 'Pixel 9 Pro', price: '34.99 $' },
    { name: 'Pixel 9',     price: '34.99 $' },
    { name: 'Pixel 8 Pro', price: '34.99 $' },
    { name: 'Pixel 8',     price: '34.99 $' },
    { name: 'Pixel 7 Pro', price: '34.99 $' },
  ],
  other: [
    { name: 'OnePlus 12',        price: '34.99 $' },
    { name: 'Motorola Edge 50',  price: '34.99 $' },
    { name: 'Autre modèle',      price: '34.99 $' },
  ],
};

/**
 * Pricing tiers — qty is the minimum quantity to unlock this tier.
 * Displayed in the pricing section and used by the order summary.
 */
const PRICING_TIERS = [
  { qty: 1,  label: '1 coque',    price: 34.99 },
  { qty: 2,  label: '2 coques',   price: 29.99 },
  { qty: 3,  label: '3+ coques',  price: 28.49 },
  { qty: 15, label: '15+ coques', price: 25.49 },
];

/** Gradient colour presets shown in the edit panel. */
const GRADIENT_PRESETS = [
  { label: 'Feu',      value: 'linear-gradient(135deg,#FF4500,#FF8C00,#FFD700)' },
  { label: 'Océan',    value: 'linear-gradient(135deg,#0066FF,#00CFFF)' },
  { label: 'Violet',   value: 'linear-gradient(135deg,#A855F7,#EC4899)' },
  { label: 'Émeraude', value: 'linear-gradient(135deg,#10B981,#3B82F6)' },
  { label: 'Nuit',     value: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)' },
  { label: 'Corail',   value: 'linear-gradient(135deg,#FF6B6B,#FFA07A)' },
  { label: 'Soleil',   value: 'linear-gradient(135deg,#FFD700,#FF6B6B)' },
  { label: 'Noir',     value: '#000000' },
];

/** Text colour swatches in the edit panel. */
const TEXT_COLORS = ['#FFFFFF', '#FF4500', '#FFD700', '#00CFFF', '#A855F7', '#000000'];

/** Image filter presets. */
const FILTERS = [
  { label: 'Normal', value: 'none' },
  { label: 'N&B',    value: 'grayscale(100%)' },
  { label: 'Sépia',  value: 'sepia(80%)' },
  { label: 'Néon',   value: 'hue-rotate(180deg)' },
  { label: 'Vif',    value: 'contrast(1.4) saturate(1.6)' },
  { label: 'Clair',  value: 'brightness(1.3) contrast(0.9)' },
];
