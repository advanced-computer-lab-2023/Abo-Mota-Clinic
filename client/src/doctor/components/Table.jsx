import { Fragment } from "react";
import Table from '@mui/joy/Table';


function TableMUI({data, config, keyFn}){
 
    const renderedHeaders = config.map( (column) => {
        if(column.header)
            return <Fragment key={column.label}>{column.header()}</Fragment> 

        return <th style={{ width: '40%' }} key={column.label}> {column.label}</th>
    }

    );

    const renderedRows = data.map( (rowData) => {
        const renderedCells = config.map( (column) => {
            return <td key={column.label}>
                {column.render(rowData)}
                </td>
        }
            
        );

        return <tr key={rowData.id} className="border-b">
            {renderedCells}
        </tr>
    }

    );

    return (
        <Table aria-label="basic table" hoverRow>
            <thead>
                <tr>
                    {renderedHeaders}
                </tr>
            </thead>
            <tbody>
                {renderedRows}
            </tbody>
        </Table>
    );
}

export default TableMUI;