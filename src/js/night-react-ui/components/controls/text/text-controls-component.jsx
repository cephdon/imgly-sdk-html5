/** @jsx ReactBEM.createElement **/
/*
 * Photo Editor SDK - photoeditorsdk.com
 * Copyright (c) 2013-2015 9elements GmbH
 *
 * Released under Attribution-NonCommercial 3.0 Unported
 * http://creativecommons.org/licenses/by-nc/3.0/
 *
 * For commercial use, please contact us at contact@9elements.com
 */

import { ReactBEM, BaseChildComponent, Constants, Vector2 } from '../../../globals'
import ScrollbarComponent from '../../scrollbar-component'

export default class TextControlsComponent extends BaseChildComponent {
  constructor (...args) {
    super(...args)

    this._bindAll(
      '_onBackClick'
    )
    this._texts = this.getSharedState('texts')
    this._operation = this.getSharedState('operation')

    this._emitEvent(Constants.EVENTS.CANVAS_RENDER)
  }

  // -------------------------------------------------------------------------- LIFECYCLE

  /**
   * Gets called after this component has been mouned
   */
  componentDidMount () {
    super.componentDidMount()

    if (!this.getSharedState('selectedText')) {
      const text = this._operation.createText({
        text: 'Text',
        maxWidth: 0.5,
        anchor: new Vector2(0.5, 0),
        pivot: new Vector2(0.5, 0)
      })
      this._texts.push(text)

      // Broadcast new state
      this.setSharedState({
        selectedText: text,
        texts: this._texts
      })
    }
  }

  // -------------------------------------------------------------------------- EVENTS

  /**
   * Gets called when the user clicks the back button
   * @param {Event} e
   * @private
   */
  _onBackClick (e) {
    this._operation.setTexts(this._texts)
    this.props.onSwitchControls('back')
    this._emitEvent(Constants.EVENTS.CANVAS_RENDER)
  }

  /**
   * Gets called when the shared state has changed
   * @param  {Object} newState
   */
  sharedStateDidChange (newState) {
    if ('selectedText' in newState) {
      this.forceUpdate()
    }
  }

  // -------------------------------------------------------------------------- RENDERING

  /**
   * Renders this component
   * @return {ReactBEM.Element}
   */
  renderWithBEM () {
    const { ui } = this.context
    // const selectedText = this.getSharedState('selectedText')
    return (<div bem='$b:controls e:table'>
      <div bem='e:cell m:button m:withBorderRight'>
        <div bem='$e:button' onClick={this._onBackClick}>
          <img bem='e:icon' src={ui.getHelpers().assetPath(`controls/back@2x.png`, true)} />
        </div>
      </div>
      <div bem='e:cell m:list'>
        <ScrollbarComponent>
          <ul bem='$e:list'>



          </ul>
        </ScrollbarComponent>
      </div>
    </div>)
  }
}