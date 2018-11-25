import React from 'react'
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import ListToggler from './ListFilters';

export default () => {
    return (
        <div>
            <PrivateHeader title="Your links"/>
            <div className="page-content">
                <ListToggler/>
                <AddLink/>
                <LinksList/>
            </div>
        </div>
    )
};