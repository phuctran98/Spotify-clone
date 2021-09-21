import React from 'react';
import "./SideBarOption.scss"

function SideBarOption(props) {
    const {Icon,option="text"} = props
    return (
        <div className="sidebarOption">
            {Icon && <Icon className="sidebarOption__icon"></Icon>}
            {Icon ? <h4>{option}</h4> : <p>{option}</p>}
        </div>
    );
}

export default SideBarOption;