import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { FileModel } from '../../models/File.model';

interface FileDetailsComponentProps{
    files: FileModel[];
}
export const FileDetailsComponent:React.SFC<FileDetailsComponentProps> = (props) => {
        return (
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell><Icon name='save'/>File Name</Table.HeaderCell>
                        <Table.HeaderCell><Icon name='file'/>Transfer Speed</Table.HeaderCell>
                        <Table.HeaderCell><Icon name='database'/>File Size</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.files.map(file => {
                        console.log(file)
                        return(
                            <Table.Row key={file.fileId}>
                                <Table.Cell>{file.fileName}</Table.Cell>
                                <Table.Cell>{file.transferSpeed}</Table.Cell>
                                <Table.Cell textAlign='right'>{file.fileSize}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        );
}
export default FileDetailsComponent;