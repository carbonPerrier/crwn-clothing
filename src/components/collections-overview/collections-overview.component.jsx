import React from 'react';
import {connect} from 'react-redux';

import './collections-overview.styles.scss';

import {createStructuredSelector} from 'reselect';



import {selectShopData} from '../../redux/shop/shop.selectors';

import CollectionPreview from '../collection-preview/collection-preview';

const CollectionsOverview = ({collections}) => (
    <div className="collections-overview">
        {collections.map(({ id, ...otherCollectionProps }) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
    </div>
);


const mapStateToProps = createStructuredSelector({collections: selectShopData});


export default connect(mapStateToProps)(CollectionsOverview);


