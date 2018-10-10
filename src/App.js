import React, { Component } from 'react';
import './styles/App.css';
import SearchBar from './components/Weapon/SearchBar'
import SharpHandi from './components/Weapon/SharpHandi'
import Coating from './components/Weapon/Coating'
import DamageInfo from './components/Weapon/DamageInfo';
import MonsterDefense from './components/Monster/MonsterDefense';
import Motion from './components/Weapon/Motion'


class App extends Component {
  
  state = {
    weapon: "",
    sharp: "yellow",
    handicraft: 0,
    coating: "none",
    rawDef: 50,
    eleDef: 50,
    motionValue: 1
  }
  
  meleeWeapons = new Set(["great-sword", "long-sword", "sword-and-shield",
  "dual-blades", "hammer", "hunting-horn",
  "lance", "gunlance", "switch-axe",
  "charge-blade", "insect-glaive"])

  handleWeaponSelect = (selected) =>{
    this.setState({
      weapon: selected,
      sharp: "yellow"
    })
  }
  handleSharpSelect = (selected) =>{
    this.setState({
      sharp: selected
    })
  }
  handleHandicraftSelect = (selected) => {
    this.setState({
      handicraft: selected
    })
  }
  handleCoatingSelect = (selected) => {
    this.setState({
      coating: selected
    })
  }
  handleRawDef = (value) => {
    this.setState({
      rawDef: value
    })
  }
  handleEleDef = (value) => {
    this.setState({
      eleDef: value
    })
  }
  handleAttackSelect = (selected) => {
    this.setState({
      motionValue: selected
    })
  }
  render() {
    var isBow = this.state.weapon && this.state.weapon.type === "bow" ? true : false
    var isMelee = this.state.weapon && this.meleeWeapons.has(this.state.weapon.type) ? true : false
    return (
      <div className="App">
        <section className="Weapon">
          <SearchBar onSelectWeapon={this.handleWeaponSelect}/>
          { isMelee && <SharpHandi weapon={this.state.weapon} sharp={this.state.sharp} handicraft={this.state.handicraft} onSelectSharp={this.handleSharpSelect} onSelectHandicraft={this.handleHandicraftSelect}/>}
          { isBow && <Coating onSelectCoating={this.handleCoatingSelect}/>}
          { this.state.weapon !== "" && <DamageInfo weapon={this.state.weapon} sharp={this.state.sharp} coating={this.state.coating} rawDef={this.state.rawDef} eleDef={this.state.eleDef} motionValue={this.state.motionValue}/>}
        </section>
        <section className="Attack">
          { this.state.weapon !== "" && <Motion onSelectAttack={this.handleAttackSelect} weaponType={this.state.weapon.type}/>}
        </section>
        <section className="Monster">
        { this.state.weapon !== "" && <MonsterDefense rawDef={this.state.rawDef} eleDef={this.state.eleDef} handleRawDef={this.handleRawDef} handleEleDef={this.handleEleDef}/>}
        </section>

      </div>
      
    );
  }
}

export default App;
