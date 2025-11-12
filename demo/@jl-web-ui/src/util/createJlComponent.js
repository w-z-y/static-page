import COM_PREFIX from '../config';

export default function createJlComponent(option) {
  return {
    name: COM_PREFIX + option.name,
    ...option,
  };
}
