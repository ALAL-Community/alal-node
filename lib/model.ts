
class Card  {

    constructor(public balance:string, public card_brand:string, public card_type:string, public reference:string, public status:string, public last4:string) {
        this.balance = balance
        this.card_brand = card_brand
        this.card_type = card_type
        this.reference = reference
        this.status = status
        this.last4 = last4
    }
}

class CardUser {
    constructor(public address:string, public first_name:string, public last_name:string, public id_no:string, public phone:string, public reference:string, public status:string, public created_at:string) {
        this.address = address
        this.first_name = first_name
        this.last_name = last_name
        this.id_no = id_no
        this.phone = phone
        this.reference = reference
        this.status = status
        this.created_at = created_at
    }
}

class Dispute {

    constructor(public explanation:string, public reason:string, public reference:string, public status:string, public transaction_reference:string) {
        this.explanation = explanation
        this.reason = reason
        this.reference = reference
        this.status = status
        this.transaction_reference = transaction_reference
    }
}


class Transaction {

    constructor(public amount:string, public card_reference:string, public reference:string, public status:string, public created_at:string, public kind:string, public merchant:string) {
        this.amount = amount
        this.card_reference = card_reference
        this.reference = reference
        this.status = status
        this.created_at = created_at
        this.kind = kind
        this.merchant = merchant
    }
}

export {CardUser, Card, Dispute, Transaction}