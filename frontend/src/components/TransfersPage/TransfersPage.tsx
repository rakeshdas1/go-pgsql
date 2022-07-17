import React, { useState, useEffect } from "react";
import { TransferModel } from "../../models/Transfer.model";
import { getNTransfers } from "../../api/transfersApi";
import { Header, Icon, Table } from "semantic-ui-react";
import LoaderComponent from "../LoaderComponent/LoaderComponent";

export const TransfersPageComponent = () => {
    const [transfers, setTransfers] = useState<TransferModel[]>([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        getNTransfers(500)
            .then(data => {
                setTransfers(data);
                setLoading(false);
            });
    }, []);
    const transfersTableBody = transfers.map((transfer) => {
        return (<Table.Row key={transfer.file_id}>
                    <Table.Cell>{transfer.file_name}</Table.Cell>
                    <Table.Cell>{new Date(transfer.time).toLocaleString()}</Table.Cell>
                </Table.Row>)
    });
    return (
        isLoading ? (<LoaderComponent/>): (
            <div>
                {(!transfers.length) ? (<Header as='h2' disabled><Icon name="dont" />No transfers found!</Header>)
                    : (
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>File Name</Table.HeaderCell>
                                    <Table.HeaderCell>Uploaded On</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {transfersTableBody}
                            </Table.Body>
                        </Table>
                    )}
            </div>
        )
    )
};  