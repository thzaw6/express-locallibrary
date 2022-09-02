const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;
const bookStatusEnum = ['Available', 'Maintenance', 'Loaned', 'Reserved'];

const BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    imprint: { type: String, required: true },
    status: { type: String, required: true, enum: bookStatusEnum, default: 'Maintenance' },
    due_back: { type: Date, default: Date.now }
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function() {
  return `/catalog/bookinstance/${this._id}`;
});

// Virtual for bookinstance's formatted due date
BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});


// Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);