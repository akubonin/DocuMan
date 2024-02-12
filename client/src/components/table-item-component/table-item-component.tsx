import './table-item-component.css';
import { MdCheckBox } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import Info from '../info-component/info-component';
import { useState } from 'react';

type DocumentItem = {
  documents: string;
  workpackage: string;
  __v: number;
  _id: string;
};

type DataItem = {
  Rechnung: string[];
  Auftrag: string[];
  POD: string[];
}

type ParsedInvoiceCheck = {
  isinvoice: boolean;
  Betrag: string | null;
  Transportauftragsnummer: string | null;
}

type ParsedPODCheck = {
  isPOD: boolean;
  Unterschrift: boolean;
}

type ParsedOrderCheck = {
  isorder: boolean;
  Betrag: string | null;
}

type ExactInfoDisplay = {
  green : boolean;
  gefunden: string;
  betrag: string | undefined | null;
  auftragsNummer: string | undefined | null;
  Unterschrift: string | undefined | boolean;
  betragIstGleich: string | undefined | null;
}

type DocType = 'Rechnung' | 'POD' | 'Auftrag';

type FinalInformationForInfo = [{ Rechnung: ExactInfoDisplay; }, { Auftrag: ExactInfoDisplay; }, { POD: ExactInfoDisplay; }]

export default function TableItem({ infos }: { infos: DocumentItem }) {
  const [show, setShow] = useState<boolean>(false);
  const workpackageId: string = infos.workpackage;
  const itemData: DataItem = JSON.parse(infos.documents);
  const displayInfo = processData(itemData);

  const toggle = (): void => {
    setShow(!show)
  }

  const infoEffect: string = show ? 'info-visible' : 'info-hidden';

  return (
    <div id='table-row' onClick={toggle}>
      <div id='table-row-item-icons'>
        <p id='table-item-fixed-identifier'>{workpackageId}</p>
        <div id='table-item-icon-list'>
          {(displayInfo[0].Rechnung.green && <MdCheckBox data-testid='rechnung-green' className='item-icon green' />) || <CgDanger data-testid='rechnung-red' className='item-icon red' />}
          {(displayInfo[1].Auftrag.green && <MdCheckBox data-testid='auftrag-green' className='item-icon green' />) || <CgDanger data-testid='auftrag-red' className='item-icon red' />}
          {(displayInfo[2].POD.green && <MdCheckBox data-testid='pod-green' className='item-icon green' />) || <CgDanger data-testid='pod-red' className='item-icon red' />}
        </div>
      </div>
      <div className={infoEffect}>
        {show && <Info detailedInfo={displayInfo} />}
      </div>
    </div>
  )
}

function processData ( itemData: DataItem) {
  const resultArray = Object.entries(itemData).map((entry) => {
    const docType = entry[0] as DocType;
    const pages: string[] = entry[1];
    const outResults = { green: false, gefunden: "Nein", betrag: undefined, auftragsNummer: undefined, Unterschrift: undefined, betragIstGleich: undefined }
    if (pages.length < 1) { return { [docType]: outResults } }
    else {
      outResults.gefunden = 'Ja';
      switch (docType) {
        case 'Rechnung':
          reduce(pages, rechnungHandler, outResults)
          outResults.green = outResults.betrag && outResults.auftragsNummer ? true : false;
          break;
        case 'POD':
          reduce(pages, podHandler, outResults)
          outResults.green = outResults.Unterschrift ? true : false;
          break;
        case 'Auftrag':
          reduce(pages, auftragHandler, outResults)
          outResults.green = outResults.betragIstGleich ? true : false;
          break;
        default:
          break;
      }
      return { [docType]: outResults }
    }

  });
  return resultArray
}

function reduce<Element, Output> (array : Element[], handler : (accumulator: Output, element : Element) => Output  , accumulator : Output) : Output {
  return array.reduce(handler, accumulator);
}

function rechnungHandler(accumulator : ExactInfoDisplay, page : string) : ExactInfoDisplay {
  const details : ParsedInvoiceCheck = JSON.parse(JSON.parse(page).invoice);
  accumulator.betrag = details.Betrag;
  accumulator.auftragsNummer = details.Transportauftragsnummer ? details.Unterschrift : undefined ;
  return accumulator;
}

function podHandler(accumulator: ExactInfoDisplay, page: string): ExactInfoDisplay {
  const details : ParsedPODCheck = JSON.parse(JSON.parse(page).pod);
  accumulator.Unterschrift = details.Unterschrift ? details.Unterschrift : undefined ;
  return accumulator;
}

function auftragHandler(accumulator: ExactInfoDisplay, page: string): ExactInfoDisplay {
  const details : ParsedOrderCheck = JSON.parse(JSON.parse(page).order);
  if (details.Betrag) {
    if (!accumulator.betragIstGleich || accumulator.betragIstGleich < details.Betrag!) {
      accumulator.betragIstGleich = details.Betrag;
    }
  }
  return accumulator;
}