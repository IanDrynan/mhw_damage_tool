import React, { Component } from 'react';
import './styles/App.css';
import { meleeWeapons } from './data/constants';
import SearchBar from './components/Weapon/SearchBar'
import SharpHandi from './components/Weapon/SharpHandi'
import Coating from './components/Weapon/Coating'
import DamageInfo from './components/Weapon/DamageInfo';
import MonsterDefense from './components/Monster/MonsterDefense';
import Motion from './components/Weapon/Motion'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      weapon: null,
      sharp: "yellow",
      handicraft: 0,
      coating: "none",
      rawDef: 50,
      eleDef: 50,
      motionValue: 1
    }
  }
  
  componentDidMount() {
    for (let key in this.state){
      if(localStorage.hasOwnProperty((key))){
        let value = localStorage.getItem(key)
        value = JSON.parse(value)
        
        if (value !== null) {
            this.setState({
              [key]: value
            })
          
          console.log(key, value, this.state)
        }
      }
    }
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    )
  }
  componentWillUnmount(){
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    )
    this.saveStateToLocalStorage()
  }
  saveStateToLocalStorage(){
    console.log("saving")
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }
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
    var isMelee = this.state.weapon && meleeWeapons.has(this.state.weapon.type) ? true : false
    return (
      
      <div className="App">
        <section className="Weapon">
          <SearchBar weapon={this.state.weapon} onSelectWeapon={this.handleWeaponSelect}/>
          { isMelee && <SharpHandi weapon={this.state.weapon} sharp={this.state.sharp} handicraft={this.state.handicraft} onSelectSharp={this.handleSharpSelect} onSelectHandicraft={this.handleHandicraftSelect}/>}
          { isBow && <Coating onSelectCoating={this.handleCoatingSelect}/>}
          { this.state.weapon !== null && <DamageInfo weapon={this.state.weapon} sharp={this.state.sharp} coating={this.state.coating} rawDef={this.state.rawDef} eleDef={this.state.eleDef} motionValue={this.state.motionValue}/>}
        </section>
        <section className="Attack">
          { this.state.weapon !== null && <Motion onSelectAttack={this.handleAttackSelect} weaponType={this.state.weapon.type}/>}
        </section>
        <section className="Monster">
          { this.state.weapon !== null && <MonsterDefense rawDef={this.state.rawDef} eleDef={this.state.eleDef} handleRawDef={this.handleRawDef} handleEleDef={this.handleEleDef}/>}
        </section>
      </div>
      
    );
  }
}

export default App;
