import React from 'react'
import { Radio } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

function Coating(props){
    
    return (
        <div>
            <span>Coating: </span>
            <RadioGroup onChange={e => props.onSelectCoating(e.target.value)} defaultValue="close" buttonStyle="solid">
                <RadioButton value="none">None </RadioButton>
                <RadioButton value="close">Close </RadioButton>
                <RadioButton value="power">Power</RadioButton>
            </RadioGroup>
        </div>
    )
    
}

export default Coating