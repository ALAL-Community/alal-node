import { Transaction } from "../../lib";
import { dynamicParam } from "../../lib/base";
import { Transaction as TransactionData } from "../../lib/model";

describe('listTransactions', () => {
    it('should list transaction user',async () => {
      
       const sampleResponse = {
        "data": [
            {
              "amount": "1000",
              "card_reference": "9c54515e-7890-44f9-8cc2-a85b80322b98",
              "created_at": "792c6cf2-f5cf-46c8-bf8c-699a9028010e",
              "kind": "success",
              "merchant": "2023-06-22T11:07:07.000000Z",
              "reference": "recharge",
              "status": "Any",
            }
          ],
          "message": "OK",
          "meta": {
            "current_page": "1",
            "from": "1",
            "last_page": "1",
            "per_page": "20",
            "to": "17",
            "total": "17",
          },
          "statusCode": "200"
        }
      
      const mockSendRequest = jest.fn().mockResolvedValue(sampleResponse);

      const transaction = new Transaction();
      transaction.sendRequest = mockSendRequest; 

    const params = {}; // Utilisez un objet vide comme paramètres fictifs
    const url = `/transactions?${dynamicParam(params)}`;
    const result = await transaction.listTransactions(dynamicParam(params));

      expect(mockSendRequest).toHaveBeenCalledWith(url, 'get');
      expect(result).toEqual(sampleResponse.data.map(item => new TransactionData(
        item.amount,
        item.card_reference,
        item.reference,
        item.status,
        item.created_at,
        item.kind,
        item.merchant,
      )));

    });
});