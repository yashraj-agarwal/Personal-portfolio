const targets = new WeakSet();
let filterCounter = 0;

export function applyGlass(el, configParam) {
  if (!el || targets.has(el)) return;
  targets.add(el);
  
  const id = `lg-filter-${++filterCounter}`;
  
  const conf = typeof configParam === 'function' ? configParam() : configParam || {};
  // Derive scale proportionally based on the reference code's scale="200"
  // If scaleRatio is 1.4, this yields ~196. If 1.7 (pill), it yields 238.
  const scale = (conf.scaleRatio || 1.4) * 142; 
  
  const svgNS = "http://www.w3.org/2000/svg";
  
  // Inject the layer into the element exactly as the reference code dictates
  const layer = document.createElement('div');
  layer.className = 'lg-layer';
  layer.style.position = 'absolute';
  layer.style.inset = '0';
  layer.style.pointerEvents = 'none';
  layer.style.zIndex = '0';
  layer.style.borderRadius = 'inherit';
  layer.style.clipPath = 'inset(0 round 99em)';
  layer.style.overflow = 'hidden';
  
  // Reference technique: backdropFilter + filter + isolation
  layer.style.backdropFilter = 'blur(3px)';
  layer.style.WebkitBackdropFilter = 'blur(3px)';
  layer.style.filter = `url(#${id})`;
  layer.style.isolation = 'isolate';
  
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('style', 'width:0;height:0;position:absolute;');
  
  const filter = document.createElementNS(svgNS, 'filter');
  filter.setAttribute('id', id);
  filter.setAttribute('x', '0%');
  filter.setAttribute('y', '0%');
  filter.setAttribute('width', '100%');
  filter.setAttribute('height', '100%');
  filter.setAttribute('filterUnits', 'objectBoundingBox');
  
  // Pure background refraction technique from the reference code
  filter.innerHTML = `
    <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
    <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
    <feDisplacementMap in="SourceGraphic" in2="softMap" scale="${scale}" xChannelSelector="R" yChannelSelector="G" />
  `;
  
  svg.appendChild(filter);
  layer.appendChild(svg);
  el.appendChild(layer);
  
  el._lgLayer = layer;
}

export function enableGlass(el, config) {
  if (!targets.has(el)) applyGlass(el, config);
}

export function removeGlass(el) {
  if (el && el._lgLayer) {
    el._lgLayer.remove();
    targets.delete(el);
    delete el._lgLayer;
  }
}
