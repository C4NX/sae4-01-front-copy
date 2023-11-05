export default function openFileSelector(onSelect, accept = 'image/*') {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.click();
  input.addEventListener('change', (event) => {
    onSelect(event);
    input.remove();
  }, { once: true });
}
