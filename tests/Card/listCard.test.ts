import { Card } from "../../lib";
import { dynamicParam } from "../../lib/base";
import { Card as CardData } from "../../lib/model";

describe('listCard', () => {
    it('should list card',async () => {
      
       const sampleResponse = {
          "data": [
            {
                "balance": "1000",
                "card_brand": "physical",
                "card_type": "Visa",
                "last_four": "1214",
                "reference": "792c6cf2-f5cf-46c8-bf8c-699a9028010e",
                "status": "issued",
                "last4": "test card"
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
          "statusCode": "200",
        }
      
      const mockSendRequest = jest.fn().mockResolvedValue(sampleResponse);

      const card = new Card();
      card.sendRequest = mockSendRequest; 

    const params = {}; // Utilisez un objet vide comme paramètres fictifs
    const url = `/cards?${dynamicParam(params)}`;
    const result = await card.listCards(dynamicParam(params));

      expect(mockSendRequest).toHaveBeenCalledWith(url, 'get');
      expect(result).toEqual(sampleResponse.data.map(item => new CardData(
        item.balance,
        item.card_brand, 
        item.card_type,  
        item.reference, 
        item.status, 
        item.last4,
      )));

    });
});