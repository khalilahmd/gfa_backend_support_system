// src/models/supportRequest.ts

import { Schema, Document, model } from 'mongoose';

interface ISupportRequest extends Document {
  user: string;
  status: string;
  timestamp: Date;
  attachments: string[];
  conversation: { userType: string; message: string }[];
}

const SupportRequestSchema: Schema = new Schema({
  user: { type: String, required: true },
  status: { type: String, enum: ['open', 'in progress', 'resolved'], default: 'open' },
  timestamp: { type: Date, default: Date.now },
  attachments: [{ type: String }],
  conversation: [{ userType: String, message: String }],
});

export default model<ISupportRequest>('SupportRequest', SupportRequestSchema);
