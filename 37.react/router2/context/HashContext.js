import React from 'react'
import PropTypes from 'prop-types';

export const HashContext = React.createContext({
    location: PropTypes.object,
    history: PropTypes.object,
})