import UI from 'components/UI';

class SubView extends UI {

  subViewStyle(){
    const opacity = this.app.animatedStyle.opacity;
    return {...this.ui.basicStyle, ...{
      height: this.ui.basicStyle.height * 0.82,
      overflowY: 'auto',
      opacity: this.app.animatedStyle.opacity,
      pointerEvents: opacity === 1? '':'none'
    }}
  }

}

export default SubView;
