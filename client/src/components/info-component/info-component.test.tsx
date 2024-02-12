import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import Info, { GoodOrBad } from './info-component';
import {describe, expect, test, } from '@jest/globals';
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Rechnung
const MockRechnungNoAuftrag = {
  detailedInfo: [
    {
      Rechnung: {
        Unterschrift: undefined,
        auftragsNummer: undefined,
        betrag: "75,00 EUR",
        betragIstGleich: undefined,
        gefunden: "Ja",
        green: false,
        transportAuftragsNummer: undefined,
      }
    }
  ],
  docType: 'Rechnung',
  children: "Mock children data",
};

const MockRechnungWithAuftrag = {
  detailedInfo: [
    {
      Rechnung: {
        Unterschrift: undefined,
        auftragsNummer: '123456789ln',
        betrag: "75,00 EUR",
        betragIstGleich: undefined,
        gefunden: "Ja",
        green: false,
        transportAuftragsNummer: undefined,
      }
    }
  ],
  docType: 'Rechnung',
  children: "Mock children data",
};


// Auftrag
const MockAuftragNoBetragIstGleich = {
  detailedInfo: [
    {
      Rechnung: {
        Unterschrift: undefined,
        auftragsNummer: undefined,
        betrag: "75,00 EUR",
        betragIstGleich: undefined,
        gefunden: "Ja",
        green: false,
        transportAuftragsNummer: undefined,
      }
    },

    {
      Auftrag: {
        Unterschrift: undefined,
        auftragsNummer: '123456789ln',
        betrag: "75,00 EUR",
        betragIstGleich: undefined,
        gefunden: "Ja",
        green: false,
        transportAuftragsNummer: undefined,
      }
    }
  ],
  docType: 'Auftrag',
  children: "Mock children data",
};

const MockAuftragBetragIstGleich = {
  detailedInfo: [
    {
      Rechnung: {
        Unterschrift: undefined,
        auftragsNummer: undefined,
        betrag: "75,00 EUR",
        betragIstGleich: undefined,
        gefunden: "Ja",
        green: false,
        transportAuftragsNummer: undefined,
      }
    },

    {
      Auftrag: {
        Unterschrift: undefined,
        auftragsNummer: '123456789ln',
        betrag: "75,00 EUR",
        betragIstGleich: "Ja",
        gefunden: "Ja",
        green: false,
        transportAuftragsNummer: undefined,
      }
    }
  ],
  docType: 'Auftrag',
  children: "Mock children data",
};


// POD
const MockPodNoUnterschrift = {
  detailedInfo: [
    {},
    {},
    {
      POD: {
        Unterschrift: undefined,
        gefunden: "Ja",
      }
    }
  ],
  docType: 'POD',
  children: "Mock children data",
};

const MockPodUnterschrift = {
  detailedInfo: [
    {},
    {},
    {
      POD: {
        Unterschrift: "Ja",
        gefunden: "Ja",
      }
    }
  ],
  docType: 'POD',
  children: "Mock children data",
};

describe('GoodOrBad function', () => {

  test("renders Rechnung with no Auftrag", () => {
    render(<GoodOrBad detailedInfo={MockRechnungNoAuftrag.detailedInfo} docType={MockRechnungNoAuftrag.docType} children={MockRechnungNoAuftrag.children} />);
    expect(screen.getByTestId("rech-red")).toHaveTextContent("Mock children data");
  });

  test("renders Rechnung with Auftrag", () => {
    render(<GoodOrBad detailedInfo={MockRechnungWithAuftrag.detailedInfo} docType={MockRechnungWithAuftrag.docType} children={MockRechnungWithAuftrag.children} />);
    expect(screen.getByTestId("rech-green")).toHaveTextContent("Mock children data");
  });




  test("renders Auftrag with no betragIstGleich", () => {
    render(<GoodOrBad detailedInfo={MockAuftragNoBetragIstGleich.detailedInfo} docType={MockAuftragNoBetragIstGleich.docType} children={MockAuftragNoBetragIstGleich.children} />);
    expect(screen.getByTestId("auftrag-red")).toHaveTextContent("Mock children data");
  });

  test("renders Rechnung with betragIstGleich", () => {
    render(<GoodOrBad detailedInfo={MockAuftragBetragIstGleich.detailedInfo} docType={MockAuftragBetragIstGleich.docType} children={MockAuftragBetragIstGleich.children} />);
    expect(screen.getByTestId("auftrag-green")).toHaveTextContent("Mock children data");
  });



  test("renders POD with no Unterschrift", () => {
    render(<GoodOrBad detailedInfo={MockPodNoUnterschrift.detailedInfo} docType={MockPodNoUnterschrift.docType} children={MockPodNoUnterschrift.children} />);
    expect(screen.getByTestId("pod-red")).toHaveTextContent("Mock children data");
  });

  test("renders POD with Unterschrift", () => {
    render(<GoodOrBad detailedInfo={MockPodUnterschrift.detailedInfo} docType={MockPodUnterschrift.docType} children={MockPodUnterschrift.children} />);
    expect(screen.getByTestId("pod-green")).toHaveTextContent("Mock children data");
  });


})