import { Context } from 'koa';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import SupportRequest from '../models/supportRequest';
import { CreateRequestDto, SupportRequestStatus } from './dto';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.REGION
});

// Create a new request
export const createRequest = async (ctx: Context): Promise<void> => {
  const createSupportRequest = ctx.request.body as CreateRequestDto;
  console.log(createSupportRequest);
  const { user, conversation, attachments } = createSupportRequest;
  const files: string[] = [];

  try {
    // Store file paths in attachments array
    if (attachments) {
      for (const file of attachments) {
        const filePath = `${uuidv4()}-${file.originalName}`;
  
        const uploadParams = {
          Bucket: `${process.env.BUCKET_NAME}`,
          Key: filePath,
          Body: file.buffer
        };
  
        await s3.upload(uploadParams).promise();
        files.push(filePath);
      }
    }

    // Create new support request
    const supportRequest = new SupportRequest({ user, conversation, attachments: files });

    // Save support request to database
    await supportRequest.save();

    // Return success response
    ctx.body = { message: 'Support request created successfully' };
  } catch (error) {
    // return error
    ctx.throw(400, `Bad request: ${error}`);
  }
};

// Get all requests that have status as open
export const getAllPendingRequests = async (ctx: Context) => {
  try {
    // Get supported requests from database
    const supportRequests = await SupportRequest.find({status: SupportRequestStatus.OPEN});

    if (!supportRequests) {
      // return error
      ctx.throw(404, 'Support requests not found');
    }
    // Return success response
    ctx.body = supportRequests;
  } catch (error) {
    // return error
    ctx.throw(400, `Bad request: ${error}`);
  }
};

// Get user specific requests
export const getUserSpecificRequests = async (ctx: Context) => {
  try {
    const { user } = ctx.request.query;
    const supportRequests = await SupportRequest.find({user});
    
    // Return success response
    ctx.body = supportRequests;
  } catch (error) {
    // return error
    ctx.throw(400, `${error}`);
  }
};

// Get a specific request based on identifier
export const getRequestById = async (ctx: Context) => {
  try {
    const { id } = ctx.request.query;
    const supportRequest = await SupportRequest.findById(id);
    
    // Return success response
    ctx.body = supportRequest;
  } catch (error) {
    // return error
    ctx.throw(400, `${error}`);
  }
};

// Get Request against a query from Front-end
export const getQueriedRequests = async (ctx: Context) => {
  try {
    const query: any = ctx.request.body;
    const supportRequest = await SupportRequest.find(query);
    
    if (!supportRequest) {
      ctx.throw(404);
    }
    // Return success response
    ctx.body = supportRequest;
  } catch (error) {
    // return error
    ctx.throw(400, `${error}`);
  }
};

// Ask Question in already registered Request
export const askQuestion = async (ctx: Context) => {
  try {
    const { conversation } = ctx.request.body as any;
    const updateData: any = { $push: { conversation } };

    const supportRequest = await updateRequest(ctx, ctx.request.query.id, updateData);
    if (!supportRequest) {
      // return error
      ctx.throw(404, 'Support request not found');
    }
    
    // Return success response
    ctx.body = supportRequest;
  } catch (error) {
    // return error
    ctx.throw(400, `Bad request: ${error}`);
  }
};

// Answer a Question in already registered Request
export const answerQuestion = async (ctx: Context) => {
  try {
    const {conversation, status} = ctx.request.body as any;
    const updateData: any = { $push: { conversation } };

    if (status) {
      updateData.status = status;
    }
    const supportRequest = await updateRequest(ctx, ctx.request.query.id, updateData);
    
    // Return success response
    ctx.body = supportRequest;
  } catch (error) {
    // return error
    ctx.throw(400, `Bad request: ${error}`);
  }
};

// Change the status of a request from open to in progress or resolved
export const changeStatus = async (ctx: Context) => {
  try {
    const {status} = ctx.request.body as any;
    const updateData: any = { status };

    const supportRequest = await updateRequest(ctx, ctx.request.query.id, updateData);
    
    // Return success response
    ctx.body = supportRequest;
  } catch (error) {
    // return error
    ctx.throw(400, `Bad request: ${error}`);
  }
};

// Delete a specific request
export const deleteRequest = async (ctx: Context) => {
  try {
    const supportRequest = await SupportRequest.findByIdAndDelete(ctx.request.query.id);

    if (!supportRequest) {
      // return error
      ctx.throw(404, 'Support request not found');
    }
    
    // Return success response
    ctx.body = { message: 'Support request deleted successfully' };
  } catch (error) {
    // return error
    ctx.throw(400, `Bad request: ${error}`);
  }
};

// Method to use internally for request updation
const updateRequest = async (ctx: Context, id: any, updateData: any) => {
  try {
    // Find and update the request
    const supportRequest = await SupportRequest.findOneAndUpdate(
      { _id:  id },
      updateData,
      { new: true }
    );

    if (!supportRequest) {
      // return error
      ctx.throw(404);
    }
    
    // Return success response
    return supportRequest;
  } catch (error) {
    // return error
    ctx.throw(400, `Bad request: ${error}`);
  }
};

