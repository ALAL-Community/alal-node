import { CardUser } from "../../lib";
import { dynamicParam } from "../../lib/base";
import { CardUser as CardUserData } from "../../lib/model";

describe('listCardUser', () => {
    it('should list card user',async () => {
      
       const sampleResponse = {
          "data": [
            {
              "address": "rue ng 59 grand ngor",
              "created_at": "2023-06-22T11:07:07.000000Z",
              "first_name": "ndeye ngone",
              "id_no": "20119991010000621",
              "last_name": "ndiaye",
              "phone": "774964996",
              "reference": "792c6cf2-f5cf-46c8-bf8c-699a9028010e",
              "status": "verified"
            }
          ],
          "message": "OK",
          "meta": {
            "current_page": "1",
            "from": "1",
            "last_page": "1",
            "per_page": "20",
            "to": "17",
            "total": "17"
          },
          "statusCode": "200"
        }
      
      const mockSendRequest = jest.fn().mockResolvedValue(sampleResponse);

      const cardUser = new CardUser();
      cardUser.sendRequest = mockSendRequest; 

    const params = {}; // Utilisez un objet vide comme paramètres fictifs
    const url = `/card-users?${dynamicParam(params)}`;
    const result = await cardUser.listCardUsers(dynamicParam(params));

      expect(mockSendRequest).toHaveBeenCalledWith(url, 'get');
      expect(result).toEqual(sampleResponse.data.map(item => new CardUserData(
        item.address,
        item.first_name,
        item.last_name,
        item.id_no,
        item.phone,
        item.reference,
        item.status,
        item.created_at,
      )));

    });
});