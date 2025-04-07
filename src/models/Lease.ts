import mongoose from 'mongoose';

const leaseSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  monthlyRent: {
    type: Number,
    required: true,
  },
  securityDeposit: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'expired', 'terminated'],
    default: 'pending',
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  payments: [{
    amount: Number,
    date: Date,
    type: {
      type: String,
      enum: ['rent', 'deposit', 'fee', 'other'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
    },
    notes: String,
  }],
  terms: {
    petsAllowed: Boolean,
    maxOccupants: Number,
    utilities: {
      water: Boolean,
      electricity: Boolean,
      gas: Boolean,
      internet: Boolean,
      trash: Boolean,
    },
    specialConditions: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp on save
leaseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes for common queries
leaseSchema.index({ property: 1 });
leaseSchema.index({ landlord: 1 });
leaseSchema.index({ tenant: 1 });
leaseSchema.index({ status: 1 });
leaseSchema.index({ startDate: 1, endDate: 1 });

export default mongoose.models.Lease || mongoose.model('Lease', leaseSchema); 