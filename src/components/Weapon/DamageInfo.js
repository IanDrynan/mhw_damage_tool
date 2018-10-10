import React from 'react'
import { Table } from 'antd'
import '../../styles/DamageInfo.css'
import {sharpRawMulti, sharpEleMulti, coatingMulti} from '../../data/constants.js'

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