import UI from 'components/UI';

class SubView extends UI {

  subViewStyle(){
    return {...this.ui.basicStyle, ...this.ui.styles.view, ...{
      height: this.ui.basicStyle.height * 0.82
    }}
  }

}

export default SubView;
