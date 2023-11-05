export default function getIdFromHydraUrl(hydraUrl) {
  return +hydraUrl.slice(-(hydraUrl.length - hydraUrl.lastIndexOf('/') - 1));
}
