import axios from "axios";
import dotenv from 'dotenv';
import crypto from 'crypto';

import { AlalBadKeyError, errorClass, AlalRequiredParamError } from './exceptions';

dotenv.config();

class Base {
    apiKey: any;
    production: any;
    AlalLiveURL: string;
    AlalSandboxURL: string;
    baseUrl: any;

    constructor() {
      this.apiKey = process.env.ALAL_API_KEY;
      this.production = process.env.ALAL_PRODUCTION;
      this.baseUrl = process.env.ALAL_BASE_URL;
      this.AlalLiveURL = 'https://saalal.com/api/v1'
      this.AlalSandboxURL = 'https://sandbox.saalal.com/api/v1'
      if(!this.apiKey) {
        throw new AlalBadKeyError();
      }
      if (this.baseUrl === ""){
        if(this.production || this.production === ""){
          this.baseUrl = this.AlalLiveURL;
        } else {
          this.baseUrl = this.AlalSandboxURL;
        }
      }
    }

    async sendRequest(url:string, method:any, data:any =null) {
      try {
        const response = await axios({
          method: method, //you can set what request you want to be
          url: this.baseUrl + url,
          data: data,
          headers: {
            Authorization: 'Bearer ' + this.apiKey
          }
        });
        return response.data
      } catch (error:any) {
        if(error.response) {
          const statusCode = error.response.status
          const dataError = errorClass[statusCode]
          throw new dataError(error.response.data.message)
        };
        return error.message;
      }
      
    };

    checkParameter(requiredParam:string[], passedParam:any){
      const sortRequiredParam = requiredParam.sort();
      const sortPassedParam = Object.keys(passedParam).sort();
      sortRequiredParam.filter((item) => {
        if (!sortPassedParam.includes(item)) {
          const message = "The following are required: " + sortRequiredParam.toString()
          const newMessage = `${item} is not required!. ` + message
          throw new AlalRequiredParamError(newMessage)
        }
      })
    }
}

const dynamicParam = ({ ...args }) => {
  const obj = args;
  if (args !== {}) {
    let query = '';
    Object.keys(obj).forEach((key, index) => {
      const ampasign = index !== 0 ? '&' : '';
      query += `${ampasign}${key}=${obj[key]}`;
    });
    return query;
  }
};

async function webhookAuthentication(request:any) {
  const webhookSecret:any = process.env.ALAL_WEBHOOK_SECRET;

  const alalSignature = request.headers['x-alal-signature'];
  const hashedSignature = crypto.createHmac('sha512', webhookSecret)
  .update(JSON.stringify(request.body))
  .digest('hex');

  return hashedSignature === alalSignature;
} 



export {Base, dynamicParam, webhookAuthentication}