import React from 'react'
import { Radio, Select } from 'antd'
import '../../styles/SharpHandi.css'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Option = Select.Option

//Changed to just function, rewritten so it doesnt need its own state.
//handicraft is not needed anywhere else, should i demote it and make this a class?
function SharpHandi(props) {
    function checkUpdated(color){
        if(props.weapon.durability.length > 0){
            return props.weapon.durability[props.handicraft][color] > 0 ? false: true
        }
    }
    return (
        <div className="SharpHandi">
            <Select defaultValue="0" onChange={e => props.onSelectHandicraft(parseInt(e,10))} value={"Handicraft " + props.handicraft}>
                <Option value="0">Handicraft 0</Option>
                <Option value="1">Handicraft 1</Option>
                <Option value="2">Handicraft 2</Option>
                <Option value="3">Handicraft 3</Option>
                <Option value="4">Handicraft 4</Option>
                <Option value="5">Handicraft 5</Option>
            </Select>
            
            <RadioGroup onChange={e => {props.onSelectSharp(e.target.value)}} value={props.sharp} >
                <RadioButton className="red sharp" disabled={checkUpdated("red")} value="red">{props.weapon.durability[props.handicraft]["red"]}</RadioButton>
                <RadioButton className="orange sharp" disabled={checkUpdated("orange")} value="orange">{props.weapon.durability[props.handicraft]["orange"]}</RadioButton>
                <RadioButton className="yellow sharp" disabled={checkUpdated("yellow")} value="yellow">{props.weapon.durability[props.handicraft]["yellow"]}</RadioButton>
                <RadioButton className="green sharp" disabled={checkUpdated("green")} value="green">{props.weapon.durability[props.handicraft]["green"]}</RadioButton>
                <RadioButton className="blue sharp" disabled={checkUpdated("blue")} value="blue">{props.weapon.durability[props.handicraft]["blue"]}</RadioButton>
                <RadioButton className="white sharp" disabled={checkUpdated("white")} value="white">{props.weapon.durability[props.handicraft]["white"]}</RadioButton>
            </RadioGroup>
        </div>
    )
    
}

export default SharpHandi