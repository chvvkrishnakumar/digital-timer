import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {intial: 25, min: 25, seconds: 0, running: false}

  tick = () => {
    const {seconds} = this.state

    if (seconds === 0) {
      this.setState(prevState => ({min: prevState.min - 1, seconds: 59}))
    } else {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }
  }

  onStart = async () => {
    await this.setState(prevState => ({min: prevState.intial}))
    this.setState(prevState => ({
      min:
        prevState.min === prevState.intial ? prevState.min - 1 : prevState.min,
    }))

    await this.setState(prevState => ({
      running: !prevState.running,
    }))
    const {running, min, seconds} = this.state

    if (running) {
      this.setState(prevState => ({
        seconds: prevState.seconds !== 0 ? prevState.seconds : 59,
      }))
      this.timerId = setInterval(this.tick, 1000)
    } else if (min === 0 && seconds === 0) {
      clearInterval(this.timerId)
    } else {
      clearInterval(this.timerId)
    }
  }

  onIncrement = async () => {
    const {running} = this.state
    if (!running) {
      await this.setState(prevState => ({
        intial: prevState.intial + 1,
      }))
      this.setState(prevState => ({min: prevState.intial, seconds: 0}))
    }
  }

  onDecrement = async () => {
    const {running, min} = this.state
    if (!running && min > 1) {
      await this.setState(prevState => ({
        intial: prevState.intial - 1,
      }))
      this.setState(prevState => ({min: prevState.intial, seconds: 0}))
    }
  }

  onRest = () => {
    const {running} = this.state
    if (!running) {
      this.setState({intial: 25, seconds: 0, min: 25, running: false})
    }
  }

  render() {
    console.log('render')
    const {min, seconds, running, intial} = this.state
    console.log(parseInt(seconds))
    return (
      <div className="main">
        <h1>Digital Timer</h1>
        <div className="sub">
          <div className="clock">
            <div className="timer">
              <h1>
                {min}:{seconds > 9 ? seconds : `0${seconds}`}
              </h1>
              <p>{running ? 'Running' : 'Paused'}</p>
            </div>
          </div>

          <div className="">
            <div className="sub">
              <img
                src={
                  running
                    ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                }
                alt={running ? 'pause icon' : 'play icon'}
              />
              <button type="button" onClick={this.onStart}>
                <p>{running ? 'Pause' : 'Start'}</p>
              </button>

              <div className="sub">
                <button onClick={this.onRest} type="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>

                <p>Reset</p>
              </div>
            </div>
            <p>Set Timer limit</p>
            <div className="sub">
              <button onClick={this.onDecrement} type="button">
                -
              </button>
              <p className="count">{intial}</p>
              <button onClick={this.onIncrement} type="button">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
