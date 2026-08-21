const jwt = require('jsonwebtoken');
const { User, Barber } = require('../models');

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error('Credenciales inválidas');
      error.status = 401;
      throw error;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error('Credenciales inválidas');
      error.status = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, barberId: user.barberId },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        barberId: user.barberId
      }
    };
  }
}

module.exports = new AuthService();