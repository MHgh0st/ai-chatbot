import bcrypt from 'bcryptjs';

export const PasswordHasher = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    return hashedPassword;
  } catch (error) {
    console.error(error);
  }
};
