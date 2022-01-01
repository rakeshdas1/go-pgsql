import React, { useState, useEffect } from "react";
import { TransferModel } from "../../models/Transfer.model";
import { getNTransfers } from "../../api/transfersApi";
import { Header, Icon } from "semantic-ui-react";
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
    const transfersTable = transfers.map((transfer) => {
        return <p key={transfer.file_id}>{transfer.file_name} - {transfer.time}</p>
    });
    
      
    return (
        isLoading ? (<LoaderComponent/>): (
            <div>
                {(!transfers.length) ? (<Header as='h2' disabled><Icon name="dont" />No transfers found!</Header>)
                    : (transfersTable)}
            </div>
        )
    )
};