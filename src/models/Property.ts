import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  landlordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  details: {
    propertyType: {
      type: String,
      required: true,
      enum: ['Apartment', 'House', 'Condo', 'Townhouse'],
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    squareFootage: {
      type: Number,
      required: true,
    },
  },
  rental: {
    monthlyRent: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  currentTenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

// Update the updatedAt field before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes for common queries
propertySchema.index({ 'address.city': 1, 'address.state': 1 });
propertySchema.index({ landlordId: 1 });
propertySchema.index({ currentTenant: 1 });
propertySchema.index({ 'rental.isAvailable': 1 });
propertySchema.index({ 'rental.monthlyRent': 1 });

export default mongoose.models.Property || mongoose.model('Property', propertySchema); 