import { Base } from './base';
import { Miscellaneous as MiscellaneousData } from './model';

class Miscellaneous extends Base {

    private generateMiscellaneousObject(data:any) {
        const miscellaneous = new MiscellaneousData(
            data.phone, 
            data.country_code
        );
        return miscellaneous
    }

    async phoneVerification(data:any){
        const requiredData = ["country_code", "phone"]
        this.checkParameter(requiredData, data)
    
        const url = '/phone/verify';
        const method = 'post';
        try {
            const response = await this.sendRequest(url, method, data)
            const miscellaneous = this.generateMiscellaneousObject(response)
            return miscellaneous
        } catch (error:any) {
            throw error
        }
      } 
}