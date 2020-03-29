import React from 'react';
import { TaskFilesModel } from '../../models/TaskFiles.model';
import { Table } from 'semantic-ui-react';

interface FileDetailsComponentProps{
    files: TaskFilesModel[];
}
export const FileDetailsComponent:React.SFC<FileDetailsComponentProps> = (props) => {
        return (
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Files</Table.HeaderCell>
                        <Table.HeaderCell>Transfer Speed</Table.HeaderCell>
                        <Table.HeaderCell>File Size</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.files.map(file => {
                        return(
                            <Table.Row key={file.fileId}>
                                <Table.Cell>{file.fileName}</Table.Cell>
                                <Table.Cell>{file.fileTransferSpeed}</Table.Cell>
                                <Table.Cell textAlign='right'>{file.fileSize}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        );
}
export default FileDetailsComponent;