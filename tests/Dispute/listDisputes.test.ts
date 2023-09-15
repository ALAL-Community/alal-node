import { Dispute } from "../../lib";
import { dynamicParam } from "../../lib/base";
import { Dispute as DisputeData } from "../../lib/model";

describe('listDisputes', () => {
    it('should list dispute',async () => {
      
       const sampleResponse = {
          "data": [
            {
              "explanation": "No real explanation even now",
              "reason": "duplicate",
              "reference": "962b954d-bbd3-4b03-8a70-80fb595e9049",
              "status": "submitted",
              "transaction_reference": "962b954d-bbd3-4b03-8a70"
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

      const dispute = new Dispute();
      dispute.sendRequest = mockSendRequest; 

    const params = {}; // Utilisez un objet vide comme paramètres fictifs
    const url = `/disputes?${dynamicParam(params)}`;
    const result = await dispute.listDisputes(dynamicParam(params));

      expect(mockSendRequest).toHaveBeenCalledWith(url, 'get');
      expect(result).toEqual(sampleResponse.data.map(item => new DisputeData(
        item.explanation,
        item.reason,
        item.reference,
        item.status,
        item.transaction_reference,
      )));

    });
});