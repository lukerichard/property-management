import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  email: string;
  password: string;
  name: string;
  role: 'tenant' | 'landlord' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpiry: Date;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicture: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['landlord', 'tenant'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: '',
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpiry: {
    type: Date,
  },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Update the updatedAt timestamp on save
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    console.log('Starting password comparison...');
    if (!candidatePassword) {
      console.log('No candidate password provided');
      return false;
    }
    if (!this.password) {
      console.log('No stored password found');
      return false;
    }
    console.log('Comparing passwords using bcrypt...');
    const result = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password comparison completed with result:', result);
    return result;
  } catch (error) {
    console.error('Error in password comparison:', error);
    throw error; // Propagate the error for better error handling
  }
};

// Create compound index for email and role
userSchema.index({ email: 1, role: 1 }, { unique: true });

// Add type definitions
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      };
    }
  }
}

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 