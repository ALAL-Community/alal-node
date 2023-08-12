import { Base, dynamicParam } from './base';
import { Card as CardData} from './model';

class Card extends Base {

  private generateCardObject(data:any) {
    const card = new CardData(
        data.balance,
        data.card_brand, 
        data.card_type,  
        data.reference, 
        data.status, 
        data.last4,
    );
    return card
  }

  async listCards(params = {}) {
    
    const fixedParams = dynamicParam(params);
    const url = '/cards?' + fixedParams;
    const method = 'get';
    try {
        const response = await this.sendRequest(url, method);

        const cards:any[] = response.data
        const cardsObject = cards.map((item  => this.generateCardObject(item)))
        return cardsObject

    } catch (error:any) {
        throw error
    }
  }

  async showCard(reference:string){
    const url = '/cards/' + reference;
    const method = 'get';
    try {
        const response = await this.sendRequest(url, method)
        const card = this.generateCardObject(response)
        return card
    } catch (error) {
        throw error
    }
  }

  async createCard(data:any){
    const requiredData = ["card_brand", "card_type", "card_user_reference"]
    this.checkParameter(requiredData, data)

    const url = '/cards/create';
    const method = 'post';
    try {
        const response = await this.sendRequest(url, method, data)
        const card = this.generateCardObject(response)
        return card
    } catch (error:any) {
        throw error
    }
  }

  async getCardAccessToken(reference:string){
    const url = '/cards/auth/access_token' + reference;
    const method = 'post';
    try {
        const response = await this.sendRequest(url, method, {reference: reference})
        return response
    } catch (error) {
        throw error
    }
  }
}

export default Card;