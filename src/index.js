import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

import './App.css'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            rules: {
              num: true,
              caps: true,
              lowercase: true,
              symbols: true,
              count: true,
            }
        }

        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    showErrors() {
      const validationMsgs = {
        num: 'Your password does not have numbers',
        caps: 'Your password does not have capital letters',
        lowercase: 'Your password has no lowercase letters',
        symbols: 'Your password has no symbols',
        count: 'Your password is less than 16 characters',
      }
      const rules = Object.entries(this.state.rules)
      
      const final = rules.filter((entry, i) => {
        return entry[1] === false
      })

      return final.map((item, i) => {
        return <li key={i}>{validationMsgs[item[0]]}</li>
      })
    }

    onClick(){
      const pw = this.state.password
      const count = !(this.state.password.length < 16)
      const caps = pw.match(/[A-Z]/g) ? true: false
      const lowercase = pw.match(/[a-z]/) ? true: false
      const num = pw.match(/[0-9]/) ? true: false
      const symbols = pw.match(/\W/) ? true: false

      this.setState({
        rules: { count, caps, lowercase, num, symbols }
      })

      console.log(this.state.rules)
    }


    render(){
      return (
        <div className="ui container main">
          <div>
            <h3>Password</h3>
            <input className="ui input" onChange={this.onChange} name="password" type="password" />
            <button className="ui button" onClick={this.onClick}>Validate</button>
          </div>    
          <div>
            <ul>
              {this.showErrors()}
            </ul>
          </div>  
        </div>
      ) 
    }

}

const App = () => {
    return (
      <LoginForm />
    )
}

ReactDOM.render(
    <App />, document.getElementById('root')
)