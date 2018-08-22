import UI from 'components/UI';

class SubView extends UI {

  subViewStyle(){
    return {...this.ui.basicStyle, ...{
      height: this.ui.basicStyle.height * 0.82
    }}
  }

}

export default SubView;
