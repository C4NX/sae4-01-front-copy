export default function getGenderString(genderChar) {
  switch (genderChar) {
    case 'M':
      return 'Mâle';
    case 'F':
      return 'Femelle';
    default:
      return 'Non défini';
  }
}
