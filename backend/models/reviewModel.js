import { mongoose } from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);
reviewSchema.pre('findOne', function() {
    this.populate('product').populate('user');
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
