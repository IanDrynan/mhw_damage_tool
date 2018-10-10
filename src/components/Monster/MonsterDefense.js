import React from 'react'
import { InputNumber } from 'antd'
import '../../styles/MonsterDefense.css'

//should i make this a controlled componnet by passing value as a prop?
function MonsterDefense(props) {
    return (
        <div className="MonsterDefense">
            <span>Damage Effectiveness</span>
            <div className="RawEffectiveness">
                <span>Raw: </span>
                <InputNumber
                    defaultValue={50}
                    min={0}
                    max={100}
                    size="large"
                    onChange={props.handleRawDef}
                    value={props.rawDef}
                />
            </div>
            
            <div className="EleEffectiveness">
                <span>Ele: </span>
                <InputNumber
                defaultValue={50}
                min={0}
                max={100}
                size="large"
                onChange={props.handleEleDef}
                value={props.eleDef}
                />
            </div>
            
        </div>
    )
}

export default MonsterDefense