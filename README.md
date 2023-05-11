**Support System with Koa and TypeScript**
This project is a support system built with Koa and TypeScript. It allows users to create support tickets, view their tickets, and communicate with support staff.

**Getting Started**
To get started with this project, follow these steps:

1- Clone the repository: git clone https://github.com/khalilahmd/gfa_backend_support_system.git
2- Install dependencies: npm install
3- Create a .env file based on the .env.example file and set the required environment variables.
4- checkout to feature/support branch "git fetch && git checkout feature/support"
5- Start the server: npm start

**Usage**
Once the server is running, you can use the following endpoints to interact with the support system:

POST /support-tickets: Create a support ticket
GET /tickets?id={id}: Get a specific ticket against an identifier
GET /tickets/pending: Get all pending support ticket
GET /tickets/user?user={user}: Get all user specific tickets
GET /tickets/query: Get tickets specific to query by user
PUT /tickets/question?id={id}: Create a query on a specific ticket (we are expecting user type is always comming from FE for now)
PUT /tickets/response?id={id}: Response on a query on a specific ticket (we are expecting user type is always comming from FE for now)
PUT /tickets/change-status?id={id}: Change the status of a specific ticket
DELETE /tickets?id={id}: Delete a support ticket

**Environment Variables**
The following environment variables are required to run the support system:

DATABASE_URI: The URI for your MongoDB instance
AWS_ACCESS_KEY_ID: Your AWS access key ID
AWS_SECRET_ACCESS_KEY: Your AWS secret access key
S3_BUCKET_NAME: The name of your S3 bucket
PORT: Port of your server

**Contributing**
If you'd like to contribute to this project, you can follow these steps:

1- Fork the repository
2- Create a new branch for your changes: git checkout -b my-new-feature
3- Make your changes and commit them: git commit -am 'Add some feature'
4- Push your changes to your fork: git push origin my-new-feature
5- Create a pull request from your fork to the main repository

**Things to add**
Unit test
Error Handling
Containerization
...
