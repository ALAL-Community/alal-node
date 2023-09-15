import { Base, dynamicParam } from './base';
import { Dispute as DisputeData } from './model';

class Dispute extends Base {

  private generateDisputeObject(data:any) {
    const dispute = new DisputeData(
        data.explanation,
        data.reason, 
        data.reference,  
        data.status, 
        data.transaction_reference
    );
    return dispute
  }

  async listDisputes(params = {}) {
    
    const fixedParams = dynamicParam(params);
    const url = '/disputes?' + fixedParams;
    const method = 'get';
    try {
        const response = await this.sendRequest(url, method);

        const disputes:any[] = response.data
        const disputesObject = disputes.map((item  => this.generateDisputeObject(item)))
        return disputesObject

    } catch (error:any) {
        throw error
    }
  }


  async showDispute(reference:string){
    const url = '/disputes/' + reference;
    const method = 'get';
    try {
        const response = await this.sendRequest(url, method)
        const dispute = this.generateDisputeObject(response)
        return dispute
    } catch (error) {
        throw error
    }
  }

  async createDispute(data:any){
    const requiredData = ["action", "amount", "card_reference", "reference"]
    this.checkParameter(requiredData, data)

    const url = '/disputes/create';
    const method = 'post';
    try {
        const response = await this.sendRequest(url, method, data)
        const dispute = this.generateDisputeObject(response)
        return dispute
    } catch (error:any) {
        throw error
    }
  }

  async updateDispute(data:any){
    const requiredData = ["explanation", "reason", "transaction_reference", "reference"]
    this.checkParameter(requiredData, data)

    const url = `/disputes/update/${data.reference}`;
    const method = 'post';
    try {
        const response = await this.sendRequest(url, method, data)
        const dispute = this.generateDisputeObject(response)
        return dispute
    } catch (error:any) {
        throw error
    }
  }
}

export default Dispute;