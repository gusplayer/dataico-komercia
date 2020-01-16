import {
  getInvoice, getURL, postInvoice, postURL, putInvoice, putURL, validActions
} from '@/unit/dataico/invoice'

const fetchMock = require('fetch-mock');

describe('validActions', () => {
  it('correct actions', () => {
    const actions = {send_dian: true, send_email: false};
    expect(validActions(actions)).toEqual(true);
  });
  it('invalid action key', () => {
    const actions = {send_dianZZ: false};
    expect(validActions(actions)).toEqual(false);
  });
  it('no actions', () => {
    const actions = {};
    expect(validActions(actions)).toEqual(true);
  });
});

describe('postInvoice', () => {
  it('create invoice success', async () => {
    const actions     = {send_dian: true},
          invoice     = {
            "dataico_account_id": "aaaa-1111-bbbbb-222222",
            "issue-date": "23/03/2020 13:22:43"
          },
          apiResponse = {
            invoice_id: "aaaa-11111-bbbbb-22222",
            dian_status: "DIAN_UNSENT"
          };

    fetchMock.post(postURL(), apiResponse);

    postInvoice(actions, invoice).then((responseJson) =>
      expect(responseJson).toEqual(apiResponse));

    fetchMock.reset();
  });
  it('create invoice failure', async () => {
    const actions         = {},
          invoice         = {"dataico_account_id": "12345"},
          apiErrors       = {
            errors: "Debe enviar un dataico account " +
              "id válido (debe ser un uuid como a7ec34ae-f30b-40e8-b3a8-93bfc4c37d70)"
          },
          dataicoResponse = {status: 500, body: apiErrors};

    fetchMock.post(postURL(), dataicoResponse);

    postInvoice(actions, invoice).catch((responseJson) => {
      expect(responseJson).toEqual(apiErrors);
    });

    fetchMock.reset();
  });
});

describe('putInvoice', () => {
  it('actions on invoice success', async () => {
    const actions     = {send_email: true},
          invoiceId   = "1233-3h2h-oju2-43hh",
          apiResponse = {
            uuid: '1233-3h2h-oju2-43hh',
            cufe: '33eiu4y51b7c63bb82968a12abdbeaf541a23212',
            qrcode: 'NumFac=SETP990000200',
            xml: 'PHhtbD48L3htbD4=',
            xml_url: 'https://dataico-factura.herokuapp.com/invoices/1233-3h2h-oju2-43hh.xml',
            pdf_url: 'https://dataico-factura.herokuapp.com/invoices/1233-3h2h-oju2-43hh.pdf',
            dian_status: 'DIAN_ACEPTADO',
            email_status: 'EMAIL_SENT',
            number: 'NC100'
          };

    fetchMock.put(putURL(invoiceId), apiResponse);

    putInvoice(actions, invoiceId).then((responseJson) =>
      expect(responseJson).toEqual(apiResponse));

    fetchMock.reset();
  });
  it('invoice failure', async () => {
    const actions     = {send_email: true},
          invoiceId   = "1233-3h2h-oju2-43hh",
          apiErrors   = {
            errors: "Debe enviar un dataico account " +
              "id válido (debe ser un uuid como a7ec34ae-f30b-40e8-b3a8-93bfc4c37d70)"
          },
          apiResponse = {status: 500, body: apiErrors};

    fetchMock.put(putURL(invoiceId), apiResponse);

    putInvoice(actions, invoiceId).catch((responseJson) =>
      expect(responseJson).toEqual(apiErrors));

    fetchMock.reset();
  });
});

describe('getInvoice', () => {
  it('return invoice success', async () => {
    const invoiceId   = "1233-3h2h-oju2-43hh",
          apiResponse = {
            "invoice": {
              "dataico_account_id": "002979c5-7c23-43ab-aa98-3fa7dce6e4d0",
              "number": "98001",
              "issue_date": "21/02/2019",
              "numbering": {
                "resolution_number": "18760000001"
              },
              "customer": {
                "email": "daniel@email.com",
                "phone": "3001234567",
                "party_type": "PERSONA_JURIDICA",
                "party_identification": "900373117",
              },
              "items": []
            }
          };

    fetchMock.get(getURL(invoiceId), apiResponse);

    getInvoice(invoiceId).then((responseJson) =>
      expect(responseJson).toEqual(apiResponse));

    fetchMock.reset();
  });
});
