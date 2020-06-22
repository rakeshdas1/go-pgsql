import React from 'react';
import { Table, Icon, Select } from 'semantic-ui-react';
import { FileModel } from '../../models/File.model';
import './FilesTable.css';

interface FileDetailsComponentProps{
    files: FileModel[];
}
const getFileIcon = (fileName: string) => {
    const fileExtension = fileName.split('.').pop();
    switch(fileExtension) {
        case 'mp4':
        case 'mkv':
        case 'mov':
        case 'wmv':
        case 'flv':
        case 'avi':
        case 'webm':
            return (
                <Icon name='file video'/>
            )
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            return (
                <Icon name='file image'/>
            )
        case 'doc':
        case 'docx':
        case 'odt':
        case 'gdoc':
            return (
                <Icon name='file word'/>
            )
        case 'xls':
        case 'xlsx':
        case 'ods':
        case 'csv':
            return (
                <Icon name='file excel'/>
            )
        case 'ppt':
        case 'pptx':
        case 'gslides':
            return (
                <Icon name='file powerpoint'/>
            )
        case 'js':
        case 'ts':
        case 'jsx':
        case 'tsx':
        case 'c':
        case 'cpp':
        case 'py':
        case 'java':
        case 'html':
        case 'htm':
        case 'css':
        case 'R':
        case 'go':
        case 'sh':
        case 'xml':
        case 'json':
        case 'kt':
        case 'php':
            return (
                <Icon name='file code'/>
            )
        case 'log':
        case 'txt':
        case 'sub':
        case 'srt':
            return (
                <Icon name='file text'/>
            )
        case 'pdf':
            return (
                <Icon name='file pdf'/>
            )
        default:
            return (
                <Icon name='file'/>
            )        
        
    }
}
const viewOptions = [
    {key: '50', text: '50', value: '50'},
    {key: '100', text: '100', value: '100'},
    {key: '150', text: '150', value: '150'}
]
export const FileDetailsComponent:React.SFC<FileDetailsComponentProps> = (props) => {
        return (
            <div>
                Show <Select compact placeholder='' options={viewOptions} defaultValue={viewOptions[0].key}/> files
                <Table celled striped padded>
                    <Table.Header >
                        <Table.Row>
                            <Table.HeaderCell width={12}><Icon name='text cursor'/>File Name</Table.HeaderCell>
                            <Table.HeaderCell width={2}><Icon name='file'/>Transfer Speed</Table.HeaderCell>
                            <Table.HeaderCell width={2}><Icon name='database'/>File Size</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.files.map(file => {
                            return(
                                <Table.Row key={file.fileId}>
                                    <Table.Cell>{getFileIcon(file.fileName)}{file.fileName}</Table.Cell>
                                    <Table.Cell>{file.transferSpeed}</Table.Cell>
                                    <Table.Cell textAlign='right'>{file.fileSize}</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        );
}
export default FileDetailsComponent;