export const validActionsMessage = "One or more actions are invalid. Valid actions are [send_dian, send_email] which can be (true/false)";

const actionKeys = new Set(['send_dian', 'send_email'])

export function validActions(actions) {
  const keys       = Object.keys(actions),
        difference = [...keys].filter(x => !actionKeys.has(x));
  return !difference.length;
}

export function buildPostRequest(actions, document) {
  return {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({actions, document})
  };
}

export function buildPutRequest(actions) {
  return {
    method: 'PUT',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({actions})
  };
}

export function buildGetRequest() {
  return {method: 'GET', mode: 'cors'};
}

export const BASE_URL = "https://www.dataico.com/direct/dataico_api/v2/invoices"

export function postURL() { return BASE_URL; }

export function putURL(invoiceId) { return BASE_URL + '/' + invoiceId; }

export function getURL(invoiceId) { return BASE_URL + '/' + invoiceId; }

function throwError(msg) {throw msg;}

async function apiResponse(response) {
  const responseJson = await response.json();
  if (response.ok) { return responseJson; }
  throwError(responseJson);
}

/**
 Call this function to POST (create) invoice in dataico.

 Depending on your actions, which could be:
 {} or {send_dian: true} or {send_dian:true send_email: true}
 the invoice will be created and then either sent to dian and/or
 email sent depending on actions settings.

 postInvoice({}, invoice)
 .then((responseJson) => komerciaInvoicePOSTSuccess(responseJson))
 .catch((errors) => komerciaInvoicePOSTFail(errors));

 response will contain a hash like:

 {
     uuid: '1233-3h2h-oju2-43hh',
     cufe: '33eiu4y51b7c63bb82968a12abdbeaf541a23212',
     qrcode: 'NumFac=SETP990000200',
     xml: 'PHhtbD48L3htbD4=',
     xml_url: 'https://dataico-factura.herokuapp.com/invoices/1233-3h2h-oju2-43hh.xml',
     pdf_url: 'https://dataico-factura.herokuapp.com/invoices/1233-3h2h-oju2-43hh.pdf',
     dian_status: 'DIAN_UNSENT',
     email_status: 'EMAIL_UNSENT',
     number: 'NC100'
   }

 @param actions
 @param invoice
 @returns {Promise<any>}
 */
export async function postInvoice(actions, invoice) {
  if (!validActions(actions)) { throw  validActionsMessage(actions); }

  const response = await fetch(postURL(), buildPostRequest(actions, invoice));
  return apiResponse(response);
}

/**
 Call this function to PUT (update) existing invoice in dataico.

 Depending on your actions, which could be:
 {} or {send_dian: true} or {send_dian:true send_email: true}
 the invoice will be either sent to dian and/or email sent depending
 on actions settings.

 putInvoice({send_dian:true}, invoiceId)
  .then((responseJson)=> komerciaInvoicePUTSuccess(responseJson))
  .catch((errors)=> komerciaInvoicePUTFail(errors));


 response will contain a hash like:

 {
     uuid: '1233-3h2h-oju2-43hh',
     cufe: '33eiu4y51b7c63bb82968a12abdbeaf541a23212',
     qrcode: 'NumFac=SETP990000200',
     xml: 'PHhtbD48L3htbD4=',
     xml_url: 'https://dataico-factura.herokuapp.com/invoices/1233-3h2h-oju2-43hh.xml',
     pdf_url: 'https://dataico-factura.herokuapp.com/invoices/1233-3h2h-oju2-43hh.pdf',
     dian_status: 'DIAN_ACEPTADO',
     email_status: 'EMAIL_SENT',
     number: 'NC100'
   }

 @param actions
 @param invoiceId
 @returns {Promise<any>}
 */
export async function putInvoice(actions, invoiceId) {
  if (!validActions(actions)) { throw  validActionsMessage(actions); }

  const response = await fetch(putURL(invoiceId), buildPutRequest(actions));
  return apiResponse(response);
}

/**
 Call this function to GET existing invoice in dataico.

 getInvoice(invoiceId)
  .then((responseJson) => komerciaInvoiceGETSuccess(responseJson))
  .catch((errors) => komerciaInvoiceGETFail(errors));

 response will contain the invoice information like:

 {
   "invoice": {
     "env": "PRUEBAS",
     "dataico_account_id": "002979c5-7c23-43ab-aa98-3fa7dce6e4d0",
     "number": "98001",
     "issue_date": "21/02/2019",
     "payment_date": "23/02/2019 13:22:43",
     "order_reference": "OC20",
     "invoice_type_code": "FACTURA_VENTA",
     "payment_means": "DEBIT_CARD",
     "payment_means_type": "DEBITO",
     "numbering": {
       "resolution_number": "18760000001"
     },
     "notes": [
       "string"
     ],
     "customer": {
       "email": "daniel@email.com",
       "phone": "3001234567",
       "party_type": "PERSONA_JURIDICA",
       "party_identification": "900373117",
       "party_identification_type": "NIT",
       "tax_level_code": "COMUN",
       "regimen": "ORDINARIO",
       "department": "BOLIVAR",
       "city": "CARTAGENA",
       "address_line": "carrera 8 Nº 6C - 95",
       "country_code": "CO",
       "company_name": "PJ - 900373117",
       "first_name": "Stuart",
       "family_name": "Espinoza"
     },
     "items": [
       {
         "sku": "SKU_112322",
         "quantity": 10,
         "description": "Descripcion producto",
         "price": 2300,
         "discount_rate": 10,
         "taxes": [
           {
             "tax_category": "IVA",
             "tax_rate": 5
           }
         ],
         "retentions": [
           {
             "tax_category": "RET_FUENTE",
             "tax_rate": 1
           }
         ]
       }
     ],
     "retentions": [
       {
         "tax_category": "RET_IVA",
         "tax_rate": 15
       }
     ]
   }
 }
 @param actions
 @param invoiceId
 @returns {Promise<any>}
 */
export async function getInvoice(invoiceId) {
  const response = await fetch(getURL(invoiceId), buildGetRequest());
  return apiResponse(response);
}
