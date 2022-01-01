import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

export const LoaderComponent = () => {
    return (
        <Dimmer active>
            <Loader />
        </Dimmer>
    );
}
export default LoaderComponent;