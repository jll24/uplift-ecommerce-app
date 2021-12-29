import {css} from 'styled-components'

/* This is the media query that we will pass onto the components */

export const mobile = (props) => {
    return css`
    @media only screen and (max-width: 476px) {
        ${props}
    }`;
}