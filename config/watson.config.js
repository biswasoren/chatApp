import dotenv from 'dotenv';
dotenv.config();
const keys = {
    apikey: process.env.WATSON_APIKEY,
    iam_apikey_description: process.env.WATSON_IAM_APIKEY_DESC,
    iam_apikey_name: process.env.WATSON_IAM_APIKEY_NAME,
    iam_role_crn: process.env.WATSON_IAM_ROLE_CRN,
    iam_serviceid_crn: process.env.WATSON_IAM_SERVICEID_CRN,
    url: process.env.WATSON_API
};

export { keys };