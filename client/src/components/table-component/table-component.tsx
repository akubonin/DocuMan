import './table-component.css';
import TableItem from '../table-item-component/table-item-component';
import { DocumentItem } from '../../../types/custom-types.d';


type TableProps = {
  documents : DocumentItem[]
}

const Table: React.FC<TableProps> = ({documents}) => {

  //For each object in the array of documents, I have to first get the workpackage names and display them
  return (
    <div id='table'>
      <div id='table-top-row'>
          <h3 id='table-heading-identifier'>Identifikator</h3>
          <h3 id='table-heading'>Rechnung</h3>
          <h3 id='table-heading'>Auftrag</h3>
          <h3 id='table-heading'>POD</h3>
      </div>
      <hr id="table-top-line"></hr>
        {documents &&documents.map((document, index) =>   <TableItem key = {index} infos ={document} />)}
    </div>
  )
}

export default Table