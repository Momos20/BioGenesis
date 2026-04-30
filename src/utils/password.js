const SHA_256_PATTERN = /^[a-f0-9]{64}$/i;

export const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const validatePassword = async (plainPassword, storedPassword) => {
  if (!plainPassword || !storedPassword) return false;

  if (SHA_256_PATTERN.test(storedPassword)) {
    return (await hashPassword(plainPassword)) === storedPassword;
  }

  // Compatibilidad con usuarios antiguos guardados en texto plano en server.json.
  // Nota: los hashes bcrypt antiguos empiezan por $2a$, $2b$ o $2y$ y no se validan en cliente.
  return plainPassword === storedPassword;
};
