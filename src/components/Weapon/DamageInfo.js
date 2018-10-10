import React from 'react'
import { Table } from 'antd'
import '../../styles/DamageInfo.css'

const sharpRawMulti = {
    "red": .5,
    "orange": .75,
    "yellow": 1.00,
    "green": 1.05,
    "blue": 1.20,
    "white": 1.32,
}
const sharpEleMulti = {
    "red": .25,
    "orange": .50,
    "yellow": .75,
    "green": 1.00,
    "blue": 1.0625,
    "white": 1.125,
}

const coatingMulti = {
    "none": 1.00,
    "close": 1.18,
    "power": 1.35,
}

function DamageInfo(props) {

    let trueRaw = props.weapon.attack
    let effectiveRaw = getEffectiveRaw(trueRaw, props.sharp, props.coating)

    let trueElemental = props.weapon.element ? (props.weapon.element[0].damage / 10) : 0
    let effectiveElemental = getEffectiveElemental(trueElemental, props.sharp)

    let damageInflicted = getDamageInflicted(effectiveRaw, effectiveElemental, props.rawDef, props.eleDef, props.motionValue)

    let dataSource = [{
        key: 1,
        trueRaw: trueRaw,
        trueElemental: trueElemental,
        effectiveRaw: effectiveRaw,
        effectiveElemental: effectiveElemental,
        damageInflicted: damageInflicted
    }]

    const columns = [{
        title: 'True Raw',
        dataIndex: 'trueRaw',
        key: 'trueRaw'
    }, {
        title: 'True Ele',
        dataIndex: 'trueElemental',
        key: 'trueElemental'
    }, {
        title: 'Effective Raw',
        dataIndex: 'effectiveRaw',
        key: 'effectiveRaw'
    }, {
        title: 'Effective Elemental',
        dataIndex: 'effectiveElemental',
        key: 'effectiveElemental'
    }, {
        title: 'Damage Inflicted',
        dataIndex: 'damageInflicted',
        key: 'damageInflicted'
    }]

    return (
        <div className="DamageInfo">
            <Table dataSource={dataSource} columns={columns} pagination={false}/>
        </div>
    )
}
//these need skill values
function getEffectiveRaw(trueRaw, sharp, coating) {
    return Math.round(trueRaw * sharpRawMulti[sharp] * coatingMulti[coating])
}
function getEffectiveElemental(trueElemental, sharp) {
    return Math.round(trueElemental * sharpEleMulti[sharp])
}

function getDamageInflicted(effectiveRaw, effectiveEle, rawDef, eleDef, motionValue) {
    let total = (effectiveRaw * rawDef / 100 * motionValue / 100 + effectiveEle * eleDef / 100)
    return Math.round((total + .00001) * 100) / 100
}
export default DamageInfo