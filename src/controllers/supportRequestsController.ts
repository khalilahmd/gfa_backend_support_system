import { Context } from 'koa';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import SupportRequest from '../models/supportRequest';


// If the support request already exists, the new question will be added to the questions array
export const createRequest = async (ctx: Context): Promise<void> => {
  const { user, conversation, files } = ctx.request.body as any;
  const attachments: string[] = [];

  try {
    // Store file paths in attachments array
    if (files) {
      for (const file of files.file) {
        const filePath = `${uuidv4()}-${file.name}`;
        await fs.rename(file.path, `./uploads/${filePath}`);
        attachments.push(filePath);
      }
    }

    // Create new support request
    const supportRequest = new SupportRequest({ user, conversation, attachments });

    // Save support request to database
    await supportRequest.save();

    // Return success response
    ctx.body = { message: 'Support request created successfully' };
  } catch (error) {
    ctx.throw(400, `Bad request: ${error}`);
  }
};

export const getAllPendingRequests = async (ctx: Context) => {
  try {
    const supportRequests = await SupportRequest.find({status: "open"});
    ctx.body = supportRequests;
  } catch (error) {
    ctx.throw(400, `Bad request: ${error}`);
  }
};

export const getUserSpecificRequests = async (ctx: Context) => {
  try {
    const supportRequests = await SupportRequest.find({user: ctx.request.query.user});
    if (!supportRequests) {
      ctx.throw(404, 'Support requests not found');
    }
    ctx.body = supportRequests;
  } catch (error) {
    ctx.throw(400, `Bad request: ${error}`);
  }
};

export const getRequestById = async (ctx: Context) => {
  try {
    const supportRequest = await SupportRequest.findById(ctx.request.query.id);
    if (!supportRequest) {
      ctx.throw(404, 'Support request not found');
    }
    ctx.body = supportRequest;
  } catch (error) {
    ctx.throw(400, `Bad request: ${error}`);
  }
};

export const askQuestion = async (ctx: Context) => {
  try {
    const {conversation, status} = ctx.request.body as any;
    const updateData: any = { $push: { conversation } };

    const supportRequest = await updateRequest(ctx, ctx.request.query.id, updateData);
    if (!supportRequest) {
      ctx.throw(404, 'Support request not found');
    }
    ctx.body = supportRequest;
  } catch (error) {
    ctx.throw(400, `Bad request: ${error}`);
  }
};

export const answerQuestion = async (ctx: Context) => {
  try {
    const {conversation, status} = ctx.request.body as any;
    const updateData: any = { $push: { conversation } };

    if (status) {
      updateData.status = status;
    }
    const supportRequest = await updateRequest(ctx, ctx.request.query.id, updateData);
    ctx.body = supportRequest;
  } catch (error) {
    ctx.throw(400, `Bad request: ${error}`);
  }
};

export const changeStatus = async (ctx: Context) => {
  try {
    const {status} = ctx.request.body as any;
    const updateData: any = { status };

    const supportRequest = await updateRequest(ctx, ctx.request.query.id, updateData);
    if (!supportRequest) {
      ctx.throw(404, 'Support request not found');
    }
    ctx.body = supportRequest;
  } catch (error) {
    ctx.throw(400, `Bad request: ${error}`);
  }
};

export const deleteRequest = async (ctx: Context) => {
  try {
    const supportRequest = await SupportRequest.findByIdAndDelete(ctx.request.query.id);
    if (!supportRequest) {
      ctx.throw(404, 'Support request not found');
    }
    ctx.body = { message: 'Support request deleted successfully' };
  } catch (error) {
    ctx.throw(400, `Bad request: ${error}`);
  }
};

export const updateRequest = async (ctx: Context, id: any, updateData: any) => {
  try {
    const supportRequest = await SupportRequest.findOneAndUpdate(
      { _id:  id },
      updateData,
      { new: true }
    );
    if (!supportRequest) {
      ctx.throw(404, 'Support request not found');
    }
    return supportRequest;
  } catch (error) {
    ctx.throw(400, `Bad request: ${error}`);
  }
};
