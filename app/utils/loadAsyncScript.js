export default function loadScript(src, options = {}) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`failed to load ${src}`));

    document.body.appendChild(script);
  });
}
