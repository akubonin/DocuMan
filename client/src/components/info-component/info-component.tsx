import './info-component.css'
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";

type GoodOrBadProps = {
  detailedInfo: { [key: string]: any }[];
  docType: string;
  children: React.ReactNode;
};

export const GoodOrBad: React.FC<GoodOrBadProps> = ({detailedInfo, docType, children}) => {

  //Check Rechnung for correctness
  if (
    docType === 'Rechnung' &&
    detailedInfo[0].Rechnung.gefunden === 'Ja' &&
    detailedInfo[0].Rechnung.betrag !== undefined &&
    detailedInfo[0].Rechnung.auftragsNummer !== undefined
    ) {
    return <div data-testid='rech-green' className='box-container-info-item green-info-item'>{children}</div>
    } else if (docType === 'Rechnung') {
      return <div data-testid='rech-red' className= 'box-container-info-item red-info-item'>{children}</div>
    }


  if (docType === 'Auftrag' &&
    detailedInfo[1].Auftrag.gefunden === 'Ja' &&
    detailedInfo[1].Auftrag.betragIstGleich !== undefined
    ) {
      return <div data-testid='auftrag-green' className='box-container-info-item green-info-item'>{children}</div>
      } else if (docType === 'Auftrag') {
        return <div data-testid='auftrag-red' className= 'box-container-info-item red-info-item'>{children}</div>
      }


  if (docType === 'POD' &&
    detailedInfo[2].POD.gefunden === 'Ja' &&
    detailedInfo[2].POD.Unterschrift !== undefined
  ) {
    return <div data-testid='pod-green' className='box-container-info-item green-info-item'>{children}</div>
    } else if (docType === 'POD') {
      return <div data-testid='pod-red' className= 'box-container-info-item red-info-item'>{children}</div>
    }

}

type InfoProps = {
  detailedInfo: { [key: string]: any }[];
}

const Info: React.FC<InfoProps> = ({ detailedInfo }) => {

return (
    <div id='box-container-info' >
    <GoodOrBad  detailedInfo = {detailedInfo} docType={'Rechnung'}>
        <h3 className='white'>Rechnung</h3>
        <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
            Dokument vorhanden: {detailedInfo[0].Rechnung.gefunden}
          </p>
          </div>
          <div className='centered-row white'>
            <FaRegCheckCircle className='box-container-info-item-icon' />
            <p className='white'>
          Betrag: {detailedInfo[0].Rechnung.betrag || 'Nicht gefunden'}
            </p>

          </div>

          <div className='centered-row white'>
            <FaRegCheckCircle className='box-container-info-item-icon' />

          <p className='white'>
          Auftragsnummer: {detailedInfo[0].Rechnung.auftragsNummer || 'Nicht gefunden'}
           </p>
        </div>

        </GoodOrBad>


    <GoodOrBad  detailedInfo = {detailedInfo} docType={'Auftrag'}>
        <h3 className='white'>Transportauftrag</h3>
        <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
          Dokument vorhanden: {detailedInfo[1].Auftrag.gefunden}

          </p>
          </div>
          <div className='centered-row white'>
            <FaRegCheckCircle className='box-container-info-item-icon' />
            <p className='white'>
          Gefundener Betrag: {detailedInfo[1].Auftrag.betragIstGleich || 'Nicht gefunden'}
            </p>

          </div>

      </GoodOrBad>

      <GoodOrBad  detailedInfo = {detailedInfo} docType={'POD'}>
        <h3 className='white'>Abliefernachweis</h3>
        <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
          Dokument vorhanden: {detailedInfo[2].POD.gefunden}

          </p>
          </div>
          <div className='centered-row white'>
            <FaRegCheckCircle className='box-container-info-item-icon' />
            <p className='white'>
          Unterschrift: {detailedInfo[2].POD.Unterschrift || 'Nicht gefunden'}
            </p>

          </div>

      </GoodOrBad>

  </div>
)

}

export default Info



