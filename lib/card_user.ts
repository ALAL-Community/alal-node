import { Base, dynamicParam } from './base';
import { CardUser as CardUserData } from './model';

class CardUser extends Base {

  private generateCardUserObject(data:any) {
    const cardUser = new CardUserData(
        data.address,
        data.first_name, 
        data.last_name,  
        data.id_no, 
        data.phone, 
        data.reference,
        data.status,
        data.created_at,
    );
    return cardUser
  }


  async listCardUsers(params = {}) {
    
    const fixedParams = dynamicParam(params);
    const url = '/card-users?' + fixedParams;
    const method = 'get';
    try {
        const response = await this.sendRequest(url, method);

        const cardUsers:any[] = response.data
        const cardUsersObject = cardUsers.map((item  => this.generateCardUserObject(item)))
        return cardUsers

    } catch (error:any) {
        throw error
    }
  }

  async showCardUser(reference:string){
    const url = '/card-users/' + reference;
    const method = 'get';
    try {
        const response = await this.sendRequest(url, method)
        const cardUser = this.generateCardUserObject(response)
        return cardUser
    } catch (error) {
        throw error
    }
  }

  async createCardUser(data:any){
    const requiredData = ["email", "first_name", "last_name", "id_no", "address", "back_id_image", "id_image", "selfie_image", "phone"]
    this.checkParameter(requiredData, data)

    const url = '/card-users/create';
    const method = 'post';
    try {
        const response = await this.sendRequest(url, method, data)
        const cardUser = this.generateCardUserObject(response)
        return cardUser
    } catch (error:any) {
        throw error
    }
  }
}

export default CardUser;