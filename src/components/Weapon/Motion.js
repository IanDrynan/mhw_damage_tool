import React from 'react'
import motionValues from '../../data/motion_values'
import { Select } from 'antd'


const Option = Select.Option
//move.hits.reduce((a, b) => a + b, 0)
function Motion(props) {
    let moveList = motionValues[props.weaponType].map((move, index) => {
        return <Option 
                    key={move.hits.reduce((a, b) => a + b, 0)}
                    value={index}
                >
                    {move.name}
                </Option>
    })

    return (
        <div>
            <Select 
                defaultValue={0}
                onChange={e => props.onSelectAttack(parseInt(moveList[e].key,10))}
                dropdownMatchSelectWidth = {false}    
            >
                {moveList}
            </Select>
        </div>
    )
}

export default Motion