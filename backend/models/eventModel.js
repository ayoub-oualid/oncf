import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    allDay: {
      type: Boolean,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.pre('save', function (next) {
  if (!this.end) {
    this.end = new Date(this.start.getTime() + 6 * 60 * 60 * 1000);
  }
  this.allDay = true;
  next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event;