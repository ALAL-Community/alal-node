import { Base, dynamicParam } from './base';
import { Transaction as TransactionData } from './model';

class Transaction extends Base {

  private generateTransactionObject(data:any) {
    const transaction = new TransactionData(
        data.amount,
        data.card_reference, 
        data.reference,  
        data.status, 
        data.created_at, 
        data.kind,
        data.merchant,
    );
    return transaction
  }

  async listTransactions(params = {}) {
    
    const fixedParams = dynamicParam(params);
    const url = '/transactions?' + fixedParams;
    const method = 'get';
    try {
        const response = await this.sendRequest(url, method);

        const transactions:any[] = response.data
        const transactionsObject = transactions.map((item  => this.generateTransactionObject(item)))
        return transactionsObject

    } catch (error:any) {
        throw error
    }
  }

  async createTransaction(data:any){
    const requiredData = ["action", "amount", "card_reference", "reference"]
    this.checkParameter(requiredData, data)

    const url = '/transactions/create';
    const method = 'post';
    try {
        const response = await this.sendRequest(url, method, data)
        const transactions = this.generateTransactionObject(response)
        return transactions
    } catch (error:any) {
        throw error
    }
  }
}


export default Transaction;