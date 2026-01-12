let lastEmit = 0;

export const canEmitLocation = () => {
  const now = Date.now();
  if (now - lastEmit > 3000) {
    lastEmit = now;
    return true;
  }
  return false;
};
