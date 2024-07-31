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
        data.bank_name, 
        data.account_name,
        data.bank_id,
        data.description,
        data.phone,
        data.wallet_network
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

  async transactionCardToBank(data:any){
    const requiredData = ["amount", "account_name", "bank_id", "bank_name", "card_reference", "description"]
    this.checkParameter(requiredData, data)

    const url = '/transactions/create/card-to-bank';
    const method = 'post';
    try {
        const response = await this.sendRequest(url, method, data)
        const transactions = this.generateTransactionObject(response)
        return transactions
    } catch (error:any) {
        throw error
    }
  }

  async transactionCardToWallet(data:any){
    const requiredData = ["amount", "card_reference", "phone", "wallet_network"]
    this.checkParameter(requiredData, data)

    const url = '/transactions/create/card-to-wallet';
    const method = 'post';
    try {
        const response = await this.sendRequest(url, method, data)
        const transactions = this.generateTransactionObject(response)
        return transactions
    } catch (error:any) {
        throw error
    }
  }

  async transactionWalletToCard(data:any){
    const requiredData = ["amount", "card_reference", "phone", "wallet_network"]
    this.checkParameter(requiredData, data)

    const url = '/transactions/create/wallet-to-card';
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