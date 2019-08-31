import React from 'react';
import Content from './Content';
import ToolCell from 'components/main/items/cells/ToolCell';

import icon_survey from 'resources/images/icons/survey.png';

class Tools extends Content {

  content = style =>(
    <div style={{...this.ui.styles.area,
      ...{ height: style.height, opacity: style.opacity}}}>
      <ToolCell app={this.app} icon={icon_survey} data={{}} title={this.func.multiLang('Survey', '調查','调查')}
      onClick={()=>{ this.actions.content.pushView('survey'); }}/>
    </div>
  )

  render() {
    this.init(this.props);
    const hide = this.store.switches.hide.tools;

    const title = ['Tools','工具','工具']

    const containerStyle = {
      width: '100%',
      height: '',
      background: this.ui.colors.gradientBasic
    }

    return(
      <div style={containerStyle}>
        {this.tabBar(title, hide, ()=>{this.actions.switches.toggleHide('tools')})}
        {this.animatedContent('tools', this.content.bind(this), !hide, this.bs.height * 0.27)}
      </div>
    )
  }
}

export default Tools;
