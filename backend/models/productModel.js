import { mongoose } from 'mongoose';


const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    dosageForm: {
      type: String,
      required: true,
    },
    packSize: {
      type: String,
    },
    image: {
      type: String,
      // required: true,
    },
    sku: {
      type: String,
      // required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre('findOne', function() {
  this.populate('category')
});

const Product = mongoose.model('Product', productSchema);

export default Product;
